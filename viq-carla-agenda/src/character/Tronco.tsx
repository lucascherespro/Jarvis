import React from 'react';
import {cores} from '../theme';
import {useAparencia} from './aparencia';

/** Jaleco branco com bolso dourado e blusa por baixo — ou pijama (cliente) */
export const Tronco: React.FC = () => {
  const {roupa, paleta: p} = useAparencia();
  if (roupa === 'pijama') {
    return (
      <g>
        <path d="M118 340 Q124 300 200 290 Q250 312 300 290 Q376 300 382 340 L404 760 L96 760 Z" fill={p.jaleco} />
        <path d="M300 290 Q376 300 382 340 L404 760 L330 760 Q340 520 318 300 Z" fill={p.jalecoSombra} />
        {/* gola */}
        <path d="M200 290 Q250 330 300 290 L314 312 Q250 362 186 312 Z" fill={p.jalecoSombra} />
        {/* bolinhas do pijama */}
        {[[170, 420], [230, 470], [300, 430], [180, 560], [260, 600], [330, 540], [210, 690], [300, 700]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={7} fill={p.bolso} opacity={0.9} />
        ))}
      </g>
    );
  }
  return (
    <g>
      <path d="M118 340 Q124 300 196 288 L250 336 L304 288 Q376 300 382 340 L404 760 L96 760 Z" fill={p.jaleco} />
      <path d="M304 288 Q376 300 382 340 L404 760 L330 760 Q340 520 318 300 Z" fill={p.jalecoSombra} />
      <path d="M204 292 L250 372 L296 292 Q250 306 204 292 Z" fill={p.blusa} />
      <path d="M196 288 L250 372 L226 420 L180 330 Z" fill={p.jalecoSombra} opacity={0.7} />
      <path d="M304 288 L250 372 L274 420 L320 330 Z" fill="#EEEBE4" />
      <line x1={250} y1={380} x2={250} y2={760} stroke={p.jalecoSombra} strokeWidth={4} />
      <circle cx={262} cy={470} r={6} fill={p.jalecoSombra} />
      <circle cx={262} cy={560} r={6} fill={p.jalecoSombra} />
      {/* bolso com caneta */}
      <rect x={292} y={430} width={66} height={60} rx={10} fill={p.bolso} />
      <rect x={292} y={430} width={66} height={14} rx={6} fill="#B08A43" />
      <rect x={318} y={408} width={8} height={34} rx={4} fill={cores.roxo} />
    </g>
  );
};
