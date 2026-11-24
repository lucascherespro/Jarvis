# VIQ · "Aula rápida" (Reel animado, 60 s)

Aula explicativa animada: a Professora Lia (fictícia) explica na lousa por que a clínica perde cliente e como a VIQ resolve.
Duas alunas, donas de clínica (fictícias), fazem perguntas. O selo "PERSONAGENS FICTÍCIOS · AULA ILUSTRATIVA" fica o vídeo todo.

## Comandos
```bash
npm i
npm run dev
npx remotion render AulaVIQ out/Reel-VIQ-Aula-9x16.mp4 --crf=16
npx remotion still Capa out/Capa-Aula-VIQ.png
```

## Onde editar
- `src/data/roteiro.ts`: falas da professora e das alunas, textos da lousa e duração de cada cena (também no painel Props do Studio).
- `src/character/aparencia.tsx`: visual da professora (`PROFESSORA`) e das alunas.
- `src/Aula.tsx`: desenhos da lousa (gráfico, relógio, fluxo, checklist).

## Narração (voz)
A voz é gerada com o Kokoro TTS (modelo neural gratuito, voz `pf_dora`, português do Brasil).
- Texto falado de cada cena: `voz/falas.json` (escreva como se pronuncia; "VIQ" está como "Víqui").
- Para gerar de novo: `pip install kokoro-onnx soundfile`, baixe `kokoro-v1.0.onnx` e `voices-v1.0.bin`
  (https://github.com/thewh1teagle/kokoro-onnx/releases, model-files-v1.0) e rode `python voz/gerar.py <pasta-dos-modelos>`.
  Os áudios vão para `public/voz/` e as durações para `src/data/voz.ts` (a boca das personagens segue essas durações).

## Cenas e frames de impacto (versão com voz, 1845 frames = 61,5 s)

| Frame | Tempo | Momento |
|---|---|---|
| 16 / 36 | 0,5 / 1,2 s | Lousa escreve "Por que a sua clínica / perde cliente?" |
| 30 | 1 s | Voz: "Oi, turma!" |
| 150 | 5 s | Lição 1: a cliente decide rápido |
| 254 / 364 | 8,5 / 12,1 s | ✓ "respondeu rápido" / ✕ "demorou" |
| 420 | 14 s | Aluna 1: "Mas eu tô atendendo!" |
| 525 | 17,5 s | Lição 2: relógio de 24 h |
| 635–734 | 21,2–24,5 s | Mensagens pipocando no horário fechado |
| 825 | 27,5 s | Aluna 2: "Ahh... então é aí que eu perco cliente!" |
| 915 | 30,5 s | Lição 3: Cliente → VIQ → Agenda → Você |
| 1165–1245 | 38,8–41,5 s | Mensagem viajando pelo fluxo |
| **1249** | 41,6 s | **"Agendado ✓"** |
| 1275 | 42,5 s | Resumo (checks a cada ~0,9 s) |
| 1575 | 52,5 s | Aluna levanta a mão: "Como eu coloco isso na minha clínica?" |
| **1687** | 56,2 s | **"Comenta AULA"** (pulsando até o fim) |
