import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {carrossel as c} from '../data/carrossel';
import {Fundo} from '../components/Fundo';
import {AvatarCliente} from '../components/AvatarCliente';
import {cores, fontFamily} from '../theme';

export const TOTAL_SLIDES = 8;

const base: React.CSSProperties = {fontFamily, color: 'white', letterSpacing: -1};

const Rodape: React.FC<{i: number; seta?: boolean}> = ({i, seta = true}) => (
  <div style={{position: 'absolute', left: 80, right: 80, bottom: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...base, letterSpacing: 0}}>
    <div style={{fontSize: 30, fontWeight: 700, color: cores.cinza}}>{c.handle}</div>
    <div style={{display: 'flex', gap: 10}}>
      {new Array(TOTAL_SLIDES).fill(0).map((_, k) => (
        <div key={k} style={{width: k === i ? 34 : 12, height: 12, borderRadius: 6, background: k === i ? cores.roxoClaro : 'rgba(170,180,210,0.35)'}} />
      ))}
    </div>
    <div style={{fontSize: 30, fontWeight: 800, color: seta ? cores.roxoClaro : 'transparent', width: 160, textAlign: 'right'}}>{seta ? '→' : ''}</div>
  </div>
);

const Etiqueta: React.FC<{children: React.ReactNode; cor?: string}> = ({children, cor = cores.roxoClaro}) => (
  <div
    style={{
      display: 'inline-block',
      padding: '10px 22px',
      borderRadius: 999,
      border: `2px solid ${cor}`,
      color: cor,
      fontFamily,
      fontWeight: 800,
      fontSize: 26,
      letterSpacing: 3,
      background: 'rgba(11,21,48,0.6)',
    }}
  >
    {children}
  </div>
);

const Cartao: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      borderRadius: 36,
      background: 'rgba(22,33,74,0.78)',
      border: '2px solid rgba(167,139,250,0.3)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
      ...style,
    }}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------- Slides
const Capa = () => (
  <>
    <div style={{position: 'absolute', top: 150, left: 80, right: 80}}>
      <div style={{display: 'flex', gap: 20, alignItems: 'center', marginBottom: 56}}>
        <AvatarCliente nome="Ju" cor="#F472B6" tamanho={84} />
        <div
          style={{
            ...base,
            letterSpacing: 0,
            padding: '24px 30px',
            borderRadius: 32,
            background: 'rgba(255,255,255,0.9)',
            color: '#111827',
            fontSize: 38,
            fontWeight: 600,
          }}
        >
          quanto é o botox? <span style={{fontSize: 26, color: '#6B7280', marginLeft: 12}}>22:04</span>
        </div>
      </div>
      <div style={{...base, fontSize: 96, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3}}>{c.capa.linha1}</div>
      <div style={{...base, fontSize: 96, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3, color: cores.cinza, marginTop: 18}}>{c.capa.linha2}</div>
      <div style={{...base, fontSize: 64, fontWeight: 800, lineHeight: 1.1, color: cores.vermelho, marginTop: 44, textWrap: 'balance'}}>{c.capa.linha3}</div>
    </div>
    <div style={{position: 'absolute', bottom: 150, left: 80, ...base, letterSpacing: 0, fontSize: 32, fontWeight: 700, color: cores.roxoClaro}}>
      {c.capa.arraste} →
    </div>
  </>
);

const LinhaDoTempo = () => (
  <>
    <div style={{position: 'absolute', top: 110, left: 80, right: 80}}>
      <Etiqueta>O QUE ACONTECE</Etiqueta>
      <div style={{...base, fontSize: 70, fontWeight: 800, lineHeight: 1.08, marginTop: 28, textWrap: 'balance'}}>{c.linhaDoTempo.titulo}</div>
    </div>
    <div style={{position: 'absolute', top: 490, left: 80, right: 80}}>
      <div style={{position: 'absolute', left: 64, top: 30, bottom: 30, width: 4, background: `linear-gradient(180deg, ${cores.roxoClaro}, ${cores.vermelho})`, borderRadius: 2}} />
      {c.linhaDoTempo.eventos.map((e, i) => {
        const ultimo = i === c.linhaDoTempo.eventos.length - 1;
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 28, height: 132}}>
            <div
              style={{
                width: 132,
                flexShrink: 0,
                textAlign: 'center',
                padding: '10px 0',
                borderRadius: 18,
                background: ultimo ? cores.vermelho : cores.navy,
                border: `3px solid ${ultimo ? cores.vermelho : cores.roxoClaro}`,
                ...base,
                letterSpacing: 0,
                fontSize: 32,
                fontWeight: 800,
                position: 'relative',
              }}
            >
              {e.hora}
            </div>
            <div style={{...base, letterSpacing: 0, fontSize: 38, fontWeight: ultimo ? 800 : 600, lineHeight: 1.2, color: ultimo ? '#FCA5A5' : 'white'}}>{e.texto}</div>
          </div>
        );
      })}
    </div>
    <div style={{position: 'absolute', bottom: 140, left: 80, ...base, letterSpacing: 1, fontSize: 24, fontWeight: 700, color: cores.cinza}}>{c.linhaDoTempo.nota.toUpperCase()}</div>
  </>
);

const Teste = () => (
  <>
    <div style={{position: 'absolute', top: 110, left: 80, right: 80}}>
      <Etiqueta>AUTOAVALIAÇÃO</Etiqueta>
      <div style={{...base, fontSize: 96, fontWeight: 800, marginTop: 24, letterSpacing: -3}}>{c.teste.titulo}</div>
      <div style={{...base, letterSpacing: 0, fontSize: 38, fontWeight: 600, color: cores.cinza, marginTop: 8}}>{c.teste.subtitulo}</div>
    </div>
    <div style={{position: 'absolute', top: 400, left: 80, right: 80, display: 'flex', flexDirection: 'column', gap: 22}}>
      {c.teste.itens.map((t, i) => (
        <Cartao key={i} style={{display: 'flex', alignItems: 'center', gap: 26, padding: '28px 30px'}}>
          <div style={{width: 52, height: 52, flexShrink: 0, borderRadius: 14, border: `4px solid ${cores.roxoClaro}`}} />
          <div style={{...base, letterSpacing: 0, fontSize: 38, fontWeight: 600, lineHeight: 1.2}}>{t}</div>
        </Cartao>
      ))}
    </div>
  </>
);

const Resultado = () => (
  <div style={{position: 'absolute', top: 0, bottom: 0, left: 80, right: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
    <div style={{...base, fontSize: 64, fontWeight: 700, color: cores.cinza}}>{c.resultado.linha1}</div>
    <div style={{...base, fontSize: 100, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3, marginTop: 30, textWrap: 'balance'}}>{c.resultado.linha2}</div>
    <div style={{...base, fontSize: 140, fontWeight: 800, lineHeight: 1, letterSpacing: -5, marginTop: 24, color: cores.roxoClaro, textShadow: `0 0 50px ${cores.roxo}`}}>
      {c.resultado.linha3}
    </div>
    <div style={{...base, letterSpacing: 0, fontSize: 40, fontWeight: 500, lineHeight: 1.3, color: '#DDE3F5', marginTop: 56, textWrap: 'balance'}}>{c.resultado.apoio}</div>
  </div>
);

const Dicas = () => (
  <>
    <div style={{position: 'absolute', top: 110, left: 80, right: 80}}>
      <Etiqueta cor={cores.verdeClaro}>FAÇA HOJE</Etiqueta>
      <div style={{...base, fontSize: 84, fontWeight: 800, marginTop: 24, letterSpacing: -2, lineHeight: 1.05}}>{c.dicas.titulo}</div>
      <div style={{...base, letterSpacing: 0, fontSize: 38, fontWeight: 600, color: cores.cinza, marginTop: 6}}>{c.dicas.subtitulo}</div>
    </div>
    <div style={{position: 'absolute', top: 470, left: 80, right: 80, display: 'flex', flexDirection: 'column', gap: 26}}>
      {c.dicas.itens.map((d, i) => (
        <Cartao key={i} style={{display: 'flex', gap: 28, padding: '34px 32px', alignItems: 'flex-start'}}>
          <div
            style={{
              width: 84,
              height: 84,
              flexShrink: 0,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${cores.roxoClaro}, ${cores.roxo})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...base,
              fontSize: 48,
              fontWeight: 800,
            }}
          >
            {i + 1}
          </div>
          <div>
            <div style={{...base, letterSpacing: 0, fontSize: 42, fontWeight: 800}}>{d.titulo}</div>
            <div style={{...base, letterSpacing: 0, fontSize: 34, fontWeight: 500, lineHeight: 1.28, color: '#DDE3F5', marginTop: 8}}>{d.texto}</div>
          </div>
        </Cartao>
      ))}
    </div>
  </>
);

const Limite = () => (
  <>
    <div style={{position: 'absolute', top: 170, left: 80, right: 80}}>
      <div style={{...base, fontSize: 84, fontWeight: 800, color: cores.verdeClaro}}>{c.limite.linha1}</div>
      <div style={{...base, fontSize: 84, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2, marginTop: 20, textWrap: 'balance'}}>{c.limite.linha2}</div>
    </div>
    <div style={{position: 'absolute', top: 640, left: 80, right: 80, display: 'flex', flexDirection: 'column', gap: 22}}>
      {c.limite.itens.map((t, i) => (
        <Cartao key={i} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '30px 30px', borderColor: 'rgba(239,68,68,0.45)'}}>
          <div style={{width: 56, height: 56, flexShrink: 0, borderRadius: '50%', background: 'rgba(239,68,68,0.18)', border: `3px solid ${cores.vermelho}`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...base, fontSize: 32, fontWeight: 800, color: cores.vermelho}}>
            ✕
          </div>
          <div style={{...base, letterSpacing: 0, fontSize: 40, fontWeight: 600}}>{t}</div>
        </Cartao>
      ))}
    </div>
  </>
);

const Viq = () => (
  <>
    <div style={{position: 'absolute', top: 110, left: 80, right: 80}}>
      <Etiqueta>A SOLUÇÃO</Etiqueta>
      <div style={{...base, fontSize: 84, fontWeight: 800, marginTop: 24, letterSpacing: -2, lineHeight: 1.05, textWrap: 'balance'}}>
        É aqui que entra a <span style={{color: cores.roxoClaro, textShadow: `0 0 40px ${cores.roxo}`}}>VIQ</span>
      </div>
    </div>
    <div style={{position: 'absolute', top: 420, left: 80, right: 80, display: 'flex', flexDirection: 'column', gap: 22}}>
      {c.viq.itens.map((t, i) => (
        <Cartao key={i} style={{display: 'flex', alignItems: 'center', gap: 24, padding: '30px 30px', borderColor: 'rgba(37,211,102,0.45)'}}>
          <div style={{width: 56, height: 56, flexShrink: 0, borderRadius: '50%', background: 'rgba(37,211,102,0.18)', border: `3px solid ${cores.verde}`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...base, fontSize: 32, fontWeight: 800, color: cores.verdeClaro}}>
            ✓
          </div>
          <div style={{...base, letterSpacing: 0, fontSize: 38, fontWeight: 600, lineHeight: 1.22}}>{t}</div>
        </Cartao>
      ))}
    </div>
  </>
);

const Cta = () => (
  <div style={{position: 'absolute', top: 0, bottom: 0, left: 80, right: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 70}}>
      <div style={{width: 110, height: 110, borderRadius: 30, background: `linear-gradient(135deg, ${cores.roxoClaro}, ${cores.roxo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...base, fontSize: 76, fontWeight: 800, boxShadow: `0 0 50px ${cores.roxo}`}}>V</div>
      <div style={{...base, fontSize: 110, fontWeight: 800, letterSpacing: -4}}>VIQ</div>
    </div>
    <div style={{...base, fontSize: 76, fontWeight: 800, lineHeight: 1.08}}>{c.cta.linha1}</div>
    <div style={{...base, fontSize: 76, fontWeight: 800, lineHeight: 1.08}}>{c.cta.linha2}</div>
    <div
      style={{
        marginTop: 60,
        padding: '30px 56px',
        borderRadius: 999,
        background: `linear-gradient(135deg, ${cores.roxoClaro}, ${cores.roxo})`,
        boxShadow: `0 0 60px ${cores.roxo}`,
        ...base,
        fontSize: 78,
        fontWeight: 800,
      }}
    >
      {c.cta.comenta} {c.cta.palavra}
    </div>
    <div style={{...base, letterSpacing: 0, fontSize: 40, fontWeight: 600, color: '#DDE3F5', marginTop: 30}}>{c.cta.apoio}</div>
    <div style={{...base, letterSpacing: 0, fontSize: 32, fontWeight: 600, color: cores.cinza, marginTop: 70, textWrap: 'balance'}}>📌 {c.cta.salvar}</div>
  </div>
);

const SLIDES = [Capa, LinhaDoTempo, Teste, Resultado, Dicas, Limite, Viq, Cta];

/** Cada frame é um slide (frame 0 = capa) */
export const Carrossel: React.FC = () => {
  const i = Math.min(TOTAL_SLIDES - 1, useCurrentFrame());
  const Slide = SLIDES[i];
  return (
    <AbsoluteFill style={{backgroundColor: cores.navy}}>
      <Fundo offset={i * 40} periodo={TOTAL_SLIDES * 160} />
      <Slide />
      <Rodape i={i} seta={i < TOTAL_SLIDES - 1} />
    </AbsoluteFill>
  );
};
