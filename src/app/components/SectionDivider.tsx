import { colors } from "../../styles/theme";

type WaveVariant =
  | "wave-soft"    // ola suave
  | "wave-sharp"   // ola pronunciada
  | "tilt"         // diagonal
  | "tilt-reverse" // diagonal inversa
  | "curve"        // curva simple
  | "mountain";    // picos

type Props = {
  variant?:    WaveVariant;
  fromColor?:  string;  // color de la sección de arriba
  toColor?:    string;  // color de la sección de abajo
  flip?:       boolean; // voltea verticalmente
  height?:     number;  // altura del shape en px
};

const PATHS: Record<WaveVariant, string> = {
  "wave-soft":  "M0,40 C150,80 350,0 500,40 C650,80 850,0 1000,40 L1000,80 L0,80 Z",
  "wave-sharp": "M0,60 C100,20 200,80 300,40 C400,0 500,70 600,30 C700,0 800,60 900,20 C950,5 980,30 1000,20 L1000,80 L0,80 Z",
  "tilt":       "M0,0 L1000,50 L1000,80 L0,80 Z",
  "tilt-reverse":"M0,50 L1000,0 L1000,80 L0,80 Z",
  "curve":      "M0,60 Q500,0 1000,60 L1000,80 L0,80 Z",
  "mountain":   "M0,80 L0,50 L200,20 L400,60 L600,10 L800,55 L1000,25 L1000,80 Z",
};

export function SectionDivider({
  variant    = "wave-soft",
  fromColor,
  toColor,
  flip       = false,
  height     = 80,
}: Props) {
  const fill = toColor || colors.bgCard;

  return (
    <div style={{
      position:   "relative",
      height:     `${height}px`,
      overflow:   "hidden",
      background: fromColor || "transparent",
      marginBottom: "-1px", // elimina gap de 1px entre secciones
      lineHeight:  0,
    }}>
      <svg
        viewBox={`0 0 1000 ${height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom:   0,
          left:     0,
          width:    "100%",
          height:   "100%",
          transform: flip ? "scaleY(-1)" : "none",
          display:  "block",
        }}
      >
        <path d={PATHS[variant]} fill={fill} />
      </svg>
    </div>
  );
}