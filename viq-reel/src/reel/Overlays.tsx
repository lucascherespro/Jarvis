import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, TEXTS} from './config';
import {fontFamily} from './font';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

const bigText: React.CSSProperties = {
  fontFamily,
  fontWeight: 800,
  color: 'white',
  textAlign: 'center',
  lineHeight: 1.08,
  letterSpacing: -1.5,
  textWrap: 'balance',
  textShadow: '0 6px 30px rgba(0,0,0,0.45)',
};

/** Linha de texto que entra com spring (sobe + aparece) */
const Line: React.FC<{delay: number; size: number; color?: string; children: React.ReactNode; weight?: number}> = ({
  delay,
  size,
  color = 'white',
  children,
  weight = 800,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 140}});
  return (
    <div
      style={{
        ...bigText,
        fontSize: size,
        fontWeight: weight,
        color,
        opacity: interpolate(s, [0, 0.5], [0, 1], clamp),
        translate: `0px ${interpolate(s, [0, 1], [50, 0])}px`,
        scale: interpolate(s, [0, 1], [0.9, 1]),
      }}
    >
      {children}
    </div>
  );
};

const Panel: React.FC<{children: React.ReactNode; top: number; opacity?: number}> = ({children, top, opacity = 1}) => (
  <div style={{position: 'absolute', top, left: 60, right: 60, display: 'flex', justifyContent: 'center', opacity}}>
    <div
      style={{
        padding: '44px 30px',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: 44,
        background: 'rgba(11,21,48,0.72)',
        backdropFilter: 'blur(18px)',
        border: '2px solid rgba(167,139,250,0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      {children}
    </div>
  </div>
);

// ---------------------------------------------------------------- [0–2,5s] Gancho
export const HookOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const out = interpolate(frame, [1, 7, durationInFrames - 8, durationInFrames], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill>
      <Panel top={760} opacity={out}>
        <Line delay={2} size={86}>
          {TEXTS.hook1}
        </Line>
        <Line delay={12} size={104} color={COLORS.purpleLight}>
          {TEXTS.hook2}
        </Line>
      </Panel>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- [11–14s] 08:00 sem VIQ
export const MorningAOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const dim = interpolate(frame, [0, 10, durationInFrames - 4, durationInFrames], [0, 0.55, 0.55, 0.2], clamp);
  const panel = interpolate(frame, [2, 8], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: `rgba(5,8,20,${dim})`}} />
      <Panel top={800} opacity={panel}>
        <Line delay={4} size={84}>
          {TEXTS.morningA1}
        </Line>
        <Line delay={20} size={80} color={COLORS.red}>
          {TEXTS.morningA2}
        </Line>
      </Panel>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- [14–16,5s] Rebobinada VHS
export const RewindOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const icon = spring({frame, fps, config: {damping: 10, stiffness: 180}});
  const pulse = 1 + 0.06 * Math.sin(frame / 2.2);
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);
  const bandY = (frame * 67) % 2100 - 200;
  return (
    <AbsoluteFill style={{opacity: out}}>
      <AbsoluteFill style={{background: 'rgba(10,6,30,0.6)'}} />
      {/* linhas de varredura */}
      <AbsoluteFill
        style={{
          background: 'repeating-linear-gradient(180deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0.28) 3px, transparent 3px, transparent 7px)',
          translate: `0px ${(frame * 3) % 7}px`,
        }}
      />
      {/* faixa de tracking da fita */}
      <div
        style={{
          position: 'absolute',
          top: bandY,
          left: 0,
          right: 0,
          height: 90,
          background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.22), rgba(255,255,255,0.05), transparent)',
          filter: 'blur(2px)',
        }}
      />
      {new Array(14).fill(0).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: random(`ny${i}-${Math.floor(frame / 2)}`) * 1920,
            left: random(`nx${i}-${Math.floor(frame / 2)}`) * 900,
            width: 80 + random(`nw${i}-${Math.floor(frame / 2)}`) * 300,
            height: 3,
            background: 'rgba(255,255,255,0.55)',
          }}
        />
      ))}
      {/* rótulo VHS */}
      <div style={{position: 'absolute', top: 310, left: 80, fontFamily, fontWeight: 800, fontSize: 46, color: 'white', letterSpacing: 4, opacity: frame % 16 < 10 ? 1 : 0.2, textShadow: '3px 0 #ff2a6d, -3px 0 #05d9e8'}}>
        ◀◀ REW
      </div>
      {/* ícone ◀◀ grande */}
      <div style={{position: 'absolute', top: 700, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <svg
          width="300"
          height="200"
          viewBox="0 0 300 200"
          style={{scale: icon * pulse, filter: 'drop-shadow(6px 0 0 rgba(255,42,109,0.8)) drop-shadow(-6px 0 0 rgba(5,217,232,0.8))'}}
        >
          <polygon points="150,10 150,190 10,100" fill="white" />
          <polygon points="290,10 290,190 150,100" fill="white" />
        </svg>
      </div>
      <div style={{position: 'absolute', top: 960, width: '100%', display: 'flex', flexDirection: 'column', gap: 10}}>
        <Line delay={6} size={74}>
          <span style={{textShadow: '4px 0 rgba(255,42,109,0.7), -4px 0 rgba(5,217,232,0.7)'}}>{TEXTS.rewind1}</span>
        </Line>
        <Line delay={18} size={84} color={COLORS.purpleLight}>
          {TEXTS.rewind2}
        </Line>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- [26–29s] Bom dia com VIQ
const Confetti: React.FC = () => {
  const frame = useCurrentFrame();
  const colors = ['#7C3AED', '#A78BFA', '#C4B5FD', '#8B5CF6', '#DDD6FE'];
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      {new Array(70).fill(0).map((_, i) => {
        const x0 = random(`cx${i}`) * 1080;
        const delay = random(`cd${i}`) * 30;
        const speed = 9 + random(`cv${i}`) * 9;
        const t = Math.max(0, frame - delay);
        const y = -60 + t * speed;
        const x = x0 + Math.sin(t / 8 + i) * 40;
        const w = 14 + random(`cw${i}`) * 14;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: w,
              height: w * 0.45,
              background: colors[i % colors.length],
              borderRadius: 3,
              rotate: `${t * (6 + random(`cr${i}`) * 10)}deg`,
              opacity: frame < delay ? 0 : 0.85,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const MorningBOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [0, 10], [0, 0.5], clamp);
  const panel = interpolate(frame, [0, 6], [0, 1], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{background: `rgba(5,8,20,${dim})`}} />
      <Confetti />
      <Panel top={720} opacity={panel}>
        <Line delay={3} size={116}>
          {TEXTS.morningB1}
        </Line>
        <Line delay={14} size={70} weight={700}>
          {TEXTS.morningB2}
        </Line>
        <Line delay={24} size={72} color={COLORS.greenText}>
          {TEXTS.morningB3}
        </Line>
      </Panel>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- [29–32s] Final
const Logo: React.FC<{logoFile: string}> = ({logoFile}) => {
  if (logoFile) {
    return <Img src={staticFile(logoFile)} style={{height: 220, maxWidth: 700, objectFit: 'contain'}} />;
  }
  // Wordmark de reserva (use o LOGOTIPO.png colocando-o em public/ e definindo logoFile)
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
      <div
        style={{
          width: 170,
          height: 170,
          borderRadius: 44,
          background: `linear-gradient(135deg, ${COLORS.purpleLight}, ${COLORS.purple})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily,
          fontWeight: 800,
          fontSize: 120,
          color: 'white',
          boxShadow: '0 20px 60px rgba(124,58,237,0.55)',
        }}
      >
        V
      </div>
      <div style={{fontFamily, fontWeight: 800, fontSize: 170, color: 'white', letterSpacing: -4, lineHeight: 1}}>
        VIQ
      </div>
    </div>
  );
};

export const FinalOverlay: React.FC<{logoFile: string}> = ({logoFile}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const logo = spring({frame: frame - 2, fps, config: {damping: 200}, durationInFrames: 22});
  const pulse = 1 + 0.07 * Math.max(0, Math.sin((frame - 30) / 4.5));
  // últimos frames: some e revela a tela de bloqueio às 21:00 (loop com o 1º frame)
  const loopOut = interpolate(frame, [durationInFrames - 13, durationInFrames - 1], [1, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.quad),
  });
  const intro = interpolate(frame, [0, 8], [0, 1], clamp);
  return (
    <AbsoluteFill style={{opacity: Math.min(intro, loopOut)}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 38%, #1B2556 0%, ${COLORS.navy} 62%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 470,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          opacity: logo,
          scale: interpolate(logo, [0, 1], [0.6, 1], {output: 'perceptual-scale'}),
        }}
      >
        <Logo logoFile={logoFile} />
      </div>
      <div style={{position: 'absolute', top: 760, left: 90, right: 90}}>
        <Line delay={10} size={66} weight={700}>
          {TEXTS.finalTagline}
        </Line>
      </div>
      <div style={{position: 'absolute', top: 1010, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{scale: pulse}}>
          <Line delay={22} size={112}>
            {TEXTS.finalCtaPrefix}{' '}
            <span style={{color: COLORS.purpleLight, textShadow: `0 0 34px ${COLORS.purple}`}}>{TEXTS.finalCtaWord}</span>
          </Line>
        </div>
      </div>
      <div style={{position: 'absolute', top: 1200, width: '100%'}}>
        <Line delay={32} size={50} weight={600} color="#C7D2FE">
          {TEXTS.handle}
        </Line>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- Elementos fixos
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: 'rgba(255,255,255,0.15)'}} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: 10,
          width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100])}%`,
          background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.purpleLight})`,
          boxShadow: `0 0 14px ${COLORS.purple}`,
        }}
      />
    </AbsoluteFill>
  );
};

export const Seal: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return (
    <AbsoluteFill style={{opacity: interpolate(frame, [0, 8, durationInFrames - 8, durationInFrames], [0, 1, 1, 0], clamp)}}>
      <div style={{position: 'absolute', top: 1370, width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div
          style={{
            fontFamily,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 3,
            color: 'rgba(255,255,255,0.9)',
            padding: '8px 20px',
            borderRadius: 10,
            background: 'rgba(11,21,48,0.6)',
            border: '1.5px solid rgba(255,255,255,0.35)',
          }}
        >
          {TEXTS.seal}
        </div>
      </div>
    </AbsoluteFill>
  );
};
