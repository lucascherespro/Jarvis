// ⚡ ANTENA DO JARVIS — Node puro, zero dependências.
// Faz proxy de agenda (iCal) e notícias (RSS) liberando CORS, e busca e-mails via IMAP.
// Escuta SOMENTE em 127.0.0.1 — só o seu navegador acessa.

const http = require('http');
const https = require('https');
const tls = require('tls');
const { URL } = require('url');
const { EventEmitter } = require('events');

const PORT = 4242;
const PROXY_ALLOWLIST = ['calendar.google.com', 'news.google.com'];
const IMAP_ALLOWLIST = ['imap.gmail.com'];
const CRLF = '\r\n';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function mask(s) {
  if (!s) return '';
  return s.slice(0, 2) + '***';
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// ───────────────────────── PROXY (agenda + notícias) ─────────────────────────

function fetchWithRedirects(urlStr, redirectsLeft, cb) {
  let target;
  try {
    target = new URL(urlStr);
  } catch (e) {
    return cb(new Error('URL inválida'));
  }
  const req = https.get(target, { headers: { 'User-Agent': USER_AGENT } }, (r) => {
    if ([301, 302, 303, 307, 308].includes(r.statusCode) && r.headers.location && redirectsLeft > 0) {
      r.resume();
      let nextUrl;
      try {
        nextUrl = new URL(r.headers.location, target).toString();
      } catch (e) {
        return cb(new Error('Redirecionamento inválido'));
      }
      return fetchWithRedirects(nextUrl, redirectsLeft - 1, cb);
    }
    const chunks = [];
    r.on('data', (c) => chunks.push(c));
    r.on('end', () => cb(null, { statusCode: r.statusCode, body: Buffer.concat(chunks), headers: r.headers }));
  });
  req.on('error', cb);
  req.setTimeout(15000, () => req.destroy(new Error('Tempo esgotado ao buscar a URL')));
}

// ───────────────────────── CLIENTE IMAP MÍNIMO (tls puro) ─────────────────────────

class ImapConn extends EventEmitter {
  constructor(socket) {
    super();
    this.socket = socket;
    this.buf = Buffer.alloc(0);
    this.tokens = [];
    socket.on('data', (chunk) => {
      this.buf = Buffer.concat([this.buf, chunk]);
      this._parse();
      this.emit('tokens');
    });
  }
  _parse() {
    let progressed = true;
    while (progressed) {
      progressed = false;
      const idx = this.buf.indexOf(CRLF);
      if (idx === -1) break;
      const lineBuf = this.buf.slice(0, idx);
      const lineStr = lineBuf.toString('utf8');
      const m = lineStr.match(/\{(\d+)\+?\}\s*$/);
      if (m) {
        const litLen = parseInt(m[1], 10);
        const litStart = idx + 2;
        if (this.buf.length < litStart + litLen) break; // aguarda mais dados
        const literalData = this.buf.slice(litStart, litStart + litLen);
        this.tokens.push({ type: 'line', text: lineStr });
        this.tokens.push({ type: 'literal', data: literalData });
        this.buf = this.buf.slice(litStart + litLen);
      } else {
        this.tokens.push({ type: 'line', text: lineStr });
        this.buf = this.buf.slice(idx + 2);
      }
      progressed = true;
    }
  }
  waitForTag(tag, timeoutMs = 20000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.removeListener('tokens', check);
        reject(new Error('Tempo esgotado aguardando resposta IMAP (' + tag + ')'));
      }, timeoutMs);
      const check = () => {
        for (let i = 0; i < this.tokens.length; i++) {
          const t = this.tokens[i];
          if (t.type === 'line' && new RegExp('^' + tag + ' (OK|NO|BAD)', 'i').test(t.text)) {
            const collected = this.tokens.slice(0, i + 1);
            this.tokens = this.tokens.slice(i + 1);
            clearTimeout(timer);
            this.removeListener('tokens', check);
            resolve(collected);
            return;
          }
        }
      };
      check();
      this.on('tokens', check);
    });
  }
  waitForGreeting(timeoutMs = 20000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.removeListener('tokens', check);
        reject(new Error('Tempo esgotado aguardando o servidor IMAP'));
      }, timeoutMs);
      const check = () => {
        if (this.tokens.some((t) => t.type === 'line' && /^\* OK/i.test(t.text))) {
          clearTimeout(timer);
          this.removeListener('tokens', check);
          resolve();
        }
      };
      check();
      this.on('tokens', check);
    });
  }
}

function imapQuote(s) {
  return '"' + String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function decodeMimeWords(str) {
  if (!str) return '';
  return str
    .replace(/\?=\s+=\?/g, '?==?')
    .replace(/=\?([^?]+)\?([BQ])\?([^?]*)\?=/gi, (m, charset, enc, text) => {
      try {
        if (enc.toUpperCase() === 'B') {
          return Buffer.from(text, 'base64').toString('utf8');
        }
        const q = text.replace(/_/g, ' ').replace(/=([0-9A-F]{2})/gi, (mm, hex) => String.fromCharCode(parseInt(hex, 16)));
        return Buffer.from(q, 'binary').toString('utf8');
      } catch (e) {
        return text;
      }
    });
}

function parseHeaders(raw) {
  const unfolded = raw.replace(/\r\n[ \t]+/g, ' ');
  const lines = unfolded.split(/\r\n/).filter(Boolean);
  const h = {};
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim().toLowerCase();
    const val = line.slice(idx + 1).trim();
    h[key] = val;
  }
  return h;
}

function stripHtml(body) {
  return body
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function formatEmail(rec) {
  const h = parseHeaders(rec.headersRaw);
  let body = rec.bodyRaw || '';
  if (/<[a-z][\s\S]*>/i.test(body)) body = stripHtml(body);
  body = body
    .replace(/=\r?\n/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
  return {
    id: h['message-id'] || 'seq-' + rec.seq,
    remetente: decodeMimeWords(h['from'] || ''),
    assunto: decodeMimeWords(h['subject'] || '(sem assunto)'),
    data: h['date'] || '',
    trecho: body,
    lido: false,
  };
}

function parseFetchResponse(tokens) {
  const emails = [];
  let current = null;
  let pendingFieldType = null;
  for (const t of tokens) {
    if (t.type === 'line') {
      const mm = t.text.match(/^\*\s+(\d+)\s+FETCH/i);
      if (mm) {
        if (current) emails.push(current);
        current = { seq: mm[1], headersRaw: '', bodyRaw: '' };
      }
      if (/HEADER\.FIELDS/i.test(t.text)) pendingFieldType = 'headers';
      else if (/BODY(\.PEEK)?\[TEXT\]/i.test(t.text)) pendingFieldType = 'body';
    } else if (t.type === 'literal' && current) {
      if (pendingFieldType === 'headers') current.headersRaw += t.data.toString('utf8');
      else if (pendingFieldType === 'body') current.bodyRaw += t.data.toString('utf8');
      pendingFieldType = null;
    }
  }
  if (current) emails.push(current);
  return emails.map(formatEmail);
}

function imapFetchEmails({ host, user, pass, quantidade }, cb) {
  let socket;
  try {
    socket = tls.connect({ host, port: 993, servername: host });
  } catch (e) {
    return cb(e);
  }
  socket.setTimeout(20000);
  let done = false;
  const finish = (err, result) => {
    if (done) return;
    done = true;
    cb(err, result);
  };
  socket.on('timeout', () => {
    socket.destroy();
    finish(new Error('Tempo esgotado conectando ao IMAP'));
  });
  socket.on('error', (e) => finish(e));

  const conn = new ImapConn(socket);
  let tagN = 0;
  const nextTag = () => 'A' + ++tagN;

  socket.on('secureConnect', async () => {
    try {
      await conn.waitForGreeting();

      const loginTag = nextTag();
      socket.write(`${loginTag} LOGIN ${imapQuote(user)} ${imapQuote(pass)}${CRLF}`);
      const loginResp = await conn.waitForTag(loginTag);
      const loginOk = loginResp.some((t) => t.type === 'line' && new RegExp('^' + loginTag + ' OK', 'i').test(t.text));
      if (!loginOk) {
        socket.destroy();
        return finish(new Error('LOGIN_FAILED'));
      }

      const exTag = nextTag();
      socket.write(`${exTag} EXAMINE INBOX${CRLF}`);
      const exResp = await conn.waitForTag(exTag);
      let total = 0;
      for (const t of exResp) {
        if (t.type === 'line') {
          const mm = t.text.match(/^\*\s+(\d+)\s+EXISTS/i);
          if (mm) total = parseInt(mm[1], 10);
        }
      }
      if (total === 0) {
        socket.write(`${nextTag()} LOGOUT${CRLF}`);
        socket.end();
        return finish(null, []);
      }

      const from = Math.max(1, total - (quantidade || 20) + 1);
      const fetchTag = nextTag();
      socket.write(
        `${fetchTag} FETCH ${from}:${total} (UID BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE MESSAGE-ID)] BODY.PEEK[TEXT]<0.700>)${CRLF}`
      );
      const fetchResp = await conn.waitForTag(fetchTag);
      const emails = parseFetchResponse(fetchResp);

      socket.write(`${nextTag()} LOGOUT${CRLF}`);
      socket.end();
      finish(null, emails.reverse());
    } catch (e) {
      try {
        socket.destroy();
      } catch (_) {}
      finish(e);
    }
  });
}

// ───────────────────────── SERVIDOR HTTP ─────────────────────────

const server = http.createServer((req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(req.url, `http://127.0.0.1:${PORT}`);
  } catch (e) {
    res.writeHead(400);
    res.end('URL inválida');
    return;
  }

  if (req.method === 'GET' && parsedUrl.pathname === '/proxy') {
    const target = parsedUrl.searchParams.get('url');
    if (!target) {
      res.writeHead(400);
      res.end('Faltou o parâmetro url');
      return;
    }
    let targetHost;
    try {
      targetHost = new URL(target).hostname;
    } catch (e) {
      res.writeHead(400);
      res.end('URL inválida');
      return;
    }
    if (!PROXY_ALLOWLIST.includes(targetHost)) {
      res.writeHead(403);
      res.end('Domínio não permitido: ' + targetHost);
      return;
    }
    fetchWithRedirects(target, 3, (err, result) => {
      if (err) {
        res.writeHead(502);
        res.end('Erro ao buscar: ' + err.message);
        return;
      }
      res.writeHead(result.statusCode || 200, {
        'Content-Type': result.headers['content-type'] || 'text/plain; charset=utf-8',
      });
      res.end(result.body);
    });
    return;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/emails') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ erro: 'JSON inválido' }));
        return;
      }
      const { host, usuario, senhaApp, quantidade } = data || {};
      if (!host || !usuario || !senhaApp) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ erro: 'Faltam campos (host, usuario, senhaApp)' }));
        return;
      }
      if (!IMAP_ALLOWLIST.includes(host)) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ erro: 'Servidor IMAP não permitido: ' + host }));
        return;
      }
      console.log(`[EMAILS] Conectando em ${host} com usuário ${mask(usuario)}...`);
      imapFetchEmails({ host, user: usuario, pass: senhaApp, quantidade: quantidade || 20 }, (err, emails) => {
        if (err) {
          console.log(`[EMAILS] Erro: ${err.message}`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ erro: err.message }));
          return;
        }
        console.log(`[EMAILS] ${emails.length} e-mails lidos de ${mask(usuario)}.`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ emails }));
      });
    });
    return;
  }

  res.writeHead(404);
  res.end('Rota não encontrada');
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`❌ A porta ${PORT} já está em uso. Feche o outro processo que está usando ela (ou outro Jarvis já rodando) e tente de novo.`);
  } else {
    console.log('❌ Erro no servidor:', e.message);
  }
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`⚡ ANTENA DO JARVIS ONLINE — porta ${PORT}. Pode abrir o jarvis.html.`);
});
