import React from 'react';
import {cores, pele} from '../theme';

/** Jaleco branco com bolso roxo e blusa por baixo */
export const Tronco: React.FC = () => (
  <g>
    <path d="M118 340 Q124 300 196 288 L250 336 L304 288 Q376 300 382 340 L404 760 L96 760 Z" fill={pele.jaleco} />
    {/* sombra em bloco do lado direito */}
    <path d="M304 288 Q376 300 382 340 L404 760 L330 760 Q340 520 318 300 Z" fill={pele.jalecoSombra} />
    {/* blusa no decote */}
    <path d="M204 292 L250 372 L296 292 Q250 306 204 292 Z" fill={pele.blusa} />
    {/* lapelas */}
    <path d="M196 288 L250 372 L226 420 L180 330 Z" fill={pele.jalecoSombra} opacity={0.7} />
    <path d="M304 288 L250 372 L274 420 L320 330 Z" fill="#E6E8F0" />
    {/* abotoamento */}
    <line x1={250} y1={380} x2={250} y2={760} stroke={pele.jalecoSombra} strokeWidth={4} />
    <circle cx={262} cy={470} r={6} fill={pele.jalecoSombra} />
    <circle cx={262} cy={560} r={6} fill={pele.jalecoSombra} />
    {/* bolso roxo com caneta */}
    <rect x={292} y={430} width={66} height={60} rx={10} fill={cores.roxo} />
    <rect x={292} y={430} width={66} height={14} rx={6} fill="#6D28D9" />
    <rect x={318} y={408} width={8} height={34} rx={4} fill={cores.dourado} />
  </g>
);
