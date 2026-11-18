// =====================================================================
//  ROTEIRO "A CONTA QUE NINGUÉM FAZ" (25 s, 30 fps)
//  Tudo aqui também aparece no painel "Props" do Remotion Studio.
//  Tempos em FRAMES (30 frames = 1 s), contados do início de cada cena.
//  Os números do cupom são um EXEMPLO ILUSTRATIVO (troque à vontade:
//  clientesPorSemana, valorProcedimento, semanasNoMes). O total por mês
//  e por ano é calculado sozinho.
// =====================================================================
import type {Roteiro} from './schema';

export const roteiroPadrao: Roteiro = {
  logoFile: '',
  mostrarZonaSegura: false,
  selo: 'EXEMPLO ILUSTRATIVO · FAÇA COM OS SEUS NÚMEROS',
  tempos: {gancho: 90, cliente: 150, cupom: 240, virada: 135, cta: 135, transicao: 10},

  gancho: {linha1: 'Faz essa conta', linha2: 'comigo.', chip: 'leva 20 segundos'},

  cliente: {
    nome: 'Ju',
    mensagem: 'Oi! Quanto custa a limpeza de pele?',
    visto: 'Recebida às 21:14',
    semResposta: 'sem resposta',
    perdida: 'Marcou em outra clínica',
    legenda: {linhas: ['Agora imagina isso', '1 vez por semana.'], inicio: 112, fim: 150},
  },

  cupom: {
    titulo: 'A CONTA DA CLIENTE SEM RESPOSTA',
    aviso: 'exemplo ilustrativo',
    clientesPorSemana: 1,
    valorProcedimento: 250,
    semanasNoMes: 4,
    rotulos: {clientes: 'Clientes perdidas por semana', valor: 'Valor do procedimento', semanas: 'Semanas no mês', mes: 'Por mês', ano: 'Por ano'},
    linhas: [14, 40, 66],
    mes: 100,
    ano: 150,
    rodape: 'Sem contar o retorno e as indicações.',
  },

  virada: {
    titulo1: 'Agora imagina',
    titulo2: 'responder na hora.',
    clinica: 'Sua clínica',
    mensagem: 'Oi! Quanto custa a limpeza de pele?',
    resposta: 'Oi, Ju! A limpeza sai R$ 250. Tenho quinta 15h ou sexta 10h. Qual prefere?',
    botoes: ['Qui 15h', 'Sex 10h'],
    hora: '23:47',
    chip: 'Agendado ✓',
  },

  cta: {
    texto: 'Comenta',
    destaque: 'CONTA',
    linha1: 'que eu faço a conta',
    linha2: 'da sua clínica.',
    apoio: 'Com o seu valor e o seu movimento real.',
    handle: '@viq.ai',
  },
};
