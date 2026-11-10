// =====================================================================
//  CONFIGURAÇÃO DO REEL "REBOBINA A NOITE" — edite aqui textos, cores e tempos
// =====================================================================

export const FPS = 30;
export const DURATION_S = 32;

/** Cores da identidade visual VIQ */
export const COLORS = {
  navy: '#0B1530',
  purple: '#7C3AED',
  purpleLight: '#A78BFA',
  white: '#FFFFFF',
  red: '#EF4444',
  green: '#25D366',
  greenText: '#78EBA0',
};

/** Momentos-chave do vídeo, em segundos */
export const T = {
  nightAStart: 2.5, // relógio começa a acelerar (noite SEM VIQ)
  nightAEnd: 11, // relógio chega a 08:00 (última notificação)
  morningA: 11.5, // "8h. 14 mensagens."
  rewindStart: 14, // efeito VHS ◀◀
  nightBStart: 16.5, // noite COM VIQ
  nightBClockEnd: 25.5, // relógio chega a 08:00
  morningB: 26, // "Bom dia!"
  final: 29, // tela final com logo
};

/** Minutos desde 21:00 (0 = 21:00, 660 = 08:00) */
export const NIGHT_MINUTES = 660;

export type ClientMsg = {
  min: number; // minutos desde 21:00 (ex.: 36 = 21:36)
  name?: string; // sem nome = mensagem extra (só soma no contador)
  text?: string;
  color?: string; // cor do ícone com a inicial
};

/** Noite SEM VIQ: 14 mensagens no total (7 com card + 7 só no contador) */
export const NIGHT_A: ClientMsg[] = [
  {min: 36, name: 'Ju', text: 'quanto é o botox?', color: '#F472B6'},
  {min: 62},
  {min: 84, name: 'Paty', text: 'vocês atendem sábado?', color: '#60A5FA'},
  {min: 128},
  {min: 162, name: 'Bia', text: 'faz limpeza de pele?', color: '#F59E0B'},
  {min: 216, name: 'Carla', text: 'tem horário amanhã?', color: '#34D399'},
  {min: 262},
  {min: 312, name: 'Renata', text: 'quanto custa o preenchimento?', color: '#FB7185'},
  {min: 372},
  {min: 440},
  {min: 528, name: 'Lu', text: 'dói muito o botox?', color: '#A78BFA'},
  {min: 585},
  {min: 628},
  {min: 660, name: 'Ju', text: 'já marquei em outra clínica, obg', color: '#F472B6'},
];

export type ViqReply =
  | {kind: 'booking'; detail: string}
  | {kind: 'answer'; detail: string};

/** Noite COM VIQ: cada mensagem ganha uma resposta da VIQ logo abaixo */
export const NIGHT_B: (ClientMsg & {reply: ViqReply})[] = [
  {min: 36, name: 'Ju', text: 'quanto é o botox?', color: '#F472B6', reply: {kind: 'booking', detail: 'Ju · Botox · Sáb 10:00'}},
  {min: 84, name: 'Paty', text: 'vocês atendem sábado?', color: '#60A5FA', reply: {kind: 'booking', detail: 'Paty · Avaliação · Sáb 11:30'}},
  {min: 162, name: 'Bia', text: 'faz limpeza de pele?', color: '#F59E0B', reply: {kind: 'booking', detail: 'Bia · Limpeza de pele · Seg 14:00'}},
  {min: 216, name: 'Carla', text: 'tem horário amanhã?', color: '#34D399', reply: {kind: 'booking', detail: 'Carla · Avaliação · Seg 09:30'}},
  {min: 312, name: 'Renata', text: 'quanto custa o preenchimento?', color: '#FB7185', reply: {kind: 'answer', detail: 'Dúvida de Renata respondida'}},
  {min: 528, name: 'Lu', text: 'dói muito o botox?', color: '#A78BFA', reply: {kind: 'answer', detail: 'Dúvida de Lu respondida'}},
];

/** Quantos frames depois da mensagem a resposta da VIQ aparece */
export const REPLY_DELAY_FRAMES = 10;

export const TEXTS = {
  hook1: 'O celular de uma clínica',
  hook2: 'das 21h às 8h',
  counterA: 'mensagens sem resposta',
  counterB: 'agendamentos',
  morningA1: '8h. 14 mensagens.',
  morningA2: 'Nenhuma respondida.',
  rewind1: 'Agora rebobina a noite…',
  rewind2: 'com a VIQ ligada.',
  bookingTitle: 'Pré-agendamento confirmado',
  answerTitle: 'VIQ respondeu',
  replyTime: 'em 3 s',
  morningB1: 'Bom dia!',
  morningB2: 'Você acordou com',
  morningB3: '4 clientes agendadas.',
  finalTagline: 'Sua clínica atendendo enquanto você dorme.',
  finalCtaPrefix: 'Comenta',
  finalCtaWord: 'QUERO',
  handle: '@viq.ai',
  seal: 'SIMULAÇÃO ILUSTRATIVA',
  weekdayBefore: 'sexta-feira',
  weekdayAfter: 'sábado',
};

/** Área segura do Instagram: evitar texto importante acima de 15% e abaixo de 70% */
export const SAFE_TOP = 1920 * 0.15; // 288
export const SAFE_BOTTOM = 1920 * 0.7; // 1344
