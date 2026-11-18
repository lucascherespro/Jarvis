import {Easing} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';

export const {fontFamily} = loadFont('normal', {
  weights: ['500', '600', '700', '800'],
  subsets: ['latin'],
});

export const cores = {
  navy: '#0B1530',
  roxo: '#7C3AED',
  roxoClaro: '#A78BFA',
  branco: '#FFFFFF',
  cinza: '#AAB4D2',
  vermelho: '#EF4444',
  verde: '#25D366',
  verdeClaro: '#78EBA0',
  dourado: '#E5B54A',
};

/** Paleta da personagem */
export const pele = {
  base: '#C68863',
  sombra: '#A96E4E',
  bochecha: '#D9766A',
  cabelo: '#3A2218',
  cabeloBrilho: '#5A372A',
  jaleco: '#F8F8FB',
  jalecoSombra: '#DADCE8',
  blusa: '#3B2A63',
  labio: '#8E3F36',
  olho: '#2A1A12',
};

export const espaco = {margem: 70};

export const curvas = {
  saida: Easing.bezier(0.16, 1, 0.3, 1),
  suave: Easing.bezier(0.45, 0, 0.55, 1),
  entrada: Easing.bezier(0.7, 0, 0.84, 0),
};

export const molas = {
  personagem: {damping: 15, stiffness: 110, mass: 0.9},
  slam: {damping: 12, stiffness: 190, mass: 0.85},
  pop: {damping: 10, stiffness: 200},
  suave: {damping: 200},
};

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** Filtro de cor por ato: Ato 1 frio/dessaturado, Ato 2 quente/vivo */
export const filtroAto = (ato: 1 | 2) =>
  ato === 1 ? 'saturate(0.72) hue-rotate(-8deg) brightness(0.96)' : 'saturate(1.12) brightness(1.03)';
