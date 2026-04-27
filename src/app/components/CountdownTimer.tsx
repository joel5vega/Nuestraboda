import { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2026-06-14T16:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center mb-12">
    <p className="tracking-[0.4em] uppercase mb-3 text-xs" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>✦ Cuenta Regresiva ✦</p>
    <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C3D4F", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400 }}>
      {children}
    </h2>
    <div className="flex items-center justify-center gap-3 mt-4">
      <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #8FAFC2)" }} />
      <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill="#4A7FA5" opacity="0.5"/></svg>
      <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #8FAFC2)" }} />
    </div>
  </div>
);

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6" style={{ background: "#F4EDE4" }}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle>Faltan para el gran día</SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {units.map((unit, i) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div
                className="relative w-full aspect-square flex items-center justify-center rounded-sm"
                style={{
                  background: "linear-gradient(145deg, #2C3D4F, #3A5068)",
                  boxShadow: "4px 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
                  border: "1px solid rgba(143,175,194,0.2)"
                }}
              >
                {/* Wood grain texture */}
                <div className="absolute inset-0 opacity-10 rounded-sm" style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(255,255,255,0.03) 2px,
                    rgba(255,255,255,0.03) 4px
                  )`
                }} />
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l" style={{ borderColor: "#8FAFC2", opacity: 0.4 }} />
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r" style={{ borderColor: "#8FAFC2", opacity: 0.4 }} />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l" style={{ borderColor: "#8FAFC2", opacity: 0.4 }} />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r" style={{ borderColor: "#8FAFC2", opacity: 0.4 }} />

                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2rem, 8vw, 3.5rem)",
                  color: "#F4EDE4",
                  fontWeight: 400,
                  lineHeight: 1
                }}>
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 tracking-[0.25em] uppercase text-xs" style={{ color: "#4A7FA5", fontFamily: "'Lato', sans-serif" }}>
                {unit.label}
              </p>
              {i < units.length - 1 && (
                <div className="hidden md:flex absolute mt-[calc(12.5vw-1rem)] ml-[calc(25vw-1rem)] md:ml-[calc(100%/4-0.5rem)] items-center">
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Decorative bottom */}
        <div className="mt-14 text-center">
          <p style={{ fontFamily: "'Crimson Text', serif", fontStyle: "italic", color: "#6B8FA3", fontSize: "1.15rem" }}>
            "Dos almas que se encontraron para amarse por siempre"
          </p>
        </div>
      </div>
    </section>
  );
}
