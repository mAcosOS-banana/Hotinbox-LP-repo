import { Brotinho } from "./Brotinho";
import { Draw, WhatsAppGlyph } from "./doodles";
import { NAV, whatsappLink } from "../lib/site";

export function Chamada() {
  return (
    <Draw as="section" id="contato" aria-labelledby="contato-title" threshold={0.3}
      className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="sketch grid items-center gap-10 bg-white px-6 py-12 sm:px-12 md:grid-cols-[auto_1fr] md:gap-14 lg:px-20 lg:py-16">
        <Brotinho mood="wave" className="mx-auto w-44 sm:w-56 md:w-64" />
        <div>
          <h2 id="contato-title" className="font-marker text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-bold">
            Bora começar a sua <span className="hl">horta?</span>
          </h2>
          <p className="mt-5 max-w-[36rem] text-xl leading-relaxed">
            Chame a gente no WhatsApp, conte seu espaço e sua rotina, e receba o kit certo para você.
          </p>
          <div className="mt-9">
            <a href={whatsappLink()} className="btn-go w-full text-2xl sm:w-auto">
              <WhatsAppGlyph />
              Quero meu kit
            </a>
          </div>
          <p className="mt-8 text-base text-ink-soft sm:text-lg">
            Entregamos em cidades de Mato Grosso. O frete é combinado pelo WhatsApp.
          </p>
        </div>
      </div>
    </Draw>
  );
}

export function Footer() {
  return (
    <footer className="border-t-[2.5px] border-ink bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 pt-10 pb-28 sm:px-8 md:flex-row md:items-center md:justify-between md:pb-10">
        <div className="flex items-center gap-4">
          <img src="/assets/icons/logo-im.svg" alt="Hortinbox" width={159} height={128} loading="lazy" className="h-16 w-auto" />
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
                <a href={item.href} className="underline decoration-sprout decoration-2 underline-offset-4">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={whatsappLink()} className="underline decoration-sprout decoration-2 underline-offset-4">
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

/** Phone-only floating shortcut to WhatsApp; desktop keeps the header button in view instead. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      aria-label="Falar com a Hortinbox no WhatsApp"
      className="btn-go fixed right-4 bottom-4 z-20 size-16 rounded-full! p-0 md:hidden"
    >
      <WhatsAppGlyph className="size-8" />
    </a>
  );
}
