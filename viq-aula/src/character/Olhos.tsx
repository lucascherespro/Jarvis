import React from 'react';
import {usePele} from './aparencia';

const Olho: React.FC<{cx: number; cy: number; abertura: number; px: number; py: number; escalaX: number}> = ({cx, cy, abertura, px, py, escalaX}) => {
  const pele = usePele();
  const h = 24 * abertura;
  if (h < 3.5) {
    // fechado: arco suave
    return <path d={`M${cx - 13 * escalaX} ${cy} Q${cx} ${cy + 8} ${cx + 13 * escalaX} ${cy}`} stroke={pele.olho} strokeWidth={5} fill="none" strokeLinecap="round" />;
  }
  return (
    <g>
      <ellipse cx={cx + px} cy={cy + py} rx={11 * escalaX} ry={h / 2} fill={pele.olho} />
      <circle cx={cx + px + 3.5 * escalaX} cy={cy + py - h * 0.18} r={Math.min(3.6, h / 6)} fill="white" />
    </g>
  );
};

export const Olhos: React.FC<{virada: number; abertura: number; aberturaDireita?: number; olharX: number; olharY: number}> = ({
  virada,
  abertura,
  aberturaDireita,
  olharX,
  olharY,
}) => {
  const dx = virada * 22;
  const px = olharX * 5;
  const py = olharY * 4;
  return (
    <g transform={`translate(${dx} 0)`}>
      <Olho cx={217} cy={186} abertura={abertura} px={px} py={py} escalaX={1 - Math.max(0, virada) * 0.28} />
      <Olho cx={283} cy={186} abertura={aberturaDireita ?? abertura} px={px} py={py} escalaX={1 - Math.max(0, -virada) * 0.28} />
    </g>
  );
};
