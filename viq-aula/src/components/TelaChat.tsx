import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {clamp, cores, fontFamily} from '../theme';

export type MsgChat = {de: 'cliente' | 'clinica'; texto: string; hora: string; f: number; automatica?: boolean; botoes?: string[]};

/** Tela de conversa ampliada (genérica, sem marca de app). Visão da cliente: as mensagens dela à direita. */
export const TelaChat: React.FC<{
  titulo: string;
  mensagens: MsgChat[];
  digitando?: {de: number; ate: number}[];
  botaoEscolhido?: {texto: string; f: number};
  x: number;
  y: number;
  largura?: number;
  inicio?: number;
  apagada?: number;
  children?: React.ReactNode;
}> = ({titulo, mensagens, digitando = [], botaoEscolhido, x, y, largura = 480, inicio = 0, apagada = 0, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entra = spring({frame: frame - inicio, fps, config: {damping: 15, stiffness: 140}});
  const estaDigitando = digitando.some((d) => frame >= d.de && frame < d.ate);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: largura,
        boxSizing: 'border-box',
        borderRadius: 46,
        background: '#F6F3EF',
        border: '10px solid #151827',
        boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
        overflow: 'hidden',
        fontFamily,
        opacity: interpolate(entra, [0, 0.3], [0, 1], clamp),
        scale: interpolate(entra, [0, 1], [0.7, 1]),
        transformOrigin: '20% 90%',
        filter: apagada > 0 ? `grayscale(${apagada}) brightness(${1 - apagada * 0.25})` : undefined,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 14, padding: '20px 22px', background: '#2E2A3F', color: 'white'}}>
        <div style={{width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg, #E2C383, #C9A45C)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 28, color: '#3A2A10'}}>
          {titulo[0]}
        </div>
        <div style={{lineHeight: 1.1}}>
          <div style={{fontSize: 30, fontWeight: 800}}>{titulo}</div>
          <div style={{fontSize: 22, fontWeight: 600, color: estaDigitando ? cores.verdeClaro : '#B9B4CC'}}>{estaDigitando ? 'digitando...' : 'conversa'}</div>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 14, padding: '22px 18px 26px', minHeight: 300}}>
        {mensagens.map((m, i) => {
          if (frame < m.f) return null;
          const s = spring({frame: frame - m.f, fps, config: {damping: 13, stiffness: 180}});
          const minha = m.de === 'cliente';
          return (
            <div key={i} style={{alignSelf: minha ? 'flex-end' : 'flex-start', maxWidth: '86%', scale: s, transformOrigin: minha ? '100% 100%' : '0% 100%'}}>
              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: 24,
                  borderBottomRightRadius: minha ? 6 : 24,
                  borderBottomLeftRadius: minha ? 24 : 6,
                  background: minha ? '#DCCBF7' : 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  fontSize: 28,
                  fontWeight: 600,
                  lineHeight: 1.25,
                  color: '#1F1B2D',
                }}
              >
                {m.automatica ? <div style={{fontSize: 17, fontWeight: 800, letterSpacing: 1.5, color: cores.roxo, marginBottom: 4}}>VIQ · RESPOSTA AUTOMÁTICA</div> : null}
                {m.texto}
                <div style={{fontSize: 18, fontWeight: 600, color: '#8A8499', textAlign: 'right', marginTop: 4}}>
                  {m.hora} {minha ? <span style={{color: cores.roxo}}>✓✓</span> : null}
                </div>
              </div>
              {m.botoes ? (
                <div style={{display: 'flex', gap: 10, marginTop: 10}}>
                  {m.botoes.map((b) => {
                    const escolhido = botaoEscolhido && botaoEscolhido.texto === b && frame >= botaoEscolhido.f;
                    const toque = botaoEscolhido ? spring({frame: frame - botaoEscolhido.f, fps, config: {damping: 9, stiffness: 220}}) : 0;
                    return (
                      <div
                        key={b}
                        style={{
                          padding: '10px 20px',
                          borderRadius: 999,
                          border: `3px solid ${cores.roxo}`,
                          background: escolhido ? cores.roxo : 'white',
                          color: escolhido ? 'white' : cores.roxo,
                          fontSize: 26,
                          fontWeight: 800,
                          scale: escolhido ? interpolate(toque, [0, 0.5, 1], [1, 0.88, 1]) : 1,
                        }}
                      >
                        {b}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
        {estaDigitando ? (
          <div style={{alignSelf: 'flex-start', display: 'flex', gap: 8, padding: '16px 20px', borderRadius: 24, background: 'white'}}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{width: 12, height: 12, borderRadius: '50%', background: '#8A8499', translate: `0px ${Math.sin(frame / 3 - i) * 4}px`}} />
            ))}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};
