import React from 'react';
import {pele} from '../theme';

export const Sobrancelhas: React.FC<{virada: number; ang: number; y: number}> = ({virada, ang, y}) => {
  const dx = virada * 22;
  return (
    <g transform={`translate(${dx} ${y})`}>
      <g transform={`rotate(${-ang} 230 152)`}>
        <path d="M200 154 Q216 144 234 150" stroke={pele.cabelo} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
      <g transform={`rotate(${ang} 270 152)`}>
        <path d="M266 150 Q284 144 300 154" stroke={pele.cabelo} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};
