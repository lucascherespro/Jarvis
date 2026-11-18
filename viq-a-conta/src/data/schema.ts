import {z} from 'zod';

const legenda = z.object({linhas: z.array(z.string()), inicio: z.number(), fim: z.number()});

export const roteiroSchema = z.object({
  logoFile: z.string().describe('Arquivo do logo em public/ (ex.: LOGOTIPO.png). Vazio = wordmark VIQ'),
  mostrarZonaSegura: z.boolean(),
  selo: z.string(),
  tempos: z.object({gancho: z.number(), cliente: z.number(), cupom: z.number(), virada: z.number(), cta: z.number(), transicao: z.number()}),
  gancho: z.object({linha1: z.string(), linha2: z.string(), chip: z.string()}),
  cliente: z.object({
    nome: z.string(),
    mensagem: z.string(),
    visto: z.string(),
    semResposta: z.string(),
    perdida: z.string(),
    legenda,
  }),
  cupom: z.object({
    titulo: z.string(),
    aviso: z.string(),
    clientesPorSemana: z.number(),
    valorProcedimento: z.number(),
    semanasNoMes: z.number(),
    rotulos: z.object({clientes: z.string(), valor: z.string(), semanas: z.string(), mes: z.string(), ano: z.string()}),
    linhas: z.array(z.number()).describe('frames em que cada linha é impressa'),
    mes: z.number(),
    ano: z.number(),
    rodape: z.string(),
  }),
  virada: z.object({
    titulo1: z.string(),
    titulo2: z.string(),
    clinica: z.string(),
    mensagem: z.string(),
    resposta: z.string(),
    botoes: z.array(z.string()),
    hora: z.string(),
    chip: z.string(),
  }),
  cta: z.object({texto: z.string(), destaque: z.string(), linha1: z.string(), linha2: z.string(), apoio: z.string(), handle: z.string()}),
});

export type Roteiro = z.infer<typeof roteiroSchema>;
