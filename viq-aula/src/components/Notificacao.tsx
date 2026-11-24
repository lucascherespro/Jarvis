import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, cores, fontFamily} from '../theme';

/** Card de notificação genérico (sem marca), que salta com spring a partir de `inicio` */
export const Notificacao: React.FC<{
  nome: string;
  texto: string;
  inicio: number;
  x: number;
  y: number;
  largura?: number;
  cor?: string;
  rot?: number;
  origemX?: number;
  origemY?: number;
}> = ({nome, texto, inicio, x, y, largura = 560, cor = '#F472B6', rot = 0, origemX, origemY}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < inicio) return null;
  const s = spring({frame: frame - inicio, fps, config: {damping: 12, stiffness: 170}});
  const ox = origemX ?? x;
  const oy = origemY ?? y;
  return (
    <div
      style={{
        position: 'absolute',
        left: interpolate(s, [0, 1], [ox, x]),
        top: interpolate(s, [0, 1], [oy, y]),
        width: largura,
        scale: interpolate(s, [0, 1], [0.3, 1]),
        opacity: interpolate(s, [0, 0.3], [0, 1], clamp),
        rotate: `${rot}deg`,
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '18px 22px',
        borderRadius: 32,
        background: 'rgba(255,255,255,0.93)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 14px 40px rgba(0,0,0,0.3)',
        fontFamily,
        color: '#111827',
      }}
    >
      <div style={{width: 64, height: 64, borderRadius: 18, background: cor, color: 'white', fontWeight: 800, fontSize: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
        {nome[0]}
      </div>
      <div style={{minWidth: 0}}>
        <div style={{fontSize: 24, fontWeight: 700, color: '#6B7280', letterSpacing: 1}}>MENSAGEM · {nome}</div>
        <div style={{fontSize: 36, fontWeight: 600, lineHeight: 1.2}}>{texto}</div>
      </div>
    </div>
  );
};

/** Balão de fala com rabicho (mensagens da cliente ou respostas da VIQ) */
export const BalaoFala: React.FC<{
  texto: string;
  inicio: number;
  x: number;
  y: number;
  largura?: number;
  tipo?: 'cliente' | 'viq' | 'rascunho';
  rabicho?: 'esquerda' | 'direita' | 'baixo';
  rodape?: string;
  tamanho?: number;
}> = ({texto, inicio, x, y, largura = 600, tipo = 'cliente', rabicho = 'baixo', rodape, tamanho = 38}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < inicio) return null;
  const s = spring({frame: frame - inicio, fps, config: {damping: 11, stiffness: 180}});
  const viq = tipo === 'viq';
  const fundo = viq ? `linear-gradient(135deg, ${cores.roxo}, #5B21B6)` : tipo === 'rascunho' ? 'rgba(255,255,255,0.75)' : 'white';
  const corRabicho = viq ? '#6D28D9' : tipo === 'rascunho' ? 'rgba(255,255,255,0.75)' : 'white';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: largura,
        scale: s,
        opacity: interpolate(s, [0, 0.3], [0, 1], clamp),
        transformOrigin: rabicho === 'esquerda' ? '0% 100%' : rabicho === 'direita' ? '100% 100%' : '50% 100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: '22px 28px',
          borderRadius: 34,
          background: fundo,
          border: viq ? `2px solid ${cores.roxoClaro}` : tipo === 'rascunho' ? '3px dashed #9CA3AF' : undefined,
          boxShadow: viq ? `0 0 34px rgba(124,58,237,0.65)` : '0 12px 36px rgba(0,0,0,0.28)',
          fontFamily,
          fontSize: tamanho,
          fontWeight: 600,
          lineHeight: 1.22,
          color: viq ? 'white' : '#111827',
        }}
      >
        {viq ? <div style={{fontSize: 22, fontWeight: 800, letterSpacing: 2, color: '#DDD6FE', marginBottom: 6}}>VIQ · RESPOSTA AUTOMÁTICA</div> : null}
        {texto}
        {rodape ? <div style={{fontSize: 24, fontWeight: 700, color: cores.verdeClaro, marginTop: 8}}>✓ {rodape}</div> : null}
        <div
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            bottom: -24,
            left: rabicho === 'esquerda' ? 40 : rabicho === 'direita' ? undefined : '50%',
            right: rabicho === 'direita' ? 40 : undefined,
            marginLeft: rabicho === 'baixo' ? -16 : 0,
            borderLeft: '16px solid transparent',
            borderRight: '16px solid transparent',
            borderTop: `26px solid ${corRabicho}`,
          }}
        />
      </div>
    </div>
  );
};
