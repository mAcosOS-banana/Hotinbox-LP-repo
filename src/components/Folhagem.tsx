import type { CSSProperties } from "react";

const FILLS = ["#82d85a", "#e6f5dc", "#5fb83a", "#a4d47c"] as const;

/** Leaf drawn from its stalk at the origin, pointing up. */
const LEAF = "M0 0C-21-19-18-49 0-64 18-49 21-19 0 0Z";
const VEINS = "M0-3V-55M0-18l-12-10M0-18l12-10M0-34l-9-9M0-34l9-9M0-47l-5-5M0-47l5-5";

/** Points along the stem where a leaf grows, with the direction it points. */
const LEAVES: Array<[x: number, y: number, rot: number, scale: number]> = [
  [214, 30, -62, 1],
  [196, 56, 118, 0.9],
  [176, 84, -40, 1.1],
  [160, 112, 140, 1],
  [146, 140, -72, 1.15],
  [134, 166, 108, 1],
  [120, 194, -30, 1.1],
  [104, 220, 150, 0.95],
  [86, 244, -60, 1],
  [64, 264, 122, 0.9],
  [40, 284, -18, 0.85],
];

/**
 * A hand-drawn leafy branch hanging from its top-right root. Leaves sway on their stalks
 * (still under reduced motion). Purely decorative: hidden from assistive tech and pointer events.
 */
export function Ramo({ className = "", style, seed = 0 }: { className?: string; style?: CSSProperties; seed?: number }) {
  return (
    <svg
      viewBox="-40 -30 310 370"
      className={`pointer-events-none select-none ${className}`}
      style={style}
      fill="none"
      stroke="var(--color-ink)"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g className="sway-branch" style={{ "--root": "100% 0%" } as CSSProperties}>
        <path d="M236 4C196 54 160 98 138 150 118 198 84 246 30 292" strokeWidth={3.6} />
        <path d="M168 96c10-2 18 2 22 10M110 206c-8 1-14 6-16 13" strokeWidth={1.8} />
        {LEAVES.map(([x, y, rot, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
            <g
              className="sway"
              style={{ "--sway-d": `${-((i * 0.7 + seed) % 5)}s`, "--sway-t": `${5 + ((i + seed) % 4)}s` } as CSSProperties}
            >
              <path d={LEAF} fill={FILLS[(i + seed) % FILLS.length]} strokeWidth={2.6} />
              <path d={VEINS} strokeWidth={1.4} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
