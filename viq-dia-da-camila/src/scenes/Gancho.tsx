import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camila} from '../character/Camila';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {Palco} from '../components/Palco';
import {clamp} from '../theme';

/** Enquadramento do gancho (reutilizado no último frame para o loop) */
export const GANCHO_CAMILA = {x: 130, y: 600, largura: 820};
const cores = ['#F472B6', '#60A5FA', '#F59E0B', '#34D399', '#FB7185'];

export const Gancho: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const g = roteiro.gancho;
  const zoom = interpolate(frame, [0, 75], [1, 1.06], clamp);
  return (
    <Palco>
      <AbsoluteFill style={{scale: zoom, transformOrigin: '50% 60%'}}>
        <div style={{position: 'absolute', left: GANCHO_CAMILA.x, top: GANCHO_CAMILA.y}}>
          <Camila
            largura={GANCHO_CAMILA.largura}
            poses={g.poses}
            expressoes={g.expressoes}
            vibracoes={g.notificacoes.map((n) => n.f)}
            brilhoCelular={0.9}
          />
        </div>
        {/* pilha de notificações caindo em cima do celular */}
        {g.notificacoes.map((n, i) => {
          const local = frame - n.f;
          if (local < 0) return null;
          const s = spring({frame: local, fps, config: {damping: 11, stiffness: 150}});
          const alvoY = 1300 - i * 66;
          const alvoX = i % 2 === 0 ? 300 : 220;
          const rot = (i % 2 === 0 ? -1 : 1) * (3 + i);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: alvoX,
                top: interpolate(s, [0, 1], [-200, alvoY]),
                width: 560,
                rotate: `${rot}deg`,
                opacity: interpolate(s, [0, 0.2], [0, 1], clamp),
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                borderRadius: 30,
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 14px 40px rgba(0,0,0,0.35)',
                fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box',
              }}
            >
              <div style={{width: 56, height: 56, borderRadius: 16, background: cores[i % cores.length], color: 'white', fontWeight: 800, fontSize: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                {n.nome[0]}
              </div>
              <div>
                <div style={{fontSize: 22, fontWeight: 700, color: '#6B7280'}}>MENSAGEM · {n.nome}</div>
                <div style={{fontSize: 34, fontWeight: 600, color: '#111827'}}>{n.texto}</div>
              </div>
            </div>
          );
        })}
      </AbsoluteFill>
      <Legenda slam top={318} inicio={3} linhas={[{texto: g.titulo, tamanho: 104}, {texto: g.subtitulo, tamanho: 46, cor: '#C4B5FD'}]} intervalo={16} />
    </Palco>
  );
};
