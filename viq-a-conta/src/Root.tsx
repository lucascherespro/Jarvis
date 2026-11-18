import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import {AConta, calcularDuracao, Capa} from './Conta';
import {roteiroPadrao} from './data/roteiro';
import {roteiroSchema} from './data/schema';

export const RemotionRoot: React.FC = () => (
  <Folder name="VIQ-A-Conta">
    <Composition id="AConta" component={AConta} durationInFrames={750} fps={30} width={1080} height={1920} schema={roteiroSchema} defaultProps={roteiroPadrao} calculateMetadata={calcularDuracao} />
    <Still id="Capa" component={Capa} width={1080} height={1920} schema={roteiroSchema} defaultProps={roteiroPadrao} />
  </Folder>
);
