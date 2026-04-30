import { useEffect, useRef } from "react";
import { colors } from "../../styles/theme";

// ─── Configuración — ajusta aquí la intensidad ────────────────────────────

const CONFIG = {
  count:        28,    // cantidad de pétalos simultáneos
  minSize:      6,     // px mínimo
  maxSize:      14,    // px máximo
  minSpeed:     0.4,   // velocidad de caída mínima
  maxSpeed:     1.1,   // velocidad de caída máxima
  swayAmount:   60,    // amplitud del balanceo horizontal (px)
  swaySpeed:    0.008, // velocidad del balanceo
  opacity:      0.55,  // opacidad base
  // Paleta de colores de pétalos (hora dorada: cremas, rosas, dorados)
  palette: [
    "#F4EDE4",  // crema cálido
    "#E8D5C4",  // crema dorado
    "#D4A85A",  // dorado
    "#C8B8A8",  // beige
    "#DFC5B0",  // durazno suave
    "#B8C9D4",  // azul acero muy claro
  ],
};

// ─── Tipos ────────────────────────────────────────────────────────────────

type Petal = {
  x:         number;
  y:         number;
  size:      number;
  speedY:    number;
  swayOffset: number;  // fase inicial del balanceo
  rotation:  number;
  rotSpeed:  number;
  color:     string;
  opacity:   number;
  scaleX:    number;   // -1 o 1 para variedad de forma
};

// ─── Helper ───────────────────────────────────────────────────────────────

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function createPetal(canvasWidth: number, fromTop = false): Petal {
  return {
    x:          rand(0, canvasWidth),
    y:          fromTop ? rand(-80, -10) : rand(-80, -600), // escalonado al inicio
    size:       rand(CONFIG.minSize, CONFIG.maxSize),
    speedY:     rand(CONFIG.minSpeed, CONFIG.maxSpeed),
    swayOffset: rand(0, Math.PI * 2),
    rotation:   rand(0, Math.PI * 2),
    rotSpeed:   rand(-0.02, 0.02),
    color:      CONFIG.palette[Math.floor(Math.random() * CONFIG.palette.length)],
    opacity:    rand(CONFIG.opacity * 0.6, CONFIG.opacity),
    scaleX:     Math.random() > 0.5 ? 1 : -1,
  };
}

// Dibuja un pétalo orgánico usando bezier curves
function drawPetal(ctx: CanvasRenderingContext2D, p: Petal, tick: number) {
  ctx.save();

  const swayX = p.x + Math.sin(tick * CONFIG.swaySpeed + p.swayOffset) * CONFIG.swayAmount;

  ctx.translate(swayX, p.y);
  ctx.rotate(p.rotation + tick * p.rotSpeed);
  ctx.scale(p.scaleX, 1);
  ctx.globalAlpha = p.opacity;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  // Forma de pétalo con bezier: ovoide asimétrica
  ctx.bezierCurveTo(
    p.size * 0.5, -p.size * 0.3,
    p.size,        p.size * 0.5,
    0,             p.size
  );
  ctx.bezierCurveTo(
    -p.size * 0.5, p.size * 0.5,
    -p.size * 0.3, -p.size * 0.2,
    0,             0
  );

  ctx.fillStyle = p.color;
  ctx.fill();

  // Vena central sutil
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, p.size * 0.3, 0, p.size * 0.6, 0, p.size);
  ctx.strokeStyle = "rgba(255,255,255,0.2)";
  ctx.lineWidth   = 0.5;
  ctx.stroke();

  ctx.restore();
}

// ─── Componente ───────────────────────────────────────────────────────────

type Props = {
  active?:  boolean;  // solo anima cuando el hero es visible
  zIndex?:  number;
  height?:  string;   // altura del canvas, default "100vh"
};

export function PetalCanvas({ active = true, zIndex = 5, height = "100vh" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animRef   = useRef<number | null>(null);
  const tickRef   = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Inicializar pétalos escalonados (no todos desde arriba a la vez)
    petalsRef.current = Array.from({ length: CONFIG.count }, () =>
      createPetal(canvas.width, false)
    );

    // Loop de animación
    const animate = () => {
      if (!active) { animRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tickRef.current++;

      petalsRef.current = petalsRef.current.map(p => {
        // Caída
        p.y += p.speedY;

        // Si sale por abajo, renace desde arriba
        if (p.y > canvas.height + 20) {
          return createPetal(canvas.width, true);
        }

        drawPetal(ctx, p, tickRef.current);
        return p;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height,
        pointerEvents: "none",  // no interfiere con clicks
        zIndex,
      }}
    />
  );
}