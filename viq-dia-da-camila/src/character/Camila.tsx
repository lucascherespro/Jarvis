import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {fontFamily} from '../theme';
import {BracoDireito, BracoEsquerdo} from './Bracos';
import {Boca} from './Boca';
import {Cabeca} from './Cabeca';
import {CabeloFrente, CabeloTras} from './Cabelo';
import {Olhos} from './Olhos';
import {aberturaPiscada, Chave, EXPRESSOES, misturar, NomeExpressao, NomePose, POSES} from './rig';
import {Sobrancelhas} from './Sobrancelhas';
import {Tronco} from './Tronco';

export type CamilaProps = {
  poses: Chave<NomePose>[];
  expressoes: Chave<NomeExpressao>[];
  /** frames em que ela dá uma piscadinha (olho direito) */
  piscadinhas?: number[];
  /** frames em que o celular na mão vibra */
  vibracoes?: number[];
  /** brilho da tela do celular na mão (0..1) */
  brilhoCelular?: number;
  /** largura em px na tela (o rig tem 500 x 760) */
  largura: number;
  style?: React.CSSProperties;
  /** desloca o tempo (útil para reaproveitar a personagem em outra cena) */
  deslocamento?: number;
  mostrarZzz?: boolean;
};

/** Dra. Camila — personagem fictícia montada como rig de componentes SVG */
export const Camila: React.FC<CamilaProps> = ({poses, expressoes, piscadinhas = [], vibracoes = [], brilhoCelular = 0.5, largura, style, deslocamento = 0, mostrarZzz = true}) => {
  const frame = useCurrentFrame() + deslocamento;
  const {fps} = useVideoConfig();
  const p = misturar(poses, POSES, frame, fps);
  const e = misturar(expressoes, EXPRESSOES, frame, fps);

  // respiração contínua (escala 1 -> 1,01)
  const resp = (Math.sin((frame / 90) * Math.PI * 2) + 1) / 2;
  const escalaResp = 1 + resp * 0.01;

  // piscadas automáticas + piscadinha
  const pisca = aberturaPiscada(frame, 'camila', fps);
  const piscadinha = piscadinhas.reduce((acc, f) => {
    const d = frame - f;
    return d >= 0 && d < 14 ? Math.min(acc, interpolate(d, [0, 3, 10, 14], [1, 0, 0, 1])) : acc;
  }, 1);
  const olho = e.olho * pisca;

  // fios de cabelo balançam com a velocidade da cabeça
  const pAntes = misturar(poses, POSES, frame - 4, fps);
  const balanco = Math.sin(frame / 14) * 3 + (p.cab - pAntes.cab) * 2.5 + (p.virada - pAntes.virada) * 30;

  // vibração do celular na mão
  const vibra = vibracoes.reduce((acc, f) => {
    const d = frame - f;
    return d >= 0 && d < 14 ? Math.max(acc, 1 - d / 14) : acc;
  }, 0);

  const zzz = mostrarZzz ? e.zzz : 0;
  return (
    <svg viewBox="0 0 500 760" width={largura} height={(largura * 760) / 500} style={{overflow: 'visible', ...style}}>
      <g transform={`translate(0 ${p.corpoY}) rotate(${p.incl} 250 700)`}>
        <g transform={`translate(250 760) scale(1 ${escalaResp}) translate(-250 -760)`}>
          <g transform={`rotate(${p.cab} 250 290) translate(250 290) scale(1.13) translate(-250 -290)`}>
            <CabeloTras />
          </g>
          <Tronco />
          <g transform={`translate(0 ${-resp * 2}) rotate(${p.cab} 250 290) translate(250 290) scale(1.13) translate(-250 -290)`}>
            <Cabeca virada={p.virada} bochecha={e.bochecha} />
            <Olhos virada={p.virada} abertura={olho} aberturaDireita={olho * piscadinha} olharX={p.olharX} olharY={p.olharY} />
            <Sobrancelhas virada={p.virada} ang={e.sobAng} y={e.sobY} />
            <Boca virada={p.virada} curva={e.curva} aberta={e.aberta} largura={e.largura} />
            <CabeloFrente virada={p.virada} balanco={balanco} />
            {e.suor > 0.05 ? (
              <path
                d="M338 120 q-12 20 0 28 q12 -8 0 -28 Z"
                fill="#9FD3FF"
                opacity={e.suor}
                transform={`translate(0 ${(frame % 40) * 0.6})`}
              />
            ) : null}
          </g>
          <BracoEsquerdo
            ombro={p.oE}
            cotovelo={p.cE}
            mao={p.maoE}
            objetos={{celular: p.celE}}
            brilhoCelular={brilhoCelular}
            vibra={vibra}
            frame={frame}
          />
          <BracoDireito ombro={p.oD} cotovelo={p.cD} mao={p.maoD} objetos={{aplicador: p.aplicador, caneca: p.caneca, apontar: p.apontar}} frame={frame} />
        </g>
      </g>
      {zzz > 0.05
        ? [0, 1, 2].map((i) => {
            const t = ((frame + i * 20) % 60) / 60;
            return (
              <text
                key={i}
                x={340 + t * 60 + i * 6}
                y={110 - t * 120}
                fontFamily={fontFamily}
                fontWeight={800}
                fontSize={34 + i * 10}
                fill="#C4B5FD"
                opacity={zzz * interpolate(t, [0, 0.2, 0.8, 1], [0, 1, 1, 0])}
              >
                z
              </text>
            );
          })
        : null}
    </svg>
  );
};
