# VIQ — "Um dia na vida da Dra. Camila"

Reel em Remotion com personagem ilustrada em SVG (rig animável). **Personagem, pacientes, clientes e números são fictícios.**

## Composições
- `DiaDaCamila` — 1080x1920, 30 fps, 1440 frames (48 s)
- `DiaDaCamilaFeed` — 1080x1350 (4:5), mesmo conteúdo (o "palco" 9:16 é deslocado; a área segura cabe inteira)
- `Capa` (Still) — Camila estressada com notificações + "Essa é você?"
- `Referencia/TesteRig` — folha com todas as expressões e poses

## Comandos
```bash
npm i
npm run dev
npx remotion render DiaDaCamila out/Reel-VIQ-Dia-da-Camila-9x16.mp4 --codec=h264 --crf=16
npx remotion render DiaDaCamilaFeed out/Reel-VIQ-Dia-da-Camila-4x5.mp4 --codec=h264 --crf=16
npx remotion still Capa out/Capa-Dia-da-Camila.png
```

## Onde editar
- **`src/data/roteiro.ts`**: legendas, horários dos relógios, mensagens, respostas da VIQ, agendamentos,
  tempos de cada cena e as **chaves de expressão/pose** da Camila (`{f: frame da cena, v: 'feliz'}`).
  Também editável no painel *Props* do Studio. `mostrarZonaSegura: true` liga o overlay das zonas do Instagram.
- **`src/character/rig.ts`**: valores numéricos de cada pose/expressão (ângulos dos braços, boca, sobrancelhas…).
- **`src/theme.ts`**: cores, fontes, molas.

## Frames de impacto (globais, iguais no 9:16 e no 4:5)
| Frame | Tempo | Momento |
|---|---|---|
| 3 / 19 | 0,1 / 0,6 s | Slam "Essa é você?" / subtítulo |
| 6, 15, 24, 33, 42 | 0,2–1,4 s | Notificações caindo no celular (vibrações) |
| 95, 120, 145, 170, 195, 220 | 3,2–7,3 s | Celular vibrando na bancada (cena 1) |
| 153 / 173 | 5,1 / 5,8 s | Olhada de canto / "Depois eu respondo…" |
| 255 | 8,5 s | Wipe para a noite |
| 273, 295 | 9,1 / 9,8 s | Vibrações no braço do sofá |
| 369 / 387 | 12,3 / 12,9 s | Cochila / celular escorrega |
| 448 / 454 | 14,9 / 15,1 s | Vibração / "já marquei em outra clínica" |
| **472** | 15,7 s | **Choque (caneca para, tremida)** |
| 484 | 16,1 s | "3 clientes perdidas" cai |
| **570–630** | 19–21 s | **Rebobinada VHS ◀◀** |
| 646, 700, 754 | 21,5–25,1 s | Mensagens chegando (cena 4) |
| 662, 716, 770 | 22,1–25,7 s | Respostas da VIQ |
| 678, 732, 786 | 22,6–26,2 s | Chips "Agendado ✓" |
| **770** | 25,7 s | **Piscadinha para a câmera** |
| 836, 884, 930 | 27,9–31 s | Celular acende no quarto |
| 1005 | 33,5 s | Tela "Bom dia! 4 novos agendamentos" |
| **1091–1093** | 36,4 s | **Comemoração + confete** |
| 1170 | 39 s | Tela dividida (comparação) |
| 1290 / 1320 | 43 / 44 s | Chamada final / "Comenta QUERO" pulsando |
| 1410–1439 | 47–48 s | Volta ao enquadramento do frame 0 (loop) |
