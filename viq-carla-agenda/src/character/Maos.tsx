import React from 'react';
import {usePele} from './aparencia';
import {Celular} from './Celular';

/** Mão (desenhada no fim do antebraço) e objetos que ela segura */
export const Mao: React.FC<{
  rot: number;
  celular?: number;
  aplicador?: number;
  caneca?: number;
  apontar?: number;
  brilhoCelular?: number;
  vibra?: number;
  frame?: number;
}> = ({rot, celular = 0, aplicador = 0, caneca = 0, apontar = 0, brilhoCelular = 0.4, vibra = 0, frame = 0}) => {
  const pele = usePele();
  return (
  <g transform={`rotate(${rot})`}>
    {caneca > 0.02 ? (
      <g opacity={Math.min(1, caneca * 1.5)} transform={`rotate(${-rot}) translate(-34 -78) scale(${0.6 + caneca * 0.4})`}>
        <rect x={0} y={0} width={66} height={72} rx={14} fill="#F3E8FF" />
        <rect x={0} y={0} width={66} height={18} rx={9} fill="#7C3AED" />
        <path d="M66 18 q24 2 22 20 q-2 18 -22 18" stroke="#F3E8FF" strokeWidth={10} fill="none" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${14 + i * 18} ${-10 - ((frame + i * 9) % 30)} q8 -10 0 -20 q-8 -10 0 -20`}
            stroke="white"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            opacity={0.55 * (1 - ((frame + i * 9) % 30) / 30)}
          />
        ))}
      </g>
    ) : null}
    {celular > 0.02 ? (
      <g opacity={Math.min(1, celular * 1.5)} transform={`translate(10 -38) rotate(-8) scale(${0.6 + celular * 0.4})`}>
        <Celular largura={62} brilho={brilhoCelular} vibra={vibra} frame={frame} />
      </g>
    ) : null}
    {aplicador > 0.02 ? (
      <g opacity={Math.min(1, aplicador * 1.5)} transform="rotate(-70) translate(0 -8)">
        <rect x={-7} y={-100} width={14} height={92} rx={7} fill="#E9EEF7" />
        <rect x={-7} y={-100} width={14} height={22} rx={7} fill="#A78BFA" />
        <rect x={-1.5} y={-124} width={3} height={26} fill="#9CA3AF" />
      </g>
    ) : null}
    {/* palma */}
    <ellipse cx={0} cy={4} rx={25} ry={27} fill={pele.base} />
    {/* polegar */}
    <ellipse cx={20} cy={-6} rx={9} ry={15} fill={pele.sombra} transform="rotate(-30 20 -6)" />
    {apontar > 0.02 ? <rect x={-7} y={18} width={14} height={30 * apontar + 8} rx={7} fill={pele.base} /> : null}
  </g>
);
};
