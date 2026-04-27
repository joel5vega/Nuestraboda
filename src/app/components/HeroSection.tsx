import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1677677403344-029c7fcd7300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0aWMlMjB3ZWRkaW5nJTIwY2VyZW1vbnklMjBvdXRkb29yfGVufDF8fHx8MTc3NzA0NDExMHww&ixlib=rb-4.1.0&q=80&w=1080";

const FloralDivider = () => (
  <div className="flex items-center justify-center gap-3 my-4">
    <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, #8FAFC2)" }} />
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 8 6 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 6 12 2 12 2Z" fill="#8FAFC2" opacity="0.7"/>
      <path d="M12 14C12 14 8 18 8 22" stroke="#8FAFC2" strokeWidth="1" opacity="0.5"/>
      <path d="M2 12C2 12 6 8 10 8C12.2 8 14 9.8 14 12C14 14.2 12.2 16 10 16C6 16 2 12 2 12Z" fill="#8FAFC2" opacity="0.5"/>
      <path d="M22 12C22 12 18 8 14 8" stroke="#8FAFC2" strokeWidth="1" opacity="0.5"/>
    </svg>
    <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, #8FAFC2)" }} />
  </div>
);

const LeafDecor = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 75C30 75 10 55 5 35C2 20 15 5 30 5C45 5 58 20 55 35C50 55 30 75 30 75Z" fill="#4A7FA5" opacity="0.15"/>
    <path d="M30 75C30 75 10 55 5 35C2 20 15 5 30 5" stroke="#4A7FA5" strokeWidth="1" opacity="0.3" fill="none"/>
    <path d="M30 75L30 15" stroke="#4A7FA5" strokeWidth="0.5" opacity="0.4"/>
    <path d="M30 30L18 22" stroke="#4A7FA5" strokeWidth="0.5" opacity="0.3"/>
    <path d="M30 40L42 32" stroke="#4A7FA5" strokeWidth="0.5" opacity="0.3"/>
    <path d="M30 50L20 44" stroke="#4A7FA5" strokeWidth="0.5" opacity="0.3"/>
  </svg>
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={heroImage}
          alt="Wedding ceremony"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(28,42,58,0.72) 0%, rgba(28,42,58,0.55) 50%, rgba(28,42,58,0.8) 100%)" }} />
        {/* Rustic texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat"
        }} />
      </div>

      {/* Decorative corner leaves */}
      <LeafDecor className="absolute top-8 left-8 opacity-60 rotate-[-30deg]" />
      <LeafDecor className="absolute top-8 right-8 opacity-60 rotate-[30deg] scale-x-[-1]" />
      <LeafDecor className="absolute bottom-8 left-8 opacity-60 rotate-[150deg]" />
      <LeafDecor className="absolute bottom-8 right-8 opacity-60 rotate-[210deg] scale-x-[-1]" />

      {/* Ornamental border */}
      <div className="absolute inset-6 border opacity-20 pointer-events-none" style={{ borderColor: "#8FAFC2" }} />
      <div className="absolute inset-8 border opacity-10 pointer-events-none" style={{ borderColor: "#8FAFC2" }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Top label */}
        <p className="tracking-[0.4em] uppercase mb-6 text-xs" style={{ color: "#8FAFC2", fontFamily: "'Lato', sans-serif" }}>
          ✦ Juntos por siempre ✦
        </p>

        {/* Names */}
        <div className="mb-2">
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 10vw, 6rem)",
            color: "#F4EDE4",
            lineHeight: 1.05,
            fontWeight: 400,
            textShadow: "0 2px 20px rgba(0,0,0,0.4)"
          }}>
            Betania
          </h1>
        </div>

        <div className="flex items-center justify-center gap-4 my-2">
          <div className="h-px w-16" style={{ background: "#8FAFC2" }} />
          <span style={{ color: "#8FAFC2", fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontStyle: "italic" }}>&amp;</span>
          <div className="h-px w-16" style={{ background: "#8FAFC2" }} />
        </div>

        <div className="mb-8">
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 10vw, 6rem)",
            color: "#F4EDE4",
            lineHeight: 1.05,
            fontWeight: 400,
            textShadow: "0 2px 20px rgba(0,0,0,0.4)"
          }}>
            Joel
          </h1>
        </div>

        <FloralDivider />

        {/* Date */}
        <div className="mt-6 mb-4">
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: "clamp(1rem, 3vw, 1.4rem)",
            color: "#C8D9E6",
            letterSpacing: "0.15em",
          }}>
            SÁBADO · 1 DE AGOSTO, 2026
          </p>
        </div>

        {/* Location */}
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: "0.9rem",
          color: "#8FAFC2",
          letterSpacing: "0.2em",
          textTransform: "uppercase"
        }}>
          JIWASA · ACHOCHALLA
        </p>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce">
          <p style={{ color: "#8FAFC2", fontFamily: "'Lato', sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Desliza</p>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="#8FAFC2" strokeWidth="1.5" opacity="0.6"/>
            <circle cx="8" cy="8" r="2" fill="#8FAFC2" opacity="0.8">
              <animate attributeName="cy" from="8" to="14" dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
}