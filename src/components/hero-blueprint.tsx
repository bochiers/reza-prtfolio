import { useEffect, useRef, type CSSProperties } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Hero drawing: a hand-built structural section (4-storey frame on Cement Deep Mixing
 * columns). Pure SVG + CSS, no video, no third-party asset. Ported from
 * docs/prototypes/hero-blueprint.html (uiux v6). Keyframes live in src/styles/frontend.css.
 *
 * Under prefers-reduced-motion the CSS shows the finished drawing (see frontend.css).
 */

// Gridlines A..E (x), floor levels (y). Drawing coordinates, not pixels.
const GRID_X = [360, 480, 600, 720, 840];
const GRID_LABELS = ["A", "B", "C", "D", "E"];
const FLOOR_Y = [370, 300, 230, 160, 90]; // ground, L1, L2, L3, roof
const LEVELS = ["±0,00", "+3,50", "+7,00", "+10,50", "+14,00"];
const GROUND_Y = 370;

const d = (delay: number, dur?: number) =>
  ({ "--d": `${delay}s`, ...(dur === undefined ? {} : { "--t": `${dur}s` }) }) as CSSProperties;

const hatch = (() => {
  let s = "";
  for (let x = 232; x <= 1086; x += 14) s += `M${x} ${GROUND_Y} l-9 11 `;
  return s.trim();
})();

const strata = (y: number) => {
  let s = `M220 ${y}`;
  for (let i = 0; i < 22; i++) s += " q10 -4 20 0 t20 0";
  return s;
};

const FG = "var(--color-foreground)";
const ACC = "var(--color-accent)";

type StrokeProps = {
  id: string;
  d: string;
  delay: number;
  dur: number;
  stroke?: string;
  opacity?: number;
  width?: number;
  hide?: boolean;
  dash?: string;
};

/** A path that draws itself in (stroke-dashoffset), via pathLength="1". */
function DrawPath({ id, d: path, delay, dur, stroke = FG, opacity = 1, width = 1.5, hide, dash }: StrokeProps) {
  return (
    <path
      id={id}
      className="bp-draw"
      data-hide={hide ? "sm" : undefined}
      pathLength={1}
      d={path}
      stroke={stroke}
      strokeOpacity={opacity}
      strokeWidth={width}
      strokeDasharray={dash}
      fill="none"
      strokeLinecap="square"
      style={d(delay, dur)}
    />
  );
}

type TextProps = {
  id: string;
  x: number;
  y: number;
  delay: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  size?: "lbl" | "lg" | "sm";
  fill?: string;
  opacity?: number;
  weight?: number;
  hide?: boolean;
  spacing?: number;
};

function Label({ id, x, y, delay, children, anchor = "start", size = "lbl", fill = FG, opacity = 1, weight = 400, hide, spacing }: TextProps) {
  const cls = size === "lg" ? "bp-lbl-lg" : size === "sm" ? "bp-lbl-sm" : "bp-lbl";
  return (
    <text
      id={id}
      className={`bp-fade bp-t ${cls}`}
      data-hide={hide ? "sm" : undefined}
      x={x}
      y={y}
      textAnchor={anchor}
      fill={fill}
      fillOpacity={opacity}
      fontWeight={weight}
      letterSpacing={spacing}
      style={d(delay, 0.5)}
    >
      {children}
    </text>
  );
}

const VB_DESK = [200, 0, 700, 560] as const;
const VB_MOB = [320, 0, 560, 520] as const;

export function HeroBlueprint() {
  const boxRef = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery("(min-width: 1024px)");
  const vb = wide ? VB_DESK : VB_MOB;

  // --k = 1 / (px per drawing unit): keeps label text at a constant on-screen size
  // while the drawing scales with the box.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const fit = () => {
      const r = box.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const s = Math.min(r.width / vb[2], r.height / vb[3]);
      box.style.setProperty("--k", (1 / s).toFixed(4));
    };
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    fit();
    return () => ro.disconnect();
  }, [vb]);

  return (
    <>
    <div ref={boxRef} className="hero-bp">
      <svg
        viewBox={vb.join(" ")}
        preserveAspectRatio={wide ? "xMaxYMid meet" : "xMidYMid meet"}
        role="img"
        aria-label="Sketsa konsep: potongan rangka gedung empat lantai di atas kolom Cement Deep Mixing, dengan dimensi dan elevasi"
      >
        <defs>
          <linearGradient id="bpFadeX" gradientUnits="userSpaceOnUse" x1={vb[0]} x2={vb[0] + vb[2]} y1="0" y2="0">
            <stop offset="0" stopColor="#000" />
            <stop offset=".16" stopColor="#fff" />
            <stop offset=".84" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id="bpMaskX" maskUnits="userSpaceOnUse" x={vb[0]} y="0" width={vb[2]} height="560">
            <rect x={vb[0]} y="0" width={vb[2]} height="560" fill="url(#bpFadeX)" />
          </mask>
          <linearGradient id="bpFadeY" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e1e0cc" stopOpacity=".07" />
            <stop offset="1" stopColor="#e1e0cc" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ground + soil strata, faded out left and right */}
        <g mask="url(#bpMaskX)">
          <rect x="220" y="384" width="880" height="66" fill={FG} fillOpacity="0.035" />
          <rect x="220" y="450" width="880" height="45" fill={FG} fillOpacity="0.07" />
          <rect x="220" y="495" width="880" height="60" fill="url(#bpFadeY)" />
          <DrawPath id="ground" d={`M220 ${GROUND_Y} H1100`} delay={0.25} dur={1.1} opacity={0.95} width={2} />
          <path
            id="ground-hatch"
            className="bp-fade"
            d={hatch}
            stroke={FG}
            strokeOpacity="0.35"
            strokeWidth="1"
            fill="none"
            strokeLinecap="square"
            style={d(0.9, 0.8)}
          />
          <DrawPath id="strata-1" d={strata(405)} delay={0.5} dur={1.2} opacity={0.35} width={1.25} />
          <DrawPath id="strata-2" d={strata(450)} delay={0.68} dur={1.2} opacity={0.35} width={1.25} />
          <DrawPath id="strata-3" d={strata(495)} delay={0.86} dur={1.2} opacity={0.6} width={1.75} />
        </g>

        {/* Gridline axes */}
        <path
          id="axes"
          className="bp-fade"
          d={GRID_X.map((x) => `M${x} 70 V${GROUND_Y}`).join(" ")}
          stroke={FG}
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeDasharray="2 8"
          fill="none"
          style={d(0.1, 0.8)}
        />

        {/* Cement Deep Mixing columns: outline draws, fill grows, auger head descends */}
        {GRID_X.map((x, i) => (
          <g key={`cdm-${x}`}>
            <DrawPath
              id={`cdm-${i + 1}`}
              d={`M${x - 12} 384 V490 H${x + 12} V384`}
              delay={1.3 + i * 0.14}
              dur={1.1}
              stroke={ACC}
              width={2}
            />
            <rect
              id={`cdm-fill-${i + 1}`}
              className="bp-pilefill"
              x={x - 12}
              y="384"
              width="24"
              height="106"
              fill={ACC}
              fillOpacity="0.24"
              style={d(4.6 + i * 0.35)}
            />
          </g>
        ))}

        {/* Pile caps */}
        <DrawPath
          id="caps"
          d={GRID_X.map((x) => `M${x - 32} ${GROUND_Y} V384 H${x + 32} V${GROUND_Y} Z`).join(" ")}
          delay={2.8}
          dur={0.7}
          opacity={0.9}
          width={1.75}
        />

        {/* Frame: columns + double-line beams per storey, then bracing */}
        {[0, 1, 2, 3].map((i) => {
          const yb = FLOOR_Y[i];
          const yt = FLOOR_Y[i + 1];
          return (
            <g key={`storey-${i}`}>
              <DrawPath id={`col-${i + 1}`} d={GRID_X.map((x) => `M${x} ${yb} V${yt}`).join(" ")} delay={3.1 + i * 0.42} dur={0.55} width={2.5} />
              <DrawPath id={`beam-${i + 1}`} d={`M346 ${yt} H854 M346 ${yt + 8} H854`} delay={3.35 + i * 0.42} dur={0.7} width={2.5} />
            </g>
          );
        })}
        {[0, 1, 2, 3].map((i) => {
          const yb = FLOOR_Y[i];
          const yt = FLOOR_Y[i + 1] + 8;
          const [a, b, , dd, e] = GRID_X;
          return (
            <DrawPath
              key={`brace-${i}`}
              id={`brace-${i + 1}`}
              d={`M${a} ${yb} L${b} ${yt} M${b} ${yb} L${a} ${yt} M${dd} ${yb} L${e} ${yt} M${e} ${yb} L${dd} ${yt}`}
              delay={4.9 + i * 0.15}
              dur={0.7}
              opacity={0.6}
              width={1.25}
            />
          );
        })}

        {/* Top dimension string + grid bubbles */}
        <DrawPath
          id="dim-top"
          d={`M346 26 H854 ${GRID_X.map((x) => `M${x - 5} 31 L${x + 5} 21`).join(" ")} M360 16 V38 M840 16 V38`}
          delay={5.4}
          dur={0.9}
          stroke={ACC}
          opacity={0.95}
        />
        <Label id="lbl-L" x={600} y={16} delay={6.0} anchor="middle" size="lg" fill={ACC}>
          L = 24,00 m
        </Label>
        {GRID_X.map((x, i) => (
          <g key={`bubble-${x}`} className="bp-fade" style={d(5.3 + i * 0.06, 0.5)}>
            <circle cx={x} cy="58" r="11" fill="var(--color-background)" stroke={FG} strokeOpacity="0.75" strokeWidth="1.25" />
            <text x={x} y="58" dy="0.35em" textAnchor="middle" className="bp-lbl" fontFamily="IBM Plex Sans" fill={FG}>
              {GRID_LABELS[i]}
            </text>
          </g>
        ))}

        {/* Levels (lg+ only) */}
        <DrawPath
          id="lvl-lines"
          d={FLOOR_Y.map((y) => `M326 ${y} H342`).join(" ")}
          delay={5.6}
          dur={0.8}
          opacity={0.5}
          width={1}
          hide
        />
        {FLOOR_Y.map((y, i) => (
          <Label key={`lvl-${i}`} id={`lvl-${i}`} x={320} y={y - 5} delay={6.2 - i * 0.05} anchor="end" opacity={0.85} hide>
            {LEVELS[i]}
          </Label>
        ))}

        {/* Auger heads */}
        {GRID_X.map((x, i) => (
          <g key={`auger-${x}`} className="bp-auger" style={d(4.6 + i * 0.35)}>
            <path d={`M${x - 12} 481 H${x + 12} L${x} 497 Z`} fill={ACC} />
          </g>
        ))}
      </svg>
    </div>
    <p className="hero-bp-note">Ilustrasi konsep, tanpa skala</p>
    </>
  );
}
