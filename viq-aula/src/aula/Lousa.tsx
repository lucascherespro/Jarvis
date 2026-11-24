import React from 'react';
import {loadFont} from '@remotion/google-fonts/Caveat';
import {evolvePath} from '@remotion/paths';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, cores, curvas, fontFamily} from '../theme';

export const {fontFamily: fonteGiz} = loadFont('normal', {weights: ['600', '700'], subsets: ['latin']});

/** Lousa branca (coordenadas internas 940 x 710), posicionada no palco */
export const LOUSA = {x: 70, y: 300, w: 940, h: 710};

export const tinta = {
  azul: '#2643A8',
  vermelho: '#D9364A',
  verde: '#1F9D55',
  roxo: '#6D4BE0',
  preto: '#1F1B2D',
};

/** Texto "escrito à mão": aparece da esquerda para a direita */
export const Escrita: React.FC<{
  texto: string;
  x: number;
  y: number;
  inicio: number;
  dur?: number;
  tamanho?: number;
  cor?: string;
  peso?: number;
  ancora?: 'start' | 'middle' | 'end';
  rot?: number;
}> = ({texto, x, y, inicio, dur, tamanho = 54, cor = tinta.preto, peso = 700, ancora = 'start', rot = 0}) => {
  const frame = useCurrentFrame();
  const d = dur ?? Math.max(8, texto.length * 0.9);
  const p = interpolate(frame, [inicio, inicio + d], [0, 1], clamp);
  if (frame < inicio) return null;
  const id = `clip-${Math.round(x)}-${Math.round(y)}-${inicio}`;
  const largura = texto.length * tamanho * 0.55 + 40;
  const x0 = ancora === 'start' ? x - 10 : ancora === 'middle' ? x - largura / 2 : x - largura;
  return (
    <g transform={`rotate(${rot} ${x} ${y})`}>
      <clipPath id={id}>
        <rect x={x0} y={y - tamanho * 1.1} width={largura * p} height={tamanho * 1.6} />
      </clipPath>
      <text x={x} y={y} textAnchor={ancora} fontFamily={fonteGiz} fontWeight={peso} fontSize={tamanho} fill={cor} clipPath={`url(#${id})`}>
        {texto}
      </text>
    </g>
  );
};

/** Traço desenhado progressivamente */
export const Traco: React.FC<{d: string; inicio: number; dur?: number; cor?: string; espessura?: number; preencher?: string}> = ({d, inicio, dur = 18, cor = tinta.preto, espessura = 6, preencher}) => {
  const frame = useCurrentFrame();
  if (frame < inicio) return null;
  const p = interpolate(frame, [inicio, inicio + dur], [0, 1], {...clamp, easing: curvas.suave});
  const {strokeDasharray, strokeDashoffset} = evolvePath(p, d);
  return (
    <>
      {preencher ? <path d={d} fill={preencher} opacity={interpolate(p, [0.7, 1], [0, 1], clamp)} /> : null}
      <path d={d} fill="none" stroke={cor} strokeWidth={espessura} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
    </>
  );
};

/** Seta desenhada (linha + ponta) */
export const Seta: React.FC<{x1: number; y1: number; x2: number; y2: number; inicio: number; cor?: string; dur?: number}> = ({x1, y1, x2, y2, inicio, cor = tinta.preto, dur = 12}) => {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const a1 = ang + Math.PI * 0.82;
  const a2 = ang - Math.PI * 0.82;
  const k = 22;
  return (
    <>
      <Traco d={`M${x1} ${y1} L${x2} ${y2}`} inicio={inicio} dur={dur} cor={cor} />
      <Traco d={`M${x2 + Math.cos(a1) * k} ${y2 + Math.sin(a1) * k} L${x2} ${y2} L${x2 + Math.cos(a2) * k} ${y2 + Math.sin(a2) * k}`} inicio={inicio + dur} dur={6} cor={cor} />
    </>
  );
};

/** Bolinha que "salta" (pop) */
export const Pop: React.FC<{inicio: number; children: React.ReactNode; x: number; y: number}> = ({inicio, children, x, y}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < inicio) return null;
  const s = spring({frame: frame - inicio, fps, config: {damping: 9, stiffness: 220}});
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
};

/** A lousa com moldura, bandeja de marcadores e conteúdo SVG */
export const Lousa: React.FC<{children?: React.ReactNode; etiqueta?: string}> = ({children, etiqueta}) => (
  <div style={{position: 'absolute', left: LOUSA.x, top: LOUSA.y, width: LOUSA.w, height: LOUSA.h}}>
    <div style={{position: 'absolute', inset: -18, borderRadius: 26, background: 'linear-gradient(180deg, #C9CDD8, #A9AEBB)', boxShadow: '0 20px 50px rgba(40,20,80,0.25)'}} />
    <div style={{position: 'absolute', inset: 0, borderRadius: 12, background: 'linear-gradient(160deg, #FFFFFF 0%, #F4F6FA 60%, #EDF0F6 100%)'}} />
    {/* reflexo */}
    <div style={{position: 'absolute', left: 520, top: 0, width: 160, height: LOUSA.h, background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.7), rgba(255,255,255,0))', transform: 'skewX(-18deg)'}} />
    {etiqueta ? (
      <div style={{position: 'absolute', right: 22, top: 18, padding: '8px 18px', borderRadius: 999, background: cores.roxo, color: 'white', fontFamily, fontWeight: 800, fontSize: 22, letterSpacing: 2}}>{etiqueta}</div>
    ) : null}
    <svg width={LOUSA.w} height={LOUSA.h} viewBox={`0 0 ${LOUSA.w} ${LOUSA.h}`} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      {children}
    </svg>
    {/* bandeja com marcadores */}
    <div style={{position: 'absolute', left: 560, top: LOUSA.h + 14, width: 320, height: 18, borderRadius: 9, background: '#9AA0AE'}} />
    {[tinta.azul, tinta.vermelho, tinta.verde].map((c, i) => (
      <div key={c} style={{position: 'absolute', left: 600 + i * 80, top: LOUSA.h + 2, width: 64, height: 16, borderRadius: 8, background: c}} />
    ))}
  </div>
);
