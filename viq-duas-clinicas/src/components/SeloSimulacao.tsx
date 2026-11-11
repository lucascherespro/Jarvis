import React from 'react';
import {fontFamily} from '../theme';

export const SeloSimulacao: React.FC<{texto: string; top: number; opacity?: number; tamanho?: number}> = ({
  texto,
  top,
  opacity = 1,
  tamanho = 24,
}) => (
  <div style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity}}>
    <div
      style={{
        fontFamily,
        fontSize: tamanho,
        fontWeight: 700,
        letterSpacing: 3,
        color: 'rgba(255,255,255,0.88)',
        padding: '7px 18px',
        borderRadius: 10,
        background: 'rgba(11,21,48,0.7)',
        border: '1.5px solid rgba(255,255,255,0.3)',
      }}
    >
      {texto}
    </div>
  </div>
);
