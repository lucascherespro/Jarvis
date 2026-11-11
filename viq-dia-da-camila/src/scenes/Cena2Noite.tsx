import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {SalaFundo, SalaMeio, SofaFrente} from '../backgrounds/SalaNoite';
import {Camila} from '../character/Camila';
import {Celular} from '../character/Celular';
import type {Roteiro} from '../data/schema';
import {Legenda} from '../components/Legenda';
import {BalaoFala} from '../components/Notificacao';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {clamp, curvas, filtroAto} from '../theme';
import {useCameraLeve, vibracaoEm} from './comum';

export const Cena2Noite: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const c = roteiro.cena2;
  const cam = useCameraLeve(20, -20, 1.02, 1.08);
  const v = vibracaoEm(frame, c.vibracoes);
  const noBraco = interpolate(frame, [c.pegaCelular - 2, c.pegaCelular + 6], [1, 0], clamp);
  // celular escorregando da mão para o assento
  const esc = interpolate(frame, [c.celularEscorrega, c.celularEscorrega + 26], [0, 1], {...clamp, easing: curvas.entrada});
  const rascunhoN = Math.floor(interpolate(frame, [c.rascunho.inicio, c.rascunho.fim], [0, c.rascunho.texto.length], clamp));
  const cursor = frame >= c.rascunho.inicio && Math.floor(frame / 8) % 2 === 0 ? '|' : ' ';
  return (
    <Palco filtro={filtroAto(1)}>
      <Camera
        pan={cam.pan}
        zoom={cam.zoom}
        fundo={<SalaFundo />}
        meio={<SalaMeio />}
        personagem={
          <>
            <div style={{position: 'absolute', left: 130, top: 600}}>
              <Camila largura={620} poses={c.poses} expressoes={c.expressoes} brilhoCelular={0.85} mostrarZzz />
            </div>
            <SofaFrente
              celularNoBraco={
                <>
                  <svg width={200} height={200} viewBox="-100 -100 200 200" style={{position: 'absolute', left: 875, top: 960, opacity: noBraco, overflow: 'visible'}}>
                    <g transform="rotate(-80)">
                      <Celular largura={64} brilho={0.15 + v * 0.85} vibra={v} frame={frame} />
                    </g>
                  </svg>
                  {esc > 0 ? (
                    <svg width={200} height={200} viewBox="-100 -100 200 200" style={{position: 'absolute', left: 300 + esc * 40, top: 1020 + esc * 150, overflow: 'visible'}}>
                      <g transform={`rotate(${-10 - esc * 70})`}>
                        <Celular largura={64} brilho={0.6 * (1 - esc)} frame={frame} />
                      </g>
                    </svg>
                  ) : null}
                </>
              }
            />
          </>
        }
      />
      <BalaoFala texto={c.mensagem.texto} inicio={c.mensagem.f} x={560} y={430} largura={470} rabicho="esquerda" />
      {frame >= c.rascunho.inicio ? (
        <BalaoFala texto={`${c.rascunho.texto.slice(0, rascunhoN)}${cursor}`} inicio={c.rascunho.inicio} x={600} y={620} largura={400} tipo="rascunho" rabicho="esquerda" tamanho={36} />
      ) : null}
      <Relogio hora={c.relogio} />
      <Legenda top={1188} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t) => ({texto: t, tamanho: 64}))} />
    </Palco>
  );
};
