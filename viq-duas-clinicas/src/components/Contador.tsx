import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, fontFamily, molas} from '../theme';

/** Número que "rola" (dígitos deslizando) até o valor atual */
export const NumeroRolando: React.FC<{valor: number; desde: number; ate: number; inicio: number; formatar?: (n: number) => string}> = ({
  valor,
  desde,
  ate,
  inicio,
  formatar = (n) => String(n),
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - inicio, fps, config: {damping: 200}, durationInFrames: 22});
  const atual = valor === ate ? interpolate(p, [0, 1], [desde, ate]) : valor;
  return <span style={{fontVariantNumeric: 'tabular-nums'}}>{formatar(Math.round(atual))}</span>;
};

/** Pílula de contador com "pulo" quando o número muda */
export const Contador: React.FC<{
  rotulo: string;
  valor: number;
  mudouEm: number | null;
  cor: string;
  largura: number;
  extra?: React.ReactNode;
  tamanho?: number;
}> = ({rotulo, valor, mudouEm, cor, largura, extra, tamanho = 34}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pulo = mudouEm === null ? 1 : spring({frame: frame - mudouEm, fps, config: molas.pulo});
  return (
    <div
      style={{
        width: largura,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 22px',
        borderRadius: 999,
        background: 'rgba(11,21,48,0.85)',
        border: `3px solid ${cor}`,
        boxShadow: `0 0 24px ${cor}55`,
        fontFamily,
        fontSize: tamanho,
        fontWeight: 700,
        color: 'white',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={{width: 16, height: 16, borderRadius: '50%', background: cor, boxShadow: `0 0 14px ${cor}`, flexShrink: 0}} />
      <span>{rotulo}:</span>
      <span
        style={{
          color: cor,
          fontWeight: 800,
          fontSize: tamanho * 1.25,
          display: 'inline-block',
          scale: mudouEm === null ? 1 : interpolate(pulo, [0, 1], [1.5, 1], clamp),
        }}
      >
        {valor}
      </span>
      {extra}
    </div>
  );
};
