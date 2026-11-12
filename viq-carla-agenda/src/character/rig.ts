import {spring} from 'remotion';
import {molas} from '../theme';

// ---------------------------------------------------------------- Parâmetros numéricos (tudo interpolável)
export type PoseParams = {
  oE: number; // ombro esquerdo (lado esquerdo da tela): + abre para fora/para cima, - cruza o corpo
  cE: number; // cotovelo esquerdo: - dobra para dentro
  oD: number;
  cD: number;
  maoE: number;
  maoD: number;
  cab: number; // rotação da cabeça (graus)
  incl: number; // inclinação do tronco (graus)
  olharX: number; // -1..1
  olharY: number; // -1..1
  virada: number; // rosto virado: -1 esquerda .. 1 direita
  celE: number; // celular na mão esquerda (0..1)
  aplicador: number; // aplicador na mão direita
  caneca: number; // caneca na mão direita
  apontar: number; // indicador esticado na mão direita
  corpoY: number; // afundar o corpo (cansaço)
};

export type ExprParams = {
  sobAng: number; // + = sobrancelhas preocupadas (pontas internas sobem)
  sobY: number; // - = sobem
  olho: number; // abertura 0..1.4
  curva: number; // boca: -1 triste .. 1 sorriso
  aberta: number; // 0..1
  largura: number;
  suor: number;
  zzz: number;
  bochecha: number;
};

export const POSES = {
  emPe: {oE: 6, cE: -10, oD: 6, cD: -10, maoE: 0, maoD: 0, cab: 0, incl: 0, olharX: 0, olharY: 0, virada: 0, celE: 0, aplicador: 0, caneca: 0, apontar: 0, corpoY: 0},
  atendendo: {oE: -8, cE: -70, oD: 62, cD: -48, maoE: 0, maoD: -20, cab: 7, incl: 3, olharX: 0.85, olharY: 0.55, virada: 0.55, celE: 0, aplicador: 1, caneca: 0, apontar: 0, corpoY: 0},
  olhandoCelular: {oE: -22, cE: -122, oD: 4, cD: -14, maoE: 10, maoD: 0, cab: 6, incl: 1, olharX: 0.2, olharY: 0.75, virada: 0.1, celE: 1, aplicador: 0, caneca: 0, apontar: 0, corpoY: 0},
  atendendoOlhaCelular: {oE: -8, cE: -70, oD: 58, cD: -44, maoE: 0, maoD: -20, cab: -5, incl: 2, olharX: 1, olharY: -0.4, virada: 0.75, celE: 0, aplicador: 1, caneca: 0, apontar: 0, corpoY: 0},
  atendendoOlhaCamera: {oE: -8, cE: -70, oD: 60, cD: -46, maoE: 0, maoD: -20, cab: -3, incl: 1, olharX: 0, olharY: 0, virada: 0.05, celE: 0, aplicador: 1, caneca: 0, apontar: 0, corpoY: 0},
  sentadaSofa: {oE: 24, cE: -38, oD: 10, cD: -62, maoE: 0, maoD: 0, cab: -4, incl: -5, olharX: 0, olharY: 0.1, virada: 0, celE: 0, aplicador: 0, caneca: 0, apontar: 0, corpoY: 26},
  sofaCelular: {oE: -16, cE: -104, oD: 10, cD: -62, maoE: 6, maoD: 0, cab: 8, incl: -4, olharX: 0.1, olharY: 0.8, virada: 0.05, celE: 1, aplicador: 0, caneca: 0, apontar: 0, corpoY: 30},
  cochilando: {oE: -6, cE: -58, oD: 10, cD: -62, maoE: 30, maoD: 0, cab: 18, incl: -7, olharX: 0, olharY: 0.4, virada: 0.15, celE: 1, aplicador: 0, caneca: 0, apontar: 0, corpoY: 40},
  cochilandoSemCelular: {oE: -2, cE: -40, oD: 10, cD: -62, maoE: 40, maoD: 0, cab: 20, incl: -8, olharX: 0, olharY: 0.4, virada: 0.15, celE: 0, aplicador: 0, caneca: 0, apontar: 0, corpoY: 44},
  deitadaDormindo: {oE: -18, cE: -100, oD: 4, cD: -96, maoE: 0, maoD: 0, cab: 6, incl: 0, olharX: 0, olharY: 0, virada: 0.1, celE: 0, aplicador: 0, caneca: 0, apontar: 0, corpoY: 0},
  tomandoCafe: {oE: 6, cE: -10, oD: -14, cD: -122, maoE: 0, maoD: 4, cab: 0, incl: 0, olharX: 0, olharY: 0.1, virada: 0, celE: 0, aplicador: 0, caneca: 1, apontar: 0, corpoY: 0},
  cafeECelular: {oE: -22, cE: -118, oD: -14, cD: -116, maoE: 10, maoD: 4, cab: 6, incl: 0, olharX: 0.15, olharY: 0.7, virada: 0.05, celE: 1, aplicador: 0, caneca: 1, apontar: 0, corpoY: 0},
  comemorando: {oE: -10, cE: -112, oD: 152, cD: -22, maoE: 10, maoD: 0, cab: -6, incl: -3, olharX: 0, olharY: -0.2, virada: 0, celE: 1, aplicador: 0, caneca: 0, apontar: 0, corpoY: -10},
  largaCelular: {oE: 24, cE: -36, oD: 6, cD: -12, maoE: 0, maoD: 0, cab: 9, incl: 2, olharX: 0.3, olharY: 0.7, virada: 0.1, celE: 0, aplicador: 0, caneca: 0, apontar: 0, corpoY: 6},
  maoNaTesta: {oE: 8, cE: -14, oD: 140, cD: 108, maoE: 0, maoD: -20, cab: 10, incl: 2, olharX: 0, olharY: 0.5, virada: 0.05, celE: 0, aplicador: 0, caneca: 0, apontar: 0, corpoY: 8},
  digitandoNotebook: {oE: -14, cE: -66, oD: -14, cD: -66, maoE: 0, maoD: 0, cab: 6, incl: 2, olharX: 0.2, olharY: 0.6, virada: 0.1, celE: 0, aplicador: 0, caneca: 0, apontar: 0, corpoY: 0},
  recostada: {oE: 10, cE: -22, oD: 10, cD: -22, maoE: 0, maoD: 0, cab: -4, incl: -5, olharX: 0, olharY: 0, virada: 0, celE: 0, aplicador: 0, caneca: 0, apontar: 0, corpoY: 4},
  cafeOlhaCamera: {oE: -22, cE: -112, oD: -14, cD: -116, maoE: 10, maoD: 4, cab: -2, incl: 0, olharX: 0, olharY: 0, virada: 0, celE: 1, aplicador: 0, caneca: 1, apontar: 0, corpoY: 0},
  digitandoCelular: {oE: -22, cE: -122, oD: -24, cD: -118, maoE: 10, maoD: -10, cab: 7, incl: 1, olharX: 0.15, olharY: 0.8, virada: 0.05, celE: 1, aplicador: 0, caneca: 0, apontar: 0, corpoY: 0},
  celularNoPeito: {oE: -4, cE: -96, oD: 6, cD: -16, maoE: 20, maoD: 0, cab: -8, incl: -5, olharX: 0, olharY: -0.3, virada: 0, celE: 1, aplicador: 0, caneca: 0, apontar: 0, corpoY: 10},
  apontando: {oE: 6, cE: -14, oD: 118, cD: 4, maoD: -8, maoE: 0, cab: -5, incl: -2, olharX: 0.7, olharY: -0.3, virada: 0.35, celE: 0, aplicador: 0, caneca: 0, apontar: 1, corpoY: 0},
} satisfies Record<string, PoseParams>;

export const EXPRESSOES = {
  neutra: {sobAng: 0, sobY: 0, olho: 1, curva: 0.25, aberta: 0, largura: 1, suor: 0, zzz: 0, bochecha: 0.2},
  focada: {sobAng: -9, sobY: 5, olho: 0.78, curva: 0, aberta: 0, largura: 0.8, suor: 0, zzz: 0, bochecha: 0.1},
  preocupada: {sobAng: 15, sobY: -4, olho: 1, curva: -0.45, aberta: 0.06, largura: 0.9, suor: 0, zzz: 0, bochecha: 0.1},
  estressada: {sobAng: 21, sobY: -2, olho: 1.08, curva: -0.75, aberta: 0.28, largura: 1.1, suor: 1, zzz: 0, bochecha: 0},
  cansada: {sobAng: 10, sobY: 2, olho: 0.42, curva: -0.15, aberta: 0, largura: 0.9, suor: 0, zzz: 0, bochecha: 0},
  chocada: {sobAng: 6, sobY: -17, olho: 1.4, curva: 0, aberta: 1, largura: 0.7, suor: 0.6, zzz: 0, bochecha: 0},
  aliviada: {sobAng: 7, sobY: -4, olho: 0.5, curva: 0.75, aberta: 0, largura: 1.1, suor: 0, zzz: 0, bochecha: 0.5},
  feliz: {sobAng: 0, sobY: -8, olho: 0.95, curva: 1, aberta: 0.45, largura: 1.2, suor: 0, zzz: 0, bochecha: 0.8},
  dormindo: {sobAng: 2, sobY: 3, olho: 0, curva: 0.2, aberta: 0, largura: 0.85, suor: 0, zzz: 1, bochecha: 0.3},
  determinada: {sobAng: -6, sobY: 2, olho: 0.9, curva: 0.35, aberta: 0, largura: 0.95, suor: 0, zzz: 0, bochecha: 0.3},
  desapontada: {sobAng: 12, sobY: 0, olho: 0.72, curva: -0.6, aberta: 0, largura: 0.85, suor: 0, zzz: 0, bochecha: 0},
  suspiro: {sobAng: 9, sobY: 0, olho: 0.22, curva: -0.2, aberta: 0.35, largura: 0.7, suor: 0, zzz: 0, bochecha: 0},
  comemorando: {sobAng: 0, sobY: -12, olho: 0.55, curva: 1, aberta: 0.85, largura: 1.3, suor: 0, zzz: 0, bochecha: 1},
} satisfies Record<string, ExprParams>;

export type NomePose = keyof typeof POSES;
export type NomeExpressao = keyof typeof EXPRESSOES;

export type Chave<N extends string> = {f: number; v: N};

const lerpObj = <T extends Record<string, number>>(a: T, b: T, t: number): T => {
  const out = {} as Record<string, number>;
  for (const k of Object.keys(b)) out[k] = a[k] + (b[k] - a[k]) * t;
  return out as T;
};

/**
 * Mistura chaves com spring. Cada transição parte do valor exato em que a anterior estava
 * (sem "pulos" mesmo que uma nova chave chegue antes da anterior terminar).
 */
export const misturar = <N extends string, T extends Record<string, number>>(
  chaves: Chave<N>[],
  tabela: Record<N, T>,
  frame: number,
  fps: number,
): T => {
  const ordenadas = [...chaves].sort((a, b) => a.f - b.f);
  const valorEm = (i: number, f: number): T => {
    if (i <= 0) return tabela[ordenadas[0].v];
    const inicio = valorEm(i - 1, ordenadas[i].f);
    const t = spring({frame: f - ordenadas[i].f, fps, config: molas.personagem});
    return lerpObj(inicio, tabela[ordenadas[i].v], t);
  };
  let idx = 0;
  for (let i = 0; i < ordenadas.length; i++) if (ordenadas[i].f <= frame) idx = i;
  return valorEm(idx, frame);
};

/** Piscadas automáticas a cada 2,5–4 s, com intervalos variados e determinísticos */
export const aberturaPiscada = (frameBruto: number, semente: string, fps: number) => {
  // ciclo de 20 s: funciona também com frames negativos (personagem reaproveitada no loop)
  const ciclo = fps * 20;
  const frame = ((frameBruto % ciclo) + ciclo) % ciclo;
  let t = Math.round(fps * 1.2);
  let k = 0;
  while (t <= frame + 8 && t < ciclo - 10) {
    const d = frame - t;
    if (d >= 0 && d < 7) return [1, 0.45, 0, 0, 0.35, 0.8, 1][d];
    const r = Math.abs(Math.sin((k + 1) * 12.9898 + semente.length * 78.233) * 43758.5453) % 1;
    t += Math.round(fps * (2.5 + r * 1.5));
    k++;
  }
  return 1;
};
