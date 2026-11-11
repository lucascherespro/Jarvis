// =====================================================================
//  ROTEIRO "UM DIA NA VIDA DA DRA. CAMILA"
//  Tudo aqui também aparece no painel "Props" do Remotion Studio.
//  Tempos em FRAMES (30 fps: 30 frames = 1 s). Os frames de cada cena
//  começam do zero no início da cena.
//  Expressões: neutra, focada, preocupada, estressada, cansada, chocada,
//              aliviada, feliz, dormindo, comemorando
//  Poses: emPe, atendendo, atendendoOlhaCelular, atendendoOlhaCamera,
//         olhandoCelular, sentadaSofa, sofaCelular, cochilando,
//         cochilandoSemCelular, deitadaDormindo, tomandoCafe, cafeECelular,
//         comemorando, apontando
//  A Dra. Camila, pacientes, clientes e números são FICTÍCIOS.
// =====================================================================
import type {Roteiro} from './schema';

export const roteiroPadrao: Roteiro = {
  logoFile: '',
  mostrarZonaSegura: false,
  selo: 'PERSONAGEM FICTÍCIA · SIMULAÇÃO',
  tempos: {
    gancho: 75,
    cena1: 180,
    cena2: 165,
    cena3: 150,
    rebobinar: 60,
    cena4: 180,
    cena5: 165,
    cena6: 195,
    comparacao: 120,
    final: 150,
    transicao: 12,
  },
  gancho: {
    titulo: 'Essa é você?',
    subtitulo: '(manda pra uma amiga que é)',
    notificacoes: [
      {nome: 'Ju', texto: 'quanto é o botox?', f: 6},
      {nome: 'Paty', texto: 'tem horário hoje??', f: 15},
      {nome: 'Bia', texto: 'oi', f: 24},
      {nome: 'Carla', texto: 'vocês atendem sábado?', f: 33},
      {nome: 'Renata', texto: 'oiii, alguém aí?', f: 42},
    ],
    expressoes: [{f: 0, v: 'estressada'}],
    poses: [{f: 0, v: 'olhandoCelular'}],
  },
  cena1: {
    relogio: '14:10',
    legenda: {linhas: ['14h. No meio de um procedimento.'], inicio: 14, fim: 172},
    vibracoes: [20, 45, 70, 95, 120, 145],
    mensagens: [
      {texto: 'quanto é o botox?', f: 22},
      {texto: 'tem horário hoje??', f: 47},
      {texto: 'oi', f: 72},
    ],
    pensamento: {texto: 'Depois eu respondo…', inicio: 98, fim: 150},
    expressoes: [
      {f: 0, v: 'focada'},
      {f: 80, v: 'preocupada'},
      {f: 140, v: 'focada'},
    ],
    poses: [
      {f: 0, v: 'atendendo'},
      {f: 78, v: 'atendendoOlhaCelular'},
      {f: 136, v: 'atendendo'},
    ],
  },
  cena2: {
    relogio: '22:47',
    legenda: {linhas: ['22h47. Tentando responder…'], inicio: 14, fim: 160},
    vibracoes: [18, 40],
    pegaCelular: 50,
    mensagem: {texto: 'vocês atendem sábado?', f: 60},
    rascunho: {texto: 'Atendemos s', inicio: 82, fim: 112},
    celularEscorrega: 132,
    expressoes: [
      {f: 0, v: 'cansada'},
      {f: 116, v: 'dormindo'},
    ],
    poses: [
      {f: 0, v: 'sentadaSofa'},
      {f: 50, v: 'sofaCelular'},
      {f: 114, v: 'cochilando'},
      {f: 132, v: 'cochilandoSemCelular'},
    ],
  },
  cena3: {
    relogio: '08:03',
    legenda: {linhas: ['E lá se foi a cliente.'], inicio: 82, fim: 146},
    vibracao: 28,
    mensagem: {texto: 'ah, já marquei em outra clínica, obg', f: 34},
    choque: 52,
    contador: {texto: '3 clientes perdidas', f: 64},
    expressoes: [
      {f: 0, v: 'neutra'},
      {f: 52, v: 'chocada'},
    ],
    poses: [
      {f: 0, v: 'tomandoCafe'},
      {f: 16, v: 'cafeECelular'},
    ],
  },
  rebobinar: {linha1: 'Agora, o mesmo dia…', linha2: 'com a VIQ.'},
  cena4: {
    relogio: '14:10',
    legenda: {linhas: ['A VIQ responde por ela.'], inicio: 14, fim: 176},
    mensagens: [
      {nome: 'Ju', texto: 'quanto é o botox?', resposta: 'Oi, Ju! O botox fica a partir de R$ 900. Quer que eu veja um horário?', chip: 'Agendado ✓', f: 16},
      {nome: 'Paty', texto: 'tem horário hoje??', resposta: 'Oi, Paty! Tenho hoje às 17h ou amanhã às 10h. Qual prefere?', chip: 'Agendado ✓', f: 70},
      {nome: 'Bia', texto: 'oi', resposta: 'Oi, Bia! Posso te mandar os procedimentos e os horários livres?', chip: 'Respondido ✓', f: 124},
    ],
    piscadinha: 140,
    expressoes: [
      {f: 0, v: 'focada'},
      {f: 96, v: 'aliviada'},
    ],
    poses: [
      {f: 0, v: 'atendendo'},
      {f: 126, v: 'atendendoOlhaCamera'},
      {f: 164, v: 'atendendo'},
    ],
  },
  cena5: {
    relogio: '22:47',
    legenda: {linhas: ['Enquanto ela dorme,', 'a agenda enche.'], inicio: 14, fim: 160},
    avisos: [
      {texto: 'respondido em 3 s', chip: 'Agendado · Sáb 10:00', f: 26},
      {texto: 'respondido em 3 s', chip: 'Agendado · Sáb 11:30', f: 74},
      {texto: 'respondido em 3 s', chip: 'Agendado · Seg 14:00', f: 120},
    ],
  },
  cena6: {
    relogio: '08:03',
    legenda: {linhas: ['Bom dia, agenda cheia.'], inicio: 14, fim: 190},
    tela: {titulo: 'Bom dia! ☀️', subtitulo: '4 novos agendamentos', f: 30, sai: 112},
    agendamentos: [
      {nome: 'Ju', procedimento: 'Botox', quando: 'Sáb 10:00', cor: '#F472B6'},
      {nome: 'Paty', procedimento: 'Limpeza de pele', quando: 'Sáb 11:30', cor: '#60A5FA'},
      {nome: 'Bia', procedimento: 'Preenchimento', quando: 'Seg 14:00', cor: '#F59E0B'},
      {nome: 'Carla', procedimento: 'Avaliação', quando: 'Ter 09:30', cor: '#34D399'},
    ],
    selo: '4 novos agendamentos',
    confete: 118,
    expressoes: [
      {f: 0, v: 'neutra'},
      {f: 62, v: 'feliz'},
      {f: 116, v: 'comemorando'},
    ],
    poses: [
      {f: 0, v: 'tomandoCafe'},
      {f: 18, v: 'cafeECelular'},
      {f: 116, v: 'comemorando'},
    ],
  },
  comparacao: {
    rotuloA: 'SEM VIQ',
    rotuloB: 'COM VIQ',
    resultadoA: '3 clientes perdidas',
    resultadoB: '4 agendamentos',
    legenda: {linhas: ['Mesma clínica. Mesmo dia.', 'Outro resultado.'], inicio: 16, fim: 118},
  },
  final: {
    pergunta: 'Quer viver o segundo dia?',
    cta: 'Comenta',
    ctaDestaque: 'QUERO',
    handle: '@viq.ai',
  },
};
