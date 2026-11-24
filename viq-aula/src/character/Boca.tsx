import React from 'react';
import {usePele} from './aparencia';

/** Boca paramétrica: curva (-1..1), abertura (0..1) e largura — todas interpoláveis */
export const Boca: React.FC<{virada: number; curva: number; aberta: number; largura: number}> = ({virada, curva, aberta, largura}) => {
  const pele = usePele();
  const cx = 250 + virada * 20;
  const my = 244;
  const w = 24 * largura;
  const yc = my - curva * 6;
  const cima = my + curva * 12 - aberta * 6;
  const baixo = my + curva * 12 + aberta * 34;
  const forma = `M${cx - w} ${yc} Q${cx} ${cima} ${cx + w} ${yc} Q${cx} ${baixo} ${cx - w} ${yc} Z`;
  return (
    <g>
      {aberta > 0.02 ? (
        <g>
          <path d={forma} fill="#5E1F1F" />
          {/* dentes */}
          <clipPath id="clipBoca">
            <path d={forma} />
          </clipPath>
          <rect x={cx - w} y={cima - 4} width={w * 2} height={9 + aberta * 4} fill="white" clipPath="url(#clipBoca)" />
          <ellipse cx={cx} cy={baixo - 4} rx={w * 0.5} ry={aberta * 8} fill="#C9505A" clipPath="url(#clipBoca)" />
        </g>
      ) : null}
      <path d={`M${cx - w} ${yc} Q${cx} ${cima} ${cx + w} ${yc}`} stroke={pele.labio} strokeWidth={5.5} fill="none" strokeLinecap="round" />
    </g>
  );
};
