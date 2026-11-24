import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ALUNA_CACHEADA, Aparencia, CARLA, PROFESSORA} from '../character/aparencia';
import {Personagem} from '../character/Personagem';
import type {Chave, NomeExpressao, NomePose} from '../character/rig';
import {Palco} from '../components/Palco';
import {clamp, cores, curvas, fontFamily} from '../theme';
import {Lousa} from './Lousa';

export const ALUNAS = {carla: CARLA, cacheada: ALUNA_CACHEADA} as const;

/** Balão de fala com rabicho apontando para a esquerda (para a cabeça da personagem) */
export const Fala: React.FC<{texto: string; inicio: number; fim: number; x: number; y: number; largura: number; tamanho?: number; rabicho?: 'esquerda' | 'baixo'}> = ({
  texto,
  inicio,
  fim,
  x,
  y,
  largura,
  tamanho = 44,
  rabicho = 'esquerda',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < inicio || frame > fim + 8) return null;
  const s = spring({frame: frame - inicio, fps, config: {damping: 12, stiffness: 180}});
  const sai = interpolate(frame, [fim, fim + 8], [1, 0], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: largura,
        scale: s * interpolate(sai, [0, 1], [0.9, 1]),
        opacity: Math.min(sai, interpolate(s, [0, 0.3], [0, 1], clamp)),
        transformOrigin: rabicho === 'esquerda' ? '0% 60%' : '20% 100%',
      }}
    >
      <div style={{position: 'relative', padding: '24px 30px', borderRadius: 36, background: 'white', boxShadow: '0 16px 40px rgba(30,20,70,0.28)', border: `3px solid ${cores.roxoClaro}`, fontFamily, fontWeight: 700, fontSize: tamanho, lineHeight: 1.2, color: '#1F1B2D'}}>
        {texto}
        {rabicho === 'esquerda' ? (
          <div style={{position: 'absolute', left: -30, top: '50%', marginTop: -16, width: 0, height: 0, borderTop: '16px solid transparent', borderBottom: '16px solid transparent', borderRight: '32px solid white'}} />
        ) : (
          <div style={{position: 'absolute', left: 80, bottom: -28, width: 0, height: 0, borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderTop: '30px solid white'}} />
        )}
      </div>
    </div>
  );
};

const ParedeSala: React.FC = () => (
  <svg width={1200} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: -60}}>
    <defs>
      <linearGradient id="paredeSala" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#EDE6FA" />
        <stop offset="1" stopColor="#DCD1F2" />
      </linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#paredeSala)" />
    <rect y={1460} width={1080} height={460} fill="#C9A98A" />
    <rect y={1452} width={1080} height={12} fill="#B08C6C" />
    {/* faixa decorativa */}
    <rect y={1180} width={1080} height={10} fill="#CDBFEA" />
  </svg>
);

/** Mesa da professora (na frente dela) */
const MesaProfessora: React.FC = () => (
  <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0}}>
    <rect x={-40} y={1300} width={760} height={30} rx={8} fill="#B98B63" />
    <rect x={-20} y={1326} width={720} height={600} fill="#A57A55" />
    <rect x={10} y={1360} width={660} height={4} fill="#8F6847" />
    {/* maçã + caneca da VIQ */}
    <circle cx={520} cy={1270} r={30} fill="#D9364A" />
    <path d="M520 1240 q4 -18 18 -22" stroke="#5B3A1E" strokeWidth={5} fill="none" strokeLinecap="round" />
    <ellipse cx={540} cy={1238} rx={12} ry={6} fill="#4F9A5E" transform="rotate(-20 540 1238)" />
    <rect x={590} y={1236} width={58} height={64} rx={12} fill={cores.roxo} />
    <path d="M648 1250 q20 2 18 18 q-2 16 -18 16" stroke={cores.roxo} strokeWidth={8} fill="none" />
    <text x={619} y={1278} textAnchor="middle" fontFamily={fontFamily} fontWeight={800} fontSize={22} fill="white">
      VIQ
    </text>
  </svg>
);

/** Cena da lousa: professora à esquerda, apontando para a lousa, com balão de fala */
export const CenaLousa: React.FC<{
  poses: Chave<NomePose>[];
  expressoes: Chave<NomeExpressao>[];
  fala?: {texto: string; inicio: number; fim: number};
  etiqueta?: string;
  children?: React.ReactNode;
  zoom?: [number, number];
}> = ({poses, expressoes, fala, etiqueta, children, zoom = [1, 1.04]}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const z = interpolate(frame, [0, durationInFrames], zoom, {...clamp, easing: curvas.suave});
  return (
    <Palco>
      <div style={{position: 'absolute', inset: 0, scale: z, transformOrigin: '50% 40%'}}>
        <ParedeSala />
        <Lousa etiqueta={etiqueta}>{children}</Lousa>
        <div style={{position: 'absolute', left: -40, top: 760}}>
          <Personagem aparencia={PROFESSORA} largura={560} poses={poses} expressoes={expressoes} falando={fala ? [{inicio: fala.inicio, fim: fala.fim - 10}] : []} />
        </div>
        <MesaProfessora />
      </div>
      {fala ? <Fala texto={fala.texto} inicio={fala.inicio} fim={fala.fim} x={410} y={1040} largura={620} tamanho={40} /> : null}
    </Palco>
  );
};

/** Plano da aluna: carteira, aluna em close e pergunta num balão acima */
export const CenaAluna: React.FC<{aluna: Aparencia; fala: string; rotulo: string; poses: Chave<NomePose>[]; expressoes: Chave<NomeExpressao>[]}> = ({aluna, fala, rotulo, poses, expressoes}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const z = interpolate(frame, [0, durationInFrames], [1.02, 1.08], clamp);
  const chip = spring({frame: frame - 4, fps, config: {damping: 200}, durationInFrames: 10});
  return (
    <Palco>
      <div style={{position: 'absolute', inset: 0, scale: z, transformOrigin: '50% 50%'}}>
        <svg width={1200} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: -60}}>
          <rect width={1080} height={1920} fill="#E7DEF7" />
          {/* janela */}
          <rect x={660} y={420} width={330} height={460} rx={20} fill="#CFE6FA" />
          <rect x={660} y={420} width={330} height={460} rx={20} fill="none" stroke="white" strokeWidth={16} />
          <line x1={825} y1={420} x2={825} y2={880} stroke="white" strokeWidth={10} />
          {/* mural */}
          <rect x={90} y={460} width={300} height={220} rx={14} fill="#C9A98A" />
          <rect x={112} y={482} width={110} height={80} fill="#FFF3B0" transform="rotate(-4 167 522)" />
          <rect x={246} y={492} width={120} height={90} fill="#BFE3FF" transform="rotate(5 306 537)" />
          <rect x={150} y={590} width={140} height={70} fill="#FAD1E6" transform="rotate(2 220 625)" />
        </svg>
        <div style={{position: 'absolute', left: 190, top: 620}}>
          <Personagem aparencia={aluna} largura={700} poses={poses} expressoes={expressoes} falando={[{inicio: 10, fim: durationInFrames - 16}]} />
        </div>
        {/* carteira */}
        <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{position: 'absolute', left: 0, top: 0}}>
          <rect x={60} y={1270} width={960} height={36} rx={10} fill="#E9C9A0" />
          <rect x={90} y={1300} width={900} height={640} fill="#7E68C8" />
          <rect x={250} y={1236} width={220} height={40} rx={6} fill="white" transform="rotate(-3 360 1256)" />
          <line x1={270} y1={1250} x2={440} y2={1242} stroke="#B9B2C6" strokeWidth={4} />
          <rect x={520} y={1250} width={180} height={14} rx={7} fill={cores.roxo} transform="rotate(8 610 1257)" />
        </svg>
      </div>
      <div style={{position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: chip}}>
        <div style={{padding: '8px 20px', borderRadius: 999, background: 'rgba(11,21,48,0.8)', color: 'white', fontFamily, fontWeight: 800, fontSize: 24, letterSpacing: 2}}>{rotulo}</div>
      </div>
      <Fala texto={fala} inicio={8} fim={durationInFrames} x={90} y={390} largura={900} tamanho={50} rabicho="baixo" />
    </Palco>
  );
};
