import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {ClinicaFrente, ClinicaFundo, ClinicaMeio, Maca} from '../backgrounds/Clinica';
import {Camila} from '../character/Camila';
import {Paciente} from '../character/Paciente';
import type {Roteiro} from '../data/schema';
import {ChipAgendado} from '../components/ChipAgendado';
import {Legenda} from '../components/Legenda';
import {BalaoFala} from '../components/Notificacao';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {clamp, filtroAto} from '../theme';
import {CelularBancada, CLINICA_CAMILA} from './Cena1Procedimento';
import {useCameraLeve} from './comum';

export const Cena4Procedimento: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const frame = useCurrentFrame();
  const c = roteiro.cena4;
  const cam = useCameraLeve(-20, 20, 1, 1.05);
  return (
    <Palco filtro={filtroAto(2)}>
      <Camera
        pan={cam.pan}
        zoom={cam.zoom}
        fundo={<ClinicaFundo />}
        meio={
          <>
            <ClinicaMeio />
            <CelularBancada vibracoes={c.mensagens.map((m) => m.f)} />
          </>
        }
        personagem={
          <Maca>
            <div style={{position: 'absolute', left: CLINICA_CAMILA.x, top: CLINICA_CAMILA.y}}>
              <Camila largura={CLINICA_CAMILA.largura} poses={c.poses} expressoes={c.expressoes} piscadinhas={[c.piscadinha]} />
            </div>
            <div style={{position: 'absolute', left: 430, top: 1000}}>
              <Paciente largura={640} />
            </div>
          </Maca>
        }
        frente={<ClinicaFrente />}
      />
      {c.mensagens.map((m, i) => {
        const prox = c.mensagens[i + 1]?.f ?? 9999;
        if (frame < m.f || frame > prox + 8) return null;
        const saida = interpolate(frame, [prox - 4, prox + 6], [1, 0], clamp);
        return (
          <div key={i} style={{position: 'absolute', inset: 0, opacity: saida}}>
            <BalaoFala texto={`${m.nome}: ${m.texto}`} inicio={m.f} x={560} y={500} largura={460} rabicho="direita" tamanho={36} />
            <BalaoFala texto={m.resposta} inicio={m.f + 16} x={440} y={650} largura={600} tipo="viq" rabicho="direita" tamanho={33} />
            <ChipAgendado texto={m.chip} inicio={m.f + 32} x={640} y={1000} />
          </div>
        );
      })}
      <Relogio hora={c.relogio} />
      <Legenda top={1188} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t) => ({texto: t, tamanho: 64}))} />
    </Palco>
  );
};
