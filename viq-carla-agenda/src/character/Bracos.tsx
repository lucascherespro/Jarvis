import React from 'react';
import {usePele} from './aparencia';
import {Mao} from './Maos';

const L1 = 150;
const L2 = 138;

type BracoProps = {
  ombro: number;
  cotovelo: number;
  mao: number;
  objetos: {celular?: number; aplicador?: number; caneca?: number; apontar?: number};
  brilhoCelular?: number;
  vibra?: number;
  frame?: number;
};

/** Braço com 2 segmentos (ombro e cotovelo). Pivô do ombro em (138, 336). */
const Braco: React.FC<BracoProps> = ({ombro, cotovelo, mao, objetos, brilhoCelular, vibra, frame}) => {
  const pele = usePele();
  return (
  <g transform={`translate(138 336) rotate(${ombro})`}>
    <rect x={-31} y={-26} width={62} height={L1 + 30} rx={31} fill={pele.jaleco} />
    <rect x={8} y={-10} width={22} height={L1} rx={11} fill={pele.jalecoSombra} opacity={0.8} />
    <g transform={`translate(0 ${L1}) rotate(${cotovelo})`}>
      <rect x={-27} y={-24} width={54} height={L2 + 14} rx={27} fill={pele.jaleco} />
      <rect x={-27} y={L2 - 30} width={54} height={20} rx={8} fill={pele.jalecoSombra} />
      <g transform={`translate(0 ${L2})`}>
        <Mao rot={mao} {...objetos} brilhoCelular={brilhoCelular} vibra={vibra} frame={frame} />
      </g>
    </g>
  </g>
  );
};

/** Braço do lado esquerdo da tela */
export const BracoEsquerdo: React.FC<BracoProps> = (p) => <Braco {...p} />;

/** Braço do lado direito da tela (espelhado) */
export const BracoDireito: React.FC<BracoProps> = (p) => (
  <g transform="translate(500 0) scale(-1 1)">
    <Braco {...p} />
  </g>
);
