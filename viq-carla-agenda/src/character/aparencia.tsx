import React, {createContext, useContext} from 'react';

export type Paleta = {
  base: string;
  sombra: string;
  bochecha: string;
  cabelo: string;
  cabeloBrilho: string;
  /** cor da roupa (jaleco ou pijama) e das mangas */
  jaleco: string;
  jalecoSombra: string;
  blusa: string;
  bolso: string;
  labio: string;
  olho: string;
};

export type Aparencia = {
  nome: string;
  paleta: Paleta;
  cabelo: 'ondulado' | 'cacheado' | 'coque';
  roupa: 'jaleco' | 'pijama';
};

/** Carla: brasileira, 30 e poucos, cabelo longo escuro e ondulado, jaleco branco (personagem fictícia) */
export const CARLA: Aparencia = {
  nome: 'carla',
  cabelo: 'ondulado',
  roupa: 'jaleco',
  paleta: {
    base: '#D6A07A',
    sombra: '#BA845F',
    bochecha: '#E0897A',
    cabelo: '#2A1912',
    cabeloBrilho: '#4B3026',
    jaleco: '#FAFAF7',
    jalecoSombra: '#E3DFD7',
    blusa: '#C9A45C',
    bolso: '#C9A45C',
    labio: '#A0494A',
    olho: '#2A1A12',
  },
};

/** Cliente (Bia, fictícia): 20 e poucos, cabelo cacheado, pijama */
export const CLIENTE: Aparencia = {
  nome: 'bia',
  cabelo: 'cacheado',
  roupa: 'pijama',
  paleta: {
    base: '#8C5B3F',
    sombra: '#734731',
    bochecha: '#B8675B',
    cabelo: '#1B110D',
    cabeloBrilho: '#3B2820',
    jaleco: '#A9B9EC',
    jalecoSombra: '#8EA2DC',
    blusa: '#8EA2DC',
    bolso: '#F4C2D7',
    labio: '#6E2F2B',
    olho: '#1A100C',
  },
};

const Ctx = createContext<Aparencia>(CARLA);
export const AparenciaProvider: React.FC<{valor: Aparencia; children: React.ReactNode}> = ({valor, children}) => <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
export const useAparencia = () => useContext(Ctx);
export const usePele = () => useContext(Ctx).paleta;
