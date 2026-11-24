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

## Cenas e frames de impacto

| Frame | Tempo | Momento |
|---|---|---|
| 16 / 36 | 0,5 / 1,2 s | Lousa escreve "Por que a sua clínica / perde cliente?" |
| 70 | 2,3 s | "?" aparece (pop) |
| 150 | 5 s | Lição 1: a cliente decide rápido |
| 254 / 364 | 8,5 / 12,1 s | ✓ "respondeu rápido" / ✕ "demorou" |
| 420 | 14 s | Aluna 1: "Mas eu tô atendendo!" |
| 510 | 17 s | Lição 2: relógio de 24 h |
| 620–719 | 20,7–24 s | Mensagens pipocando no horário fechado |
| 810 | 27 s | Aluna 2: "Ahh... então é aí que eu perco cliente!" |
| 900 | 30 s | Lição 3: Cliente → VIQ → Agenda → Você |
| 1150–1230 | 38,3–41 s | Mensagem viajando pelo fluxo |
| **1234** | 41,1 s | **"Agendado ✓"** |
| 1306, 1332, 1358, 1384 | 43,5–46,1 s | Checks do resumo |
| 1530 | 51 s | Aluna levanta a mão: "Como eu coloco isso na minha clínica?" |
| **1642** | 54,7 s | **"Comenta AULA"** (pulsando até o fim) |
