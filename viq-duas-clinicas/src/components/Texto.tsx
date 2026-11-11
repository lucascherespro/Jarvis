import React from 'react';
import {interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, fontFamily} from '../theme';

/** Linha que entra subindo com spring */
export const Linha: React.FC<{
  atraso: number;
  tamanho: number;
  peso?: number;
  cor?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({atraso, tamanho, peso = 800, cor = 'white', children, style}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - atraso, fps, config: {damping: 15, stiffness: 140}});
  return (
    <div
      style={{
        fontFamily,
        fontSize: tamanho,
        fontWeight: peso,
        color: cor,
        textAlign: 'center',
        lineHeight: 1.1,
        letterSpacing: tamanho > 70 ? -1.5 : -0.5,
        textWrap: 'balance',
        textShadow: '0 6px 30px rgba(0,0,0,0.45)',
        opacity: interpolate(s, [0, 0.45], [0, 1], clamp),
        translate: `0px ${interpolate(s, [0, 1], [46, 0])}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Destaca uma palavra dentro da frase */
export const ComDestaque: React.FC<{texto: string; destaque: string; cor: string}> = ({texto, destaque, cor}) => {
  const i = destaque ? texto.indexOf(destaque) : -1;
  if (i < 0) return <>{texto}</>;
  return (
    <>
      {texto.slice(0, i)}
      <span style={{color: cor}}>{destaque}</span>
      {texto.slice(i + destaque.length)}
    </>
  );
};

/** Estado do "slam": escala 1.4 -> 1.0, tremida de 4 px e flash */
export const slamEstado = (frame: number, atraso: number, fps: number) => {
  const local = frame - atraso;
  const s = local < 0 ? 0 : spring({frame: local, fps, config: {damping: 12, stiffness: 190, mass: 0.85}});
  const tremida = interpolate(local, [3, 5, 12], [0, 1, 0], clamp);
  return {
    visivel: local >= 0,
    escala: interpolate(s, [0, 1], [1.4, 1]),
    dx: (random(`tx${atraso}-${frame}`) - 0.5) * 8 * tremida,
    dy: (random(`ty${atraso}-${frame}`) - 0.5) * 8 * tremida,
    flash: local === 3 || local === 4 ? 0.28 : 0,
  };
};
