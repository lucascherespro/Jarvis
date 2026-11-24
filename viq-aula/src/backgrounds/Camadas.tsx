import React from 'react';
import {AbsoluteFill} from 'remotion';

/**
 * Câmera com parallax: cada camada se move numa velocidade diferente.
 * pan = deslocamento horizontal da câmera (px), zoom = 1 = enquadramento normal.
 */
export const Camera: React.FC<{
  pan: number;
  panY?: number;
  zoom: number;
  fundo: React.ReactNode;
  meio: React.ReactNode;
  frente?: React.ReactNode;
  personagem?: React.ReactNode;
}> = ({pan, panY = 0, zoom, fundo, meio, frente, personagem}) => {
  const camada = (fator: number, z: number, filho: React.ReactNode) => (
    <AbsoluteFill style={{translate: `${-pan * fator}px ${-panY * fator}px`, scale: 1 + (zoom - 1) * z, transformOrigin: '50% 55%'}}>{filho}</AbsoluteFill>
  );
  return (
    <AbsoluteFill>
      {camada(0.35, 0.6, fundo)}
      {camada(0.7, 0.9, meio)}
      {personagem ? camada(0.85, 1, personagem) : null}
      {frente ? camada(1.25, 1.2, frente) : null}
    </AbsoluteFill>
  );
};
