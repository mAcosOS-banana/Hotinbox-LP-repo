import { useLayoutEffect, type CSSProperties } from "react";
import { Arrow, Draw, Num, Tick, WhatsAppGlyph } from "./doodles";
import { NAV, whatsappLink } from "../lib/site";
import { Ramo } from "./Folhagem";

/** Points on the kit photo (fractions of the image) and the label that names them. */
const PARTS = [
  { n: 1, label: "mini kit de jardinagem", x: 0.33, y: 0.3 },
  { n: 2, label: "2 pacotes de sementes", x: 0.37, y: 0.5 },
  { n: 3, label: "borrifador", x: 0.68, y: 0.33 },
  { n: 4, label: "800 g de terra", x: 0.7, y: 0.7 },
] as const;

const PHOTO_ALT =
  "O kit Hortinbox aberto: caixa de madeira com ferramentas de jardinagem de cabo verde, borrifador verde, pacotes de sementes de beterraba e rabanete, uma caixinha de papelão e um saco de terra";

/**
 * One srcset and one sizes for both photo slots (desktop and phone), so the browser picks the
 * same file for both and downloads it once; index.html preloads the same pair.
 */
const PHOTO_SRCSET =
  "/assets/images/main-image-640.webp 640w, /assets/images/main-image-900.webp 900w, /assets/images/main-image.webp 1200w";
const PHOTO_SIZES = "(min-width: 1024px) 520px, (min-width: 640px) 576px, calc(100vw - 40px)";

export function Header() {
  return (
    <header className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 pt-4 pb-3 sm:px-8 sm:pt-5 sm:pb-4 lg:pt-7">
      {/* The logo is a paper scrap taped to the notebook, like every other surface on the page. */}
      <a
        href="#topo"
        className="relative shrink-0 -rotate-[1.5deg] bg-paper px-1.5 pt-1 shadow-[0_2px_3px_rgb(0_0_0/0.14)] [border-radius:14px_5px_12px_6px/6px_12px_5px_14px]"
        aria-label="Hortinbox, início"
      >
        <span className="tape -top-3 left-1/2 w-10 -translate-x-1/2 rotate-3" aria-hidden="true" />
        <img src="/assets/images/logo.webp" alt="Hortinbox" width={298} height={240} className="h-14 w-auto sm:h-24" />
      </a>
      <nav aria-label="Seções" className="hidden md:block">
        <ul className="flex items-center gap-9 font-marker text-xl">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center underline decoration-transparent decoration-[3px] underline-offset-8 transition-colors hover:decoration-sprout"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href={whatsappLink()}
        className="sketch-soft inline-flex min-h-11 items-center gap-2 bg-sprout px-4 py-2 font-marker text-lg font-bold text-ink-green transition-transform hover:-rotate-1 active:translate-y-px active:rotate-0 active:bg-sprout-deep"
      >
        <WhatsAppGlyph className="size-6" />
        <span>
          <span className="max-[359px]:sr-only">Falar no </span>WhatsApp
        </span>
      </a>
      <svg
        viewBox="0 0 1200 10"
        preserveAspectRatio="none"
        className="absolute inset-x-5 bottom-0 h-2.5 w-[calc(100%-2.5rem)] sm:inset-x-8 sm:w-[calc(100%-4rem)]"
        aria-hidden="true"
      >
        <path d="M2 5c200-3 400 2 600-1s400 3 596-1" fill="none" stroke="var(--color-ink)" strokeWidth={2} strokeLinecap="round" />
      </svg>
    </header>
  );
}

/**
 * The headline's full stop, drawn as a seed with a two-leaf microgreen growing out of it: the box
 * becomes food. It sits inline on the text baseline (so it lands where the period would at any
 * size), at the headline's own stroke weight; the real "." stays in the text for screen readers.
 */
function SeedStop() {
  return (
    <>
      <span className="sr-only">.</span>
      <svg
        viewBox="0 0 44 62"
        className="ml-[0.02em] inline-block h-[0.7em] w-[0.5em] overflow-visible align-baseline"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <ellipse cx="9" cy="56" rx="6" ry="5.5" fill="var(--color-ink)" />
        {/* Wind: the stem sways from the seed, and every few seconds a gust bends it and makes the
            two leaves cross each other (CSS: .seed-sway, .seed-leaf-l, .seed-leaf-r). The leaves keep
            the brand sprout green, read against the highlighter band by their ink outlines. */}
        <g className="seed-sway">
          <path className="draw" pathLength={1} d="M10 50c1-10 9-14 11-26" stroke="var(--color-forest)" strokeWidth={5.5} style={{ "--d": "0.9s" } as CSSProperties} />
          <g className="seed-leaf-l">
            <path className="draw sprout-fill" pathLength={1} d="M21 25C14 14 5 14 3 20c6 7 12 8 18 5z" transform="translate(21 25) scale(1.18) translate(-21 -25)" fill="var(--color-sprout)" stroke="var(--color-ink)" strokeWidth={3.1} style={{ "--d": "1.25s" } as CSSProperties} />
          </g>
          <g className="seed-leaf-r">
            <path className="draw sprout-fill" pathLength={1} d="M22 22c5-12 15-15 19-9-3 9-12 12-19 9z" transform="translate(22 22) scale(1.18) translate(-22 -22)" fill="var(--color-sprout)" stroke="var(--color-ink)" strokeWidth={3.1} style={{ "--d": "1.4s" } as CSSProperties} />
          </g>
        </g>
      </svg>
    </>
  );
}

/** A small biodegradable pot, drawn in marker, for the "e mais" note. */
function Vasinho({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`shrink-0 ${className}`} fill="none" stroke="var(--color-ink)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 22c-1-6 1-10 0-15" stroke="var(--color-forest)" strokeWidth={2.6} />
      <path d="M20 10c-5-5-10-4-11-1 3 4 8 4 11 1zM20 9c3-6 8-7 10-4-2 4-6 6-10 4z" fill="var(--color-sprout)" />
      <path d="M7 22h26l-3 15H10z" fill="#e2c595" />
      <path d="M6 22h28" strokeWidth={2.6} />
      <path d="M13 28l2 4M19 27l1 5M26 28l-1 4" strokeWidth={1.4} opacity={0.6} />
    </svg>
  );
}

/** Taped beet note: the speed promise, on the photo itself. */
function SpeedNote({ className = "" }: { className?: string }) {
  return (
    <p className={`absolute bg-beet-tint px-3 pt-3 pb-2 font-marker leading-tight font-bold text-beet shadow-[0_2px_3px_rgb(0_0_0/0.14)] ${className}`}>
      <span className="tape -top-3 left-1/2 w-12 -translate-x-1/2 rotate-2" aria-hidden="true" />
      colha em até <span className="whitespace-nowrap">7 dias!</span>
    </p>
  );
}

/** The rest of the box, as a note taped to the photo: pots and manual, all pesticide-free. */
function MoreNote({ className = "" }: { className?: string }) {
  return (
    <p className={`relative flex items-start gap-2 bg-sprout-tint px-4 pt-4 pb-3 font-marker text-lg leading-snug shadow-[0_2px_3px_rgb(0_0_0/0.14)] lg:text-[clamp(1rem,1.3vw,1.2rem)] ${className}`}>
      <span className="tape -top-3 left-6 w-14 -rotate-3" aria-hidden="true" />
      <Vasinho className="mt-0.5 size-9" />
      <span>
        <span className="font-bold">e mais:</span> 3 vasos biodegradáveis e o manual de cultivo.{" "}
        <span className="font-bold text-forest">Tudo sem agrotóxicos.</span>
      </span>
    </p>
  );
}

function AnnotatedKit() {
  return (
    <figure className="relative">
      {/* Desktop: labels in the margins, arrows reaching into the photo. The labels repeat the
          legend below (read by screen readers there), so they are hidden from assistive tech. */}
      <div className="relative hidden aspect-[720/660] w-full lg:block">
        <div className="absolute top-[10.6%] left-[13.9%] h-[78.8%] w-[72.2%] -rotate-[1.5deg]">
          <img
            src="/assets/images/main-image.webp"
            srcSet={PHOTO_SRCSET}
            sizes={PHOTO_SIZES}
            alt={PHOTO_ALT}
            width={1200}
            height={1200}
            fetchPriority="high"
            className="size-full rounded-[6px] border-[2.5px] border-ink object-cover"
          />
          <span className="tape -top-3 -left-6 -rotate-[24deg]" aria-hidden="true" />
          <span className="tape -top-3 -right-6 rotate-[20deg]" aria-hidden="true" />
        </div>

        <Arrow viewBox="0 0 720 660" className="absolute inset-0 size-full" halo d={0.5}
          body="M168 52c42 14 84 64 96 150" head="M250 188l13 17 10-19" />
        <Arrow viewBox="0 0 720 660" className="absolute inset-0 size-full" halo d={0.8}
          body="M556 48c-22 44-62 112-88 172" head="M459 199l8 21 15-15" />
        {/* Seeds: up the left margin and in from the side, so it never crosses the branded box. */}
        <Arrow viewBox="0 0 720 660" className="absolute inset-0 size-full" halo d={1.1}
          body="M64 588c-24-74-26-160 14-214 36-46 116-52 192-40" head="M252 320l20 14-18 14" />
        <Arrow viewBox="0 0 720 660" className="absolute inset-0 size-full" halo d={1.4}
          body="M624 492c-40-26-90-42-136-48" head="M503 432l-16 12 16 10" />

        <div className="font-marker text-[clamp(1.05rem,1.55vw,1.4rem)] leading-tight font-bold" aria-hidden="true">
          <span className="absolute top-[1.5%] left-[1%] -rotate-2">mini kit de jardinagem</span>
          <span className="absolute top-[2.5%] left-[78%] rotate-2">borrifador</span>
          <span className="absolute top-[92.5%] left-[1%] -rotate-1 text-beet">2 pacotes de sementes</span>
          <span className="absolute top-[64%] left-[88.5%] w-[11.5%] rotate-3">800 g de terra</span>
        </div>

        <SpeedNote className="top-[33%] left-[80%] w-[19%] rotate-[4deg] text-[clamp(1rem,1.45vw,1.3rem)]" />
        <MoreNote className="absolute! top-[80%] left-[58%] w-[42%] rotate-[-2deg]" />
      </div>

      {/* Phones and tablets: numbered pins on the photo and a legend under it. */}
      <div className="lg:hidden">
        <div className="relative mx-auto max-w-xl -rotate-1">
          <img
            src="/assets/images/main-image.webp"
            srcSet={PHOTO_SRCSET}
            sizes={PHOTO_SIZES}
            alt={PHOTO_ALT}
            width={1200}
            height={1200}
            fetchPriority="high"
            className="aspect-square w-full rounded-[6px] border-[2.5px] border-ink object-cover"
          />
          <span className="tape -top-3 left-6 -rotate-6" aria-hidden="true" />
          {PARTS.map((p) => (
            <span
              key={p.n}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper text-ink"
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
              aria-hidden="true"
            >
              <Num n={p.n} />
            </span>
          ))}
          <SpeedNote className="-top-4 -right-2 rotate-[5deg] text-lg" />
        </div>
      </div>

      {/* The one caption: a legend on phones, read by screen readers on desktop. */}
      <figcaption className="lg:sr-only">
        <ol className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-x-4 gap-y-3 min-[360px]:grid-cols-2 font-marker text-lg leading-tight font-bold">
          {PARTS.map((p) => (
            <li key={p.n} className="flex items-center gap-2">
              <Num n={p.n} />
              <span>{p.label}</span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}

/** Phones and tablets: the "e mais" note sits after the legend, so the pins and their names stay together. */
function MoreNoteBelow() {
  return <MoreNote className="mx-auto mt-6 max-w-xl rotate-[-1deg] lg:hidden" />;
}

/**
 * Marks <html> with `hero-cta-in` while the hero's WhatsApp button is on screen, so the fixed
 * extras (the journey's kraft box, the floating WhatsApp button) stay out of its way, and with
 * `hero-title-out` while the headline is off screen, which pauses its wind loop. Without JS
 * neither class appears and nothing is hidden.
 */
function useHeroCtaWatch() {
  useLayoutEffect(() => {
    const cta = document.getElementById("hero-cta");
    if (!cta) return;
    const root = document.documentElement;
    const r = cta.getBoundingClientRect();
    root.classList.toggle("hero-cta-in", r.bottom > 0 && r.top < window.innerHeight);
    const io = new IntersectionObserver(([entry]) => root.classList.toggle("hero-cta-in", entry.isIntersecting));
    io.observe(cta);
    // The headline's wind loop pauses while the headline is off screen.
    const title = document.getElementById("hero-title");
    const titleIo = new IntersectionObserver(([entry]) => root.classList.toggle("hero-title-out", !entry.isIntersecting));
    if (title) titleIo.observe(title);
    return () => {
      io.disconnect();
      titleIo.disconnect();
      root.classList.remove("hero-cta-in", "hero-title-out");
    };
  }, []);
}

export function Hero() {
  useHeroCtaWatch();
  return (
    <Draw as="section" id="topo" aria-labelledby="hero-title" threshold={0.15}
      className="relative mx-auto grid max-w-7xl gap-10 px-5 pt-6 pb-20 sm:px-8 sm:pt-10 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-8 lg:pt-10 lg:pb-12">
      <Ramo seed={3} className="absolute top-20 -left-[7.5rem] hidden w-32 -scale-x-100 min-[1400px]:block" />
      <div className="hero-copy lg:col-span-5 lg:row-start-1 lg:self-end">
        <h1 id="hero-title" className="font-marker text-[clamp(3rem,9vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.01em] max-[359px]:text-[2.5rem] lg:text-[clamp(3rem,5.2vw,4.6rem)]">
          Tudo que você precisa em uma{" "}
          <span className="hl">
            caixa<SeedStop />
          </span>
        </h1>
        {/* One short lead at every size: what comes in the box, and that someone stays with you. */}
        <p className="hero-lead mt-5 max-w-[30rem] text-lg leading-relaxed text-ink-soft sm:mt-6 sm:text-xl">
          Terra, sementes, borrifador e ferramentas para plantar microverdes em casa. E a gente acompanha você do
          plantio à colheita.
        </p>
        <a id="hero-cta" href={whatsappLink()} className="btn-go mt-7 w-full sm:mt-9 sm:w-auto">
          <WhatsAppGlyph />
          Quero meu kit
          <svg viewBox="0 0 40 20" className="h-4 w-8" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true">
            <path d="M2 10c11-1 22-1 34 0M28 3l8 7-8 7" />
          </svg>
        </a>
        <p className="mt-3 font-marker text-base leading-snug text-ink-soft sm:text-lg">
          abre o WhatsApp · preço e frete combinados na conversa
        </p>
      </div>
      <div className="hero-kit lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center">
        <AnnotatedKit />
        <MoreNoteBelow />
      </div>
      <ul className="hero-ticks grid gap-3 text-base font-semibold sm:text-lg lg:col-span-5 lg:row-start-2 lg:self-start">
        <li className="flex items-center gap-3"><Tick d={0.6} /> Não precisa saber plantar</li>
        <li className="flex items-center gap-3"><Tick d={0.8} /> Se adapta ao seu espaço e à sua rotina</li>
        <li className="flex items-center gap-3">
          <Tick d={1} />
          <span>
            Entregamos em Mato Grosso
            <span className="block font-marker text-base leading-tight font-bold text-forest">
              feito em Tangará da Serra
            </span>
          </span>
        </li>
      </ul>
    </Draw>
  );
}
