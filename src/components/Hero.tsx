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

export function Header() {
  return (
    <header className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 pt-5 pb-4 sm:px-8 lg:pt-7">
      <a href="#topo" className="shrink-0" aria-label="Hortinbox, início">
        <img src="/assets/icons/logo-im.svg" alt="Hortinbox" width={159} height={128} className="h-16 w-auto sm:h-24" />
      </a>
      <nav aria-label="Seções" className="hidden md:block">
        <ul className="flex items-center gap-9 font-marker text-xl">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="underline decoration-transparent decoration-[3px] underline-offset-8 transition-colors hover:decoration-sprout"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a
        href={whatsappLink()}
        className="sketch-soft inline-flex min-h-11 items-center gap-2 bg-sprout px-4 py-2 font-marker text-lg font-bold text-ink-green transition-transform hover:-rotate-1"
      >
        <WhatsAppGlyph className="size-6" />
        <span>
          Falar <span className="hidden sm:inline">no WhatsApp</span>
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

function AnnotatedKit() {
  return (
    <figure className="relative">
      {/* Desktop: labels in the margins, arrows reaching into the photo. */}
      <div className="relative hidden aspect-[720/660] w-full lg:block">
        <div className="absolute top-[10.6%] left-[13.9%] h-[78.8%] w-[72.2%] -rotate-[1.5deg]">
          <img
            src="/assets/images/main-image.webp"
            alt="O kit Hortinbox aberto: caixa de madeira com ferramentas de jardinagem de cabo verde, borrifador verde, pacotes de sementes de beterraba e rabanete, uma caixinha de papelão e um saco de terra"
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
        <Arrow viewBox="0 0 720 660" className="absolute inset-0 size-full" halo d={1.1}
          body="M150 606c26-84 82-200 140-258" head="M268 356l22-9-2 23" />
        <Arrow viewBox="0 0 720 660" className="absolute inset-0 size-full" halo d={1.4}
          body="M624 492c-40-26-90-42-136-48" head="M503 432l-16 12 16 10" />

        <figcaption className="contents font-marker text-[clamp(1.05rem,1.55vw,1.4rem)] leading-tight font-bold">
          <span className="absolute top-[1.5%] left-[1%] -rotate-2">mini kit de jardinagem</span>
          <span className="absolute top-[2.5%] left-[78%] rotate-2">borrifador</span>
          <span className="absolute top-[92.5%] left-[1%] -rotate-1 text-beet">2 pacotes de sementes</span>
          <span className="absolute top-[64%] left-[88.5%] w-[11.5%] rotate-3">800 g de terra</span>
        </figcaption>
      </div>

      {/* Mobile and tablet: numbered pins on the photo and a legend under it. */}
      <div className="lg:hidden">
        <div className="relative mx-auto max-w-xl -rotate-1">
          <img
            src="/assets/images/main-image.webp"
            alt="O kit Hortinbox aberto: caixa de madeira com ferramentas de jardinagem de cabo verde, borrifador verde, pacotes de sementes de beterraba e rabanete, uma caixinha de papelão e um saco de terra"
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
        </div>
        <figcaption>
          <ol className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-x-4 gap-y-3 font-marker text-lg leading-tight font-bold">
            {PARTS.map((p) => (
              <li key={p.n} className="flex items-center gap-2">
                <Num n={p.n} />
                <span>{p.label}</span>
              </li>
            ))}
          </ol>
        </figcaption>
      </div>
    </figure>
  );
}

export function Hero() {
  return (
    <Draw as="section" id="topo" aria-labelledby="hero-title" threshold={0.15}
      className="relative mx-auto grid max-w-7xl gap-12 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-6 lg:pt-10 lg:pb-12">
      <Ramo seed={3} className="absolute top-20 -left-[7.5rem] hidden w-32 -scale-x-100 min-[1400px]:block" />
      <div className="lg:col-span-5">
        <h1 id="hero-title" className="font-marker text-[clamp(3rem,9vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.01em]">
          Tudo que você precisa em uma <span className="hl">caixa.</span>
        </h1>
        <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft sm:text-xl">
          O kit da Hortinbox chega com terra, sementes, borrifador e ferramentas para você plantar microverdes em casa. E a
          gente acompanha você do plantio à colheita.
        </p>
        <a href={whatsappLink()} className="btn-go mt-9 w-full sm:w-auto">
          <WhatsAppGlyph />
          Quero meu kit
          <svg viewBox="0 0 40 20" className="h-4 w-8" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" aria-hidden="true">
            <path d="M2 10c11-1 22-1 34 0M28 3l8 7-8 7" />
          </svg>
        </a>
        <ul className="mt-8 grid gap-3 text-base font-semibold sm:text-lg">
          <li className="flex items-center gap-3"><Tick d={0.6} /> Não precisa saber plantar</li>
          <li className="flex items-center gap-3"><Tick d={0.8} /> Se adapta ao seu espaço e à sua rotina</li>
          <li className="flex items-center gap-3"><Tick d={1} /> Entregamos em Mato Grosso</li>
        </ul>
      </div>
      <div className="lg:col-span-7">
        <AnnotatedKit />
        <p className="mt-6 text-center font-marker text-lg leading-snug lg:mt-4 lg:text-xl">
          <span className="hl hl-beet">e mais:</span> 3 vasos biodegradáveis, o manual e suporte até a colheita.
        </p>
      </div>
    </Draw>
  );
}
