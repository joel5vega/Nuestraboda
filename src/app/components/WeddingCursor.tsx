import { useEffect, useRef, useState } from "react";
import { colors } from "../../styles/theme";

type Trail = { x: number; y: number; id: number };

export function WeddingCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const posRef     = useRef({ x: -100, y: -100 });
  const aimRef     = useRef({ x: -100, y: -100 });
  const animRef    = useRef<number | null>(null);
  const [trails,   setTrails]   = useState<Trail[]>([]);
  const [isHover,  setIsHover]  = useState(false);
  const [isClick,  setIsClick]  = useState(false);
  const trailTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trailId    = useRef(0);

  useEffect(() => {
    // Ocultar cursor nativo
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      aimRef.current = { x: e.clientX, y: e.clientY };

      // Pétalo de trail cada 60ms
      if (trailTimer.current) return;
      trailTimer.current = setTimeout(() => {
        trailTimer.current = null;
        setTrails(prev => [
          ...prev.slice(-8),
          { x: e.clientX, y: e.clientY, id: trailId.current++ },
        ]);
      }, 60);
    };

    const onEnterClickable = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("button, a, [role='button'], input, textarea, select"))
        setIsHover(true);
    };
    const onLeaveClickable = () => setIsHover(false);

    const onDown = () => { setIsClick(true);  };
    const onUp   = () => { setIsClick(false); };

    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseover",  onEnterClickable);
    window.addEventListener("mouseout",   onLeaveClickable);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);

    // Loop suave: el anillo principal sigue con lag
    const animate = () => {
      const aim = aimRef.current;
      const pos = posRef.current;
      pos.x += (aim.x - pos.x) * 0.12;
      pos.y += (aim.y - pos.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${isHover ? 1.5 : isClick ? 0.8 : 1})`;
      }
      // El punto inner sigue directo
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${aim.x}px, ${aim.y}px) scale(${isClick ? 0.5 : 1})`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    // Limpiar trails viejos
    const cleanTrails = setInterval(() => {
      setTrails(prev => prev.slice(-5));
    }, 500);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseover",  onEnterClickable);
      window.removeEventListener("mouseout",   onLeaveClickable);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      clearInterval(cleanTrails);
    };
  }, [isHover, isClick]);

  // Solo en desktop
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      <style>{`
        @keyframes trailFade {
          0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(0.2); opacity: 0;   }
        }
      `}</style>

      {/* Trails de pétalos */}
      {trails.map((t) => (
        <div
          key={t.id}
          style={{
            position:      "fixed",
            left:          t.x,
            top:           t.y,
            width:         "6px",
            height:        "9px",
            pointerEvents: "none",
            zIndex:        9998,
            animation:     "trailFade 0.6s ease forwards",
          }}
        >
          <svg width="6" height="9" viewBox="0 0 6 9" fill="none" style={{ transform: "translate(-50%, -50%)" }}>
            <path d="M3 0C3 0 0 3 0 5.5C0 7 1.5 9 3 9C4.5 9 6 7 6 5.5C6 3 3 0 3 0Z" fill={colors.accentBlue} opacity="0.7"/>
          </svg>
        </div>
      ))}

      {/* Punto interior — sigue el mouse directo */}
<div
  ref={dotRef}
  style={{
    position:      "fixed",
    top:           0,
    left:          0,
    pointerEvents: "none",
    zIndex:        9999,
    transform:     "translate(-100px, -100px)",
    marginLeft:    "-5px",
    marginTop:     "-5px",
    transition:    "transform 0.08s ease",
  }}
>
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
    style={{ transition: "transform 0.15s ease", transform: isClick ? "scale(0.5)" : "scale(1)" }}
  >
    <path d="M5 9S0 5.5 0 3A2.5 2.5 0 0 1 5 2.2 2.5 2.5 0 0 1 10 3C10 5.5 5 9 5 9Z"
      fill={colors.textPrimary} opacity="0.9"/>
  </svg>
</div>
      {/* Anillo exterior — sigue con lag */}
     <div
  ref={cursorRef}
  style={{
    position:      "fixed",
    top:           0,
    left:          0,
    pointerEvents: "none",
    zIndex:        9999,
    transform:     "translate(-100px, -100px)",
    marginLeft:    "-16px",
    marginTop:     "-16px",
    transition:    "opacity 0.3s ease",
    opacity:       isHover ? 1 : 0.55,
  }}
>
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    style={{
      transition: "transform 0.15s ease",
      transform:  isHover ? "scale(1.5)" : isClick ? "scale(0.8)" : "scale(1)",
    }}
  >
    <path
      d="M16 28S2 18 2 9A7 7 0 0 1 16 7.2 7 7 0 0 1 30 9C30 18 16 28 16 28Z"
      stroke={isHover ? colors.accentTeal : colors.accentBlue}
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
</div>
    </>
  );
}