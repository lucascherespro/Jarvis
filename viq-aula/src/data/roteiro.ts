// =====================================================================
//  ROTEIRO "AULA RÁPIDA DA VIQ" (60 s, 30 fps)
//  Tudo aqui também aparece no painel "Props" do Remotion Studio.
//  Tempos em FRAMES (30 frames = 1 s), contados do início de cada cena.
//  A professora, as alunas e as situações são FICTÍCIAS.
// =====================================================================
import type {Roteiro} from './schema';

export const roteiroPadrao: Roteiro = {
  logoFile: '',
  mostrarZonaSegura: false,
  selo: 'PERSONAGENS FICTÍCIOS · AULA ILUSTRATIVA',
  tempos: {abertura: 150, licao1: 270, aluna1: 105, licao2: 300, aluna2: 90, licao3: 360, resumo: 300, pergunta: 90, tarefa: 180, transicao: 8},

  abertura: {
    etiqueta: 'AULA RÁPIDA · 1 MINUTO',
    aula: 'Aula 1',
    titulo: ['Por que a sua clínica', 'perde cliente?'],
    fala: {texto: 'Oi, turma! Bora entender isso em 1 minuto?', inicio: 30, fim: 150},
  },

  licao1: {
    titulo: '1. A cliente decide rápido',
    eixoX: 'tempo pra responder',
    eixoY: 'chance de agendar',
    rapido: 'respondeu rápido: agenda',
    devagar: 'demorou: vai pra outra',
    fala: {texto: 'Quanto mais você demora pra responder, mais ela procura outra clínica.', inicio: 40, fim: 270},
  },

  aluna1: {fala: 'Mas eu tô atendendo! Não dá pra responder na hora...', rotulo: 'ALUNA · DONA DE CLÍNICA'},

  licao2: {
    titulo: '2. A mensagem chega fora de hora',
    fechada: 'clínica fechada',
    aberta: 'aberta',
    fala: {texto: 'Muita mensagem chega de noite e no fim de semana. E ninguém responde.', inicio: 40, fim: 300},
  },

  aluna2: {fala: 'Ahh... então é aí que eu perco cliente!', rotulo: 'ALUNA · DONA DE CLÍNICA'},

  licao3: {
    titulo: '3. Como a VIQ resolve',
    etapas: [
      {nome: 'Cliente', detalhe: 'manda|mensagem'},
      {nome: 'VIQ', detalhe: 'responde|na hora'},
      {nome: 'Agenda', detalhe: 'mostra horários|e marca'},
      {nome: 'Você', detalhe: 'só|atende'},
    ],
    fala: {texto: 'A VIQ responde por você, tira as dúvidas e já deixa o horário marcado.', inicio: 40, fim: 360},
  },

  resumo: {
    titulo: 'Resumo da aula',
    itens: ['Responde na hora, até de madrugada', 'Tira dúvidas de preço e procedimento', 'Mostra horários e agenda', 'Você foca em atender'],
    fala: {texto: 'Anotou? É isso que a VIQ faz pela sua clínica.', inicio: 244, fim: 300},
  },

  pergunta: {fala: 'Professora, como eu coloco isso na minha clínica?', rotulo: 'ALUNA · DONA DE CLÍNICA'},

  tarefa: {
    titulo: 'Tarefa de casa:',
    texto: 'Comenta',
    destaque: 'AULA',
    complemento: 'que eu te mostro.',
    handle: '@viq.ai',
    fala: {texto: 'Boa pergunta! Comenta AULA que eu te mostro.', inicio: 20, fim: 180},
  },
};
