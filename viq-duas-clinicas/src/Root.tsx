import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import {Capa} from './Capa';
import {roteiroPadrao} from './data/roteiro';
import {roteiroSchema} from './data/schema';
import {calcularDuracao, DuasClinicas} from './DuasClinicas';

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="VIQ-Duas-Clinicas">
      <Composition
        id="DuasClinicas"
        component={DuasClinicas}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
        schema={roteiroSchema}
        defaultProps={roteiroPadrao}
        calculateMetadata={calcularDuracao}
      />
      <Composition
        id="DuasClinicasFeed"
        component={DuasClinicas}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1350}
        schema={roteiroSchema}
        defaultProps={roteiroPadrao}
        calculateMetadata={calcularDuracao}
      />
      <Still id="Capa" component={Capa} width={1080} height={1920} schema={roteiroSchema} defaultProps={roteiroPadrao} />
    </Folder>
  );
};
