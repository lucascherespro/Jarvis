# VIQ · "A agenda da Carla" (Reel animado, 60 s)

Versão animada (Remotion) do roteiro da Carla. A personagem é desenhada em SVG, a partir do mesmo rig da Dra. Camila.
**Carla, a cliente, a clínica e os horários são fictícios.** O selo "PERSONAGEM FICTÍCIA · SIMULAÇÃO" aparece o vídeo inteiro.

## Comandos

```bash
npm i
npm run dev        # abre o Remotion Studio
npx remotion render AgendaDaCarla out/Reel-VIQ-Agenda-da-Carla-9x16.mp4 --crf=16
npx remotion render AgendaDaCarlaFeed out/Reel-VIQ-Agenda-da-Carla-4x5.mp4 --crf=16
npx remotion still Capa out/Capa-Agenda-da-Carla.png
```

## Onde editar

- `src/data/roteiro.ts`: textos, legendas, horários, mensagens, agenda, chamada final, poses e expressões
  (`{f: frame da cena, v: 'nome'}`) e a duração de cada cena (`tempos`). Tudo isso também aparece no painel **Props** do Studio.
- `src/character/aparencia.tsx`: cores, cabelo e roupa da Carla e da cliente.
- `src/character/rig.ts`: desenho de cada pose e expressão.
- `mostrarZonaSegura: true` liga a camada que mostra as zonas do Instagram.

## Cenas

| Cena | Frames | Tempo |
|---|---|---|
| 1 · Gancho (entardecer) | 0–239 | 0–8 s |
| 2 · O problema (celular na mesa) | 240–599 | 8–20 s |
| 3 · A perda (cliente desiste) | 600–899 | 20–30 s |
| 4 · A virada (configura a VIQ) | 900–1199 | 30–40 s |
| 5 · Funcionando (23h47) | 1200–1559 | 40–52 s |
| 6 · Final (agenda + CTA) | 1560–1799 | 52–60 s |

## Frames de impacto (para música e efeitos)

| Frame | Tempo | Momento |
|---|---|---|
| 8 / 17 / 26 | 0,3 / 0,6 / 0,9 s | Slam das 3 linhas do gancho |
| 20, 70 | 0,7 / 2,3 s | Celular vibra na mão |
| **150–154** | 5 s | **Ela larga o celular no balcão (baque)** |
| 240 | 8 s | Corte para a montagem |
| 254, 280, 306 | 8,5–10,2 s | Notificações (terça 22:15) |
| 360 · 374, 404 | 12 s | Corte (quarta 06:40) + notificações |
| 480 · 494, 520, 546 | 16 s | Corte (sábado 14:00) + notificações |
| 600 · 624 | 20 / 20,8 s | Quarto · mensagem enviada |
| 720 / **730** | 24 / 24,3 s | Relógio pula 43 min / **carimbo "SEM RESPOSTA"** |
| 796 / 836 | 26,5 / 27,9 s | Outra clínica responde / "Marcado em outra clínica" |
| **900** | 30 s | **A virada (slide para a clínica de dia)** |
| 970, 1000, 1030 | 32,3–34,3 s | Checks da configuração |
| **1075** | 35,8 s | **Chave "Responder clientes" liga** |
| 1230 / 1266 | 41 / 42,2 s | Mensagem 23h47 / resposta na hora (vibra) |
| 1340 / 1386 | 44,7 / 46,2 s | Toque em "Qui 15h" / confirmação |
| **1408** | 46,9 s | **"Agendado ✓"** |
| 1560 / 1600 | 52 / 53,3 s | Manhã / agenda de hoje |
| **1692** | 56,4 s | **"Comenta AGENDA"** (pulsando até o fim) |
