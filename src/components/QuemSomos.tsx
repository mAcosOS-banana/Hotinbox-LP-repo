import { Brotinho } from "./Brotinho";
import { Arrow, Draw, Num, Star, Swipe } from "./doodles";
import { Ramo } from "./Folhagem";

const PANELS = [
  {
    n: 1,
    title: "O problema",
    text: "Rotina corrida, pouco espaço e muita comida industrializada. Comer bem acaba ficando difícil.",
    mood: "tired" as const,
  },
  {
    n: 2,
    title: "A ideia",
    text: "Uma caixa com tudo para plantar do zero, pensada para o seu tempo e para o espaço que você tem.",
    mood: "idea" as const,
  },
  {
    n: 3,
    title: "O nosso jeito",
    text: "A gente não some depois da entrega: acompanha você do plantio à colheita, tirando dúvidas no WhatsApp.",
    mood: "chat" as const,
  },
];

const FOR_WHOM = [
  "quem treina e quer comer melhor",
  "pais que querem ensinar os filhos a comer bem",
  "escolas e creches sem espaço para uma horta",
  "quem busca hábitos mais sustentáveis",
];

export function QuemSomos() {
  return (
    <Draw as="section" id="quem-somos" aria-labelledby="quem-somos-title" threshold={0.2}
      className="mx-auto max-w-7xl px-5 pt-8 pb-20 sm:px-8 lg:pt-16 lg:pb-28">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 id="quem-somos-title" className="font-marker text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.02] font-bold">
            Quem somos
            <Swipe className="-mt-1 block h-3.5 w-48 sm:w-60" />
          </h2>
          <p className="mt-6 max-w-[40rem] text-xl leading-relaxed font-medium sm:text-2xl">
            Uma startup de <span className="hl">Tangará da Serra, MT</span>, que quer deixar a alimentação saudável mais
            acessível, e ensinar no caminho.
          </p>
        </div>
        <aside className="relative w-fit max-w-xs rotate-2 justify-self-start bg-sprout-tint px-6 pt-7 pb-6 shadow-[0_2px_3px_rgb(0_0_0/0.14)] lg:col-span-4 lg:justify-self-end pr-12">
          <Ramo seed={1} className="absolute -top-16 -right-12 w-24 rotate-[20deg]" />
          <p className="font-marker text-lg leading-snug font-bold">
            Participamos do <span className="text-forest">Inova Cerrado</span> e do{" "}
            <span className="text-forest">Start&amp;Up</span> do Sebrae.
          </p>
        </aside>
      </div>

      <ol className="mt-16 grid max-w-xl gap-14 lg:max-w-none lg:grid-cols-3 lg:gap-10">
        {PANELS.map((panel, i) => (
          <li key={panel.n} className="relative">
            <article className="sketch flex h-full flex-col bg-white px-6 pt-6 pb-7">
              <header className="flex items-center gap-3">
                <Num n={panel.n} className="text-forest" />
                <h3 className="font-marker text-2xl font-bold">{panel.title}</h3>
              </header>
              <Brotinho mood={panel.mood} animated className="mx-auto my-5 w-36 sm:w-40" />
              <p className="text-lg leading-relaxed">{panel.text}</p>
            </article>
            {i < PANELS.length - 1 && (
              <Arrow
                viewBox="0 0 60 40"
                d={0.4 + i * 0.4}
                className="absolute top-1/2 -right-12 hidden h-10 w-14 lg:block"
                body="M4 22c14-10 30-12 48-4"
                head="M42 8l10 10-13 6"
              />
            )}
            {i < PANELS.length - 1 && (
              <Arrow
                viewBox="0 0 40 60"
                d={0.4 + i * 0.4}
                className="absolute -bottom-13 left-1/2 h-12 w-8 -translate-x-1/2 lg:hidden"
                body="M20 4c-4 16-3 32 0 48"
                head="M11 42l9 11 9-11"
              />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-6 lg:grid-cols-12">
        <p className="font-marker text-3xl leading-tight font-bold lg:col-span-3">
          Feito para:
        </p>
        <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:col-span-9">
          {FOR_WHOM.map((who) => (
            <li key={who} className="flex items-start gap-3 text-lg leading-snug sm:text-xl">
              <Star className="mt-0.5 size-6" />
              {who}
            </li>
          ))}
        </ul>
      </div>
    </Draw>
  );
}
