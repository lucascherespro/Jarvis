import {Easing} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';

export const {fontFamily} = loadFont('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
});

export const cores = {
  navy: '#0B1530',
  navyClaro: '#16214A',
  roxo: '#7C3AED',
  roxoClaro: '#A78BFA',
  branco: '#FFFFFF',
  cinza: '#AAB4D2',
  vermelho: '#EF4444',
  verde: '#25D366',
  verdeClaro: '#78EBA0',
  // Lado A: frio e acinzentado
  aFundo: 'rgba(120,130,150,0.10)',
  aCard: 'rgba(196,202,214,0.80)',
  aTexto: '#1F2937',
  aCabecalho: '#8C94A8',
};

export const tipo = {
  titulo: {fontFamily, fontWeight: 800, fontSize: 108, letterSpacing: -2, lineHeight: 1.05},
  subtitulo: {fontFamily, fontWeight: 700, fontSize: 60, letterSpacing: -1, lineHeight: 1.12},
  card: {fontFamily, fontWeight: 500, fontSize: 34, lineHeight: 1.22},
} as const;

export const espaco = {
  margem: 70,
  raioCard: 36,
  gapCard: 16,
};

/** Curvas de easing reutilizadas */
export const curvas = {
  saida: Easing.bezier(0.16, 1, 0.3, 1),
  suave: Easing.bezier(0.45, 0, 0.55, 1),
  entrada: Easing.bezier(0.7, 0, 0.84, 0),
  mola: Easing.spring({damping: 200}),
};

export const molas = {
  slam: {damping: 12, stiffness: 180, mass: 0.9},
  queda: {damping: 13, stiffness: 160},
  suave: {damping: 200},
  pulo: {damping: 9, stiffness: 220},
};

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
