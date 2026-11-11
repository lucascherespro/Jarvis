import React from 'react';
import {fontFamily} from '../theme';
import {formatarHora} from '../timing';

export const Relogio: React.FC<{minutos: number; dia: string; top: number; tamanho?: number; style?: React.CSSProperties}> = ({
  minutos,
  dia,
  top,
  tamanho = 124,
  style,
}) => (
  <div
    style={{
      position: 'absolute',
      top,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'white',
      fontFamily,
      textShadow: '0 4px 30px rgba(0,0,0,0.45)',
      ...style,
    }}
  >
    <div style={{fontSize: tamanho * 0.3, fontWeight: 600, color: '#DDE3F5', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10}}>
      <svg width={tamanho * 0.22} height={tamanho * 0.27} viewBox="0 0 30 38">
        <rect x="2" y="16" width="26" height="20" rx="5" fill="#DDE3F5" />
        <path d="M8 17 V11 a7 7 0 0 1 14 0 V17" stroke="#DDE3F5" strokeWidth="4" fill="none" />
      </svg>
      {dia}
    </div>
    <div style={{fontSize: tamanho, fontWeight: 700, lineHeight: 1, letterSpacing: -3, fontVariantNumeric: 'tabular-nums'}}>
      {formatarHora(minutos)}
    </div>
  </div>
);
