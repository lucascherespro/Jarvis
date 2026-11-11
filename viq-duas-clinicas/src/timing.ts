import type {Roteiro} from './data/schema';

export const NOITE_MIN = 660; // 21:00 -> 08:00

/** "21:36" -> minutos desde 21:00 */
export const minutosDesde21 = (hora: string) => {
  const [h, m] = hora.split(':').map(Number);
  const total = h * 60 + m;
  return (total - 21 * 60 + 24 * 60) % (24 * 60);
};

export const formatarHora = (min: number) => {
  const total = (21 * 60 + Math.floor(min)) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
};

/** Início (frame global) de cada cena, já descontando as transições */
export const iniciosDasCenas = (t: Roteiro['tempos']) => {
  const gancho = 0;
  const mapa = gancho + t.gancho - t.transicaoGanchoMapa;
  const noite = mapa + t.mapa - t.transicaoMapaNoite;
  const relatorio = noite + t.noite - t.transicaoNoiteRelatorio;
  const virada = relatorio + t.relatorio - t.transicaoRelatorioVirada;
  const final = virada + t.virada - t.transicaoViradaFinal;
  const total = final + t.final;
  return {gancho, mapa, noite, relatorio, virada, final, total};
};

export const minutoNoFrame = (g: number, t: Roteiro['tempos']) => {
  if (g <= t.relogioInicio) return 0;
  if (g >= t.relogioFim) return NOITE_MIN;
  return ((g - t.relogioInicio) / (t.relogioFim - t.relogioInicio)) * NOITE_MIN;
};

export const frameDaHora = (hora: string, t: Roteiro['tempos']) =>
  Math.round(t.relogioInicio + (minutosDesde21(hora) / NOITE_MIN) * (t.relogioFim - t.relogioInicio));

/** Frames em que cada evento do painel B acontece para uma cliente */
export const DIGITANDO_INICIO = 6;
export const DIGITANDO_DURACAO = 15;
export const CHIP_ATRASO = 14;

export const eventosB = (chegada: number) => {
  const digitando = chegada + DIGITANDO_INICIO;
  const resposta = digitando + DIGITANDO_DURACAO;
  const chip = resposta + CHIP_ATRASO;
  return {chegada, digitando, resposta, chip};
};
