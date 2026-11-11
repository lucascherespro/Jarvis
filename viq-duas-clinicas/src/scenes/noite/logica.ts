import {interpolate, spring} from 'remotion';
import type {Cliente, Roteiro} from '../../data/schema';
import {eventosB, frameDaHora, minutoNoFrame, minutosDesde21} from '../../timing';
import {ALTURAS} from '../../components/Notificacao';
import {clamp} from '../../theme';

export const PAINEL_W = 500;
export const PAINEL_A_X = 20;
export const PAINEL_B_X = 560;
export const GAP = 16;
export const MASCARA = 50;

export const molaSuave = (g: number, inicio: number, fps: number, dur = 12) =>
  g < inicio ? 0 : spring({frame: g - inicio, fps, config: {damping: 200}, durationInFrames: dur});

// ---------------------------------------------------------------- Painel A
export type ItemA = {
  id: string;
  tipo: 'cliente' | 'desistencia';
  cliente: Cliente;
  mensagem: string;
  hora: string;
  chegada: number;
  colapsa: number | null;
  vooInicio: number | null;
};

export const VOO_ATRASO = 20;
export const vooDuracao = (indice: number) => (indice === 0 ? 40 : 28);

export const itensA = (r: Roteiro): ItemA[] => {
  const t = r.tempos;
  const lista: ItemA[] = [
    ...r.clientes.map((c, i) => ({
      id: `a-c${i}`,
      tipo: 'cliente' as const,
      cliente: c,
      mensagem: c.mensagem,
      hora: c.hora,
      chegada: frameDaHora(c.hora, t),
      colapsa: null,
      vooInicio: null,
    })),
    ...r.desistencias
      .map((d, i) => {
        const c = r.clientes.find((x) => x.nome === d.nome);
        if (!c) return null;
        return {
          id: `a-d${i}`,
          tipo: 'desistencia' as const,
          cliente: c,
          mensagem: d.mensagem,
          hora: '',
          chegada: d.frame,
          colapsa: null,
          vooInicio: d.frame + VOO_ATRASO,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null),
  ].sort((a, b) => a.chegada - b.chegada);
  return lista.map((it, i) => ({...it, colapsa: lista[i + 1]?.chegada ?? null}));
};

export const alturaA = (it: ItemA, g: number, fps: number) => {
  const cheia = it.tipo === 'cliente' ? ALTURAS.clienteA : ALTURAS.clienteCheio;
  const p = it.colapsa === null ? 0 : molaSuave(g, it.colapsa, fps, 10);
  return interpolate(p, [0, 1], [cheia, ALTURAS.compacto]);
};

// ---------------------------------------------------------------- Painel B
export type GrupoB = {
  id: string;
  cliente: Cliente;
  ev: ReturnType<typeof eventosB>;
  colapsa: number | null;
};

export const gruposB = (r: Roteiro): GrupoB[] => {
  const lista = r.clientes
    .map((c, i) => ({id: `b${i}`, cliente: c, ev: eventosB(frameDaHora(c.hora, r.tempos)), colapsa: null as number | null}))
    .sort((a, b) => a.ev.chegada - b.ev.chegada);
  return lista.map((gr, i) => ({...gr, colapsa: lista[i + 1]?.ev.resposta ?? null}));
};

export const alturaB = (gr: GrupoB, g: number, fps: number) => {
  const dig = molaSuave(g, gr.ev.digitando, fps, 8);
  const resp = molaSuave(g, gr.ev.resposta, fps, 10);
  const chip = molaSuave(g, gr.ev.chip, fps, 10);
  const cheia =
    ALTURAS.clienteCheio +
    dig * (GAP + ALTURAS.digitando) +
    resp * (ALTURAS.resposta - ALTURAS.digitando) +
    chip * (GAP + ALTURAS.chip);
  const col = gr.colapsa === null ? 0 : molaSuave(g, gr.colapsa, fps, 12);
  return {altura: interpolate(col, [0, 1], [cheia, ALTURAS.compacto]), colapso: col};
};

// ---------------------------------------------------------------- Pilha com rolagem
export type Posicionado<T> = T & {y: number; presenca: number; queda: number; local: number; altura: number};

export const empilhar = <T extends {chegada: number}>(
  itens: T[],
  altura: (it: T) => number,
  g: number,
  fps: number,
  feedH: number,
): Posicionado<T>[] => {
  const estados = itens.map((it) => {
    const local = g - it.chegada;
    const presenca = molaSuave(g, it.chegada, fps, 12);
    const queda = local < 0 ? 0 : spring({frame: local, fps, config: {damping: 13, stiffness: 160}});
    return {...it, local, presenca, queda, altura: altura(it)};
  });
  const total = estados.reduce((acc, s) => acc + (s.altura + GAP) * s.presenca, 0) - GAP;
  const offset = Math.max(0, total - feedH);
  let cursor = -offset;
  return estados.map((s) => {
    const y = cursor;
    cursor += (s.altura + GAP) * s.presenca;
    return {...s, y};
  });
};

// ---------------------------------------------------------------- Contadores
export const eventosContadorA = (r: Roteiro) =>
  [...itensA(r).map((i) => i.chegada), ...r.extrasA].sort((a, b) => a - b);

export const contagem = (eventos: number[], g: number) => {
  const passados = eventos.filter((e) => e <= g);
  return {n: passados.length, mudouEm: passados.length ? passados[passados.length - 1] : null};
};

export const agendadasB = (r: Roteiro) =>
  gruposB(r)
    .filter((gr) => gr.cliente.agendou)
    .sort((a, b) => a.ev.chip - b.ev.chip);

export const valorB = (r: Roteiro, g: number) => {
  const ag = agendadasB(r).filter((gr) => gr.ev.chip <= g);
  const total = ag.reduce((s, gr) => s + gr.cliente.valor, 0);
  const ultimo = ag[ag.length - 1];
  return {total, anterior: ultimo ? total - ultimo.cliente.valor : 0, mudouEm: ultimo ? ultimo.ev.chip : null};
};

export const cronometro = (r: Roteiro, hora: string, g: number) => {
  const agora = minutoNoFrame(g, r.tempos);
  const dif = Math.max(0, agora - minutosDesde21(hora));
  if (dif < 60) return `${r.textos.semRespostaHa} ${Math.max(1, Math.floor(dif))} min`;
  return `${r.textos.semRespostaHa} ${Math.floor(dif / 60)}h`;
};

export const progressoNoite = (r: Roteiro, g: number) =>
  interpolate(g, [r.tempos.relogioInicio, r.tempos.relogioFim], [0, 1], clamp);
