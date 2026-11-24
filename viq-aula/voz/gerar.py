"""Gera a narração (Kokoro TTS, pt-BR) em public/voz/*.wav e as durações em src/data/voz.ts.
uso: python voz/gerar.py <pasta com kokoro-v1.0.onnx e voices-v1.0.bin>
Modelos: https://github.com/thewh1teagle/kokoro-onnx/releases (model-files-v1.0)
"""
import json, subprocess, sys
from pathlib import Path
import soundfile as sf
from kokoro_onnx import Kokoro

raiz = Path(__file__).resolve().parent.parent
modelo = Path(sys.argv[1])
k = Kokoro(str(modelo / "kokoro-v1.0.onnx"), str(modelo / "voices-v1.0.bin"))
# voz base + ajuste de tom (1.0 = original) + velocidade
VOZES = {
    "professora": ("pf_dora", 1.0, 1.02),
    "aluna1": ("pf_dora", 1.07, 1.06),
    "aluna2": ("pf_dora", 0.95, 1.0),
}
falas = {k_: v for k_, v in json.loads((raiz / "voz/falas.json").read_text()).items() if not k_.startswith("_")}
saida = raiz / "public/voz"
saida.mkdir(parents=True, exist_ok=True)
duracoes = {}
for id_, f in falas.items():
    voz, tom, vel = VOZES[f["voz"]]
    amostras, sr = k.create(f["texto"], voice=voz, speed=vel, lang="pt-br")
    bruto = saida / f"{id_}.bruto.wav"
    sf.write(bruto, amostras, sr)
    final = saida / f"{id_}.wav"
    filtro = f"asetrate={sr}*{tom},aresample=44100,atempo={1/tom:.5f}," if tom != 1.0 else "aresample=44100,"
    filtro += "highpass=f=80,acompressor=threshold=-18dB:ratio=3:attack=5:release=80,loudnorm=I=-16:TP=-1.5:LRA=7"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(bruto), "-af", filtro, "-ar", "44100", str(final)], check=True)
    bruto.unlink()
    info = sf.info(final)
    duracoes[id_] = round(info.frames / info.samplerate, 3)
    print(id_, duracoes[id_], "s")
linhas = ",\n".join(f"  {k_}: {v}" for k_, v in duracoes.items())
(raiz / "src/data/voz.ts").write_text(
    "// Gerado por voz/gerar.py — duração (segundos) de cada fala em public/voz/\n"
    f"export const DURACAO_VOZ = {{\n{linhas},\n}} as const;\n\nexport type IdVoz = keyof typeof DURACAO_VOZ;\n"
)
