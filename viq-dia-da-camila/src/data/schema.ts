import {z} from 'zod';

const nomesPose = ['emPe', 'atendendo', 'atendendoOlhaCelular', 'atendendoOlhaCamera', 'olhandoCelular', 'sentadaSofa', 'sofaCelular', 'cochilando', 'cochilandoSemCelular', 'deitadaDormindo', 'tomandoCafe', 'cafeECelular', 'comemorando', 'apontando'] as const;
const nomesExpressao = ['neutra', 'focada', 'preocupada', 'estressada', 'cansada', 'chocada', 'aliviada', 'feliz', 'dormindo', 'comemorando'] as const;

export const zPose = z.enum(nomesPose);
export const zExpressao = z.enum(nomesExpressao);

const chavesPose = z.array(z.object({f: z.number().describe('frame da cena'), v: zPose}));
const chavesExpressao = z.array(z.object({f: z.number().describe('frame da cena'), v: zExpressao}));
const legenda = z.object({linhas: z.array(z.string()), inicio: z.number(), fim: z.number()});

export const roteiroSchema = z.object({
  logoFile: z.string().describe('Arquivo do logo em public/ (ex.: LOGOTIPO.png). Vazio = wordmark VIQ'),
  mostrarZonaSegura: z.boolean(),
  selo: z.string(),
  tempos: z.object({
    gancho: z.number(),
    cena1: z.number(),
    cena2: z.number(),
    cena3: z.number(),
    rebobinar: z.number(),
    cena4: z.number(),
    cena5: z.number(),
    cena6: z.number(),
    comparacao: z.number(),
    final: z.number(),
    transicao: z.number(),
  }),
  gancho: z.object({
    titulo: z.string(),
    subtitulo: z.string(),
    notificacoes: z.array(z.object({nome: z.string(), texto: z.string(), f: z.number()})),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  cena1: z.object({
    relogio: z.string(),
    legenda,
    vibracoes: z.array(z.number()),
    mensagens: z.array(z.object({texto: z.string(), f: z.number()})),
    pensamento: z.object({texto: z.string(), inicio: z.number(), fim: z.number()}),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  cena2: z.object({
    relogio: z.string(),
    legenda,
    vibracoes: z.array(z.number()),
    pegaCelular: z.number(),
    mensagem: z.object({texto: z.string(), f: z.number()}),
    rascunho: z.object({texto: z.string(), inicio: z.number(), fim: z.number()}),
    celularEscorrega: z.number(),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  cena3: z.object({
    relogio: z.string(),
    legenda,
    vibracao: z.number(),
    mensagem: z.object({texto: z.string(), f: z.number()}),
    choque: z.number(),
    contador: z.object({texto: z.string(), f: z.number()}),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  rebobinar: z.object({linha1: z.string(), linha2: z.string()}),
  cena4: z.object({
    relogio: z.string(),
    legenda,
    mensagens: z.array(z.object({nome: z.string(), texto: z.string(), resposta: z.string(), chip: z.string(), f: z.number()})),
    piscadinha: z.number(),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  cena5: z.object({
    relogio: z.string(),
    legenda,
    avisos: z.array(z.object({texto: z.string(), chip: z.string(), f: z.number()})),
  }),
  cena6: z.object({
    relogio: z.string(),
    legenda,
    tela: z.object({titulo: z.string(), subtitulo: z.string(), f: z.number(), sai: z.number()}),
    agendamentos: z.array(z.object({nome: z.string(), procedimento: z.string(), quando: z.string(), cor: z.string()})),
    selo: z.string(),
    confete: z.number(),
    expressoes: chavesExpressao,
    poses: chavesPose,
  }),
  comparacao: z.object({
    rotuloA: z.string(),
    rotuloB: z.string(),
    resultadoA: z.string(),
    resultadoB: z.string(),
    legenda,
  }),
  final: z.object({
    pergunta: z.string(),
    cta: z.string(),
    ctaDestaque: z.string(),
    handle: z.string(),
  }),
});

export type Roteiro = z.infer<typeof roteiroSchema>;
