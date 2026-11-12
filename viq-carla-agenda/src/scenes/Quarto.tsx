import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {Camera} from '../backgrounds/Camadas';
import {QuartoFrente, QuartoFundo, QuartoMeio} from '../backgrounds/Quarto';
import {CLIENTE} from '../character/aparencia';
import {Personagem} from '../character/Personagem';
import type {Chave, NomeExpressao, NomePose} from '../character/rig';
import {BrilhoTela, useCameraLeve, Vinheta} from './comum';

export const CLIENTE_CAMA = {x: 90, y: 600, largura: 560};

/** Cliente sentada na cama, à noite, com o rosto iluminado pelo celular */
export const CenaCama: React.FC<{poses: Chave<NomePose>[]; expressoes: Chave<NomeExpressao>[]; brilho: number; vibracoes?: number[]}> = ({poses, expressoes, brilho, vibracoes}) => {
  const frame = useCurrentFrame();
  const cam = useCameraLeve(-14, 10, 1.02, 1.1);
  const pulso = 0.85 + 0.15 * Math.sin(frame / 7);
  return (
    <>
      <Camera
        pan={cam.pan}
        zoom={cam.zoom}
        fundo={<QuartoFundo />}
        meio={<QuartoMeio />}
        personagem={
          <>
            <div style={{position: 'absolute', left: CLIENTE_CAMA.x, top: CLIENTE_CAMA.y}}>
              <Personagem aparencia={CLIENTE} largura={CLIENTE_CAMA.largura} poses={poses} expressoes={expressoes} brilhoCelular={brilho} vibracoes={vibracoes} />
            </div>
            <div style={{position: 'absolute', left: -200, top: 1400, width: 1480, height: 700, background: '#151335'}} />
            <QuartoFrente />
            <BrilhoTela x={CLIENTE_CAMA.x + 280} y={CLIENTE_CAMA.y + 330} intensidade={brilho * pulso} raio={300} />
          </>
        }
      />
      <Vinheta forca={interpolate(brilho, [0, 1], [0.75, 0.55])} cor="6,6,24" />
    </>
  );
};
