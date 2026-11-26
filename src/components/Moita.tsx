import { useCallback, useEffect, useState } from "react";

/**
 * Entry animation: a marker-drawn bush (leaves, beet greens, microgreen sprouts) covers the
 * screen, rustles, and parts to the sides to reveal the page.
 * Runs once a week per device, never under reduced motion, and any click, key, touch or scroll skips it.
 */

const SEEN_KEY = "hortinbox:moita";
/** The bush plays again only after a week: in-app browsers (Instagram, WhatsApp) start a new
 *  session on every visit, and a scroll-locking intro there would greet the visitor every time. */
const REPLAY_AFTER_MS = 7 * 24 * 60 * 60 * 1000;

function shouldPlay(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const seen = Number(localStorage.getItem(SEEN_KEY));
    return !seen || Date.now() - seen > REPLAY_AFTER_MS;
  } catch {
    return true;
  }
}

/** Small deterministic PRNG so the bush is the same on every visit. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const LEAF = "M0 0C-21-19-18-49 0-64 18-49 21-19 0 0Z";
const VEINS = "M0-3V-55M0-18l-12-10M0-18l12-10M0-34l-9-9M0-34l9-9";
const BEET = "M0 0C-30-18-34-66-4-92 26-70 32-22 0 0Z";
const BEET_VEINS = "M0 8V-84M-1-26l-13-12M-1-26l13-12M-2-50l-10-10M-2-50l10-10";

/** Back-to-front: deep greens first so the front leaves read brightest. */
const FILLS = ["#1c7434", "#5fb83a", "#82d85a", "#a4d47c", "#e6f5dc"] as const;

type Piece = { kind: "leaf" | "beet" | "sprout" | "radish"; x: number; y: number; rot: number; scale: number; fill: string };

function buildHalf(seed: number): Piece[] {
  const r = rng(seed);
  const pieces: Piece[] = [];
  // Layered passes, back to front, each a jittered grid that overfills a 600 x 1000 half.
  FILLS.forEach((fill, layer) => {
    for (let y = -60; y < 1100; y += 140) {
      for (let x = -40; x < 680; x += 150) {
        const jx = x + (r() - 0.5) * 90 + (layer % 2) * 65;
        const jy = y + (r() - 0.5) * 80 + layer * 22;
        const beet = layer >= 2 && r() < 0.12;
        const radish = !beet && layer >= 3 && r() < 0.1;
        pieces.push({
          kind: beet ? "beet" : radish ? "radish" : "leaf",
          x: jx,
          y: jy,
          // Leaves reach toward the centre seam (to the right in this half's own frame).
          rot: 35 + r() * 80,
          scale: 2.1 + r() * 1.5 - layer * 0.12,
          fill: beet ? "#5fb83a" : fill,
        });
        // Two draws once spent on per-leaf flicks; kept so the bush keeps its exact layout.
        r();
        r();
      }
    }
  });
  // Microgreen sprouts along the bottom edge.
  for (let x = 20; x < 640; x += 70) {
    pieces.push({ kind: "sprout", x: x + (r() - 0.5) * 30, y: 990, rot: (r() - 0.5) * 16, scale: 1.6 + r() * 0.8, fill: "#82d85a" });
    r();
    r();
  }
  return pieces;
}

const LEFT = buildHalf(7);
const RIGHT = buildHalf(29);

function Half({ side, pieces }: { side: "left" | "right"; pieces: Piece[] }) {
  return (
    <svg
      viewBox="0 0 600 1000"
      preserveAspectRatio={side === "left" ? "xMaxYMid slice" : "xMinYMid slice"}
      className={`moita-half moita-${side}`}
      fill="none"
      stroke="#1a1a1a"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g transform={side === "right" ? "translate(600 0) scale(-1 1)" : undefined}>
      {pieces.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.rot}) scale(${p.scale})`}>
          {p.kind === "leaf" && (
            <>
              <path d={LEAF} fill={p.fill} strokeWidth={1.6} />
              <path d={VEINS} strokeWidth={0.9} stroke={p.fill === "#1c7434" ? "#e6f5dc" : "#1a1a1a"} />
            </>
          )}
          {p.kind === "beet" && (
            <>
              <path d="M0 0v22" stroke="#c2185b" strokeWidth={4} />
              <path d={BEET} fill={p.fill} strokeWidth={1.6} />
              <path d={BEET_VEINS} stroke="#c2185b" strokeWidth={1.6} />
            </>
          )}
          {p.kind === "radish" && (
            <>
              <path d="M0-2c-6-16-20-24-32-20 1 14 15 22 32 20z" fill="#82d85a" strokeWidth={1.6} />
              <path d="M1-2c3-18 16-28 30-26 1 14-12 26-30 26z" fill="#5fb83a" strokeWidth={1.6} />
              <path d="M0 0c-15 0-24 12-21 25 2 11 12 19 21 25 9-6 19-14 21-25 3-13-6-25-21-25z" fill="#e0457b" strokeWidth={1.6} />
              <path d="M-11 10c-3 5-3 11 0 16" stroke="#ffffff" strokeWidth={1.6} />
              <path d="M0 50c1 8-1 15-5 21" strokeWidth={1.4} />
            </>
          )}
          {p.kind === "sprout" && (
            <>
              <path d="M0 0c-2-18 2-30 0-46" strokeWidth={1.8} />
              <path d="M0-44c-10-12-24-10-28-4 7 9 20 9 28 4z" fill={p.fill} strokeWidth={1.6} />
              <path d="M1-46c8-13 22-15 27-9-5 10-17 13-27 9z" fill={p.fill} strokeWidth={1.6} />
            </>
          )}
        </g>
      ))}
      </g>
    </svg>
  );
}

export function Moita() {
  const [show, setShow] = useState(shouldPlay);

  const finish = useCallback(() => {
    try {
      localStorage.setItem(SEEN_KEY, String(Date.now()));
    } catch {
      /* private mode: the bush just plays again next visit */
    }
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const skip = () => finish();
    const opts = { once: true, passive: true } as const;
    window.addEventListener("keydown", skip, opts);
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchmove", skip, opts);
    // Safety net in case animationend never fires (background tab, throttled timers).
    const timer = window.setTimeout(finish, 2400);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.clearTimeout(timer);
    };
  }, [show, finish]);

  if (!show) return null;

  return (
    <div
      className="moita"
      aria-hidden="true"
      onClick={finish}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget) finish();
      }}
    >
      {/* Backings meet exactly at the centre and part with their halves; leaves sit above both,
          so no leaf is ever cut by the other side's backing. */}
      <div className="moita-half moita-left moita-backing" />
      <div className="moita-half moita-right moita-backing" />
      <Half side="left" pieces={LEFT} />
      <Half side="right" pieces={RIGHT} />
    </div>
  );
}
