import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {ClinicaFrente, ClinicaFundo, ClinicaMeio, Maca} from '../backgrounds/Clinica';
import {Camila} from '../character/Camila';
import {Celular} from '../character/Celular';
import {Paciente} from '../character/Paciente';
import type {Roteiro} from '../data/schema';
import {BalaoPensamento} from '../components/BalaoPensamento';
import {Legenda} from '../components/Legenda';
import {BalaoFala} from '../components/Notificacao';
import {Palco} from '../components/Palco';
import {Relogio} from '../components/Relogio';
import {filtroAto} from '../theme';
import {useCameraLeve, vibracaoEm} from './comum';

export const CLINICA_CAMILA = {x: 30, y: 500, largura: 620};
export const CELULAR_BANCADA = {x: 930, y: 950};

/** Celular em pé sobre a bancada, com vibração */
export const CelularBancada: React.FC<{vibracoes: number[]; brilho?: number}> = ({vibracoes, brilho}) => {
  const frame = useCurrentFrame();
  const v = vibracaoEm(frame, vibracoes);
  return (
    <svg width={240} height={260} viewBox="-120 -130 240 260" style={{position: 'absolute', left: CELULAR_BANCADA.x - 120, top: CELULAR_BANCADA.y - 130, overflow: 'visible'}}>
      <Celular largura={70} brilho={brilho ?? 0.2 + v * 0.8} vibra={v} frame={frame} />
    </svg>
  );
};

export const Cena1Procedimento: React.FC<{roteiro: Roteiro}> = ({roteiro}) => {
  const c = roteiro.cena1;
  const cam = useCameraLeve(-20, 20, 1, 1.05);
  return (
    <Palco filtro={filtroAto(1)}>
      <Camera
        pan={cam.pan}
        zoom={cam.zoom}
        fundo={<ClinicaFundo />}
        meio={
          <>
            <ClinicaMeio />
            <CelularBancada vibracoes={c.vibracoes} />
          </>
        }
        personagem={
          <Maca>
            <div style={{position: 'absolute', left: CLINICA_CAMILA.x, top: CLINICA_CAMILA.y}}>
              <Camila largura={CLINICA_CAMILA.largura} poses={c.poses} expressoes={c.expressoes} />
            </div>
            <div style={{position: 'absolute', left: 430, top: 1000}}>
              <Paciente largura={640} />
            </div>
          </Maca>
        }
        frente={<ClinicaFrente />}
      />
      {c.mensagens.map((m, i) => (
        <BalaoFala key={i} texto={m.texto} inicio={m.f} x={520 + (i % 2) * 40} y={810 - i * 128} largura={480} rabicho="direita" tamanho={38} />
      ))}
      <BalaoPensamento texto={c.pensamento.texto} inicio={c.pensamento.inicio} fim={c.pensamento.fim} x={60} y={420} largura={500} cabecaX={330} cabecaY={640} />
      <Relogio hora={c.relogio} />
      <Legenda top={1188} inicio={c.legenda.inicio} fim={c.legenda.fim} linhas={c.legenda.linhas.map((t) => ({texto: t, tamanho: 64}))} />
    </Palco>
  );
};
