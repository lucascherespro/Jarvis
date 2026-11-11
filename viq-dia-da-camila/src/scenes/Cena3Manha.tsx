import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {Bancada, CozinhaFundo, CozinhaMeio} from '../backgrounds/Cozinha';
import {Camila} from '../character/Camila';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {BalaoFala} from '../components/Notificacao';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {clamp, cores, filtroAto, fontFamily} from '../theme';
import {tremida, useCameraLeve} from './comum';

export const Cena3Manha: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const c = roteiro.cena3;
  const cam = useCameraLeve(-16, 16, 1.0, 1.07);
  const t = tremida(frame, c.choque, 16);
  const cont = spring({frame: frame - c.contador.f, fps, config: {damping: 10, stiffness: 150}});
  return (
    <Palco filtro={filtroAto(1)}>
      <AbsoluteFill style={{translate: `${t.x}px ${t.y}px`}}>
        <Camera
          pan={cam.pan}
          zoom={cam.zoom}
          fundo={<CozinhaFundo sol={interpolate(frame, [0, 150], [0.2, 0.5])} />}
          meio={<CozinhaMeio />}
          personagem={
            <>
              <div style={{position: 'absolute', left: 60, top: 520}}>
                <Camila largura={640} poses={c.poses} expressoes={c.expressoes} vibracoes={[c.vibracao]} brilhoCelular={0.9} />
              </div>
              <Bancada />
            </>
          }
        />
      </AbsoluteFill>
      <BalaoFala texto={c.mensagem.texto} inicio={c.mensagem.f} x={500} y={640} largura={520} rabicho="esquerda" />
      {frame >= c.contador.f ? (
        <div style={{position: 'absolute', top: interpolate(cont, [0, 1], [-160, 428]), left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
          <div
            style={{
              padding: '18px 38px',
              borderRadius: 26,
              background: cores.vermelho,
              boxShadow: '0 12px 40px rgba(239,68,68,0.6)',
              fontFamily,
              fontWeight: 800,
              fontSize: 72,
              color: 'white',
              letterSpacing: -1,
              rotate: `${interpolate(cont, [0, 1], [-8, -2], clamp)}deg`,
            }}
          >
            {c.contador.texto}
          </div>
        </div>
      ) : null}
      <Relogio hora={c.relogio} />
      <Legenda top={1188} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((x) => ({texto: x, tamanho: 64}))} />
    </Palco>
  );
};
