import { useEffect, useRef, useState } from "react";

/**
 * Scroll journey, Pixar-short style:
 * 1. A little kraft box sits at the bottom-left; a sprout grows out of it with the scroll
 *    and opens two seed leaves, like a microgreen (the same pair Brotinho wears).
 * 2. Over an empty stage before the closing section, the plant slides to the centre.
 * 3. The right leaf lets go and drifts down with the scroll, swaying like a falling leaf,
 *    to Brotinho, who waits without his right leaf.
 * 4. The leaf snaps into place; the section gets `cta-docked` and its content bounces in.
 *
 * Everything is scroll-mapped (scrolling back up rewinds it) until the leaf docks; docking is final.
 * Never runs under reduced motion; without JS nothing is hidden.
 */

const LEAF_D = "M87 30c9-18 31-22 39-14-6 14-24 20-39 14z";
const LEAF_VEIN = "M89 29c10-6 20-9 30-11";
const LEFT_LEAF_D = "M86 34c-16-16-36-12-40-4 10 12 28 12 40 4z";
const LEFT_LEAF_VEIN = "M84 33c-10-4-20-5-30-3";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function shouldPlay() {
  return typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function JornadaBroto() {
  const [play] = useState(shouldPlay);
  const plantRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<SVGPathElement>(null);
  const flyRef = useRef<SVGSVGElement>(null);
  const flyPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!play) return;
    const section = document.getElementById("contato");
    const box = section?.querySelector<HTMLElement>(".chamada-box");
    const stage = document.getElementById("palco");
    const target = section?.querySelector<SVGGElement>("[data-leaf-target] path");
    const plant = plantRef.current;
    const tip = tipRef.current;
    const fly = flyRef.current;
    const flyPath = flyPathRef.current;
    if (!section || !box || !stage || !target || !plant || !tip || !fly || !flyPath) return;

    // Opens the empty stage only while the journey runs.
    document.documentElement.classList.add("jornada");
    section.classList.add("cta-pending");

    // The flying leaf's own viewBox hugs the leaf, so its box maps 1:1 onto the measured rects.
    const bb = flyPath.getBBox();
    fly.setAttribute("viewBox", `${bb.x} ${bb.y} ${bb.width} ${bb.height}`);

    let docked = false;
    let frame = 0;
    let lastStart: DOMRect | null = null;
    let lingerTimer = 0;

    const dock = () => {
      if (docked) return;
      docked = true;
      window.clearTimeout(lingerTimer);
      fly.style.opacity = "0";
      plant.style.display = "none";
      section.classList.remove("cta-pending");
      section.classList.add("cta-docked");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
    };

    const update = () => {
      frame = 0;
      if (docked) return;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const stageTop = stage.getBoundingClientRect().top + y;

      // Landing: Brotinho's head a third of the way down the screen, so it stays in view on
      // phones where the closing box is taller than the screen; or as far as the page scrolls.
      const headTop = target.getBoundingClientRect().top + y;
      const landY = Math.min(headTop - vh * 0.33, maxScroll - 2);
      // The plant grows on the way down, centres while the empty stage enters,
      // and lets the leaf go once the stage fills the screen.
      const centreFrom = stageTop - vh * 0.75;
      const releaseY = Math.min(stageTop + vh * 0.05, landY - vh * 0.4);
      const sinkFrom = releaseY;

      const g = clamp01(y / Math.max(centreFrom, 1));
      const c = easeInOut(clamp01((y - centreFrom) / (releaseY - vh * 0.1 - centreFrom)));
      const released = y >= releaseY;
      const sink = clamp01((y - sinkFrom) / (vh * 0.18));

      plant.style.setProperty("--g", g.toFixed(4));
      plant.style.setProperty("--c", c.toFixed(4));
      plant.style.setProperty("--s", sink.toFixed(4));
      plant.style.setProperty("--rel", released ? "1" : "0");

      if (!released) {
        fly.style.opacity = "0";
        if (g > 0.98) lastStart = tip.getBoundingClientRect();
        return;
      }

      const t = clamp01((y - releaseY) / Math.max(landY - releaseY, 1));
      const end = target.getBoundingClientRect();
      const start =
        lastStart ??
        new DOMRect(window.innerWidth / 2 - end.width / 2, vh * 0.55, end.width, end.height);
      const e = easeInOut(t);
      const sway = Math.sin(t * Math.PI * 3.2) * (1 - t);
      const w = start.width + (end.width - start.width) * e;
      const h = start.height + (end.height - start.height) * e;
      const x = start.left + (end.left - start.left) * e + sway * 46;
      const yy = start.top + (end.top - start.top) * e - Math.sin(t * Math.PI) * 30;
      fly.style.opacity = "1";
      fly.style.width = `${w}px`;
      fly.style.height = `${h}px`;
      fly.style.transform = `translate(${x}px, ${yy}px) rotate(${sway * 38}deg)`;

      if (t >= 1) dock();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Safety net: if the box sits in view and the leaf has not docked, reveal anyway.
    const io = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(lingerTimer);
        if (entry.intersectionRatio >= 0.6) lingerTimer = window.setTimeout(dock, 2000);
      },
      { threshold: [0, 0.6] },
    );
    io.observe(box);

    // Late font and image loads move the target: re-measure whenever the page reflows.
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);
    document.fonts?.ready.then(onScroll);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(lingerTimer);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [play]);

  if (!play) return null;

  return (
    <>
      <div ref={plantRef} className="jornada-plant" aria-hidden="true">
        <svg viewBox="0 182 170 158" fill="none" stroke="var(--color-ink)" strokeLinecap="round" strokeLinejoin="round" overflow="visible">
          {/* the sprout rises out of the box with the scroll; the box, drawn after it, hides
              whatever part of it is still inside */}
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
          {/* the kraft box the plant grows from */}
          <path d="M44 276l14-12h78l-14 12z" fill="#f1dfbe" strokeWidth={3} />
          <path d="M122 276l14-12 1 58-15 14z" fill="#e2c595" strokeWidth={3} />
          <path d="M126 290l8-7M126 304l8-7M126 318l8-7" strokeWidth={1.6} />
          <path d="M44 276h78v60H44z" fill="#f1dfbe" strokeWidth={3} />
          <path d="M62 300h42v16H62z" fill="#ffffff" strokeWidth={1.8} />
          <path d="M70 308h26" strokeWidth={1.6} />
        </svg>
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
