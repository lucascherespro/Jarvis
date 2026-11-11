import React from 'react';
import {useCurrentFrame} from 'remotion';
import {pele} from '../theme';

/** Paciente deitada na maca, de touca, sem rosto detalhado. Rig de 520 x 160. */
export const Paciente: React.FC<{largura: number; style?: React.CSSProperties}> = ({largura, style}) => {
  const frame = useCurrentFrame();
  const resp = Math.sin((frame / 100) * Math.PI * 2) * 2;
  return (
    <svg viewBox="0 0 520 160" width={largura} height={(largura * 160) / 520} style={{overflow: 'visible', ...style}}>
      {/* corpo sob o lençol */}
      <path d={`M120 ${92 - resp} Q300 ${58 - resp} 500 ${86 - resp} L510 128 L120 128 Z`} fill="#C9D7F2" />
      <path d={`M120 ${100 - resp} Q300 ${72 - resp} 500 ${96 - resp}`} stroke="#B3C4E6" strokeWidth={5} fill="none" />
      {/* cabeça com touca */}
      <ellipse cx={78} cy={86} rx={44} ry={40} fill="#B98466" />
      <path d="M36 82 Q40 36 86 40 Q124 46 120 86 Q96 70 70 72 Q50 74 36 82 Z" fill="#EAF2FF" />
      <path d="M40 78 Q80 64 118 80" stroke="#C9D7F2" strokeWidth={4} fill="none" />
      {/* olhos fechados (tranquila) */}
      <path d="M86 92 q8 5 16 0" stroke={pele.olho} strokeWidth={3.5} fill="none" strokeLinecap="round" />
    </svg>
  );
};
