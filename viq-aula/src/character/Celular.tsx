import React from 'react';
import {cores} from '../theme';

/**
 * Celular genérico (sem marca). `brilho` acende a tela (0..1); `vibra` (0..1) faz tremer.
 * Coordenadas locais: retângulo centrado em (0,0).
 */
export const Celular: React.FC<{largura?: number; brilho?: number; vibra?: number; frame?: number; children?: React.ReactNode}> = ({
  largura = 54,
  brilho = 0.3,
  vibra = 0,
  frame = 0,
  children,
}) => {
  const h = largura * 1.95;
  const tremor = vibra > 0 ? Math.sin(frame * 2.7) * 4 * vibra : 0;
  return (
    <g transform={`translate(${tremor} 0) rotate(${tremor * 0.8})`}>
      <rect x={-largura / 2} y={-h / 2} width={largura} height={h} rx={largura * 0.16} fill="#141827" />
      <rect
        x={-largura / 2 + 4}
        y={-h / 2 + 4}
        width={largura - 8}
        height={h - 8}
        rx={largura * 0.12}
        fill={brilho > 0.05 ? `rgba(167,139,250,${0.25 + brilho * 0.6})` : '#1E2338'}
      />
      {brilho > 0.05 ? <rect x={-largura / 2 + 4} y={-h / 2 + 4} width={largura - 8} height={h - 8} rx={largura * 0.12} fill="white" opacity={brilho * 0.35} /> : null}
      <rect x={-largura * 0.15} y={-h / 2 + 7} width={largura * 0.3} height={4} rx={2} fill="#0B0E18" />
      {children}
      {vibra > 0.05 ? (
        <g stroke={cores.roxoClaro} strokeWidth={3} fill="none" strokeLinecap="round" opacity={vibra}>
          <path d={`M${-largura / 2 - 10} ${-h * 0.18} q-8 ${h * 0.18} 0 ${h * 0.36}`} />
          <path d={`M${-largura / 2 - 20} ${-h * 0.26} q-10 ${h * 0.26} 0 ${h * 0.52}`} />
          <path d={`M${largura / 2 + 10} ${-h * 0.18} q8 ${h * 0.18} 0 ${h * 0.36}`} />
          <path d={`M${largura / 2 + 20} ${-h * 0.26} q10 ${h * 0.26} 0 ${h * 0.52}`} />
        </g>
      ) : null}
    </g>
  );
};
