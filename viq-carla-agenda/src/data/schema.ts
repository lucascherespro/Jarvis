import {z} from 'zod';

const nomesPose = [
  'emPe', 'olhandoCelular', 'largaCelular', 'maoNaTesta', 'digitandoNotebook', 'recostada', 'tomandoCafe', 'cafeECelular', 'cafeOlhaCamera',
  'digitandoCelular', 'celularNoPeito', 'comemorando', 'apontando', 'sofaCelular',
] as const;
const nomesExpressao = [
  'neutra', 'focada', 'preocupada', 'estressada', 'cansada', 'chocada', 'aliviada', 'feliz', 'dormindo', 'comemorando', 'determinada', 'desapontada', 'suspiro',
] as const;

export const zPose = z.enum(nomesPose);
export const zExpressao = z.enum(nomesExpressao);

const chavesPose = z.array(z.object({f: z.number().describe('frame da cena'), v: zPose}));
const chavesExpressao = z.array(z.object({f: z.number().describe('frame da cena'), v: zExpressao}));
const legenda = z.object({linhas: z.array(z.string()), inicio: z.number(), fim: z.number()});
const notificacao = z.object({nome: z.string(), texto: z.string(), f: z.number()});
const msgChat = z.object({
  de: z.enum(['cliente', 'clinica']),
  texto: z.string(),
  hora: z.string(),
  f: z.number(),
  automatica: z.boolean().optional(),
  botoes: z.array(z.string()).optional(),
});

export const roteiroSchema = z.object({
  logoFile: z.string().describe('Arquivo do logo em public/ (ex.: LOGOTIPO.png). Vazio = wordmark VIQ'),
  mostrarZonaSegura: z.boolean(),
  selo: z.string(),
  nomeClinica: z.string(),
  tempos: z.object({cena1: z.number(), cena2: z.number(), cena3: z.number(), cena4: z.number(), cena5: z.number(), cena6: z.number(), transicao: z.number()}),
  cena1: z.object({
    gancho: z.array(z.string()),
    ganchoInicio: z.number(),
    ganchoFim: z.number(),
    vibracoes: z.array(z.number()),
    largaCelular: z.number(),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  cena2: z.object({
    legenda,
    tomadas: z.array(z.object({luz: z.enum(['noite', 'manha', 'tarde']), dia: z.string(), relogio: z.string(), notificacoes: z.array(notificacao)})),
  }),
  cena3: z.object({
    relogio: z.string(),
    relogioDepois: z.string(),
    pulaRelogio: z.number(),
    legenda,
    legenda2: legenda,
    mensagem: msgChat,
    seloSemResposta: z.number(),
    outraClinica: z.object({nome: z.string(), f: z.number(), resposta: z.string(), chip: z.string()}),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  cena4: z.object({
    relogio: z.string(),
    legenda,
    tela: z.object({titulo: z.string(), f: z.number(), passos: z.array(z.object({texto: z.string(), f: z.number()})), chave: z.string(), liga: z.number()}),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  cena5: z.object({
    relogio: z.string(),
    legenda,
    mensagens: z.array(msgChat),
    digitando: z.array(z.object({de: z.number(), ate: z.number()})),
    botaoEscolhido: z.object({texto: z.string(), f: z.number()}),
    chip: z.object({texto: z.string(), f: z.number()}),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  cena6: z.object({
    relogio: z.string(),
    legenda,
    tela: z.object({titulo: z.string(), subtitulo: z.string(), f: z.number(), sai: z.number()}),
    agenda: z.array(z.object({hora: z.string(), nome: z.string(), procedimento: z.string()})),
    cta: z.object({f: z.number(), texto: z.string(), destaque: z.string(), complemento: z.string(), handle: z.string()}),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
});

export type Roteiro = z.infer<typeof roteiroSchema>;
