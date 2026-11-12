import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import {AgendaDaCarla, calcularDuracao} from './AgendaDaCarla';
import {Capa} from './Capa';
import {roteiroPadrao} from './data/roteiro';
import {roteiroSchema} from './data/schema';
import {TesteRig} from './TesteRig';

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="VIQ-Agenda-da-Carla">
      <Composition id="AgendaDaCarla" component={AgendaDaCarla} durationInFrames={1800} fps={30} width={1080} height={1920} schema={roteiroSchema} defaultProps={roteiroPadrao} calculateMetadata={calcularDuracao} />
      <Composition id="AgendaDaCarlaFeed" component={AgendaDaCarla} durationInFrames={1800} fps={30} width={1080} height={1350} schema={roteiroSchema} defaultProps={roteiroPadrao} calculateMetadata={calcularDuracao} />
      <Still id="Capa" component={Capa} width={1080} height={1920} schema={roteiroSchema} defaultProps={roteiroPadrao} />
    </Folder>
    <Folder name="Referencia">
      <Composition id="TesteRig" component={TesteRig} durationInFrames={60} fps={30} width={2200} height={2000} />
    </Folder>
  </>
);
