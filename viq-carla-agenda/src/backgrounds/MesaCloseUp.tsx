import React from 'react';

export type LuzMesa = 'noite' | 'manha' | 'tarde';

const TONS: Record<LuzMesa, {parede: [string, string]; mesa: [string, string]; janela: string; feixe: number}> = {
  noite: {parede: ['#141A33', '#0C1024'], mesa: ['#2B2230', '#1A1420'], janela: '#1D2A55', feixe: 0},
  manha: {parede: ['#C9CFD8', '#AEB6C2'], mesa: ['#6B5546', '#4E3C31'], janela: '#EAF1F8', feixe: 0.25},
  tarde: {parede: ['#EBD3B4', '#D7B990'], mesa: ['#7A5C45', '#5C4433'], janela: '#FFE8C2', feixe: 0.4},
};

/** Fundo desfocado do close-up: clínica vazia (cadeira vazia, janela) */
export const MesaFundo: React.FC<{luz: LuzMesa}> = ({luz}) => {
  const t = TONS[luz];
  return (
    <svg width={1200} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: -60, filter: 'blur(10px)'}}>
      <defs>
        <linearGradient id={`pm${luz}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.parede[0]} />
          <stop offset="1" stopColor={t.parede[1]} />
        </linearGradient>
      </defs>
      <rect width={1080} height={1920} fill={`url(#pm${luz})`} />
      <path d="M640 900 L640 480 Q640 340 800 340 Q960 340 960 480 L960 900 Z" fill={t.janela} />
      {luz === 'noite' ? <circle cx={860} cy={460} r={36} fill="#F2EED8" opacity={0.85} /> : null}
      {/* cadeira vazia */}
      <rect x={220} y={560} width={260} height={320} rx={60} fill={luz === 'noite' ? '#2A2F4E' : '#C8B49C'} />
      <rect x={200} y={860} width={300} height={70} rx={30} fill={luz === 'noite' ? '#232842' : '#B9A389'} />
      {/* pendente */}
      <path d="M470 220 Q470 160 540 160 Q610 160 610 220 Z" fill="#C9A45C" opacity={luz === 'noite' ? 0.5 : 1} />
    </svg>
  );
};

/** Tampo da mesa em perspectiva (o celular é desenhado por cima) */
export const MesaTampo: React.FC<{luz: LuzMesa}> = ({luz}) => {
  const t = TONS[luz];
  return (
    <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <defs>
        <linearGradient id={`mt${luz}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.mesa[0]} />
          <stop offset="1" stopColor={t.mesa[1]} />
        </linearGradient>
      </defs>
      <path d="M-80 980 L1160 980 L1300 1920 L-220 1920 Z" fill={`url(#mt${luz})`} />
      <rect x={-80} y={972} width={1240} height={10} fill="#C9A45C" opacity={0.7} />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M-80 ${1080 + i * 190} Q540 ${1060 + i * 190} 1160 ${1090 + i * 190}`} stroke="black" strokeWidth={3} fill="none" opacity={0.12} />
      ))}
      {t.feixe > 0 ? <path d="M560 980 L360 1920 L1100 1920 L900 980 Z" fill="white" opacity={t.feixe * 0.5} /> : null}
    </svg>
  );
};
