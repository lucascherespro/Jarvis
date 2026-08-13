# Conteúdo pronto para publicar — pace.corporate
### Status: bloqueado por 2 travas técnicas (não é falta de conteúdo)

Tudo abaixo está pronto — legenda final, prompts de imagem, payload de agendamento. Assim
que as travas caírem, é copiar e disparar, sem precisar escrever mais nada.

## 🔒 O que precisa ser destravado

| Trava | Onde | O que fazer |
|---|---|---|
| Sem créditos de imagem | Higgsfield (geração de imagem/vídeo) | Adicionar créditos no workspace, **ou** você me manda as imagens/vídeos prontos |
| `MCP tool call requires approval` | Metricool — `createScheduledPost`, `getScheduledPosts`, `getBestTimeToPostByNetwork` | Verificar/habilitar permissão de escrita (agendar posts) na integração Metricool deste ambiente — os testes mostraram que leitura (`getBrandSettings`, `getAnalyticsDataByMetrics`) funciona, só escrita está travada |

Ainda pendentes de você (não são trava técnica, é informação que só você tem):
- Case real de cliente (empresa, resultado, número) para o post de prova social.
- Conexão de `@lucascheres` no Metricool (Configurações → Adicionar marca → Instagram).

---

## 📌 POST 1 — Carrossel "5 sinais" (candidato ao post-teste, pode ir hoje)

**Por que este é o teste:** é conteúdo educativo de conhecimento geral do setor, sem dado
que possa ser contestado e sem depender de case/cliente real — o mais seguro pra validar
que o pipeline (Higgsfield → Metricool → Instagram) funciona de ponta a ponta.

**Legenda final:**
```
5 sinais de que sua empresa precisa de um programa de ergonomia 👇

Nem sempre o problema aparece de uma vez. Ele vai se acumulando até virar afastamento.

Se você reconheceu 2 ou mais desses sinais no seu time, é hora de agir — antes que vire
estatística de absenteísmo.

💬 Comenta aqui se sua empresa já passou por algum desses.
📌 Salva esse post pra revisar com o RH.

#ergonomia #saudecorporativa #NR17 #segurancadotrabalho #RH #qualidadedevida #ginasticalaboral
```

**7 slides — prompts prontos para Higgsfield (`nano_banana_pro`, aspect_ratio 4:5):**
Estilo consistente em todos: fundo azul-marinho (#0F2A4A), texto branco/teal (#4FD1C5),
tipografia sans-serif moderna, ícone line-art minimalista, marca "pace.corporate" no rodapé.

1. **Capa:** headline "5 SINAIS DE QUE SUA EMPRESA PRECISA DE UM PROGRAMA DE ERGONOMIA" + "arraste para o lado →"
2. **Nº 1:** "Colaboradores reclamam com frequência de dor nas costas, pescoço ou punhos"
3. **Nº 2:** "Aumento nos atestados médicos e afastamentos"
4. **Nº 3:** "As estações de trabalho nunca foram avaliadas por um profissional de ergonomia"
5. **Nº 4:** "Alta rotatividade nos setores operacionais"
6. **Nº 5:** "Nenhuma ação de prevenção foi feita nos últimos 12 meses"
7. **CTA final:** "Salva esse post e manda pro RH da sua empresa" + logo/tagline

**Payload Metricool pronto (preencher `media` com as URLs assim que as imagens existirem):**
```json
{
  "date": "2026-08-13T18:00:00-03:00",
  "blogId": "6711525",
  "info": {
    "autoPublish": true,
    "draft": false,
    "media": ["<url_slide_1>", "<url_slide_2>", "<url_slide_3>", "<url_slide_4>", "<url_slide_5>", "<url_slide_6>", "<url_slide_7>"],
    "providers": [{"network": "instagram"}],
    "instagramData": {"type": "POST"},
    "text": "5 sinais de que sua empresa precisa de um programa de ergonomia 👇\n\nNem sempre o problema aparece de uma vez. Ele vai se acumulando até virar afastamento.\n\nSe você reconheceu 2 ou mais desses sinais no seu time, é hora de agir — antes que vire estatística de absenteísmo.\n\n💬 Comenta aqui se sua empresa já passou por algum desses.\n📌 Salva esse post pra revisar com o RH.\n\n#ergonomia #saudecorporativa #NR17 #segurancadotrabalho #RH #qualidadedevida #ginasticalaboral",
    "publicationDate": {"dateTime": "2026-08-13T18:00:00", "timezone": "America/Sao_Paulo"}
  }
}
```

---

## 📌 POST 2 — Reels "42% dos afastamentos" (Seg 17/08, 08h)

**Dado real e verificado (fonte no fim), não é mais placeholder:**
LER/DORT responde por **42% das baixas ocupacionais no Brasil** — 623 mil trabalhadores
encaminhados ao INSS em 2025; só a dor lombar somou 237.113 benefícios, alta de 15% sobre
o ano anterior.

**Roteiro (25-30s):**
- 0-3s (texto na tela): "42% dos afastamentos no Brasil são por isso"
- 3-12s: "LER/DORT já é a maior causa de afastamento ocupacional no país. 623 mil
  trabalhadores foram pro INSS só em 2025."
- 12-20s: "A NR-17 já exige análise ergonômica do ambiente de trabalho. Não é boa vontade,
  é obrigação legal."
- 20-30s (CTA): "Segue pra entender como identificar isso antes que vire afastamento."

**Legenda:**
```
42% dos afastamentos por doença ocupacional no Brasil são por LER/DORT. 623 mil
trabalhadores encaminhados ao INSS só em 2025.

A NR-17 já exige análise ergonômica do ambiente de trabalho — isso não é opcional.

Sua empresa já avaliou os postos de trabalho este ano?

Fonte: SMABC, com dados do INSS.

#ergonomia #NR17 #saudecorporativa #LERDORT #segurancadotrabalho
```
**Fonte:** [LER/DORT representam 42% dos afastamentos por doenças ocupacionais no país – SMABC](https://smabc.org.br/ler-dort-representam-42-dos-afastamentos-por-doencas-ocupacionais-no-pais/)

⚠️ **Precisa de filmagem real ou pelo menos narração real** — vídeo com dado estatístico
citando fonte pede credibilidade de voz humana, não avatar de IA fingindo ser a marca.

---

## 📌 POST 3 — Carrossel "3 mitos sobre ergonomia" (Qua 19/08, 08h)

**Legenda:**
```
3 mitos sobre ergonomia que sua empresa ainda acredita 👇

Spoiler: nenhum deles é verdade — e acreditar neles é o motivo de tantas empresas só
agirem depois que o afastamento já aconteceu.

📌 Salva pra não cair nesses mitos de novo.

#ergonomia #saudecorporativa #NR17 #RH #segurancadotrabalho
```

**5 slides (mesmo estilo visual do Post 1):**
1. Capa: "3 mitos sobre ergonomia que sua empresa ainda acredita"
2. "MITO: Ergonomia é só sobre cadeira confortável. VERDADE: postura, pausas e rotina de
   movimento importam tanto quanto o móvel."
3. "MITO: Só importa pra quem trabalha sentado. VERDADE: também afeta operação, linha de
   produção e movimentos repetitivos."
4. "MITO: Resolve com uma palestra pontual. VERDADE: prevenção real exige avaliação
   contínua do ambiente de trabalho."
5. CTA: "Segue a pace.corporate pra entender o que realmente previne afastamento."

---

## 📌 POST 4 — Reels bastidor (Seg 24/08) — **precisa de filmagem real**
Não vou gerar isso com IA fingindo ser um atendimento real de ginástica laboral — seria
mostrar como "prova" algo que não aconteceu. Preciso de vídeo real de um atendimento, ou
esse slot vira outro carrossel educativo até haver material.

## 📌 POST 5 — Reels opinião NR-17 (Sex 28/08) — **precisa ser você (Lucas) no vídeo**
Roteiro já pronto pra gravação (posso escrever assim que você confirmar que vai gravar);
não deve ser avatar de IA — é conteúdo de opinião pessoal, precisa ser sua voz/rosto de
verdade pra construir autoridade real, não sintética.

## 📌 POST 6 — Prova social / case — **aguardando dado real seu**
Sem case real enviado, este slot fica em aberto.

---

## ✅ Checklist para eu disparar tudo automaticamente

- [ ] Créditos Higgsfield liberados (ou imagens enviadas por você)
- [ ] Permissão de escrita liberada no Metricool (`createScheduledPost` parou de dar
      "requires approval")
- [ ] Case real de cliente (Post 6)
- [ ] Confirmação de gravação real para os Reels (Posts 2, 4, 5)
- [ ] `@lucascheres` conectado no Metricool (para estender o calendário à conta pessoal)

Assim que qualquer um desses cair, me avisa — eu retomo exatamente daqui, sem repetir
nenhuma etapa já feita.
