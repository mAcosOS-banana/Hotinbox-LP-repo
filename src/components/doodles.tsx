import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Marks its subtree with data-draw="on" the first time it enters the viewport,
 * which lets the CSS draw arrows, ticks and highlighter swipes in.
 * Without JS, or with reduced motion, everything is already drawn.
 */
export function Draw({
  as: Tag = "div",
  className,
  children,
  threshold = 0.35,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  threshold?: number;
  id?: string;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.draw = "off";
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.draw = "on";
            io.unobserve(entry.target);
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

const delay = (d?: number): CSSProperties | undefined =>
  d === undefined ? undefined : ({ "--d": `${d}s` } as CSSProperties);

/** Hand-drawn arrow: one body stroke plus a two-stroke head, drawn in order. */
export function Arrow({
  body,
  head,
  viewBox,
  className,
  d = 0,
  color = "currentColor",
  width = 3,
  halo = false,
}: {
  body: string;
  head: string;
  viewBox: string;
  className?: string;
  d?: number;
  color?: string;
  width?: number;
  /** Paper-coloured outline under the ink so the arrow stays readable over a photo. */
  halo?: boolean;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {halo && (
        <g stroke="var(--color-paper)" strokeWidth={width + 5}>
          <path className="draw" pathLength={1} d={body} style={delay(d)} />
          <path className="draw" pathLength={1} d={head} style={delay(d + 0.55)} />
        </g>
      )}
      <path className="draw" pathLength={1} d={body} style={delay(d)} />
      <path className="draw" pathLength={1} d={head} style={delay(d + 0.55)} />
    </svg>
  );
}

/** A marker tick inside a wobbly box. */
export function Tick({ d = 0, className = "size-7" }: { d?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${className} shrink-0`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 6.2c7.6-.9 15.4-.8 22.8.3.6 7 .5 13.9-.3 20.9-7.4.5-14.9.4-22.3-.4-.8-6.9-.9-13.9-.2-20.8z" strokeWidth={2.2} />
      <path className="draw" pathLength={1} d="M8.5 16.5l5.2 5.6L28.5 3.5" strokeWidth={3.4} stroke="var(--color-forest)" style={delay(d)} />
    </svg>
  );
}

/** Underline swipe under a word or heading. */
export function Swipe({
  className,
  d = 0,
  color = "var(--color-sprout)",
}: {
  className?: string;
  d?: number;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 300 16" preserveAspectRatio="none" className={className} fill="none" aria-hidden="true">
      <path
        className="draw"
        pathLength={1}
        d="M3 11c48-6 97-8 146-6.5 49 1.2 98 2.8 148-1.5"
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        style={delay(d)}
      />
    </svg>
  );
}

/** Number in a hand-drawn circle, for comic panels and photo pins. */
export function Num({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`relative inline-grid size-10 shrink-0 place-items-center font-marker text-xl font-bold ${className}`}>
      <svg viewBox="0 0 40 40" className="absolute inset-0" fill="none" aria-hidden="true">
        <path
          d="M20.5 3.2c9.4.2 16.6 7.2 16.3 16.9-.3 9.6-7.8 16.8-17.1 16.6C10.4 36.5 3.1 29.3 3.4 19.6 3.7 10.1 11.2 3 20.5 3.2c2.2 0 4.2.4 6 1.2"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      </svg>
      <span className="relative" aria-hidden="true">
        {n}
      </span>
    </span>
  );
}

export function WhatsAppGlyph({ className = "size-7" }: { className?: string }) {
  return <img src="/assets/icons/whatsapp-ink.svg" alt="" className={className} width={44} height={44} />;
}

/** Five-point marker star, for bullets and callouts. */
export function Star({ className = "size-5", d = 0, color = "var(--color-beet)" }: { className?: string; d?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path className="draw" pathLength={1} style={delay(d)}
        d="M12 2.5l2.6 6.1 6.6.5-5 4.3 1.6 6.5L12 16.4l-5.8 3.5 1.6-6.5-5-4.3 6.6-.5z" />
    </svg>
  );
}
