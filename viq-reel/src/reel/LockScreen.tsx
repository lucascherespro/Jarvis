import React from 'react';
import {AbsoluteFill, Easing, interpolate, interpolateColors, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, NIGHT_A, NIGHT_B, REPLY_DELAY_FRAMES, TEXTS} from './config';
import {fontFamily} from './font';
import {CARD_W, CardData, CLIENT_H, NotificationCard, VIQ_H} from './Notification';
import {arrivalA, arrivalB, clockAt, countA, countB, F, formatClock, phaseAt} from './timeline';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---------------------------------------------------------------- Céu
const Sky: React.FC<{min: number}> = ({min}) => {
  const frame = useCurrentFrame();
  const keys = [0, 150, 470, 585, 660];
  const top = interpolateColors(min, keys, ['#2E1065', '#0A0920', '#0A0920', '#3B1D7A', '#6D28D9']);
  const mid = interpolateColors(min, keys, ['#4C1D95', '#130F38', '#130F38', '#9D3C8E', '#EC4899']);
  const bot = interpolateColors(min, keys, ['#6D28D9', '#1E1550', '#1E1550', '#F97366', '#FDBA74']);
  const starsOpacity = interpolate(min, [0, 110, 470, 590], [0.25, 1, 1, 0], clamp);
  const sun = interpolate(min, [540, 660], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${top} 0%, ${mid} 55%, ${bot} 100%)`}}>
      <AbsoluteFill style={{opacity: starsOpacity}}>
        {new Array(90).fill(0).map((_, i) => {
          const x = random(`sx${i}`) * 1080;
          const y = random(`sy${i}`) * 1500;
          const s = 2 + random(`ss${i}`) * 4;
          const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(frame / (4 + random(`st${i}`) * 6) + i));
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: s,
                height: s,
                borderRadius: '50%',
                background: 'white',
                opacity: tw,
                boxShadow: s > 4.5 ? '0 0 10px 2px rgba(255,255,255,0.8)' : undefined,
              }}
            />
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: sun,
          background: 'radial-gradient(circle at 50% 108%, rgba(255,214,140,0.95) 0%, rgba(253,164,120,0.55) 28%, rgba(253,164,120,0) 60%)',
        }}
      />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- Relógio
const Clock: React.FC<{min: number}> = ({min}) => {
  const frame = useCurrentFrame();
  const weekday = min >= 180 ? TEXTS.weekdayAfter : TEXTS.weekdayBefore;
  return (
    <div
      style={{
        position: 'absolute',
        top: 300,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontFamily,
        textShadow: '0 4px 30px rgba(0,0,0,0.35)',
        transformOrigin: '50% 40%',
        scale: interpolate(frame, [0, F.nightAStart, F.nightAStart + 18], [1, 1.12, 1], {
          ...clamp,
          easing: [Easing.inOut(Easing.quad), Easing.bezier(0.16, 1, 0.3, 1)],
        }),
      }}
    >
      <div style={{fontSize: 42, fontWeight: 600, opacity: 0.92, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14}}>
        <svg width="30" height="38" viewBox="0 0 30 38">
          <rect x="2" y="16" width="26" height="20" rx="5" fill="white" />
          <path d="M8 17 V11 a7 7 0 0 1 14 0 V17" stroke="white" strokeWidth="4" fill="none" />
        </svg>
        {weekday}
      </div>
      <div style={{fontSize: 200, fontWeight: 700, lineHeight: 1, marginTop: 4, letterSpacing: -4, fontVariantNumeric: 'tabular-nums'}}>
        {formatClock(min)}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- Contador
const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = phaseAt(frame);
  if (p === 'hook' || p === 'end') return null;
  const isB = p === 'B';
  const n = isB ? countB(frame) : countA(frame);
  // frame em que o número mudou pela última vez -> "bump"
  let changed = 0;
  for (let k = frame; k > frame - 20; k--) {
    if ((isB ? countB(k) : countA(k)) !== n) {
      changed = k + 1;
      break;
    }
  }
  const bump = changed ? spring({frame: frame - changed, fps, config: {damping: 9, stiffness: 220}}) : 1;
  const appear = interpolate(frame, isB ? [F.nightBStart, F.nightBStart + 10] : [F.nightAStart, F.nightAStart + 10], [0, 1], clamp);
  const color = isB ? COLORS.green : COLORS.red;
  return (
    <div style={{position: 'absolute', top: 560, width: '100%', display: 'flex', justifyContent: 'center', opacity: appear}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '14px 32px',
          borderRadius: 999,
          background: 'rgba(11,21,48,0.82)',
          border: `3px solid ${color}`,
          fontFamily,
          fontSize: 40,
          fontWeight: 700,
          color: 'white',
          scale: changed ? interpolate(bump, [0, 1], [1.18, 1]) : 1,
        }}
      >
        <div style={{width: 20, height: 20, borderRadius: '50%', background: color, boxShadow: `0 0 16px ${color}`}} />
        {isB ? TEXTS.counterB : TEXTS.counterA}:
        <span style={{color, fontWeight: 800, fontSize: 48, minWidth: 56, textAlign: 'left'}}>{n}</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- Feed de notificações
type FeedItem = {key: string; data: CardData; h: number; arrival: number; presence?: number};

const FEED_TOP = 690;
const FEED_H = 640;
const GAP = 18;

const Feed: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = phaseAt(frame);
  const min = clockAt(frame);

  let items: FeedItem[] = [];
  if (p === 'A' || p === 'rewind') {
    items = NIGHT_A.filter((m) => m.name).map((m, i) => ({
      key: `a${i}`,
      data: {kind: 'client', name: m.name!, text: m.text!, time: formatClock(m.min), color: m.color!},
      h: CLIENT_H,
      arrival: arrivalA(m.min),
      presence: p === 'rewind' ? interpolate(min, [m.min - 25, m.min], [0, 1], clamp) : undefined,
    }));
  } else if (p === 'B') {
    NIGHT_B.forEach((m, i) => {
      items.push({
        key: `b${i}`,
        data: {kind: 'client', name: m.name!, text: m.text!, time: formatClock(m.min), color: m.color!},
        h: CLIENT_H,
        arrival: arrivalB(m.min),
      });
      items.push({
        key: `v${i}`,
        data: {kind: m.reply.kind, detail: m.reply.detail, time: formatClock(m.min)},
        h: VIQ_H,
        arrival: arrivalB(m.min) + REPLY_DELAY_FRAMES,
      });
    });
  }

  const states = items.map((it) => {
    if (it.presence !== undefined) return {...it, layout: it.presence, drop: it.presence, local: 999};
    const local = frame - it.arrival;
    const layout = local < 0 ? 0 : spring({frame: local, fps, config: {damping: 200}, durationInFrames: 12});
    const drop = local < 0 ? 0 : spring({frame: local, fps, config: {damping: 11, stiffness: 160}});
    return {...it, layout, drop, local};
  });

  const total = states.reduce((acc, s) => acc + (s.h + GAP) * s.layout, 0);
  const offset = Math.max(0, total - FEED_H);
  let cursor = -offset;

  return (
    <div
      style={{
        position: 'absolute',
        top: FEED_TOP - 40,
        left: (1080 - CARD_W) / 2,
        width: CARD_W,
        height: FEED_H + 40,
        WebkitMaskImage: 'linear-gradient(180deg, transparent 0px, black 70px, black 100%)',
        maskImage: 'linear-gradient(180deg, transparent 0px, black 70px, black 100%)',
      }}
    >
      {states.map((s) => {
        const y = cursor + 40;
        cursor += (s.h + GAP) * s.layout;
        if (s.layout <= 0.001 && s.drop <= 0.001) return null;
        const ring = interpolate(s.local, [5, 20], [0, 1], clamp);
        const glow = 0.5 + 0.5 * Math.sin(frame / 5);
        return (
          <div
            key={s.key}
            style={{
              position: 'absolute',
              top: y,
              left: 0,
              opacity: interpolate(s.drop, [0, 0.4], [0, 1], clamp),
              translate: `0px ${interpolate(s.drop, [0, 1], [-240, 0])}px`,
              scale: interpolate(s.drop, [0, 1], [0.92, 1]),
            }}
          >
            <NotificationCard data={s.data} ring={s.local < 999 ? ring : 0} glow={glow} />
          </div>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------- Tela de bloqueio
export const LockScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const min = clockAt(frame);
  const p = phaseAt(frame);

  // leve tremida de câmera às 08:00 (noite sem VIQ)
  const shakeAmt = interpolate(frame, [F.morningA, F.morningA + 4, F.morningA + 26], [0, 1, 0], clamp);
  const shakeX = (random(`shx${frame}`) - 0.5) * 34 * shakeAmt;
  const shakeY = (random(`shy${frame}`) - 0.5) * 34 * shakeAmt;

  // VHS durante a rebobinada
  const vhs = p === 'rewind' ? interpolate(frame, [F.rewindStart, F.rewindStart + 5, F.nightBStart - 6, F.nightBStart], [0, 1, 1, 0], clamp) : 0;
  const jitter = vhs * (random(`j${frame}`) - 0.5) * 24;
  const split = vhs * (6 + random(`cs${frame}`) * 10);

  return (
    <AbsoluteFill
      style={{
        translate: `${shakeX + jitter}px ${shakeY}px`,
        filter: vhs > 0 ? 'url(#vhs-split) saturate(1.3) contrast(1.1)' : undefined,
        transform: vhs > 0 ? `skewX(${(random(`sk${frame}`) - 0.5) * 4 * vhs}deg)` : undefined,
        scale: 1.04, // margem para tremida não mostrar bordas
      }}
    >
      <svg width="0" height="0" style={{position: 'absolute'}}>
        <filter id="vhs-split" x="-5%" y="-5%" width="110%" height="110%">
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
          <feOffset in="r" dx={split} dy="0" result="r2" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
          <feOffset in="b" dx={-split} dy="0" result="b2" />
          <feBlend in="r2" in2="g" mode="screen" result="rg" />
          <feBlend in="rg" in2="b2" mode="screen" />
        </filter>
      </svg>
      <Sky min={min} />
      <Clock min={min} />
      <Counter />
      <Feed />
    </AbsoluteFill>
  );
};
