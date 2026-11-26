import { Brotinho } from "./Brotinho";
import { Ramo } from "./Folhagem";
import { Arrow, Draw, Num, Star, Swipe, Tick, WhatsAppGlyph } from "./doodles";
import { whatsappLink } from "../lib/site";

const CONTENTS = [
  "800 g de terra",
  "2 pacotes de sementes",
  "1 borrifador",
  "3 vasos biodegradáveis",
  "caixa com cobertura",
  "1 mini kit de jardinagem",
  "1 manual de cultivo",
];

const STEPS = [
  { n: 1, title: "Chame no WhatsApp", text: "Conte quanto espaço você tem e como é a sua rotina.", mood: "chat" as const },
  { n: 2, title: "Receba o kit", text: "Montamos o kit pensando em você e enviamos para a sua cidade.", mood: "wave" as const },
  { n: 3, title: "Plante", text: "Siga o manual passo a passo, mesmo que nunca tenha plantado nada.", mood: "idea" as const },
  { n: 4, title: "Colha", text: "Microverdes crescem rápido, e a gente acompanha até a colheita.", mood: "happy" as const },
];

const PLANS = [
  {
    name: "Compra única",
    lead: "Um kit completo para começar.",
    items: ["tudo o que vem na caixa", "acompanhamento até a colheita"],
    message: "Olá! Quero saber mais sobre o kit Hortinbox de compra única.",
  },
  {
    name: "Plano mensal",
    lead: "Para quem quer a horta sempre produzindo.",
    items: ["o kit completo", "itens para continuar o cultivo todo mês", "acompanhamento contínuo"],
    message: "Olá! Quero saber mais sobre o plano mensal da Hortinbox.",
  },
];

export function NossosKits() {
  return (
    <section id="kit" aria-labelledby="kit-title" className="vine-top vine-bottom bg-sprout-tint/55">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Draw className="grid gap-14 lg:grid-cols-12 lg:gap-10" threshold={0.25}>
          <div className="lg:col-span-5">
            <h2 id="kit-title" className="font-marker text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.02] font-bold">
              Nossos kits
              <Swipe className="-mt-1 block h-3.5 w-52 sm:w-64" />
            </h2>
            <p className="mt-6 max-w-[30rem] text-xl leading-relaxed">
              Hoje o nosso foco são as <strong className="font-bold text-forest">microverdes</strong>: fáceis, rápidas de
              cultivar e cheias de sabor. Cada kit pode ser personalizado para o seu espaço.
            </p>
            <figure className="relative mt-10 hidden w-[85%] rotate-2 lg:block">
              <img
                src="/assets/images/microverdes.webp"
                alt="Microverdes brotando numa caixa sobre a bancada"
                width={900}
                height={1200}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-[6px] border-[2.5px] border-ink object-cover"
              />
              <span className="tape -top-3 left-8 -rotate-6" aria-hidden="true" />
              <figcaption className="mt-3 font-marker text-lg">microverdes brotando na caixa</figcaption>
              <p className="absolute -top-14 -right-24 w-40 -rotate-3 font-marker text-xl leading-tight font-bold text-forest">
                fácil e rápido de cultivar
              </p>
              <Arrow viewBox="0 0 80 70" className="absolute -top-4 -right-10 h-16 w-20 text-forest" halo d={0.6}
                body="M70 6C56 22 40 38 16 56" head="M14 40l1 17 17-3" />
            </figure>
          </div>

          <div className="relative lg:col-span-6 lg:col-start-7">
            <Ramo seed={2} className="absolute -top-16 -right-4 z-10 w-24 rotate-6 sm:w-32" />
            <div className="sketch ruled -rotate-1 px-6 pt-5 pb-8 sm:px-10">
              <h3 className="font-marker text-[1.75rem] leading-[2.25rem] font-bold">O que vem na caixa</h3>
              <ul className="mt-[2.25rem]">
                {CONTENTS.map((item, i) => (
                  <li key={item} className="flex h-[2.25rem] items-center gap-3 font-marker text-xl sm:text-[1.375rem]">
                    <Tick d={0.15 * i} className="size-6" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 flex items-start gap-3 font-marker text-xl leading-snug sm:ml-10">
              <Arrow viewBox="0 0 50 50" className="mt-1 size-10 shrink-0 text-beet" d={1.2}
                body="M44 6C30 8 16 18 10 40" head="M4 30l6 11 10-7" />
              <span>
                A caixa ainda vira <span className="hl hl-beet">vaso</span> depois: a gente ensina como.
              </span>
              <Star className="mt-1 size-7" d={1.6} />
            </p>
          </div>
        </Draw>

        <Draw className="mt-24" threshold={0.25}>
          <h3 className="font-marker text-3xl leading-tight font-bold sm:text-4xl">Como funciona</h3>
          <ol className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {STEPS.map((step, i) => (
              <li key={step.n} className="relative">
                <div className={`sketch flex h-full flex-col bg-white px-5 pt-5 pb-6 ${i % 2 ? "rotate-1" : "-rotate-1"}`}>
                  <div className="flex items-center gap-3">
                    <Num n={step.n} className="text-forest" />
                    <p className="font-marker text-2xl leading-tight font-bold">{step.title}</p>
                  </div>
                  <Brotinho mood={step.mood} className="mx-auto my-3 w-24" />
                  <p className="text-lg leading-relaxed">{step.text}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <Arrow viewBox="0 0 60 40" d={0.3 + i * 0.3}
                    className="absolute top-1/2 -right-11 hidden h-8 w-11 lg:block"
                    body="M4 22c14-10 30-12 48-4" head="M42 8l10 10-13 6" />
                )}
              </li>
            ))}
          </ol>
        </Draw>

        <Draw className="mt-24" threshold={0.25}>
          <h3 className="font-marker text-3xl leading-tight font-bold sm:text-4xl">Escolha como quer cultivar</h3>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12">
            {PLANS.map((plan, i) => (
              <article key={plan.name} className={`sketch relative flex flex-col bg-white p-7 sm:p-9 ${i === 1 ? "lg:rotate-1" : "lg:-rotate-1"}`}>
                {i === 1 && (
                  <p className="absolute -top-7 right-4 flex rotate-3 items-center gap-1.5 bg-paper px-2 font-marker text-xl font-bold text-beet sm:right-8">
                    <Star className="size-6" d={0.5} />
                    chega todo mês
                  </p>
                )}
                <h4 className="font-marker text-[2rem] leading-tight font-bold">
                  {i === 1 ? <span className="hl hl-beet">{plan.name}</span> : plan.name}
                </h4>
                <p className="mt-2 text-lg text-ink-soft">{plan.lead}</p>
                <ul className="mt-6 grid gap-3">
                  {plan.items.map((item, j) => (
                    <li key={item} className="flex items-center gap-3 text-lg font-semibold">
                      <Tick d={0.2 + j * 0.15} className="size-6" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={whatsappLink(plan.message)} className="btn-go mt-8 self-start text-xl">
                  <WhatsAppGlyph className="size-6" />
                  Pedir {i === 1 ? "o plano mensal" : "meu kit"}
                </a>
              </article>
            ))}
          </div>
          <p className="mt-8 text-lg text-ink-soft">Valores e frete combinados direto no WhatsApp.</p>
        </Draw>
      </div>
    </section>
  );
}
