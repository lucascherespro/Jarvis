import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Roteiro} from '../data/schema';
import {useLayout} from '../layout';
import {clamp, cores, curvas, fontFamily} from '../theme';
import {Linha} from '../components/Texto';

// Mapa vetorial estilizado (fictício) — coordenadas do "mundo" do mapa
const MW = 2400;
const MH = 3000;
const FOCO = {x: 1200, y: 1500}; // rua das duas clínicas
const SEPARACAO = 150; // metade da distância entre os pinos (em coordenadas do mapa)

const ruas = (() => {
  const linhas: {x1: number; y1: number; x2: number; y2: number; w: number}[] = [];
  for (let i = 0; i < 26; i++) {
    const y = i * 120 + (random(`h${i}`) - 0.5) * 50;
    linhas.push({x1: 0, y1: y, x2: MW, y2: y + (random(`hs${i}`) - 0.5) * 140, w: random(`hw${i}`) > 0.8 ? 5 : 2});
  }
  for (let i = 0; i < 20; i++) {
    const x = i * 130 + (random(`v${i}`) - 0.5) * 60;
    linhas.push({x1: x, y1: 0, x2: x + (random(`vs${i}`) - 0.5) * 180, y2: MH, w: random(`vw${i}`) > 0.8 ? 5 : 2});
  }
  // avenidas diagonais
  linhas.push({x1: 0, y1: 600, x2: MW, y2: 2700, w: 9});
  linhas.push({x1: 300, y1: MH, x2: 2200, y2: 200, w: 7});
  return linhas;
})();

const Pino: React.FC<{x: number; y: number; rotulo: string; marca: boolean; atraso: number}> = ({x, y, rotulo, marca, atraso}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - atraso, fps, config: {damping: 10, stiffness: 170}});
  const pulso = ((frame - atraso) % 36) / 36;
  const cor = marca ? cores.roxo : '#7D8599';
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: frame < atraso ? 0 : 1}}>
      {/* pulso no chão */}
      <div
        style={{
          position: 'absolute',
          left: -60 * pulso - 14,
          top: -20 * pulso - 6,
          width: 28 + 120 * pulso,
          height: 12 + 40 * pulso,
          borderRadius: '50%',
          border: `3px solid ${marca ? cores.roxoClaro : '#AAB4D2'}`,
          opacity: (1 - pulso) * s,
        }}
      />
      {marca ? (
        <div
          style={{
            position: 'absolute',
            left: -110,
            top: -200,
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.55), rgba(124,58,237,0) 70%)',
            opacity: s,
          }}
        />
      ) : null}
      <div style={{position: 'absolute', left: -40, top: -112, scale: s, transformOrigin: '50% 100%'}}>
        <svg width="80" height="112" viewBox="0 0 80 112">
          <path d="M40 110 C40 110 4 64 4 40 a36 36 0 0 1 72 0 C76 64 40 110 40 110 Z" fill={cor} stroke="white" strokeWidth="4" />
          <circle cx="40" cy="40" r="15" fill="white" />
        </svg>
      </div>
      <div
        style={{
          position: 'absolute',
          top: -196,
          left: 0,
          translate: '-50% 0',
          scale: s,
          transformOrigin: '50% 100%',
          whiteSpace: 'nowrap',
          padding: '10px 22px',
          borderRadius: 18,
          fontFamily,
          fontWeight: 800,
          fontSize: 38,
          color: 'white',
          background: marca ? cores.roxo : '#5B6377',
          boxShadow: marca ? `0 0 30px ${cores.roxo}` : '0 6px 20px rgba(0,0,0,0.4)',
        }}
      >
        {rotulo}
      </div>
    </div>
  );
};

export const Mapa: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const m = roteiro.mapa;
  const zoom = interpolate(frame, [0, 55], [0.55, 1.4], {...clamp, easing: curvas.suave});
  const focoTela = {x: L.W / 2, y: L.centroY + 40};
  const tx = focoTela.x - FOCO.x * zoom;
  const ty = focoTela.y - FOCO.y * zoom;
  const pinoA = {x: focoTela.x - SEPARACAO * 1.4, y: focoTela.y};
  const pinoB = {x: focoTela.x + SEPARACAO * 1.4, y: focoTela.y};
  const tracejado = interpolate(frame, [48, 64], [0, 1], {...clamp, easing: curvas.saida});
  return (
    <AbsoluteFill style={{background: '#070D21', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: MW, height: MH, transformOrigin: '0 0', translate: `${tx}px ${ty}px`, scale: zoom}}>
        <svg width={MW} height={MH}>
          {/* quarteirões */}
          {new Array(60).fill(0).map((_, i) => (
            <rect
              key={i}
              x={random(`bx${i}`) * MW}
              y={random(`by${i}`) * MH}
              width={60 + random(`bw${i}`) * 140}
              height={50 + random(`bh${i}`) * 110}
              rx={8}
              fill="rgba(124,58,237,0.07)"
            />
          ))}
          {/* rio */}
          <path d={`M -50 ${MH * 0.75} C ${MW * 0.3} ${MH * 0.68}, ${MW * 0.55} ${MH * 0.9}, ${MW + 50} ${MH * 0.8}`} stroke="rgba(56,90,180,0.35)" strokeWidth={46} fill="none" />
          {ruas.map((r, i) => (
            <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={`rgba(167,139,250,${r.w > 4 ? 0.45 : 0.22})`} strokeWidth={r.w} />
          ))}
          {/* rua das clínicas */}
          <line x1={0} y1={FOCO.y} x2={MW} y2={FOCO.y} stroke="rgba(196,181,253,0.85)" strokeWidth={12} />
          <text x={FOCO.x + 520} y={FOCO.y - 18} fill="rgba(221,214,254,0.75)" fontFamily={fontFamily} fontWeight={700} fontSize={26}>
            {m.rua}
          </text>
        </svg>
      </div>
      {/* vinheta */}
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, rgba(7,13,33,0) 35%, rgba(7,13,33,0.92) 80%)'}} />
      <div style={{position: 'absolute', top: L.safeTop + 20, left: 0, right: 0}}>
        <Linha atraso={6} tamanho={L.vertical ? 64 : 56} peso={800}>
          📍 {m.regiao}
        </Linha>
      </div>
      {/* linha tracejada + distância */}
      <svg style={{position: 'absolute', left: 0, top: 0}} width={L.W} height={L.H}>
        <line
          x1={pinoA.x}
          y1={pinoA.y + 36}
          x2={pinoA.x + (pinoB.x - pinoA.x) * tracejado}
          y2={pinoB.y + 36}
          stroke="white"
          strokeWidth={5}
          strokeDasharray="14 12"
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: pinoA.y + 60,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily,
          fontWeight: 800,
          fontSize: 44,
          color: 'white',
          opacity: tracejado,
          textShadow: '0 4px 20px rgba(0,0,0,0.6)',
        }}
      >
        ↔ {m.distancia}
      </div>
      <Pino x={pinoA.x} y={pinoA.y} rotulo={m.clinicaA} marca={false} atraso={30} />
      <Pino x={pinoB.x} y={pinoB.y} rotulo={m.clinicaB} marca atraso={40} />
      <div style={{position: 'absolute', top: L.vertical ? 1130 : L.H - 230, left: 70, right: 70}}>
        <Linha atraso={58} tamanho={L.vertical ? 60 : 54} peso={700}>
          {m.legenda}
        </Linha>
      </div>
    </AbsoluteFill>
  );
};
