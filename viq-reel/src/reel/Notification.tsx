import React from 'react';
import {COLORS, TEXTS} from './config';
import {fontFamily} from './font';

export const CARD_W = 940;
export const CLIENT_H = 136;
export const VIQ_H = 204;

export type CardData =
  | {kind: 'client'; name: string; text: string; time: string; color: string}
  | {kind: 'booking' | 'answer'; detail: string; time: string};

const Icon: React.FC<{letter: string; bg: string; ring: number}> = ({letter, bg, ring}) => (
  <div style={{position: 'relative', width: 76, height: 76, flexShrink: 0}}>
    {/* "pop" visual: anel que expande quando a notificação chega */}
    {ring > 0 && ring < 1 ? (
      <div
        style={{
          position: 'absolute',
          inset: -40 * ring,
          borderRadius: 20 + 40 * ring,
          border: `${6 * (1 - ring)}px solid ${bg}`,
          opacity: 1 - ring,
        }}
      />
    ) : null}
    <div
      style={{
        width: 76,
        height: 76,
        borderRadius: 20,
        background: bg,
        color: 'white',
        fontSize: 40,
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {letter}
    </div>
  </div>
);

export const NotificationCard: React.FC<{data: CardData; ring: number; glow: number}> = ({data, ring, glow}) => {
  if (data.kind === 'client') {
    return (
      <div
        style={{
          width: CARD_W,
          height: CLIENT_H,
          boxSizing: 'border-box',
          borderRadius: 36,
          padding: '0 30px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(28px) saturate(160%)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.28)',
          fontFamily,
          color: '#111827',
        }}
      >
        <Icon letter={data.name[0]} bg={data.color} ring={ring} />
        <div style={{flex: 1, minWidth: 0}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 25, fontWeight: 600, color: '#4B5563', letterSpacing: 1}}>
            <span>MENSAGEM</span>
            <span>{data.time}</span>
          </div>
          <div style={{fontSize: 35, fontWeight: 500, marginTop: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            <b style={{fontWeight: 800}}>{data.name}</b> — {data.text}
          </div>
        </div>
      </div>
    );
  }
  const booking = data.kind === 'booking';
  return (
    <div
      style={{
        width: CARD_W,
        height: VIQ_H,
        boxSizing: 'border-box',
        borderRadius: 36,
        padding: '0 30px',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.96), rgba(91,33,182,0.96))',
        border: booking ? `4px solid ${COLORS.green}` : '4px solid rgba(167,139,250,0.7)',
        boxShadow: booking
          ? `0 0 ${18 + 26 * glow}px rgba(37,211,102,${0.45 + 0.4 * glow}), 0 12px 40px rgba(0,0,0,0.3)`
          : '0 12px 40px rgba(0,0,0,0.3)',
        fontFamily,
        color: 'white',
      }}
    >
      <Icon letter="V" bg={COLORS.navy} ring={ring} />
      <div style={{flex: 1, minWidth: 0}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 25, fontWeight: 700, color: '#DDD6FE', letterSpacing: 1}}>
          <span>VIQ · ATENDIMENTO IA</span>
          <span>{data.time}</span>
        </div>
        <div style={{fontSize: 36, fontWeight: 800, marginTop: 6}}>{booking ? TEXTS.bookingTitle : TEXTS.answerTitle}</div>
        <div style={{fontSize: 33, fontWeight: 600, marginTop: 2, whiteSpace: 'nowrap'}}>{data.detail}</div>
        <div style={{fontSize: 28, fontWeight: 700, marginTop: 4, color: COLORS.greenText}}>
          ✓ {booking ? `respondido ${TEXTS.replyTime}` : TEXTS.replyTime}
        </div>
      </div>
    </div>
  );
};
