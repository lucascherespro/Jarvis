import React from 'react';
import {pele} from '../theme';

/** Parte de trás (coque) — desenhada antes do rosto */
export const CabeloTras: React.FC = () => (
  <g>
    <circle cx={258} cy={62} r={48} fill={pele.cabelo} />
    <path d="M226 48 Q258 22 290 48" stroke={pele.cabeloBrilho} strokeWidth={8} fill="none" strokeLinecap="round" />
    <ellipse cx={250} cy={160} rx={96} ry={104} fill={pele.cabelo} />
  </g>
);

/** Franja e fios soltos — desenhados por cima do rosto. Os fios balançam (balanco em graus). */
export const CabeloFrente: React.FC<{virada: number; balanco: number}> = ({virada, balanco}) => {
  const dx = virada * 14;
  return (
    <g transform={`translate(${dx} 0)`}>
      {/* franja puxada para trás, com divisão lateral */}
      <path d="M166 170 Q160 92 238 74 Q312 64 338 132 Q342 152 336 172 Q318 118 270 108 Q226 102 196 126 Q178 142 166 170 Z" fill={pele.cabelo} />
      <path d="M214 96 Q262 78 312 104" stroke={pele.cabeloBrilho} strokeWidth={7} fill="none" strokeLinecap="round" />
      {/* fios soltos */}
      <g transform={`rotate(${balanco} 178 140)`}>
        <path d="M178 138 Q164 178 176 214 Q182 230 174 246" stroke={pele.cabelo} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
      <g transform={`rotate(${-balanco * 0.8} 326 136)`}>
        <path d="M326 134 Q342 170 330 204" stroke={pele.cabelo} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};
