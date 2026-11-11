# VIQ — "Duas clínicas. Mesma rua. Mesma noite."

Reel em Remotion (simulação ilustrativa: clínicas, clientes e valores fictícios).

## Composições
- `DuasClinicas` — 1080x1920, 30 fps, 1350 frames (45 s)
- `DuasClinicasFeed` — 1080x1350 (4:5), mesmas cenas com layout adaptado (`src/layout.ts`)
- `Capa` (Still) — 1080x1920, momento do voo da Paty (`CAPA_FRAME` em `src/Capa.tsx`)

## Comandos
```bash
npm i
npm run dev                      # Remotion Studio
npx remotion render DuasClinicas out/Reel-VIQ-Duas-Clinicas-9x16.mp4 --codec=h264 --crf=16
npx remotion render DuasClinicasFeed out/Reel-VIQ-Duas-Clinicas-4x5.mp4 --codec=h264 --crf=16
npx remotion still Capa out/Capa-Duas-Clinicas.png
```

## Onde editar
- **`src/data/roteiro.ts`** — todos os textos, nomes, horários, mensagens, respostas da VIQ, valores,
  barras do gráfico e tempos (em frames; 30 frames = 1 s). Também editável no painel *Props* do Studio.
  - `clientes[].hora` define quando a notificação cai (o relógio vai de 21:00 em `relogioInicio` até 08:00 em `relogioFim`).
  - `desistencias[].frame` define quando a cliente "atravessa" da Clínica A para a B.
  - `extrasA` são as mensagens extras que somam no contador da Clínica A (5 + 2 + 7 = 14).
  - `logoFile`: coloque o logo em `public/` (ex.: `LOGOTIPO.png`) e escreva o nome aqui.
  - `mostrarZonaSegura: true` desenha as zonas proibidas do Instagram para conferência.
- **`src/theme.ts`** — cores, tipografia, espaçamentos, curvas de easing.

## Momentos de impacto (para sincronizar música) — 9:16 e 4:5
| Frame | Tempo | Momento |
|---|---|---|
| 0 | 0,00 s | Slam "Duas clínicas." |
| 25 | 0,83 s | Slam "Mesma rua." |
| 50 | 1,67 s | Slam "Mesma noite." |
| 75 | 2,50 s | Frases comprimem → mapa |
| 175–195 | 5,8–6,5 s | Mapa se parte ao meio (tela dividida) |
| 262 | 8,73 s | 1ª notificação (Ju) cai nos dois painéis |
| 560 | 18,67 s | "já marquei em outra clínica" (Ju) |
| 580–620 | 19,3–20,7 s | Voo da Ju de A para B (pouso no 620) |
| 680 | 22,67 s | Paty desiste na Clínica A |
| 700–728 | 23,3–24,3 s | Voo da Paty (pouso no 728) |
| 812 | 27,07 s | 08:00 — a manhã |
| 925–945 | 30,8–31,5 s | Painel B se expande (relatório) |
| 1194 | 39,80 s | Virada: "É quem responde primeiro." |
| 1230 | 41,00 s | Chamada final |
