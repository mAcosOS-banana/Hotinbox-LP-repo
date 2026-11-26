import { Draw } from "./doodles";
import { Ramo } from "./Folhagem";

const NOTES = [
  {
    title: "Comida saudável mais perto",
    text: "Queremos que qualquer pessoa tenha alimento fresco em casa, mesmo com pouco tempo e pouco espaço.",
    tone: "bg-sprout-tint",
    tilt: "-rotate-2",
  },
  {
    title: "Aprender plantando",
    text: "Cultivar ensina de onde vem o alimento. Crianças, famílias e escolas aprendem com as próprias mãos.",
    tone: "bg-beet-tint",
    tilt: "rotate-1",
  },
  {
    title: "Sustentável do começo ao fim",
    text: "Materiais biodegradáveis, cultivo sem agrotóxicos e uma caixa que vira vaso quando o cultivo acaba.",
    tone: "bg-white",
    tilt: "-rotate-1",
  },
];

export function Propositos() {
  return (
    <Draw as="section" id="proposito" aria-labelledby="proposito-title" threshold={0.2}
      className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-32">
      <Ramo seed={2} className="absolute top-16 right-6 hidden w-52 xl:block" />
      <h2 id="proposito-title" className="max-w-5xl font-marker text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.06] font-bold">
        Comer bem não devia ser <span className="hl hl-beet">difícil</span>, <span className="hl hl-beet">caro</span> nem{" "}
        <span className="hl hl-beet">longe de casa</span>.
      </h2>
      <p className="mt-6 max-w-[42rem] text-xl leading-relaxed text-ink-soft">
        Por isso a Hortinbox existe: para trocar um pouco da comida industrializada por algo que você mesmo plantou.
      </p>

      <ul className="mt-16 grid max-w-xl gap-12 lg:max-w-none lg:grid-cols-3 lg:gap-8">
        {NOTES.map((note) => (
          <li key={note.title} className={`relative ${note.tone} ${note.tilt} px-7 pt-9 pb-8 shadow-[0_2px_3px_rgb(0_0_0/0.14)]`}>
            <span className="tape -top-3 left-1/2 -translate-x-1/2" aria-hidden="true" />
            <h3 className="font-marker text-2xl leading-tight font-bold">{note.title}</h3>
            <p className="mt-3 text-lg leading-relaxed">{note.text}</p>
          </li>
        ))}
      </ul>
    </Draw>
  );
}
