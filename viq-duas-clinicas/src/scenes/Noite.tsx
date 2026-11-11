import React from 'react';
import {AbsoluteFill, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Roteiro} from '../data/schema';
import {NumeroRolando} from '../components/Contador';
import {Relogio} from '../components/Relogio';
import {SeloSimulacao} from '../components/SeloSimulacao';
import {Linha} from '../components/Texto';
import {useLayout} from '../layout';
import {clamp, cores, fontFamily} from '../theme';
import {minutoNoFrame} from '../timing';
import {MASCARA, PAINEL_A_X, PAINEL_B_X, PAINEL_W, valorB} from './noite/logica';
import {PainelA} from './noite/PainelA';
import {PainelB} from './noite/PainelB';
import {Rodape} from './noite/Rodape';
import {Voos} from './noite/Voo';

const brl = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`;

const Ceu: React.FC<{roteiro: Roteiro; g: number}> = ({roteiro, g}) => {
  const t = roteiro.tempos;
  const noite = interpolate(g, [t.relogioInicio, t.relogioInicio + 160, t.manha - 40, t.manha + 20], [0, 1, 1, 0], clamp);
  const aurora = interpolate(g, [t.manha - 30, t.manha + 30], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: '#03060F', opacity: 0.6 * noite}} />
      <AbsoluteFill style={{opacity: noite}}>
        {new Array(110).fill(0).map((_, i) => {
          const s = 2 + random(`es${i}`) * 3.5;
          const brilho = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(g / (5 + random(`et${i}`) * 7) + i));
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: random(`ex${i}`) * 1080,
                top: random(`ey${i}`) * 1920,
                width: s,
                height: s,
                borderRadius: '50%',
                background: 'white',
                opacity: brilho,
                boxShadow: s > 4.5 ? '0 0 10px 2px rgba(255,255,255,0.7)' : undefined,
              }}
            />
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: aurora,
          background:
            'linear-gradient(180deg, rgba(251,146,60,0.75) 0%, rgba(236,72,153,0.55) 28%, rgba(124,58,237,0.25) 55%, rgba(11,21,48,0) 80%)',
        }}
      />
    </AbsoluteFill>
  );
};

const Confete: React.FC<{g: number; inicio: number; x0: number; largura: number; top: number}> = ({g, inicio, x0, largura, top}) => {
  const f = g - inicio;
  if (f < 0) return null;
  const paleta = ['#7C3AED', '#A78BFA', '#C4B5FD', '#8B5CF6', '#DDD6FE'];
  return (
    <>
      {new Array(40).fill(0).map((_, i) => {
        const atraso = random(`cd${i}`) * 25;
        const t = Math.max(0, f - atraso);
        const w = 12 + random(`cw${i}`) * 12;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x0 + random(`cx${i}`) * largura + Math.sin(t / 8 + i) * 26,
              top: top - 40 + t * (7 + random(`cv${i}`) * 7),
              width: w,
              height: w * 0.45,
              background: paleta[i % paleta.length],
              borderRadius: 3,
              rotate: `${t * (5 + random(`cr${i}`) * 9)}deg`,
              opacity: f < atraso ? 0 : 0.8,
            }}
          />
        );
      })}
    </>
  );
};

/** Cenas 3, 4 e 5: divisão, noite em paralelo e manhã */
export const Noite: React.FC<{roteiro: Roteiro; inicio: number}> = ({roteiro, inicio}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const L = useLayout();
  const g = frame + inicio;
  const t = roteiro.tempos;
  const tx = roteiro.textos;
  const min = minutoNoFrame(g, t);
  const feedH = L.feedBottom - L.feedTop;

  const divisoria = spring({frame: frame - 2, fps, config: {damping: 200}, durationInFrames: 20});
  const relogio = spring({frame: frame - 10, fps, config: {damping: 14}});
  const cabA = spring({frame: frame - 14, fps, config: {damping: 14}});
  const cabB = spring({frame: frame - 20, fps, config: {damping: 14}});
  const extras = interpolate(frame, [48, 62], [0, 1], clamp);
  const manha = interpolate(g, [t.manha, t.manha + 14], [0, 1], clamp);
  const vb = valorB(roteiro, g);

  const colA = (children: React.ReactNode, top: number, height: number, mascara = false) => (
    <div
      style={{
        position: 'absolute',
        left: PAINEL_A_X,
        top,
        width: PAINEL_W,
        height,
        ...(mascara ? {WebkitMaskImage: `linear-gradient(180deg, transparent 0, black ${MASCARA}px)`, maskImage: `linear-gradient(180deg, transparent 0, black ${MASCARA}px)`} : {}),
      }}
    >
      {children}
    </div>
  );

  return (
    <AbsoluteFill>
      <Ceu roteiro={roteiro} g={g} />
      {/* brilho roxo no lado B */}
      <div
        style={{
          position: 'absolute',
          left: 540,
          top: L.cabecalhoY - 40,
          width: 540,
          height: L.rodapeY - L.cabecalhoY + 160,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.28), rgba(124,58,237,0) 70%)',
          opacity: extras * (1 + manha * 0.8),
        }}
      />
      {/* fundo frio do lado A */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: L.cabecalhoY - 40,
          width: 540,
          height: L.rodapeY - L.cabecalhoY + 160,
          background: 'rgba(120,130,150,0.10)',
          opacity: extras,
        }}
      />

      {/* divisória luminosa */}
      <div
        style={{
          position: 'absolute',
          left: 538,
          width: 4,
          top: L.cabecalhoY - 30,
          height: L.rodapeY + 90 - (L.cabecalhoY - 30),
          background: `linear-gradient(180deg, rgba(167,139,250,0), ${cores.roxoClaro} 12%, ${cores.roxo} 88%, rgba(124,58,237,0))`,
          boxShadow: `0 0 24px 4px ${cores.roxo}`,
          scale: `1 ${divisoria}`,
        }}
      />

      <Relogio
        minutos={min}
        dia={min >= 180 ? tx.diaDepois : tx.diaAntes}
        top={L.relogioY}
        tamanho={L.vertical ? 100 : 96}
        style={{opacity: relogio, translate: `0px ${interpolate(relogio, [0, 1], [-30, 0])}px`}}
      />

      {/* LADO A */}
      <div style={{position: 'absolute', inset: 0, filter: `saturate(${0.45 - 0.45 * manha}) brightness(${1 - 0.4 * manha})`}}>
        <div style={{position: 'absolute', left: 0, width: 540, top: L.cabecalhoY, textAlign: 'center', fontFamily, fontWeight: 800, fontSize: 38, letterSpacing: 2, color: cores.aCabecalho, opacity: cabA, translate: `0px ${interpolate(cabA, [0, 1], [24, 0])}px`}}>
          {roteiro.divisao.cabecalhoA}
        </div>
        <div style={{position: 'absolute', left: 0, width: 540, top: L.valorY, textAlign: 'center', fontFamily, fontWeight: 800, fontSize: 40, color: '#9AA3B8', opacity: extras}}>
          {brl(0)} <span style={{fontSize: 24, fontWeight: 600}}>{tx.valorSufixo}</span>
        </div>
        {colA(<PainelA roteiro={roteiro} g={g} feedH={feedH} />, L.feedTop - MASCARA, feedH + MASCARA, true)}
      </div>

      {/* LADO B */}
      <div style={{position: 'absolute', left: 540, width: 540, top: L.cabecalhoY, textAlign: 'center', fontFamily, fontWeight: 800, fontSize: 38, letterSpacing: 1, color: cores.roxoClaro, textShadow: `0 0 22px ${cores.roxo}`, opacity: cabB, translate: `0px ${interpolate(cabB, [0, 1], [24, 0])}px`}}>
        {roteiro.divisao.cabecalhoB}
      </div>
      <div style={{position: 'absolute', left: 540, width: 540, top: L.valorY, textAlign: 'center', fontFamily, fontWeight: 800, fontSize: 40, color: cores.verdeClaro, opacity: extras}}>
        <NumeroRolando valor={vb.total} desde={vb.anterior} ate={vb.total} inicio={(vb.mudouEm ?? 0) - inicio} formatar={brl} />{' '}
        <span style={{fontSize: 24, fontWeight: 600, color: '#C9F5D9'}}>{tx.valorSufixo}</span>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: L.valorY + 50, display: 'flex', justifyContent: 'center', opacity: extras}}>
        <div style={{fontFamily, fontSize: 18, fontWeight: 700, letterSpacing: 2, color: cores.cinza, padding: '3px 12px', borderRadius: 8, background: cores.navy, border: '1px solid rgba(170,180,210,0.4)'}}>
          {tx.seloValores.toUpperCase()}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: PAINEL_B_X,
          top: L.feedTop - MASCARA,
          width: PAINEL_W,
          height: feedH + MASCARA,
          WebkitMaskImage: `linear-gradient(180deg, transparent 0, black ${MASCARA}px)`,
          maskImage: `linear-gradient(180deg, transparent 0, black ${MASCARA}px)`,
          filter: `brightness(${1 + 0.12 * manha})`,
        }}
      >
        <PainelB roteiro={roteiro} g={g} feedH={feedH} />
      </div>

      <div style={{position: 'absolute', inset: 0, filter: undefined}}>
        <Rodape roteiro={roteiro} g={g} L={L} aparece={extras} />
      </div>

      <Voos roteiro={roteiro} g={g} L={L} />

      {/* CENA 5: A MANHÃ */}
      {manha > 0 ? (
        <>
          <div style={{position: 'absolute', left: 0, width: 540, top: L.cabecalhoY - 40, height: L.rodapeY - L.cabecalhoY + 160, background: `rgba(4,6,14,${0.55 * manha})`}} />
          <Confete g={g} inicio={t.manha + 8} x0={560} largura={500} top={L.feedTop} />
          <TextoManha
            x={PAINEL_A_X}
            y={L.centroY - 170}
            atraso={t.manha - inicio + 6}
            l1={roteiro.manha.a1}
            l2={roteiro.manha.a2}
            cor={cores.vermelho}
            borda="rgba(239,68,68,0.6)"
          />
          <TextoManha
            x={PAINEL_B_X}
            y={L.centroY - 170}
            atraso={t.manha - inicio + 18}
            l1={roteiro.manha.b1}
            l2={roteiro.manha.b2}
            cor={cores.verdeClaro}
            borda="rgba(37,211,102,0.7)"
          />
        </>
      ) : null}

      <SeloSimulacao texto={tx.selo} top={L.seloY} opacity={extras} />
    </AbsoluteFill>
  );
};

const TextoManha: React.FC<{x: number; y: number; atraso: number; l1: string; l2: string; cor: string; borda: string}> = ({x, y, atraso, l1, l2, cor, borda}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - atraso, fps, config: {damping: 15}});
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: PAINEL_W,
        boxSizing: 'border-box',
        padding: '34px 24px',
        borderRadius: 36,
        background: 'rgba(11,21,48,0.97)',
        border: `3px solid ${borda}`,
        boxShadow: `0 0 40px ${borda}`,
        opacity: interpolate(s, [0, 0.4], [0, 1], clamp),
        scale: interpolate(s, [0, 1], [0.9, 1]),
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <Linha atraso={atraso} tamanho={44} peso={700}>
        {l1}
      </Linha>
      <Linha atraso={atraso + 8} tamanho={58} cor={cor}>
        {l2}
      </Linha>
    </div>
  );
};
