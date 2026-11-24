import {z} from 'zod';

const fala = z.object({texto: z.string(), inicio: z.number(), fim: z.number()});

export const roteiroSchema = z.object({
  logoFile: z.string().describe('Arquivo do logo em public/ (ex.: LOGOTIPO.png). Vazio = wordmark VIQ'),
  mostrarZonaSegura: z.boolean(),
  selo: z.string(),
  tempos: z.object({
    abertura: z.number(),
    licao1: z.number(),
    aluna1: z.number(),
    licao2: z.number(),
    aluna2: z.number(),
    licao3: z.number(),
    resumo: z.number(),
    pergunta: z.number(),
    tarefa: z.number(),
    transicao: z.number(),
  }),
  abertura: z.object({etiqueta: z.string(), aula: z.string(), titulo: z.array(z.string()), fala}),
  licao1: z.object({titulo: z.string(), eixoX: z.string(), eixoY: z.string(), rapido: z.string(), devagar: z.string(), fala}),
  aluna1: z.object({fala: z.string(), rotulo: z.string()}),
  licao2: z.object({titulo: z.string(), fechada: z.string(), aberta: z.string(), fala}),
  aluna2: z.object({fala: z.string(), rotulo: z.string()}),
  licao3: z.object({titulo: z.string(), etapas: z.array(z.object({nome: z.string(), detalhe: z.string().describe('use | para quebrar linha')})), fala}),
  resumo: z.object({titulo: z.string(), itens: z.array(z.string()), fala}),
  pergunta: z.object({fala: z.string(), rotulo: z.string()}),
  tarefa: z.object({titulo: z.string(), texto: z.string(), destaque: z.string(), complemento: z.string(), handle: z.string(), fala}),
});

export type Roteiro = z.infer<typeof roteiroSchema>;
