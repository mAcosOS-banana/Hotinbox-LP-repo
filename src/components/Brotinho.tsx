type Mood = "happy" | "tired" | "idea" | "wave" | "chat";

/**
 * Brotinho, the Hortinbox mascot: the kit's kraft box with a sprout growing out of it,
 * drawn as marker line art with a hatched side.
 */
export function Brotinho({
  mood = "happy",
  className = "w-40",
  animated = false,
  leafTarget = false,
}: {
  mood?: Mood;
  className?: string;
  /** Loop the mood's little scene: the drip runs, the bulb lights up, the speech bubbles alternate. */
  animated?: boolean;
  /** Marks the right leaf as the landing spot of the scroll journey's falling leaf. */
  leafTarget?: boolean;
}) {
  const droop = mood === "tired";
  return (
    <svg
      viewBox="0 0 170 170"
      overflow="visible"
      className={`${className}${animated ? " brotinho-anim" : ""}`}
      fill="none"
      stroke="var(--color-ink)"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* shadow scribble */}
      <path d="M26 160c30-4 74-5 118-1" strokeWidth={2} opacity={0.5} />
      <path d="M40 165c24-2 52-2 84 0" strokeWidth={2} opacity={0.35} />

      {/* sprout */}
      <g transform={droop ? "rotate(14 88 66)" : undefined}>
        <path d="M88 67c-2-12 2-23-2-37" />
        <path d="M86 34c-16-16-36-12-40-4 10 12 28 12 40 4z" fill="var(--color-sprout)" />
        <path d="M84 33c-10-4-20-5-30-3" strokeWidth={1.8} />
        {/* Right leaf: the one the scroll journey's falling leaf replaces in the closing section. */}
        <g className="leaf-r" data-leaf-target={leafTarget ? "" : undefined}>
          <path d="M87 30c9-18 31-22 39-14-6 14-24 20-39 14z" fill="var(--color-sprout)" />
          <path d="M89 29c10-6 20-9 30-11" strokeWidth={1.8} />
        </g>
      </g>

      {/* box: lid, side, front */}
      <path d="M30 78l22-16 94-2-20 14z" fill="#f1dfbe" />
      <path d="M126 74l20-14 2 74-18 16z" fill="#e2c595" />
      <path d="M132 84l12-9M132 98l12-9M132 112l12-9M132 126l12-9M132 140l10-8" strokeWidth={1.6} />
      <path d="M30 78l96-4 4 76-96 4z" fill="#f1dfbe" />
      <path d="M56 140c10-1 22-1 30 0" strokeWidth={1.6} opacity={0.6} />

      {/* arms */}
      {mood === "wave" ? (
        <>
          <path d="M32 110c-10-6-15-16-16-28" />
          <path d="M10 76l-4-4M14 70l-1-6M20 72l3-5" strokeWidth={2} />
        </>
      ) : (
        <path d="M32 114c-8 6-12 14-12 20" />
      )}
      {mood === "idea" ? <path d="M129 108c10-8 15-18 16-30" /> : <path d="M129 114c9 6 13 14 13 20" />}

      {/* face */}
      {droop ? (
        <>
          <path d="M59 106h13M88 105h13" />
          <path d="M70 124c7-1 14-1 21 0" />
          <path className="drip" d="M112 86c-3 5-4 8-1 10 3 1 5-2 3-5z" fill="#cfe9ff" strokeWidth={2} />
        </>
      ) : (
        <>
          <circle cx="66" cy="106" r={mood === "idea" ? 7 : 5.5} fill="var(--color-ink)" stroke="none" />
          <circle cx="94" cy="105" r={mood === "idea" ? 7 : 5.5} fill="var(--color-ink)" stroke="none" />
          <circle cx="68" cy="103.5" r="1.8" fill="var(--color-paper)" stroke="none" />
          <circle cx="96" cy="102.5" r="1.8" fill="var(--color-paper)" stroke="none" />
          {mood === "idea" ? (
            <path d="M70 120c4 10 16 10 21 0z" fill="var(--color-ink)" />
          ) : (
            <path d="M68 121c6 8 18 8 25-1" />
          )}
          <path d="M54 116c3 1 6 1 8 0M98 115c3 1 6 1 8 0" stroke="var(--color-beet)" strokeWidth={2.4} opacity={0.7} />
        </>
      )}

      {/* extras */}
      {mood === "idea" && (
        <g>
          <circle className="bulb-glow" cx="150" cy="29" r="20" fill="#fff3a0" stroke="none" />
          <g className="bulb">
            <path className="bulb-glass" d="M150 44c-9 0-15-7-15-15s7-15 15-15 15 7 15 15c0 6-3 9-6 12v6h-18v-6" fill="#fff6c2" />
            <path d="M143 52h14M145 57h10" strokeWidth={2.4} />
            <path d="M146 36c0-6 2-9 4-11 2 2 4 5 4 11" strokeWidth={1.6} />
          </g>
          <path className="bulb-rays" d="M150 6V1M131 12l-4-4M169 12l4-4M127 30h-5M178 30h-5" strokeWidth={2.2} />
        </g>
      )}
      {mood === "chat" && (
        <g>
          <g className="bubble-r">
            <path d="M138 18c14-3 28 2 28 14s-12 16-24 15l-10 8 2-10c-8-4-10-9-9-14 1-7 6-11 13-13z" fill="#fff" />
            <path d="M139 30h16M140 37h10" strokeWidth={2.2} />
          </g>
          <g transform="translate(170 6) scale(-1 1)">
            <g className="bubble-l">
              <path d="M138 18c14-3 28 2 28 14s-12 16-24 15l-10 8 2-10c-8-4-10-9-9-14 1-7 6-11 13-13z" fill="var(--color-sprout-tint)" />
              <circle cx="143" cy="33" r="2" fill="var(--color-ink)" stroke="none" />
              <circle cx="150" cy="33" r="2" fill="var(--color-ink)" stroke="none" />
              <circle cx="157" cy="33" r="2" fill="var(--color-ink)" stroke="none" />
            </g>
          </g>
        </g>
      )}
    </svg>
  );
}
