# VIQ · "A conta que ninguém faz" (Reel, 25 s)

Tipografia animada: uma mensagem fica sem resposta, um cupom imprime a conta e a VIQ responde na hora.
Os números são **exemplo ilustrativo** (o selo aparece o vídeo todo, menos no gancho e na chamada).

## Comandos

```bash
npm i
npm run dev        # Remotion Studio
npx remotion render AConta out/Reel-VIQ-A-Conta-9x16.mp4 --crf=16
npx remotion still Capa out/Capa-A-Conta.png
```

## Onde editar
`src/data/roteiro.ts` (também no painel Props do Studio): textos, nome da cliente e os números do cupom.
`clientesPorSemana`, `valorProcedimento` e `semanasNoMes` recalculam sozinhos o total por mês e por ano.

## Frames de impacto (música e efeitos)

| Frame | Tempo | Momento |
|---|---|---|
| 2 / 12 | 0,1 / 0,4 s | Slam "Faz essa conta / comigo." |
| 28 | 0,9 s | Chip "leva 20 segundos" |
| 96 | 3,2 s | Mensagem da cliente chega |
| 140–190 | 4,7–6,3 s | Contador "sem resposta" correndo |
| **190** | 6,3 s | **"Marcou em outra clínica" (tremida)** |
| 202 | 6,7 s | "Agora imagina isso 1 vez por semana." |
| 240 | 8 s | Cupom começa a imprimir |
| 254, 280, 306 | 8,5 / 9,3 / 10,2 s | Linhas do cupom |
| 340–366 | 11,3–12,2 s | "Por mês" contando |
| **390** | 13 s | **"Por ano R$ 12.000" (slam + tremida)** |
| 424 | 14,1 s | "Sem contar o retorno e as indicações." |
| 480 | 16 s | Virada: "Agora imagina responder na hora." |
| 502 / 530 | 16,7 / 17,7 s | Mensagem 23:47 / resposta automática |
| 554 / 564 | 18,5 / 18,8 s | Toque em "Qui 15h" |
| **578** | 19,3 s | **"Agendado ✓"** |
| **625** | 20,8 s | **"Comenta CONTA"** (pulsando até o fim) |
