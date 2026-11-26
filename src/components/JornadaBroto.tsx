import { useLayoutEffect, useRef, useState, type Ref } from "react";

/**
 * Scroll journey, Pixar-short style:
 * 1. A little kraft box sits at the bottom-left; a sprout rises out of it with the scroll and
 *    unfolds two seed leaves, like a microgreen (the same pair Brotinho wears). The stem leans
 *    with the scroll's speed and springs back, so the plant feels carried by the screen.
 * 2. Over an empty stage before the closing section, the plant crouches, lifts off and glides to
 *    the centre on an arc, growing as it goes, leaning against its travel, landing with a squash.
 * 3. The right leaf quivers, harder and harder, then lets go and drifts down with the scroll,
 *    swaying like a falling leaf, to Brotinho, who waits without his right leaf.
 * 4. The leaf snaps into place; the section gets `cta-docked` and its content bounces in.
 *
 * Everything follows the scroll (scrolling back up rewinds it) until the leaf docks; docking is final.
 * The scroll position is followed through a short exponential smoothing, so wheel steps and
 * flicks read as one continuous motion. Never runs under reduced motion; without JS nothing is hidden.
 */

const LEAF_D = "M87 30c9-18 31-22 39-14-6 14-24 20-39 14z";
const LEAF_VEIN = "M89 29c10-6 20-9 30-11";
const LEFT_LEAF_D = "M86 34c-16-16-36-12-40-4 10 12 28 12 40 4z";
const LEFT_LEAF_VEIN = "M84 33c-10-4-20-5-30-3";

/** Where the stem leaves the box, in the drawing's own coordinates: the lean pivots here. */
const STEM_BASE = "86 268";

/** Time constant of the scroll smoothing, in seconds. */
const FOLLOW = 0.09;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
/** Progress of `v` through the window [a, b], clamped to 0..1. */
const span = (v: number, a: number, b: number) => clamp01((v - a) / (b - a || 1));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);
/** A 0 → 1 → 0 bump across [a, b], for squash and stretch. */
const bump = (v: number, a: number, b: number) => {
  const t = span(v, a, b);
  return t > 0 && t < 1 ? Math.sin(t * Math.PI) : 0;
};

function shouldPlay() {
  return typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function JornadaBroto() {
  const [play] = useState(shouldPlay);
  const plantRef = useRef<HTMLDivElement>(null);
  const leanRef = useRef<SVGGElement>(null);
  const tipRef = useRef<SVGPathElement>(null);
  const flyRef = useRef<SVGSVGElement>(null);
  const flyPathRef = useRef<SVGPathElement>(null);

  // Layout effect: the first frame is drawn before paint, so the plant never flashes fully grown.
  useLayoutEffect(() => {
    if (!play) return;
    const section = document.getElementById("contato");
    const box = section?.querySelector<HTMLElement>(".chamada-box");
    const stage = document.getElementById("palco");
    const target = section?.querySelector<SVGGElement>("[data-leaf-target] path");
    const plant = plantRef.current;
    const lean = leanRef.current;
    const tip = tipRef.current;
    const fly = flyRef.current;
    const flyPath = flyPathRef.current;
    if (!section || !box || !stage || !target || !plant || !lean || !tip || !fly || !flyPath) return;

    // Opens the empty stage only while the journey runs.
    document.documentElement.classList.add("jornada");
    section.classList.add("cta-pending");

    // The flying leaf's own viewBox hugs the leaf, so its box maps 1:1 onto the measured rects.
    const bb = flyPath.getBBox();
    fly.setAttribute("viewBox", `${bb.x} ${bb.y} ${bb.width} ${bb.height}`);

    let docked = false;
    let frame = 0;
    let lastStart: DOMRect | null = null;
    let lastQuiver = 0;
    let lingerTimer = 0;

    // Smoothed scroll position, and the stem's lean as a damped spring driven by scroll speed.
    let ys = window.scrollY;
    let lastT = 0;
    let bend = 0;
    let bendV = 0;

    const sprout = plant.querySelector<SVGGElement>(".jornada-sprout");
    const seedL = plant.querySelector<SVGGElement>(".jornada-seed-l");
    const tipG = plant.querySelector<SVGGElement>(".jornada-tip");
    if (!sprout || !seedL || !tipG) return;

    // Writes go straight to the moving elements (no inherited custom properties, which would
    // restyle the whole drawing every frame), and only when the value actually changed.
    const written = new Map<string, string>();
    const put = (el: HTMLElement | SVGElement, key: string, prop: "translate" | "rotate" | "scale" | "opacity", value: string) => {
      if (written.get(key) === value) return;
      written.set(key, value);
      el.style[prop] = value;
    };

    // Plant geometry, measured once and again on resize: size, resting offsets, centre-stage scale.
    let pw = 0;
    let ph = 0;
    let pad = 0;
    let left = 0;
    let stageScale = 1.7;
    const measure = () => {
      const cs = getComputedStyle(plant);
      pw = plant.offsetWidth;
      ph = plant.offsetHeight;
      pad = parseFloat(cs.bottom) || 0;
      left = parseFloat(cs.left) || 0;
      stageScale = parseFloat(cs.getPropertyValue("--plant-cs")) || 1.7;
    };
    measure();

    // instant: the content shows at once instead of bouncing in (focus arrived before the leaf).
    const dock = (instant = false) => {
      if (docked) return;
      docked = true;
      cancelAnimationFrame(frame);
      frame = 0;
      window.clearTimeout(lingerTimer);
      fly.style.opacity = "0";
      plant.style.display = "none";
      document.documentElement.classList.add("jornada-done");
      document.documentElement.classList.remove("palco-in");
      section.classList.remove("cta-pending");
      section.classList.add("cta-docked");
      if (instant) section.classList.add("cta-instant");
      section.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };

    /** Draws one frame for the smoothed scroll position `y`; returns true while it needs more frames. */
    const render = (y: number, now: number, speed: number, dt: number): boolean => {
      // Every layout read happens here, before any style write, so a frame never forces a reflow.
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const stageRect = stage.getBoundingClientRect();
      const stageTop = stageRect.top + scrollY;
      // The stage is pinned while it fills the screen: the floating button steps aside then.
      const pinned = stageRect.top <= vh * 0.05 && stageRect.bottom >= vh * 0.95;
      const end = target.getBoundingClientRect();
      // The tip as last drawn: the leaf lets go from wherever it was on screen.
      const tipNow = tip.getBoundingClientRect();

      // Landing: Brotinho's head a third of the way down the screen, so it stays in view on
      // phones where the closing box is taller than the screen; or as far as the page scrolls.
      const headTop = end.top + scrollY;
      const landY = Math.min(headTop - vh * 0.33, maxScroll - 2);
      // The plant grows on the way down and reaches the centre as the stage pins to the screen.
      // The stage stays pinned for a while: the phrases appear around the plant, the right leaf
      // quivers, then lets go and falls toward the closing section.
      const centreFrom = stageTop - vh * 0.8;
      const releaseY = Math.min(stageTop + vh * 0.45, landY - vh * 0.4);
      const quiverFrom = releaseY - vh * 0.22;

      // 1. Growth: the stem comes up fast and slows as it nears full height (like a shoot
      //    finding the light); the seed leaves then swing open from a closed pair.
      const g = clamp01(y / Math.max(centreFrom, 1));
      const rise = easeOutSine(span(g, 0, 0.8));
      const open = easeOut(span(g, 0.76, 1));

      // 2. To centre stage, on an arc: it lifts before it glides (y leads x), grows with a slight
      //    lag, leans back against its travel, and squashes and stretches like a little hop:
      //    crouch at take-off, stretch in flight, squash as it touches down (when the rise ends).
      const c = span(y, centreFrom, stageTop);
      const cy = easeInOut(span(c, 0.04, 0.8));
      const cx = easeInOut(span(c, 0.2, 1));
      const cg = easeInOut(span(c, 0.08, 0.94));
      const rot = -9 * Math.sin(Math.PI * cx) * (1 - 0.5 * cy * cy);
      const crouch = bump(c, 0, 0.14);
      const stretch = bump(c, 0.12, 0.62);
      const land = bump(c, 0.74, 0.92);
      const sqy = -0.09 * crouch + 0.07 * stretch - 0.06 * land;
      const sqx = 0.06 * crouch - 0.04 * stretch + 0.045 * land;

      // The stage's phrases appear one by one once the stage has pinned and the plant has landed,
      // so none of them slides in under the travelling plant.
      const phrases = span(y, stageTop, stageTop + vh * 0.5);

      // 3. The quiver: the right leaf trembles on its stalk, building up as the release nears,
      //    in gusts rather than a steady buzz, and pulls slightly away from the stem at the end.
      const released = y >= releaseY;
      const q = released ? 0 : span(y, quiverFrom, releaseY);
      let quiver = 0;
      if (q > 0) {
        const t = now / 1000;
        const gust = 0.62 + 0.38 * Math.sin(t * 2 * Math.PI * 1.15);
        const wave = 0.7 * Math.sin(t * 2 * Math.PI * 7.5) + 0.3 * Math.sin(t * 2 * Math.PI * 12.7 + 1.3);
        quiver = (1.5 + 7.5 * q * q) * gust * wave;
        lastQuiver = quiver;
      }
      const tug = 0.07 * Math.pow(q, 3);
      // After the leaf lets go the plant stays on stage (the phrases' arrows keep their target) and
      // leaves with the stage: once the pinned stretch ends, it rides up with the scrolling stage.
      const follow = Math.min(0, stageRect.bottom - vh);

      // Stem lean: scrolling pushes the sprout back, and the spring brings it home with a sway.
      const bendTarget = clamp(-speed * 0.005, -9, 9);
      bendV += (-150 * (bend - bendTarget) - 13 * bendV) * dt;
      bend += bendV * dt;

      // Writes.
      const k = 1 + cg * (stageScale - 1);
      const dx = (window.innerWidth / 2 - left - pw / 2) * cx;
      const dy = follow - (vh / 2 - (ph * stageScale) / 2 - pad) * cy;
      put(plant, "p-t", "translate", `${dx.toFixed(2)}px ${dy.toFixed(2)}px`);
      put(plant, "p-r", "rotate", `${rot.toFixed(2)}deg`);
      put(plant, "p-s", "scale", `${(k * (1 + sqx)).toFixed(4)} ${(k * (1 + sqy)).toFixed(4)}`);
      if (written.get("pin") !== String(pinned)) {
        written.set("pin", String(pinned));
        document.documentElement.classList.toggle("palco-in", pinned);
      }
      put(sprout, "sp", "translate", `0 ${((1 - rise) * 58).toFixed(2)}px`);
      put(seedL, "l-s", "scale", open.toFixed(4));
      put(seedL, "l-r", "rotate", `${((1 - open) * 55 - quiver * 0.3).toFixed(2)}deg`);
      put(tipG, "t-s", "scale", (open * (1 + tug)).toFixed(4));
      put(tipG, "t-r", "rotate", `${((1 - open) * -55 + quiver).toFixed(2)}deg`);
      put(tipG, "t-o", "opacity", released ? "0" : "1");
      const bendAttr = `rotate(${bend.toFixed(2)} ${STEM_BASE})`;
      if (written.get("bend") !== bendAttr) {
        written.set("bend", bendAttr);
        lean.setAttribute("transform", bendAttr);
      }
      const pc = phrases.toFixed(3);
      if (written.get("pc") !== pc) {
        written.set("pc", pc);
        stage.style.setProperty("--pc", pc);
      }

      const springing = Math.abs(bend) > 0.02 || Math.abs(bendV) > 0.02;

      if (!released) {
        fly.style.opacity = "0";
        if (g > 0.98) lastStart = tipNow;
        return q > 0 || springing;
      }

      // 4. The fall: from where the tip let go to Brotinho's empty stalk, swaying as it drifts.
      const t = span(y, releaseY, landY);
      const start =
        lastStart ?? new DOMRect(window.innerWidth / 2 - end.width / 2, vh * 0.55, end.width, end.height);
      const e = easeInOut(t);
      const sway = Math.sin(t * Math.PI * 3.2) * (1 - t);
      const w = start.width + (end.width - start.width) * e;
      const h = start.height + (end.height - start.height) * e;
      const x = start.left + (end.left - start.left) * e + sway * 46;
      const yy = start.top + (end.top - start.top) * e - Math.sin(t * Math.PI) * 30;
      // It leaves at the angle the quiver had it, and hands over to the sway within the first stretch.
      const handover = lastQuiver * (1 - span(t, 0, 0.2));
      fly.style.opacity = "1";
      fly.style.width = `${w}px`;
      fly.style.height = `${h}px`;
      fly.style.transform = `translate(${x}px, ${yy}px) rotate(${sway * 38 + handover}deg)`;

      if (t >= 1) {
        dock();
        return false;
      }
      return springing;
    };

    const tick = (now: number) => {
      frame = 0;
      if (docked) return;
      const dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 1 / 60;
      lastT = now;
      const goal = window.scrollY;
      const prev = ys;
      ys += (goal - ys) * (1 - Math.exp(-dt / FOLLOW));
      if (Math.abs(goal - ys) < 0.25) ys = goal;
      const speed = dt > 0 ? (ys - prev) / dt : 0;
      const busy = render(ys, now, speed, dt);
      if (docked) return;
      if (busy || ys !== goal) frame = requestAnimationFrame(tick);
      else lastT = 0;
    };

    const wake = () => {
      if (!frame && !docked) frame = requestAnimationFrame(tick);
    };

    // Safety net: if the box sits in view and the leaf has not docked, reveal anyway.
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(lingerTimer);
        if (entry.intersectionRatio >= 0.6) lingerTimer = window.setTimeout(() => dock(), 2000);
      },
      { threshold: [0, 0.6] },
    );
    io.observe(box);
    // Keyboard and screen-reader users can land inside the section before the leaf does:
    // the moment anything in it takes focus, the content must be there to see.
    const onFocus = () => dock(true);
    section.addEventListener("focusin", onFocus);

    // Late font and image loads move the target: re-measure whenever the page reflows.
    const onResize = () => {
      measure();
      wake();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    document.fonts?.ready.then(wake);

    // First frame straight away, at the real scroll position (a reload mid-page starts there).
    render(ys, performance.now(), 0, 0);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(lingerTimer);
      io.disconnect();
      ro.disconnect();
      section.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", onResize);
    };
  }, [play]);

  if (!play) return null;

  return (
    <>
      <div
        ref={plantRef}
        className="jornada-plant"
        aria-hidden="true"
      >
        <BrotoNaCaixa tipRef={tipRef} leanRef={leanRef} />
      </div>
      <svg
        ref={flyRef}
        className="jornada-fly"
        fill="none"
        stroke="var(--color-ink)"
        strokeLinecap="round"
        strokeLinejoin="round"
        overflow="visible"
        aria-hidden="true"
      >
        <path ref={flyPathRef} d={LEAF_D} fill="var(--color-sprout)" strokeWidth={3} />
        <path d={LEAF_VEIN} strokeWidth={1.8} />
      </svg>
    </>
  );
}

/**
 * The kraft box with its microgreen sprout and two seed leaves. Left alone it shows the fully grown
 * drawing; the scroll journey moves its parts directly (stem rising, leaves unfolding, the quiver,
 * the right leaf letting go) and bends the stem through `leanRef`.
 */
export function BrotoNaCaixa({
  tipRef,
  leanRef,
  className,
}: {
  tipRef?: Ref<SVGPathElement>;
  leanRef?: Ref<SVGGElement>;
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 182 170 158" fill="none" stroke="var(--color-ink)" strokeLinecap="round" strokeLinejoin="round" overflow="visible">
      {/* the sprout rises out of the box with the scroll and leans from where it leaves the box;
          the box, drawn after it, hides whatever part of it is still inside */}
      <g ref={leanRef}>
      <g className="jornada-sprout">
      <path
        d="M86 276C82 262 90 248 86 234 84 226 86 218 86 211"
        stroke="var(--color-forest)"
        strokeWidth={5}
      />
      {/* two seed leaves open at the top: left stays, right is the one that falls */}
      <g transform="translate(0 178)">
      <g className="jornada-seed-l">
        <path d={LEFT_LEAF_D} fill="var(--color-sprout)" strokeWidth={3} />
        <path d={LEFT_LEAF_VEIN} strokeWidth={1.8} />
      </g>
      </g>
      <g transform="translate(0 178)">
      <g className="jornada-tip">
        <path ref={tipRef} d={LEAF_D} fill="var(--color-sprout)" strokeWidth={3} />
        <path d={LEAF_VEIN} strokeWidth={1.8} />
      </g>
      </g>
      </g>
      </g>
      {/* the kraft box the plant grows from */}
      <path d="M44 276l14-12h78l-14 12z" fill="#f1dfbe" strokeWidth={3} />
      <path d="M122 276l14-12 1 58-15 14z" fill="#e2c595" strokeWidth={3} />
      <path d="M126 290l8-7M126 304l8-7M126 318l8-7" strokeWidth={1.6} />
      <path d="M44 276h78v60H44z" fill="#f1dfbe" strokeWidth={3} />
      <path d="M62 300h42v16H62z" fill="#ffffff" strokeWidth={1.8} />
      <path d="M70 308h26" strokeWidth={1.6} />
    </svg>
  );
}
