import {useVideoConfig} from 'remotion';

/** Posições verticais adaptadas ao formato (9:16 ou 4:5) */
export type Layout = {
  W: number;
  H: number;
  vertical: boolean;
  safeTop: number;
  safeBottom: number;
  centroY: number;
  relogioY: number;
  cabecalhoY: number;
  valorY: number;
  feedTop: number;
  feedBottom: number;
  rodapeY: number;
  seloY: number;
};

export const layoutPara = (W: number, H: number): Layout => {
  const vertical = H / W > 1.5;
  if (vertical) {
    return {
      W,
      H,
      vertical,
      safeTop: H * 0.15,
      safeBottom: H * 0.7,
      centroY: (H * 0.15 + H * 0.7) / 2,
      relogioY: 292,
      cabecalhoY: 448,
      valorY: 498,
      feedTop: 592,
      feedBottom: 1214,
      rodapeY: 1232,
      seloY: 1352,
    };
  }
  return {
    W,
    H,
    vertical,
    safeTop: 50,
    safeBottom: H - 60,
    centroY: H / 2,
    relogioY: 40,
    cabecalhoY: 186,
    valorY: 240,
    feedTop: 326,
    feedBottom: 1130,
    rodapeY: 1146,
    seloY: 1262,
  };
};

export const useLayout = (): Layout => {
  const {width, height} = useVideoConfig();
  return layoutPara(width, height);
};
