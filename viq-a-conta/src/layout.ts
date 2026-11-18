import {useVideoConfig} from 'remotion';

/**
 * Todas as cenas são desenhadas num "palco" de 1080x1920.
 * No 4:5 (1080x1350) o palco é deslocado para cima: a área segura do 9:16 (288–1344) cabe inteira.
 */
export const PALCO_W = 1080;
export const PALCO_H = 1920;
export const SAFE_TOP = PALCO_H * 0.15; // 288
export const SAFE_BOTTOM = PALCO_H * 0.7; // 1344

export const useFormato = () => {
  const {height} = useVideoConfig();
  const vertical = height > 1600;
  return {vertical, deslocamentoY: vertical ? 0 : 255, H: height};
};
