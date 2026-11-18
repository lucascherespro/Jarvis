import React from 'react';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {AbsoluteFill, CalculateMetadataFunction, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Roteiro} from './data/schema';
import {BarraProgresso} from './components/BarraProgresso';
import {ChipAgendado} from './components/ChipAgendado';
import {FundoMarca, GraoGlobal} from './components/FundoMarca';
import {Legenda} from './components/Legenda';
import {Notificacao} from './components/Notificacao';
import {Palco} from './components/Palco';
import {SeloFicticio} from './components/SeloFicticio';
import {TelaChat} from './components/TelaChat';
import {ZonaSegura} from './components/ZonaSegura';
import {clamp, cores, curvas, fontFamily} from './theme';

const reais = (v: number) => `R$ ${Math.round(v).toLocaleString('pt-BR')}`;

export const inicios = (t: Roteiro['tempos']) => {
  const ordem = [t.gancho, t.cliente, t.cupom, t.virada, t.cta];
  const ini: number[] = [];
  ordem.reduce((acc, d) => {
    ini.push(acc);
    return acc + d;
  }, 0);
  return {ini, total: ordem.reduce((a, b) => a + b, 0)};
};

export const calcularDuracao: CalculateMetadataFunction<Roteiro> = ({props}) => ({durationInFrames: inicios(props.tempos).total});

const tremida = (frame: number, inicio: number, forca = 14) => {
  const d = frame - inicio;
  if (d < 0 || d > 16) return '0px 0px';
  const k = (1 - d / 16) * forca;
  return `${Math.sin(d * 2.3) * k}px ${Math.cos(d * 3.1) * k * 0.6}px`;
};

// ---------------------------------------------------------------- 0 · Gancho
const Gancho: React.FC<{r: Roteiro}> = ({r}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const chip = spring({frame: frame - 28, fps, config: {damping: 12, stiffness: 180}});
  const fantasmas = ['Oi! Tem horário?', 'Quanto custa?', 'Vocês atendem sábado?', 'Alguém aí?'];
  return (
    <Palco>
      {fantasmas.map((t, i) => (
        <div key={i} style={{position: 'absolute', inset: 0, opacity: 0.28, filter: 'blur(2px)'}}>
          <Notificacao nome={'ABCD'[i]} texto={t} inicio={4 + i * 6} x={i % 2 ? 300 : 60} y={[360, 1000, 1140, 260][i]} largura={700} rot={i % 2 ? 4 : -4} />
        </div>
      ))}
      <Legenda top={560} inicio={2} slam intervalo={10} linhas={[{texto: r.gancho.linha1, tamanho: 112}, {texto: r.gancho.linha2, tamanho: 132, cor: cores.roxoClaro}]} />
      <div style={{position: 'absolute', top: 960, left: 0, right: 0, display: 'flex', justifyContent: 'center', scale: chip}}>
        <div style={{padding: '14px 32px', borderRadius: 999, border: `3px solid ${cores.dourado}`, background: 'rgba(11,21,48,0.85)', fontFamily, fontWeight: 800, fontSize: 42, color: cores.dourado, letterSpacing: 1}}>
          ⏱ {r.gancho.chip}
        </div>
      </div>
    </Palco>
  );
};

// ---------------------------------------------------------------- 1 · A cliente sem resposta
const Cliente: React.FC<{r: Roteiro}> = ({r}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = r.cliente;
  const minutos = Math.floor(interpolate(frame, [50, 100], [0, 127], clamp));
  const perde = spring({frame: frame - 100, fps, config: {damping: 14, stiffness: 150}});
  const cinza = interpolate(frame, [100, 112], [0, 1], clamp);
  return (
    <Palco>
      <div style={{position: 'absolute', inset: 0, filter: `grayscale(${cinza})`, opacity: interpolate(cinza, [0, 1], [1, 0.55])}}>
        <Notificacao nome={c.nome} texto={c.mensagem} inicio={6} x={110} y={470} largura={860} origemY={900} />
      </div>
      {frame >= 30 ? (
        <div style={{position: 'absolute', top: 650, left: 0, right: 0, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 40, color: cores.cinza, opacity: interpolate(frame, [30, 40], [0, 1], clamp)}}>{c.visto}</div>
      ) : null}
      {frame >= 50 ? (
        <div style={{position: 'absolute', top: 730, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
          <div style={{display: 'flex', alignItems: 'baseline', gap: 18, fontFamily, fontWeight: 800, color: cores.vermelho, fontVariantNumeric: 'tabular-nums', translate: tremida(frame, 100, 10)}}>
            <span style={{fontSize: 150, letterSpacing: -4}}>
              {Math.floor(minutos / 60)}h{String(minutos % 60).padStart(2, '0')}
            </span>
            <span style={{fontSize: 52}}>{c.semResposta}</span>
          </div>
        </div>
      ) : null}
      {frame >= 100 ? (
        <div style={{position: 'absolute', top: 930, left: 0, right: 0, display: 'flex', justifyContent: 'center', scale: perde}}>
          <div style={{padding: '16px 34px', borderRadius: 999, background: 'rgba(239,68,68,0.15)', border: `3px solid ${cores.vermelho}`, fontFamily, fontWeight: 800, fontSize: 44, color: '#FCA5A5'}}>✕ {c.perdida}</div>
        </div>
      ) : null}
      <Legenda top={1090} inicio={c.legenda.inicio} fim={c.legenda.fim + 20} linhas={c.legenda.linhas.map((t, i) => ({texto: t, tamanho: 68, cor: i === 1 ? cores.dourado : undefined}))} />
    </Palco>
  );
};

// ---------------------------------------------------------------- 2 · O cupom
const LinhaCupom: React.FC<{rotulo: string; valor: string; inicio: number; forte?: boolean; cor?: string; tamanho?: number}> = ({rotulo, valor, inicio, forte, cor, tamanho = 36}) => {
  const frame = useCurrentFrame();
  if (frame < inicio) return null;
  // texto "impresso" da esquerda para a direita
  const p = interpolate(frame, [inicio, inicio + 8], [0, 100], clamp);
  return (
    <div style={{display: 'flex', alignItems: 'baseline', gap: 12, clipPath: `inset(0 ${100 - p}% 0 0)`, fontSize: tamanho, fontWeight: forte ? 800 : 600, color: cor ?? '#1F1B2D'}}>
      <span style={{whiteSpace: 'nowrap'}}>{rotulo}</span>
      <span style={{flex: 1, borderBottom: '4px dotted #B9B2C6', translate: '0px -8px'}} />
      <span style={{whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums'}}>{valor}</span>
    </div>
  );
};

const Cupom: React.FC<{r: Roteiro}> = ({r}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = r.cupom;
  const porMes = c.clientesPorSemana * c.valorProcedimento * c.semanasNoMes;
  const porAno = porMes * 12;
  const mes = interpolate(frame, [c.mes, c.mes + 26], [0, porMes], {...clamp, easing: curvas.saida});
  const ano = interpolate(frame, [c.ano, c.ano + 22], [0, porAno], {...clamp, easing: curvas.saida});
  const slamAno = spring({frame: frame - c.ano, fps, config: {damping: 11, stiffness: 190, mass: 0.85}});
  // papel saindo da impressora
  const altura = interpolate(frame, [0, 12, c.linhas[2] + 10, c.mes + 10, c.ano + 10], [0, 250, 520, 640, 860], {...clamp, easing: curvas.saida});
  const entra = spring({frame, fps, config: {damping: 200}, durationInFrames: 12});
  return (
    <Palco>
      {/* boca da "impressora" */}
      <div style={{position: 'absolute', top: 300, left: 120, width: 840, height: 34, borderRadius: 17, background: '#1A2448', boxShadow: 'inset 0 -6px 0 #0E1530', opacity: entra}} />
      <div style={{position: 'absolute', top: 316, left: 160, width: 760, height: altura, overflow: 'hidden', translate: tremida(frame, c.ano + 4, 12)}}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 760,
            height: 860,
            boxSizing: 'border-box',
            padding: '48px 46px 70px',
            background: '#FFFDF8',
            fontFamily,
            display: 'flex',
            flexDirection: 'column',
            gap: 26,
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 22px), 95% 100%, 90% calc(100% - 22px), 85% 100%, 80% calc(100% - 22px), 75% 100%, 70% calc(100% - 22px), 65% 100%, 60% calc(100% - 22px), 55% 100%, 50% calc(100% - 22px), 45% 100%, 40% calc(100% - 22px), 35% 100%, 30% calc(100% - 22px), 25% 100%, 20% calc(100% - 22px), 15% 100%, 10% calc(100% - 22px), 5% 100%, 0 calc(100% - 22px))',
          }}
        >
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: 32, fontWeight: 800, letterSpacing: 2, color: '#1F1B2D'}}>{c.titulo}</div>
            <div style={{fontSize: 24, fontWeight: 700, letterSpacing: 3, color: '#9C95AE', marginTop: 4}}>{c.aviso.toUpperCase()}</div>
          </div>
          <div style={{borderTop: '4px dashed #CFC8DD'}} />
          <LinhaCupom rotulo={c.rotulos.clientes} valor={String(c.clientesPorSemana)} inicio={c.linhas[0]} />
          <LinhaCupom rotulo={c.rotulos.valor} valor={`× ${reais(c.valorProcedimento)}`} inicio={c.linhas[1]} />
          <LinhaCupom rotulo={c.rotulos.semanas} valor={`× ${c.semanasNoMes}`} inicio={c.linhas[2]} />
          {frame >= c.mes - 6 ? <div style={{borderTop: '4px dashed #CFC8DD'}} /> : null}
          <LinhaCupom rotulo={c.rotulos.mes} valor={reais(mes)} inicio={c.mes} forte tamanho={48} />
          {frame >= c.ano ? (
            <div style={{marginTop: 6, padding: '18px 22px', borderRadius: 20, background: 'rgba(239,68,68,0.1)', border: `4px solid ${cores.vermelho}`, scale: interpolate(slamAno, [0, 1], [1.3, 1]), opacity: interpolate(slamAno, [0, 0.3], [0, 1], clamp)}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 800, color: cores.vermelho}}>
                <span style={{fontSize: 46}}>{c.rotulos.ano}</span>
                <span style={{fontSize: 84, letterSpacing: -2, fontVariantNumeric: 'tabular-nums'}}>{reais(ano)}</span>
              </div>
            </div>
          ) : null}
          {frame >= c.ano + 34 ? (
            <div style={{fontSize: 30, fontWeight: 700, color: '#6B6480', textAlign: 'center', opacity: interpolate(frame, [c.ano + 34, c.ano + 44], [0, 1], clamp)}}>{c.rodape}</div>
          ) : null}
        </div>
      </div>
    </Palco>
  );
};

// ---------------------------------------------------------------- 3 · A virada
const Virada: React.FC<{r: Roteiro}> = ({r}) => {
  const v = r.virada;
  return (
    <Palco>
      <Legenda top={300} inicio={2} slam intervalo={10} linhas={[{texto: v.titulo1, tamanho: 84}, {texto: v.titulo2, tamanho: 84, cor: cores.verdeClaro}]} />
      <TelaChat
        titulo={v.clinica}
        mensagens={[
          {de: 'cliente', texto: v.mensagem, hora: v.hora, f: 22},
          {de: 'clinica', texto: v.resposta, hora: v.hora, f: 50, automatica: true, botoes: v.botoes},
          {de: 'cliente', texto: v.botoes[0], hora: v.hora, f: 84},
        ]}
        digitando={[{de: 32, ate: 50}]}
        botaoEscolhido={{texto: v.botoes[0], f: 74}}
        x={250}
        y={560}
        largura={580}
        inicio={12}
      />
      <ChipAgendado texto={v.chip} inicio={98} x={400} y={1230} />
    </Palco>
  );
};

// ---------------------------------------------------------------- 4 · Chamada
const Logo: React.FC<{arquivo: string}> = ({arquivo}) => {
  if (arquivo) return <Img src={staticFile(arquivo)} style={{height: 110, maxWidth: 460, objectFit: 'contain'}} />;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
      <div style={{width: 96, height: 96, borderRadius: 26, background: `linear-gradient(135deg, ${cores.roxoClaro}, ${cores.roxo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily, fontWeight: 800, fontSize: 66, color: 'white'}}>V</div>
      <div style={{fontFamily, fontWeight: 800, fontSize: 96, color: 'white', letterSpacing: -3, lineHeight: 1}}>VIQ</div>
    </div>
  );
};

const Chamada: React.FC<{r: Roteiro}> = ({r}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = r.cta;
  const entra = (d: number) => spring({frame: frame - d, fps, config: {damping: 14, stiffness: 150}});
  const pulso = 1 + 0.06 * Math.max(0, Math.sin((frame - 30) / 4.5));
  return (
    <Palco>
      <div style={{position: 'absolute', top: 360, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: entra(0), scale: interpolate(entra(0), [0, 1], [0.6, 1]), filter: `drop-shadow(0 0 30px rgba(124,58,237,0.8))`}}>
        <Logo arquivo={r.logoFile} />
      </div>
      <div style={{position: 'absolute', top: 600, left: 0, right: 0, display: 'flex', justifyContent: 'center', scale: entra(10) * pulso}}>
        <div style={{padding: '24px 48px', borderRadius: 999, background: 'rgba(11,21,48,0.9)', border: `4px solid ${cores.roxoClaro}`, boxShadow: `0 0 50px ${cores.roxo}`, fontFamily, fontWeight: 800, fontSize: 96, color: 'white', whiteSpace: 'nowrap'}}>
          {c.texto} <span style={{color: cores.dourado}}>{c.destaque}</span>
        </div>
      </div>
      <div style={{position: 'absolute', top: 790, left: 60, right: 60, textAlign: 'center', fontFamily, fontWeight: 800, fontSize: 72, lineHeight: 1.1, color: 'white', letterSpacing: -1.5, opacity: entra(20), translate: `0px ${(1 - entra(20)) * 40}px`}}>
        {c.linha1}
        <br />
        {c.linha2}
      </div>
      <div style={{position: 'absolute', top: 990, left: 60, right: 60, textAlign: 'center', fontFamily, fontWeight: 600, fontSize: 40, color: cores.cinza, opacity: entra(32)}}>{c.apoio}</div>
      <div style={{position: 'absolute', top: 1080, left: 0, right: 0, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 46, color: '#C7D2FE', opacity: entra(42)}}>{c.handle}</div>
    </Palco>
  );
};

// ---------------------------------------------------------------- Montagem
export const Video: React.FC<{roteiro: Roteiro; extras?: boolean}> = ({roteiro: r, extras = true}) => {
  const t = r.tempos;
  const T = t.transicao;
  const {ini, total} = inicios(t);
  const timing = linearTiming({durationInFrames: T});
  return (
    <AbsoluteFill style={{backgroundColor: cores.navy}}>
      <FundoMarca periodo={total} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="0 · Gancho" durationInFrames={t.gancho + T}>
          <Gancho r={r} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={timing} />
        <TransitionSeries.Sequence name="1 · Cliente sem resposta" durationInFrames={t.cliente + T}>
          <Cliente r={r} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence name="2 · O cupom" durationInFrames={t.cupom + T}>
          <Cupom r={r} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: 'from-right'})} timing={timing} />
        <TransitionSeries.Sequence name="3 · A virada" durationInFrames={t.virada + T}>
          <Virada r={r} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence name="4 · Chamada" durationInFrames={t.cta}>
          <Chamada r={r} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <GraoGlobal />
      {extras ? (
        <>
          <Sequence name="Selo" from={ini[1]} durationInFrames={ini[4] - ini[1]} layout="none">
            <SeloFicticio texto={r.selo} />
          </Sequence>
          <BarraProgresso />
        </>
      ) : null}
      {r.mostrarZonaSegura ? <ZonaSegura /> : null}
    </AbsoluteFill>
  );
};

export const AConta: React.FC<Roteiro> = (props) => <Video roteiro={props} />;

/** Capa: o cupom com o total do ano + pergunta */
export const CAPA_FRAME = 90 + 150 + 225;
export const Capa: React.FC<Roteiro> = (props) => (
  <AbsoluteFill>
    <Sequence from={-CAPA_FRAME} layout="none">
      <Video roteiro={props} extras={false} />
    </Sequence>
    <AbsoluteFill style={{background: 'linear-gradient(0deg, rgba(11,21,48,0.95) 0%, rgba(11,21,48,0.7) 22%, rgba(11,21,48,0) 36%)'}} />
    <div style={{position: 'absolute', top: 1260, left: 40, right: 40, textAlign: 'center', fontFamily, color: 'white'}}>
      <div style={{fontSize: 96, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02}}>
        A conta que <span style={{color: cores.dourado}}>ninguém faz</span>
      </div>
    </div>
    <div style={{position: 'absolute', top: 1480, left: 0, right: 0, textAlign: 'center', fontFamily, fontWeight: 700, fontSize: 30, letterSpacing: 2.5, color: 'rgba(255,255,255,0.85)'}}>{props.cupom.aviso.toUpperCase()}</div>
  </AbsoluteFill>
);

