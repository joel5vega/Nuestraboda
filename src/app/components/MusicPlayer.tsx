import { useState, useEffect, useRef, useCallback } from "react";

// Romantic chord progression using Web Audio API
// Chords: Cmaj7 - Am7 - Fmaj7 - G7 (I - vi - IV - V in C major)
const CHORDS = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 440.00], // Am7
  [174.61, 220.00, 261.63, 349.23], // Fmaj7
  [196.00, 246.94, 293.66, 392.00], // G7
];

const CHORD_DURATION = 3.5; // seconds per chord
const FADE_TIME = 0.8;

type OscGroup = { oscs: OscillatorNode[]; gain: GainNode };

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [bars, setBars] = useState([0.3, 0.5, 0.7, 0.4, 0.6]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const schedulerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chordIndexRef = useRef(0);
  const activeGroupsRef = useRef<OscGroup[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  };

  const playChord = useCallback((ctx: AudioContext, freqs: number[], startTime: number, duration: number) => {
    const chordGain = ctx.createGain();
    chordGain.gain.setValueAtTime(0, startTime);
    chordGain.gain.linearRampToValueAtTime(0.055, startTime + FADE_TIME);
    chordGain.gain.setValueAtTime(0.055, startTime + duration - FADE_TIME);
    chordGain.gain.linearRampToValueAtTime(0, startTime + duration);

    // Reverb-like effect using delay
    const delay = ctx.createDelay(2.0);
    delay.delayTime.value = 0.3;
    const delayGain = ctx.createGain();
    delayGain.gain.value = 0.25;

    chordGain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(delay);

    if (masterGainRef.current) {
      chordGain.connect(masterGainRef.current);
      delayGain.connect(masterGainRef.current);
    }

    const oscs: OscillatorNode[] = freqs.map((freq, i) => {
      const osc = ctx.createOscillator();
      // Mix sine and triangle for soft piano-like tone
      osc.type = i === 0 ? "triangle" : "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      // Slight vibrato
      const vibrato = ctx.createOscillator();
      vibrato.frequency.value = 5;
      const vibratoGain = ctx.createGain();
      vibratoGain.gain.value = 0.8;
      vibrato.connect(vibratoGain);
      vibratoGain.connect(osc.frequency);
      vibrato.start(startTime);
      vibrato.stop(startTime + duration);

      osc.connect(chordGain);
      osc.start(startTime);
      osc.stop(startTime + duration);
      return osc;
    });

    return { oscs, gain: chordGain };
  }, []);

  const scheduleNext = useCallback(() => {
    const ctx = getCtx();
    if (!masterGainRef.current) return;

    const now = ctx.currentTime;
    const idx = chordIndexRef.current % CHORDS.length;
    const freqs = CHORDS[idx];

    const group = playChord(ctx, freqs, now, CHORD_DURATION + FADE_TIME);
    activeGroupsRef.current.push(group);

    // Cleanup old groups
    activeGroupsRef.current = activeGroupsRef.current.slice(-4);

    chordIndexRef.current++;

    schedulerRef.current = setTimeout(() => {
      if (audioCtxRef.current?.state === "running") {
        scheduleNext();
      }
    }, (CHORD_DURATION) * 1000);
  }, [playChord]);

  const startMusic = useCallback(async () => {
    const ctx = getCtx();
    if (ctx.state === "suspended") await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.7;
    master.connect(ctx.destination);
    masterGainRef.current = master;

    chordIndexRef.current = 0;
    scheduleNext();
  }, [scheduleNext]);

  const stopMusic = useCallback(() => {
    if (schedulerRef.current) clearTimeout(schedulerRef.current);

    const ctx = audioCtxRef.current;
    if (ctx && masterGainRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      setTimeout(() => {
        activeGroupsRef.current = [];
        masterGainRef.current = null;
      }, 900);
    }
  }, []);

  const toggle = async () => {
    if (isPlaying) {
      stopMusic();
      setIsPlaying(false);
    } else {
      await startMusic();
      setIsPlaying(true);
    }
  };

  // Animated bars when playing
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setBars(prev => prev.map(() => 0.2 + Math.random() * 0.8));
        animFrameRef.current = requestAnimationFrame(() => {
          setTimeout(animate, 120 + Math.random() * 100);
        });
      };
      animate();
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setBars([0.3, 0.5, 0.7, 0.4, 0.6]);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic();
      if (schedulerRef.current) clearTimeout(schedulerRef.current);
    };
  }, [stopMusic]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <div
          className="px-3 py-2 rounded-sm text-xs whitespace-nowrap"
          style={{
            background: "rgba(28,42,58,0.95)",
            border: "1px solid rgba(74,127,165,0.3)",
            color: "#C8D9E6",
            fontFamily: "'Lato', sans-serif",
            letterSpacing: "0.1em",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
          }}
        >
          {isPlaying ? "Pausar música" : "Reproducir música"}
        </div>
      )}

      {/* Main button */}
      <button
        onClick={toggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: isPlaying
            ? "linear-gradient(135deg, #4A7FA5, #3A6585)"
            : "linear-gradient(135deg, rgba(44,61,79,0.95), rgba(28,42,58,0.95))",
          border: `1px solid ${isPlaying ? "rgba(143,175,194,0.5)" : "rgba(74,127,165,0.35)"}`,
          boxShadow: isPlaying
            ? "0 0 24px rgba(74,127,165,0.5), 0 4px 16px rgba(0,0,0,0.3)"
            : "0 4px 16px rgba(0,0,0,0.3)",
          backdropFilter: "blur(12px)",
        }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "rgba(74,127,165,0.2)" }}
          />
        )}

        {/* Waveform bars OR play icon */}
        {isPlaying ? (
          <div className="flex items-center gap-[3px] h-5 relative z-10">
            {bars.map((h, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full transition-all"
                style={{
                  height: `${h * 20}px`,
                  background: "#F4EDE4",
                  transition: "height 0.12s ease",
                }}
              />
            ))}
          </div>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="relative z-10 ml-0.5">
            <path d="M6 4L16 10L6 16V4Z" fill="#8FAFC2"/>
          </svg>
        )}
      </button>

      {/* Song label */}
      <div
        className="px-3 py-1 rounded-sm"
        style={{
          background: "rgba(28,42,58,0.85)",
          border: "1px solid rgba(74,127,165,0.15)",
          backdropFilter: "blur(8px)"
        }}
      >
        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: "0.7rem",
          color: "#6B8FA3",
          fontStyle: "italic",
          letterSpacing: "0.05em"
        }}>
          {isPlaying ? "♪ Ambiente romántico" : "Música ambiental"}
        </p>
      </div>
    </div>
  );
}
