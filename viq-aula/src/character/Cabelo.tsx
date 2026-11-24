import React from 'react';
import {useAparencia} from './aparencia';

const CACHOS_TRAS: [number, number, number][] = [
  [250, 70, 70], [182, 92, 58], [318, 92, 58], [148, 150, 54], [352, 150, 54], [150, 210, 46], [350, 210, 46], [205, 60, 50], [295, 60, 50],
];
const CACHOS_FRENTE: [number, number, number][] = [
  [186, 116, 22], [214, 98, 24], [246, 92, 24], [278, 96, 24], [308, 108, 22], [330, 128, 18], [170, 138, 18],
];

/** Parte de trás do cabelo — desenhada antes do rosto */
export const CabeloTras: React.FC = () => {
  const {cabelo, paleta: p} = useAparencia();
  if (cabelo === 'cacheado') {
    return (
      <g>
        {CACHOS_TRAS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={p.cabelo} />
        ))}
        {CACHOS_TRAS.slice(0, 5).map(([x, y, r], i) => (
          <path key={`b${i}`} d={`M${x - r * 0.5} ${y - r * 0.35} q${r * 0.5} -${r * 0.35} ${r} 0`} stroke={p.cabeloBrilho} strokeWidth={6} fill="none" strokeLinecap="round" />
        ))}
      </g>
    );
  }
  if (cabelo === 'ondulado') {
    return (
      <g>
        {/* volume longo e ondulado que cai atrás dos ombros */}
        <path
          d="M156 190 Q140 70 250 58 Q362 70 346 190 Q370 240 352 290 Q378 340 356 392 Q330 420 300 404 L200 404 Q170 420 144 392 Q122 340 148 290 Q130 240 156 190 Z"
          fill={p.cabelo}
        />
        <path d="M150 236 Q132 262 150 292" stroke={p.cabeloBrilho} strokeWidth={6} fill="none" strokeLinecap="round" />
        <path d="M350 236 Q368 262 350 292" stroke={p.cabeloBrilho} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g>
      <circle cx={258} cy={62} r={48} fill={p.cabelo} />
      <path d="M226 48 Q258 22 290 48" stroke={p.cabeloBrilho} strokeWidth={8} fill="none" strokeLinecap="round" />
      <ellipse cx={250} cy={160} rx={96} ry={104} fill={p.cabelo} />
    </g>
  );
};

/** Franja e mechas da frente — desenhadas por cima do rosto. As mechas balançam (balanco em graus). */
export const CabeloFrente: React.FC<{virada: number; balanco: number}> = ({virada, balanco}) => {
  const {cabelo, paleta: p} = useAparencia();
  const dx = virada * 14;
  if (cabelo === 'cacheado') {
    return (
      <g transform={`translate(${dx} 0)`}>
        {CACHOS_FRENTE.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={p.cabelo} />
        ))}
      </g>
    );
  }
  if (cabelo === 'ondulado') {
    return (
      <g transform={`translate(${dx} 0)`}>
        {/* franja com divisão lateral, ondulada */}
        <path d="M164 182 Q154 86 244 70 Q326 64 342 146 Q346 166 338 184 Q330 132 296 108 Q262 128 222 130 Q186 138 164 182 Z" fill={p.cabelo} />
        <path d="M206 92 Q250 76 300 96" stroke={p.cabeloBrilho} strokeWidth={7} fill="none" strokeLinecap="round" />
        {/* mecha esquerda: cai na frente do ombro */}
        <g transform={`rotate(${balanco * 0.6} 172 130)`}>
          <path
            d="M170 124 Q138 200 160 262 Q180 312 152 362 Q134 402 160 444 L196 436 Q176 398 194 356 Q214 306 192 254 Q176 204 198 140 Z"
            fill={p.cabelo}
          />
          <path d="M164 280 Q178 312 160 344" stroke={p.cabeloBrilho} strokeWidth={5} fill="none" strokeLinecap="round" />
        </g>
        {/* mecha direita */}
        <g transform={`rotate(${-balanco * 0.5} 328 130)`}>
          <path
            d="M330 124 Q362 200 340 262 Q320 312 348 362 Q366 402 340 444 L304 436 Q324 398 306 356 Q286 306 308 254 Q324 204 302 140 Z"
            fill={p.cabelo}
          />
        </g>
      </g>
    );
  }
  return (
    <g transform={`translate(${dx} 0)`}>
      <path d="M166 170 Q160 92 238 74 Q312 64 338 132 Q342 152 336 172 Q318 118 270 108 Q226 102 196 126 Q178 142 166 170 Z" fill={p.cabelo} />
      <path d="M214 96 Q262 78 312 104" stroke={p.cabeloBrilho} strokeWidth={7} fill="none" strokeLinecap="round" />
      <g transform={`rotate(${balanco} 178 140)`}>
        <path d="M178 138 Q164 178 176 214 Q182 230 174 246" stroke={p.cabelo} strokeWidth={6} fill="none" strokeLinecap="round" />
      </g>
      <g transform={`rotate(${-balanco * 0.8} 326 136)`}>
        <path d="M326 134 Q342 170 330 204" stroke={p.cabelo} strokeWidth={5} fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
};
