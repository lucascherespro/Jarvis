import React from 'react';
import {usePele} from './aparencia';

/** Rosto, orelhas, brincos dourados e nariz. Centro do rosto em (250, 175). */
export const Cabeca: React.FC<{virada: number; bochecha: number}> = ({virada, bochecha}) => {
  const pele = usePele();
  const dx = virada * 22;
  return (
    <g>
      {/* pescoço */}
      <path d="M222 236 L222 300 Q250 318 278 300 L278 236 Z" fill={pele.sombra} />
      {/* orelhas + brincos (deslocam ao contrário do rosto) */}
      <g transform={`translate(${-dx * 0.5} 0)`}>
        <ellipse cx={170} cy={186} rx={15} ry={22} fill={pele.sombra} opacity={1 - Math.max(0, virada) * 0.7} />
        <circle cx={168} cy={214} r={6} fill="#E5B54A" opacity={1 - Math.max(0, virada) * 0.7} />
        <ellipse cx={330} cy={186} rx={15} ry={22} fill={pele.sombra} opacity={1 - Math.max(0, -virada) * 0.7} />
        <circle cx={332} cy={214} r={6} fill="#E5B54A" opacity={1 - Math.max(0, -virada) * 0.7} />
      </g>
      {/* rosto */}
      <ellipse cx={250} cy={176} rx={80} ry={94} fill={pele.base} />
      {/* sombra suave lateral em bloco */}
      <path d="M250 82 Q338 92 330 190 Q322 262 250 270 Q300 240 304 176 Q306 112 250 82 Z" fill={pele.sombra} opacity={0.25} transform={`translate(${-dx * 0.3} 0)`} />
      {/* bochechas */}
      <g transform={`translate(${dx} 0)`} opacity={0.15 + bochecha * 0.45}>
        <ellipse cx={204} cy={222} rx={18} ry={11} fill={pele.bochecha} />
        <ellipse cx={296} cy={222} rx={18} ry={11} fill={pele.bochecha} />
      </g>
      {/* nariz */}
      <path
        d={`M${250 + virada * 30} 196 Q${257 + virada * 34} 214 ${250 + virada * 30} 220 Q${244 + virada * 30} 222 ${240 + virada * 30} 219`}
        stroke={pele.sombra}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
};
