import type { CSSProperties } from "react";
import { Brotinho } from "./Brotinho";
import { Ramo } from "./Folhagem";
import { Draw, WhatsAppGlyph } from "./doodles";
import { NAV, whatsappLink } from "../lib/site";

export function Chamada() {
  return (
    <Draw as="section" id="contato" aria-labelledby="contato-title" threshold={0.3}
      className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="chamada-box sketch grid items-center gap-10 bg-white px-4 py-12 min-[360px]:px-6 sm:px-12 md:grid-cols-[auto_1fr] md:gap-14 lg:px-20 lg:py-16">
        <Ramo seed={1} className="absolute -top-9 -right-5 w-28 sm:-right-8 sm:w-40 md:-top-12 md:w-28 lg:-top-9 lg:w-52" />
        <div className="brotinho-host relative mx-auto w-44 sm:w-56 md:w-64">
          <Brotinho mood="wave" leafTarget className="w-full" />
          <svg viewBox="0 0 100 100" className="cta-sparkle pointer-events-none absolute -top-[6%] left-[52%] w-[46%]" fill="none" stroke="var(--color-beet)" strokeWidth={4} strokeLinecap="round" aria-hidden="true">
            <path d="M50 8v14M78 22l-9 10M92 50H78M22 22l9 10M8 50h14" />
          </svg>
        </div>
        <div>
          <h2 id="contato-title" style={{ "--i": 0 } as CSSProperties} className="cta-pop font-marker text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-bold">
            Bora começar a sua <span className="hl">horta?</span>
          </h2>
          <p style={{ "--i": 1 } as CSSProperties} className="cta-pop mt-5 max-w-[36rem] text-xl leading-relaxed">
            Chame a gente no WhatsApp, conte seu espaço e sua rotina, e receba o kit certo para você.
          </p>
          <div className="mt-9">
            <a href={whatsappLink()} style={{ "--i": 2 } as CSSProperties} className="cta-pop cta-pop-btn btn-go w-full text-xl min-[360px]:text-2xl sm:w-auto">
              <WhatsAppGlyph />
              Quero meu kit
            </a>
          </div>
          <p style={{ "--i": 3 } as CSSProperties} className="cta-pop mt-8 text-base text-ink-soft sm:text-lg">
            Entregamos em cidades de Mato Grosso. O frete é combinado pelo WhatsApp.
          </p>
        </div>
      </div>
    </Draw>
  );
}

export function Footer() {
  return (
    <footer className="vine-top bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 footer-inner px-5 pt-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img src="/assets/images/logo.webp" alt="Hortinbox" width={298} height={240} loading="lazy" className="h-16 w-auto" />
          <p className="text-base leading-snug">
            Kits de cultivo para plantar em casa.
            <br />
            Tangará da Serra, MT
          </p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-7 gap-y-2 font-marker text-lg">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-11 items-center underline decoration-sprout decoration-2 underline-offset-4">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappLink()} className="inline-flex min-h-11 items-center underline decoration-sprout decoration-2 underline-offset-4">
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-ink-soft">© 2026 Hortinbox</p>
      </div>
    </footer>
  );
}

/** Floating shortcut to WhatsApp on touch screens (CSS hides it for mouse and trackpad); it steps
 *  aside while the hero button is on screen and while the stage is pinned. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      aria-label="Falar com a Hortinbox no WhatsApp"
      className="btn-go fab-wa fixed right-4 bottom-4 z-20 size-16 rounded-full! p-0"
    >
      <WhatsAppGlyph className="size-8" />
    </a>
  );
}
