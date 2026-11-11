import React from 'react';
import {fontFamily} from '../theme';

export const AvatarCliente: React.FC<{
  nome: string;
  cor: string;
  tamanho?: number;
  raio?: number;
  anel?: number; // 0..1 "pop" ao chegar
  brilho?: string;
  style?: React.CSSProperties;
}> = ({nome, cor, tamanho = 64, raio, anel = 0, brilho, style}) => {
  const r = raio ?? tamanho * 0.28;
  return (
    <div style={{position: 'relative', width: tamanho, height: tamanho, flexShrink: 0, ...style}}>
      {anel > 0 && anel < 1 ? (
        <div
          style={{
            position: 'absolute',
            inset: -tamanho * 0.5 * anel,
            borderRadius: r + tamanho * 0.5 * anel,
            border: `${5 * (1 - anel)}px solid ${brilho ?? cor}`,
            opacity: 1 - anel,
          }}
        />
      ) : null}
      <div
        style={{
          width: tamanho,
          height: tamanho,
          borderRadius: r,
          background: cor,
          color: 'white',
          fontFamily,
          fontWeight: 800,
          fontSize: tamanho * 0.52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: brilho ? `0 0 ${tamanho * 0.5}px ${brilho}` : undefined,
        }}
      >
        {nome[0]}
      </div>
    </div>
  );
};
