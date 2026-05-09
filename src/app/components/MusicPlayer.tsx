import { useState, useEffect, useRef, useCallback ,forwardRef, useImperativeHandle } from "react";
import { colors, fonts } from "../../styles/theme";

const CHORDS = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 440.00], // Am7
  [174.61, 220.00, 261.63, 349.23], // Fmaj7
  [196.00, 246.94, 293.66, 392.00], // G7
];
const CHORD_DURATION = 3.5;
const FADE_TIME      = 0.8;

type OscGroup = { oscs: OscillatorNode[]; gain: GainNode };

// ─── Estilos ─────────────────────────────────────────────────────────────────

const S = {
  wrapper:      { position: "fixed" as const, bottom: "1.5rem", right: "1.5rem", zIndex: 1000, display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: "0.5rem" },
  tooltip:      { background: "rgba(28,42,58,0.92)", backdropFilter: "blur(8px)", border: `1px solid ${colors.border}`, borderRadius: "4px", padding: "0.4rem 0.9rem", color: colors.accentBlue, fontFamily: fonts.sans, fontSize: "0.7rem", letterSpacing: "0.1em", whiteSpace: "nowrap" as const, pointerEvents: "none" as const },
  spotifyLink:  { display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none", background: "rgba(28,42,58,0.85)", backdropFilter: "blur(8px)", border: `1px solid rgba(74,127,165,0.25)`, borderRadius: "4px", padding: "0.35rem 0.8rem", color: colors.accentBlue, fontFamily: fonts.sans, fontSize: "0.65rem", letterSpacing: "0.15em", transition: "color 0.2s ease, border-color 0.2s ease" },
  label:        { fontFamily: fonts.sans, fontSize: "0.6rem", letterSpacing: "0.15em", textAlign: "center" as const, marginTop: "0.25rem", transition: "color 0.3s ease" },
} as const;

// ─── Componente ──────────────────────────────────────────────────────────────
export type MusicPlayerHandle = { play: () => void };

export const MusicPlayer = forwardRef<MusicPlayerHandle>(function MusicPlayer(_, ref) {
  const [isPlaying,   setIsPlaying]   = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [bars,        setBars]        = useState([0.3, 0.5, 0.7, 0.4, 0.6]);

  const audioRef = useRef(new Audio(`${import.meta.env.BASE_URL}assets/dandelion.mp3`));
const animFrameRef = useRef<number | null>(null);

const startMusic = useCallback(async () => {
  const audio = audioRef.current;
  audio.loop   = true;
  audio.volume = 0;
  await audio.play();

  const TARGET  = 0.5;
  const STEP    = 0.01;
  const TICK_MS = 150; // cada 150ms sube 0.01 → llega a 0.7 en ~10.5s

  const fade = setInterval(() => {
    if (audio.volume >= TARGET) {
      audio.volume = TARGET;
      clearInterval(fade);
    } else {
      audio.volume = Math.min(audio.volume + STEP, TARGET);
    }
  }, TICK_MS);
}, []);

  useImperativeHandle(ref, () => ({
  play: () => { if (!isPlaying) { startMusic(); setIsPlaying(true); } },
}));

const stopMusic = useCallback(() => {
  audioRef.current.pause();
}, []);

  const toggle = async () => {
    if (isPlaying) { stopMusic(); setIsPlaying(false); }
    else           { await startMusic(); setIsPlaying(true); }
  };

  // Barras animadas
  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setBars(prev => prev.map(() => 0.2 + Math.random() * 0.8));
        animFrameRef.current = requestAnimationFrame(() =>
          setTimeout(animate, 120 + Math.random() * 100)
        );
      };
      animate();
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setBars([0.3, 0.5, 0.7, 0.4, 0.6]);
    }
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [isPlaying]);

 useEffect(() => () => { stopMusic(); }, [stopMusic]);

  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0;   }
        }
        .music-btn:hover  { transform: scale(1.1) !important; }
        .music-btn:active { transform: scale(0.95) !important; }
        .spotify-link:hover { color: #1DB954 !important; border-color: #1DB954 !important; }
      `}</style>

      <div style={S.wrapper}>

        {/* Tooltip */}
        {/* {showTooltip && (
          <div style={S.tooltip}>
            {isPlaying ? "Pausar música" : "Reproducir música ambiental"}
          </div>
        )} */}

        {/* Link Spotify */}
        {/* <a
          href="https://open.spotify.com/playlist/"
          target="_blank"
          rel="noopener noreferrer"
          className="spotify-link"
          style={S.spotifyLink}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          Nuestra playlist
        </a> */}

        {/* Botón principal */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button
            onClick={toggle}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="music-btn"
            style={{
              position:   "relative",
              width:      "56px",
              height:     "56px",
              borderRadius: "50%",
              display:    "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s ease, box-shadow 0.3s ease",
              background: isPlaying
                ? `linear-gradient(135deg, ${colors.accentTeal}, #3A6585)`
                : `linear-gradient(135deg, rgba(44,61,79,0.95), rgba(28,42,58,0.95))`,
              border: `1px solid ${isPlaying ? "rgba(143,175,194,0.5)" : colors.border}`,
              boxShadow: isPlaying
                ? `0 0 24px rgba(74,127,165,0.5), 0 4px 16px rgba(0,0,0,0.3)`
                : "0 4px 16px rgba(0,0,0,0.3)",
              backdropFilter: "blur(12px)",
              cursor: "pointer",
            }}
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {/* Ring pulsante */}
            {isPlaying && (
              <div style={{
                position:   "absolute",
                inset:      "-4px",
                borderRadius: "50%",
                border:     `1px solid ${colors.accentTeal}`,
                animation:  "pulse-ring 1.5s ease-out infinite",
                pointerEvents: "none",
              }} />
            )}

            {/* Barras o ícono play */}
            {isPlaying ? (
              <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "24px" }}>
                {bars.map((h, i) => (
                  <div key={i} style={{
                    width:        "3px",
                    height:       `${h * 20}px`,
                    borderRadius: "2px",
                    background:   colors.textPrimary,
                    transition:   "height 0.15s ease",
                  }} />
                ))}
              </div>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M6 4L14 9L6 14V4Z" fill={colors.accentBlue}/>
              </svg>
            )}
          </button>

          {/* Label */}
          {/* <p style={{ ...S.label, color: isPlaying ? colors.accentBlue : `${colors.accentBlue}80` }}>
            {isPlaying ? "♪ Ambiente" : "Música"}
          </p> */}
        </div>
      </div>
    </>
  );
});