import React from 'react';
import {linearTiming, TransitionSeries} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {AbsoluteFill, CalculateMetadataFunction, interpolate, Sequence, useCurrentFrame} from 'remotion';
import {ALUNAS, CenaAluna, CenaLousa} from './aula/Sala';
import {Escrita, fonteGiz, Pop, Seta, tinta, Traco} from './aula/Lousa';
import type {Roteiro} from './data/schema';
import {BarraProgresso} from './components/BarraProgresso';
import {GraoGlobal} from './components/FundoMarca';
import {SeloFicticio} from './components/SeloFicticio';
import {ZonaSegura} from './components/ZonaSegura';
import {clamp, cores} from './theme';

const ORDEM = ['abertura', 'licao1', 'aluna1', 'licao2', 'aluna2', 'licao3', 'resumo', 'pergunta', 'tarefa'] as const;

export const inicios = (t: Roteiro['tempos']) => {
  const ini: number[] = [];
  let acc = 0;
  for (const k of ORDEM) {
    ini.push(acc);
    acc += t[k];
  }
  return {ini, total: acc};
};

export const calcularDuracao: CalculateMetadataFunction<Roteiro> = ({props}) => ({durationInFrames: inicios(props.tempos).total});

// ---------------------------------------------------------------- Abertura
const Abertura: React.FC<{r: Roteiro}> = ({r}) => {
  const a = r.abertura;
  return (
    <CenaLousa
      etiqueta={a.etiqueta}
      fala={a.fala}
      poses={[
        {f: 0, v: 'acenar1'},
        {f: 10, v: 'acenar2'},
        {f: 20, v: 'acenar1'},
        {f: 30, v: 'acenar2'},
        {f: 40, v: 'acenar1'},
        {f: 60, v: 'explicando'},
      ]}
      expressoes={[{f: 0, v: 'feliz'}]}
    >
      <Escrita texto={a.aula} x={70} y={130} inicio={4} tamanho={64} cor={tinta.roxo} />
      <Traco d="M66 150 Q130 160 210 146" inicio={14} dur={10} cor={tinta.roxo} espessura={5} />
      <Escrita texto={a.titulo[0]} x={470} y={290} inicio={16} tamanho={84} ancora="middle" />
      <Escrita texto={a.titulo[1]} x={470} y={390} inicio={36} tamanho={96} cor={tinta.vermelho} ancora="middle" />
      <Traco d="M250 420 Q470 440 700 414" inicio={58} dur={14} cor={tinta.vermelho} espessura={7} />
      <Pop inicio={70} x={790} y={360}>
        <text x={0} y={0} fontFamily={fonteGiz} fontWeight={700} fontSize={110} fill={tinta.azul} textAnchor="middle">
          ?
        </text>
      </Pop>
    </CenaLousa>
  );
};

// ---------------------------------------------------------------- Lição 1: a cliente decide rápido
const Licao1: React.FC<{r: Roteiro}> = ({r}) => {
  const l = r.licao1;
  const frame = useCurrentFrame();
  // bolinha descendo pela curva
  const t = interpolate(frame, [120, 200], [0, 1], clamp);
  const bx = 150 + t * 700;
  const by = 190 + Math.pow(t, 0.9) * 260;
  return (
    <CenaLousa
      fala={l.fala}
      poses={[
        {f: 0, v: 'explicando'},
        {f: 30, v: 'apontandoAlto'},
        {f: 200, v: 'apontandoAltoOlha'},
      ]}
      expressoes={[
        {f: 0, v: 'neutra'},
        {f: 30, v: 'focada'},
        {f: 200, v: 'determinada'},
      ]}
    >
      <Escrita texto={l.titulo} x={60} y={90} inicio={4} tamanho={62} cor={tinta.roxo} />
      {/* eixos */}
      <Traco d="M330 140 L330 480 L900 480" inicio={24} dur={18} espessura={6} />
      <Escrita texto={l.eixoX} x={720} y={530} inicio={40} tamanho={38} ancora="middle" cor="#5A5470" />
      <Escrita texto={l.eixoY} x={350} y={140} inicio={44} tamanho={38} cor="#5A5470" />
      {/* curva caindo */}
      <Traco d="M340 190 C 470 200, 560 300, 660 370 S 830 460, 890 465" inicio={60} dur={40} cor={tinta.azul} espessura={9} />
      {frame >= 120 && frame < 214 ? <circle cx={330 + (bx - 150) * 0.8} cy={by} r={16} fill={tinta.vermelho} /> : null}
      <Pop inicio={104} x={360} y={232}>
        <circle r={20} fill={tinta.verde} />
        <path d="M-9 0 L-2 8 L10 -8" stroke="white" strokeWidth={5} fill="none" strokeLinecap="round" />
      </Pop>
      <Escrita texto={l.rapido} x={500} y={212} inicio={108} tamanho={40} cor={tinta.verde} />
      <Pop inicio={214} x={870} y={420}>
        <circle r={20} fill={tinta.vermelho} />
        <path d="M-8 -8 L8 8 M8 -8 L-8 8" stroke="white" strokeWidth={5} strokeLinecap="round" />
      </Pop>
      <Escrita texto={l.devagar} x={890} y={600} inicio={218} tamanho={40} cor={tinta.vermelho} ancora="end" />
    </CenaLousa>
  );
};

// ---------------------------------------------------------------- Lição 2: mensagem fora de hora
const Licao2: React.FC<{r: Roteiro}> = ({r}) => {
  const l = r.licao2;
  const cx = 600;
  const cy = 340;
  const R = 190;
  const pt = (h: number, rr: number) => {
    const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr] as const;
  };
  const arco = (h1: number, h2: number, rr: number) => {
    const [x1, y1] = pt(h1, rr);
    const [x2, y2] = pt(h2, rr);
    const grande = (h2 - h1 + 24) % 24 > 12 ? 1 : 0;
    return `M${cx} ${cy} L${x1} ${y1} A${rr} ${rr} 0 ${grande} 1 ${x2} ${y2} Z`;
  };
  const circulo = `M${cx + R} ${cy} A${R} ${R} 0 1 1 ${cx - R} ${cy} A${R} ${R} 0 1 1 ${cx + R} ${cy}`;
  const mensagens = [20.2, 21.5, 22.4, 23.3, 0.6, 6.4, 7.2, 19.4, 22.9, 13.5, 1.8, 10.5];
  return (
    <CenaLousa
      fala={l.fala}
      poses={[
        {f: 0, v: 'explicando'},
        {f: 30, v: 'apontandoAlto'},
        {f: 220, v: 'explicando'},
      ]}
      expressoes={[
        {f: 0, v: 'neutra'},
        {f: 30, v: 'focada'},
        {f: 140, v: 'preocupada'},
        {f: 220, v: 'neutra'},
      ]}
    >
      <Escrita texto={l.titulo} x={60} y={90} inicio={4} tamanho={58} cor={tinta.roxo} />
      {/* relógio de 24 h */}
      <Traco d={arco(19, 8, R - 8)} inicio={56} dur={20} cor="none" espessura={0} preencher="rgba(38,67,168,0.85)" />
      <Traco d={circulo} inicio={24} dur={30} espessura={7} />
      {[0, 6, 12, 18].map((h, i) => {
        const [x, y] = pt(h, R - 34);
        return <Escrita key={h} texto={`${h}h`} x={x} y={y + 14} inicio={40 + i * 4} tamanho={38} ancora="middle" cor={h === 0 || h === 6 ? 'white' : tinta.preto} />;
      })}
      <Escrita texto={l.fechada} x={pt(1.5, 78)[0]} y={pt(1.5, 78)[1] + 6} inicio={80} tamanho={40} ancora="middle" cor="white" />
      <Escrita texto={l.aberta} x={pt(13.5, 100)[0]} y={pt(13.5, 100)[1] + 10} inicio={88} tamanho={40} ancora="middle" cor={tinta.verde} />
      {mensagens.map((h, i) => {
        const [x, y] = pt(h, R + 30);
        return (
          <Pop key={i} inicio={110 + i * 9} x={x} y={y}>
            <rect x={-26} y={-18} width={52} height={36} rx={10} fill={tinta.vermelho} />
            <path d="M-8 18 L0 30 L6 18 Z" fill={tinta.vermelho} />
            <circle cx={-10} r={4} fill="white" />
            <circle cx={0} r={4} fill="white" />
            <circle cx={10} r={4} fill="white" />
          </Pop>
        );
      })}
      <Escrita texto="+ sábado e domingo" x={890} y={640} inicio={220} tamanho={42} ancora="end" cor={tinta.vermelho} />
    </CenaLousa>
  );
};

// ---------------------------------------------------------------- Lição 3: como a VIQ resolve
const Licao3: React.FC<{r: Roteiro}> = ({r}) => {
  const l = r.licao3;
  const frame = useCurrentFrame();
  const xs = [130, 360, 590, 820];
  const y = 250;
  const cor = [tinta.azul, tinta.roxo, tinta.verde, tinta.vermelho];
  const nodo = (i: number) => 40 + i * 52;
  // mensagem viajando
  const p = interpolate(frame, [250, 330], [0, 3], clamp);
  const seg = Math.min(2, Math.floor(p));
  const local = p - seg;
  const mx = xs[seg] + 75 + (xs[seg + 1] - xs[seg] - 150) * local;
  return (
    <CenaLousa
      fala={l.fala}
      poses={[
        {f: 0, v: 'explicando'},
        {f: 30, v: 'apontandoAlto'},
        {f: 280, v: 'apontandoAltoOlha'},
      ]}
      expressoes={[
        {f: 0, v: 'neutra'},
        {f: 30, v: 'focada'},
        {f: 150, v: 'feliz'},
      ]}
    >
      <Escrita texto={l.titulo} x={60} y={90} inicio={4} tamanho={62} cor={tinta.roxo} />
      {l.etapas.map((e, i) => (
        <React.Fragment key={i}>
          <Traco d={`M${xs[i] + 68} ${y} A68 68 0 1 1 ${xs[i] - 68} ${y} A68 68 0 1 1 ${xs[i] + 68} ${y}`} inicio={nodo(i)} dur={16} cor={cor[i]} espessura={7} preencher={i === 1 ? 'rgba(109,75,224,0.12)' : undefined} />
          <Escrita texto={e.nome} x={xs[i]} y={y + 16} inicio={nodo(i) + 10} tamanho={i === 1 ? 52 : 44} ancora="middle" cor={cor[i]} />
          {e.detalhe.split('|').map((linha, k) => (
            <Escrita key={k} texto={linha} x={xs[i]} y={y + 120 + k * 42} inicio={nodo(i) + 20 + k * 8} tamanho={34} ancora="middle" cor="#4A4460" />
          ))}
          {i < 3 ? <Seta x1={xs[i] + 78} y1={y} x2={xs[i + 1] - 80} y2={y} inicio={nodo(i) + 30} /> : null}
        </React.Fragment>
      ))}
      {frame >= 250 && frame < 340 ? (
        <g transform={`translate(${mx} ${y - 92})`}>
          <rect x={-24} y={-16} width={48} height={32} rx={9} fill={tinta.roxo} />
          <path d="M-6 16 L0 26 L6 16 Z" fill={tinta.roxo} />
        </g>
      ) : null}
      <Pop inicio={334} x={820} y={140}>
        <rect x={-120} y={-28} width={240} height={56} rx={28} fill={cores.verde} />
        <text x={0} y={12} textAnchor="middle" fontFamily={fonteGiz} fontWeight={700} fontSize={38} fill="white">
          Agendado ✓
        </text>
      </Pop>
    </CenaLousa>
  );
};

// ---------------------------------------------------------------- Resumo
const Resumo: React.FC<{r: Roteiro}> = ({r}) => {
  const l = r.resumo;
  return (
    <CenaLousa
      fala={l.fala}
      poses={[
        {f: 0, v: 'apontandoAlto'},
        {f: 160, v: 'explicando'},
      ]}
      expressoes={[
        {f: 0, v: 'focada'},
        {f: 150, v: 'feliz'},
      ]}
    >
      <Escrita texto={l.titulo} x={470} y={96} inicio={4} tamanho={66} ancora="middle" cor={tinta.roxo} />
      <Traco d="M250 116 Q470 132 690 112" inicio={22} dur={12} cor={tinta.roxo} espessura={5} />
      {l.itens.map((t, i) => {
        const y = 210 + i * 100;
        const x = i === 3 ? 400 : 120;
        return (
          <React.Fragment key={i}>
            <Traco d={`M${x - 40} ${y - 30} h44 v44 h-44 Z`} inicio={36 + i * 26} dur={8} cor="#5A5470" espessura={5} />
            <Traco d={`M${x - 32} ${y - 8} L${x - 20} ${y + 6} L${x + 4} ${y - 24}`} inicio={46 + i * 26} dur={8} cor={tinta.verde} espessura={8} />
            <Escrita texto={t} x={x + 30} y={y + 6} inicio={40 + i * 26} dur={16} tamanho={44} />
          </React.Fragment>
        );
      })}
    </CenaLousa>
  );
};

// ---------------------------------------------------------------- Tarefa / chamada
const Tarefa: React.FC<{r: Roteiro}> = ({r}) => {
  const l = r.tarefa;
  const frame = useCurrentFrame();
  const pulso = 1 + 0.05 * Math.max(0, Math.sin((frame - 60) / 4.5));
  return (
    <CenaLousa
      fala={l.fala}
      poses={[
        {f: 0, v: 'explicando'},
        {f: 24, v: 'apontandoAlto'},
        {f: 120, v: 'apontandoAltoOlha'},
      ]}
      expressoes={[{f: 0, v: 'feliz'}]}
      zoom={[1, 1.06]}
    >
      <Escrita texto={l.titulo} x={470} y={110} inicio={4} tamanho={64} ancora="middle" cor={tinta.roxo} />
      <g transform={`translate(470 290) scale(${frame >= 40 ? pulso : 1}) translate(-470 -290)`}>
        <Escrita texto={`${l.texto} ${l.destaque}`} x={470} y={310} inicio={22} dur={18} tamanho={130} ancora="middle" cor={tinta.preto} />
      </g>
      <Traco d="M590 220 C 940 200, 940 364, 664 364 C 516 364, 516 236, 632 214" inicio={44} dur={18} cor={tinta.vermelho} espessura={7} />
      <Escrita texto={l.complemento} x={470} y={430} inicio={56} tamanho={66} ancora="middle" />
      <Escrita texto={`VIQ · ${l.handle}`} x={890} y={600} inicio={74} tamanho={52} ancora="end" cor={tinta.roxo} />
    </CenaLousa>
  );
};

// ---------------------------------------------------------------- Montagem
export const Video: React.FC<{roteiro: Roteiro; extras?: boolean}> = ({roteiro: r, extras = true}) => {
  const t = r.tempos;
  const T = t.transicao;
  const timing = linearTiming({durationInFrames: T});
  const {total} = inicios(t);
  const cenas: {nome: string; dur: number; el: React.ReactNode; trans: 'fade' | 'slide'}[] = [
    {nome: 'Abertura', dur: t.abertura, el: <Abertura r={r} />, trans: 'fade'},
    {nome: 'Lição 1', dur: t.licao1, el: <Licao1 r={r} />, trans: 'slide'},
    {nome: 'Aluna 1', dur: t.aluna1, el: <CenaAluna aluna={ALUNAS.carla} fala={r.aluna1.fala} rotulo={r.aluna1.rotulo} poses={[{f: 0, v: 'pensando'}, {f: 40, v: 'explicando'}]} expressoes={[{f: 0, v: 'preocupada'}, {f: 40, v: 'estressada'}]} />, trans: 'slide'},
    {nome: 'Lição 2', dur: t.licao2, el: <Licao2 r={r} />, trans: 'slide'},
    {nome: 'Aluna 2', dur: t.aluna2, el: <CenaAluna aluna={ALUNAS.cacheada} fala={r.aluna2.fala} rotulo={r.aluna2.rotulo} poses={[{f: 0, v: 'emPe'}, {f: 30, v: 'pensando'}]} expressoes={[{f: 0, v: 'chocada'}, {f: 34, v: 'aliviada'}]} />, trans: 'slide'},
    {nome: 'Lição 3', dur: t.licao3, el: <Licao3 r={r} />, trans: 'slide'},
    {nome: 'Resumo', dur: t.resumo, el: <Resumo r={r} />, trans: 'fade'},
    {nome: 'Pergunta', dur: t.pergunta, el: <CenaAluna aluna={ALUNAS.carla} fala={r.pergunta.fala} rotulo={r.pergunta.rotulo} poses={[{f: 0, v: 'maoLevantada'}]} expressoes={[{f: 0, v: 'feliz'}]} />, trans: 'slide'},
    {nome: 'Tarefa', dur: t.tarefa, el: <Tarefa r={r} />, trans: 'slide'},
  ];
  return (
    <AbsoluteFill style={{backgroundColor: cores.navy}}>
      <TransitionSeries>
        {cenas.map((c, i) => {
          const ultima = i === cenas.length - 1;
          const proxima = cenas[i + 1];
          return (
            <React.Fragment key={c.nome}>
              <TransitionSeries.Sequence name={c.nome} durationInFrames={c.dur + (ultima ? 0 : T)}>
                {c.el}
              </TransitionSeries.Sequence>
              {proxima ? <TransitionSeries.Transition presentation={proxima.trans === 'fade' ? fade() : slide({direction: i % 2 ? 'from-left' : 'from-right'})} timing={timing} /> : null}
            </React.Fragment>
          );
        })}
      </TransitionSeries>
      <GraoGlobal />
      {extras ? (
        <>
          <Sequence from={0} durationInFrames={total} layout="none">
            <SeloFicticio texto={r.selo} />
          </Sequence>
          <BarraProgresso />
        </>
      ) : null}
      {r.mostrarZonaSegura ? <ZonaSegura /> : null}
    </AbsoluteFill>
  );
};

export const AulaVIQ: React.FC<Roteiro> = (props) => <Video roteiro={props} />;

/** Capa: a lousa com o título da aula */
export const CAPA_FRAME = 120;
export const Capa: React.FC<Roteiro> = (props) => (
  <AbsoluteFill>
    <Sequence from={-CAPA_FRAME} layout="none">
      <Video roteiro={{...props, abertura: {...props.abertura, fala: {...props.abertura.fala, inicio: 9999}}}} extras={false} />
    </Sequence>
  </AbsoluteFill>
);
