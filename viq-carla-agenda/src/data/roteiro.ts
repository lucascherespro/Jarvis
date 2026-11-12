// =====================================================================
//  ROTEIRO "A AGENDA DA CARLA" (60 s, 30 fps)
//  Tudo aqui também aparece no painel "Props" do Remotion Studio.
//  Tempos em FRAMES (30 frames = 1 s). Os frames de cada cena começam
//  do zero no início da cena.
//  Expressões: neutra, focada, preocupada, estressada, cansada, chocada,
//              aliviada, feliz, dormindo, comemorando, determinada,
//              desapontada, suspiro
//  Poses: emPe, olhandoCelular, largaCelular, maoNaTesta, digitandoNotebook,
//         recostada, tomandoCafe, cafeECelular, cafeOlhaCamera,
//         digitandoCelular, celularNoPeito, comemorando, apontando, sofaCelular
//  Carla, a cliente, a clínica e os horários são FICTÍCIOS.
// =====================================================================
import type {Roteiro} from './schema';

export const roteiroPadrao: Roteiro = {
  logoFile: '',
  mostrarZonaSegura: false,
  selo: 'PERSONAGEM FICTÍCIA · SIMULAÇÃO',
  nomeClinica: 'Clínica da Carla',
  tempos: {cena1: 240, cena2: 360, cena3: 300, cena4: 300, cena5: 360, cena6: 240, transicao: 12},

  // 0–8 s · Gancho: entardecer, clínica vazia, ela larga o celular
  cena1: {
    gancho: ['Quantas clientes', 'você perde', 'sem nem saber?'],
    ganchoInicio: 8,
    ganchoFim: 225,
    vibracoes: [20, 70],
    largaCelular: 150,
    poses: [
      {f: 0, v: 'olhandoCelular'},
      {f: 146, v: 'largaCelular'},
      {f: 176, v: 'maoNaTesta'},
    ],
    expressoes: [
      {f: 0, v: 'preocupada'},
      {f: 90, v: 'estressada'},
      {f: 150, v: 'suspiro'},
      {f: 190, v: 'cansada'},
    ],
  },

  // 8–20 s · O problema: o celular sozinho na mesa
  cena2: {
    legenda: {linhas: ['As mensagens chegam', 'quando ninguém tá lá.'], inicio: 20, fim: 345},
    tomadas: [
      {
        luz: 'noite',
        dia: 'TER',
        relogio: '22:15',
        notificacoes: [
          {nome: 'Bia', texto: 'Oi! Tem horário essa semana?', f: 14},
          {nome: 'Rafa', texto: 'Quanto custa o botox?', f: 40},
          {nome: 'Lu', texto: 'Vocês atendem sábado?', f: 66},
        ],
      },
      {
        luz: 'manha',
        dia: 'QUA',
        relogio: '06:40',
        notificacoes: [
          {nome: 'Nanda', texto: 'Bom dia! Ainda tem vaga?', f: 14},
          {nome: 'Jô', texto: 'Queria remarcar...', f: 44},
        ],
      },
      {
        luz: 'tarde',
        dia: 'SÁB',
        relogio: '14:00',
        notificacoes: [
          {nome: 'Duda', texto: 'Ainda tão atendendo?', f: 14},
          {nome: 'Mel', texto: 'Oi?? Alguém?', f: 40},
          {nome: 'Bia', texto: 'Vou ver em outro lugar então', f: 66},
        ],
      },
    ],
  },

  // 20–30 s · A perda: a cliente espera, desiste e marca em outro lugar
  cena3: {
    relogio: '21:58',
    relogioDepois: '22:41',
    pulaRelogio: 120,
    legenda: {linhas: ['E a cliente', 'não espera.'], inicio: 128, fim: 205},
    legenda2: {linhas: ['Ela marca', 'em outro lugar.'], inicio: 215, fim: 292},
    mensagem: {de: 'cliente', texto: 'Oi! Tem horário pra limpeza de pele essa semana?', hora: '21:58', f: 24},
    seloSemResposta: 130,
    outraClinica: {nome: 'Outra clínica', f: 196, resposta: 'Oi! Tenho sexta às 10h. Posso marcar?', chip: 'Marcado em outra clínica'},
    poses: [
      {f: 0, v: 'digitandoCelular'},
      {f: 40, v: 'olhandoCelular'},
      {f: 180, v: 'digitandoCelular'},
    ],
    expressoes: [
      {f: 0, v: 'neutra'},
      {f: 70, v: 'focada'},
      {f: 124, v: 'desapontada'},
      {f: 182, v: 'determinada'},
    ],
  },

  // 30–40 s · A virada: Carla configura o atendimento automático
  cena4: {
    relogio: '10:12',
    legenda: {linhas: ['Até que ela colocou', 'um atendimento que', 'responde a qualquer hora.'], inicio: 20, fim: 288},
    tela: {
      titulo: 'Atendimento automático',
      f: 40,
      passos: [
        {texto: 'Horários da clínica', f: 70},
        {texto: 'Serviços e valores', f: 100},
        {texto: 'Agenda conectada', f: 130},
      ],
      chave: 'Responder clientes',
      liga: 175,
    },
    poses: [
      {f: 0, v: 'digitandoNotebook'},
      {f: 190, v: 'recostada'},
    ],
    expressoes: [
      {f: 0, v: 'determinada'},
      {f: 70, v: 'focada'},
      {f: 182, v: 'feliz'},
      {f: 240, v: 'aliviada'},
    ],
  },

  // 40–52 s · Funcionando: 23h47, resposta na hora, agendada
  cena5: {
    relogio: '23:47',
    legenda: {linhas: ['23h47. Respondida na hora.', 'Agendada.'], inicio: 250, fim: 350},
    mensagens: [
      {de: 'cliente', texto: 'Oi! Tem horário pra limpeza de pele essa semana?', hora: '23:47', f: 30},
      {
        de: 'clinica',
        texto: 'Oi, Bia! Tenho quinta às 15h ou sexta às 10h. Qual prefere?',
        hora: '23:47',
        f: 66,
        automatica: true,
        botoes: ['Qui 15h', 'Sex 10h'],
      },
      {de: 'cliente', texto: 'Qui 15h', hora: '23:48', f: 156},
      {de: 'clinica', texto: 'Prontinho! Quinta, 15h. Te espero!', hora: '23:48', f: 186, automatica: true},
    ],
    digitando: [
      {de: 44, ate: 66},
      {de: 166, ate: 186},
    ],
    botaoEscolhido: {texto: 'Qui 15h', f: 140},
    chip: {texto: 'Agendado ✓', f: 208},
    poses: [
      {f: 0, v: 'digitandoCelular'},
      {f: 50, v: 'olhandoCelular'},
      {f: 130, v: 'digitandoCelular'},
      {f: 230, v: 'celularNoPeito'},
    ],
    expressoes: [
      {f: 0, v: 'cansada'},
      {f: 70, v: 'chocada'},
      {f: 96, v: 'feliz'},
      {f: 214, v: 'comemorando'},
      {f: 236, v: 'aliviada'},
    ],
  },

  // 52–60 s · Final: manhã, agenda cheia, chamada
  cena6: {
    relogio: '08:05',
    legenda: {linhas: ['Mais horários marcados,', 'sem virar a noite no celular.'], inicio: 16, fim: 118},
    tela: {titulo: 'Agenda de hoje', subtitulo: 'Simulação ilustrativa', f: 40, sai: 116},
    agenda: [
      {hora: '09:00', nome: 'Duda', procedimento: 'Limpeza de pele'},
      {hora: '10:30', nome: 'Rafa', procedimento: 'Botox'},
      {hora: '13:00', nome: 'Lu', procedimento: 'Peeling'},
      {hora: '15:00', nome: 'Bia', procedimento: 'Limpeza de pele'},
      {hora: '16:30', nome: 'Nanda', procedimento: 'Microagulhamento'},
    ],
    cta: {f: 132, texto: 'Comenta', destaque: 'AGENDA', complemento: 'que eu te mostro.', handle: '@viq.ai'},
    poses: [
      {f: 0, v: 'tomandoCafe'},
      {f: 34, v: 'cafeECelular'},
      {f: 132, v: 'cafeOlhaCamera'},
    ],
    expressoes: [
      {f: 0, v: 'neutra'},
      {f: 56, v: 'feliz'},
      {f: 132, v: 'feliz'},
    ],
  },
};
