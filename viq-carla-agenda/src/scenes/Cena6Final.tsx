import React from 'react';
import {Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {BalcaoCarla, ClinicaCarlaFundo, ClinicaCarlaMeio} from '../backgrounds/ClinicaCarla';
import {Personagem} from '../character/Personagem';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {clamp, cores, curvas, filtroAto, fontFamily} from '../theme';
import {useCameraLeve} from './comum';

export const Logo: React.FC<{arquivo: string; altura?: number}> = ({arquivo, altura = 90}) => {
  if (arquivo) return <Img src={staticFile(arquivo)} style={{height: altura, maxWidth: 420, objectFit: 'contain'}} />;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: altura * 0.17}}>
      <div style={{width: altura, height: altura, borderRadius: altura * 0.27, background: `linear-gradient(135deg, ${cores.roxoClaro}, ${cores.roxo})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily, fontWeight: 800, fontSize: altura * 0.68, color: 'white'}}>V</div>
      <div style={{fontFamily, fontWeight: 800, fontSize: altura, color: 'white', letterSpacing: -3, lineHeight: 1}}>VIQ</div>
    </div>
  );
};

/** 52–60 s · Manhã: Carla chega, vê a agenda cheia, sorri para a câmera. Chamada final. */
export const Cena6Final: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = roteiro.cena6;
  const cam = useCameraLeve(-16, 6, 1.0, 1.08);
  const chega = interpolate(frame, [0, 36], [1, 0], {...clamp, easing: curvas.saida});
  const passo = Math.abs(Math.sin(frame / 4)) * 10 * chega;
  const tela = spring({frame: frame - c.tela.f, fps, config: {damping: 14, stiffness: 140}});
  const saiTela = interpolate(frame, [c.tela.sai, c.tela.sai + 10], [1, 0], clamp);
  const cta = spring({frame: frame - c.cta.f, fps, config: {damping: 13, stiffness: 160}});
  const pulso = 1 + 0.05 * Math.max(0, Math.sin((frame - c.cta.f - 20) / 4.5));
  return (
    <Palco filtro={filtroAto(2)}>
      <Camera
        pan={cam.pan}
        zoom={cam.zoom}
        fundo={<ClinicaCarlaFundo luz="manha" />}
        meio={<ClinicaCarlaMeio luz="manha" />}
        personagem={
          <BalcaoCarla>
            <div style={{position: 'absolute', left: 120 + chega * 560, top: 560 - passo}}>
              <Personagem largura={640} poses={c.poses} expressoes={c.expressoes} brilhoCelular={0.9} />
            </div>
          </BalcaoCarla>
        }
      />
      {/* escurece o rodapé na chamada final */}
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(11,21,48,0.95) 0%, rgba(11,21,48,0.85) 34%, rgba(11,21,48,0) 46%)', opacity: interpolate(cta, [0, 1], [0, 1], clamp)}} />
      {frame >= c.tela.f && saiTela > 0 ? (
        <div
          style={{
            position: 'absolute',
            left: 560,
            top: 400,
            width: 470,
            boxSizing: 'border-box',
            padding: '26px 24px',
            borderRadius: 40,
            background: 'rgba(11,21,48,0.95)',
            border: `3px solid ${cores.roxoClaro}`,
            boxShadow: '0 0 50px rgba(124,58,237,0.5)',
            fontFamily,
            color: 'white',
            opacity: Math.min(saiTela, interpolate(tela, [0, 0.3], [0, 1], clamp)),
            scale: interpolate(tela, [0, 1], [0.5, 1]),
            transformOrigin: '0% 80%',
          }}
        >
          <div style={{fontSize: 40, fontWeight: 800}}>{c.tela.titulo}</div>
          <div style={{fontSize: 22, fontWeight: 700, color: cores.cinza, letterSpacing: 1.5, marginTop: 2}}>{c.tela.subtitulo.toUpperCase()}</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18}}>
            {c.agenda.map((a, i) => {
              const s = spring({frame: frame - c.tela.f - 10 - i * 8, fps, config: {damping: 14, stiffness: 170}});
              return (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '10px 14px', borderRadius: 18, background: 'rgba(255,255,255,0.08)', borderLeft: `6px solid ${cores.verde}`, opacity: interpolate(s, [0, 0.4], [0, 1], clamp), translate: `${interpolate(s, [0, 1], [40, 0])}px 0px`}}>
                  <div style={{fontSize: 28, fontWeight: 800, color: cores.verdeClaro, fontVariantNumeric: 'tabular-nums'}}>{a.hora}</div>
                  <div style={{lineHeight: 1.1}}>
                    <div style={{fontSize: 28, fontWeight: 800}}>{a.nome}</div>
                    <div style={{fontSize: 22, fontWeight: 500, color: cores.cinza}}>{a.procedimento}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
      {frame >= c.cta.f ? (
        <>
          <div style={{position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: cta, scale: interpolate(cta, [0, 1], [0.7, 1]), filter: `drop-shadow(0 4px 20px rgba(11,21,48,0.6))`}}>
            <Logo arquivo={roteiro.logoFile} altura={80} />
          </div>
          <div style={{position: 'absolute', top: 1080, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, fontFamily}}>
            <div style={{scale: cta * pulso}}>
              <div style={{padding: '18px 40px', borderRadius: 999, background: 'rgba(11,21,48,0.92)', border: `3px solid ${cores.roxoClaro}`, boxShadow: `0 0 40px ${cores.roxo}`, fontWeight: 800, fontSize: 76, color: 'white', whiteSpace: 'nowrap'}}>
                {c.cta.texto} <span style={{color: cores.dourado}}>{c.cta.destaque}</span>
              </div>
            </div>
            <div style={{fontWeight: 800, fontSize: 50, color: 'white', opacity: interpolate(frame - c.cta.f, [8, 18], [0, 1], clamp)}}>
              {c.cta.complemento} <span style={{color: '#C7D2FE', fontWeight: 700, fontSize: 40}}>{c.cta.handle}</span>
            </div>
          </div>
        </>
      ) : (
        <Relogio hora={c.relogio} />
      )}
      <Legenda top={1110} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t) => ({texto: t, tamanho: 62}))} />
    </Palco>
  );
};
