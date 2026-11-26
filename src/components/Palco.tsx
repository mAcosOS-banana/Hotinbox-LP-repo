import type { CSSProperties } from "react";
import { Arrow } from "./doodles";
import { BrotoNaCaixa } from "./JornadaBroto";

/**
 * "Da caixa para o prato": the stage where the scroll journey's plant reaches the centre.
 * With the journey running, the stage pins to the screen for a stretch of scroll; the phrases
 * surround the centred plant and appear one by one (driven by --pc from JornadaBroto). Without it, the section is a compact
 * static row: the phrases and a still drawing of the sprout in its box.
 */
const PHRASES = [
  {
    key: "colha",
    t: 0,
    pos: "palco-p1",
    content: (
      <>
        Colha em até <span className="hl">7 dias</span>
      </>
    ),
    arrow: { body: "M10 10c26 6 46 20 56 44", head: "M54 46l12 10 4-16", box: "0 0 80 70" },
  },
  {
    key: "saudavel",
    t: 0.3,
    pos: "palco-p2",
    content: (
      <>
        Alimentação <span className="hl hl-beet">+ Saudável</span>
      </>
    ),
    arrow: { body: "M70 10C46 14 26 26 14 50", head: "M10 34l3 17 15-6", box: "0 0 80 70" },
  },
] as const;

export function Palco() {
  return (
    <section id="palco" aria-labelledby="palco-title" className="palco">
      <div className="palco-inner">
        {PHRASES.map((p) => (
          <p key={p.key} className={`palco-phrase ${p.pos}`} style={{ "--t": p.t } as CSSProperties}>
            <span>{p.content}</span>
            <Arrow viewBox={p.arrow.box} body={p.arrow.body} head={p.arrow.head} className="palco-arrow text-forest" />
          </p>
        ))}
        <BrotoNaCaixa className="palco-static-plant" />
        <h2 id="palco-title" className="palco-phrase palco-p3" style={{ "--t": 0.6 } as CSSProperties}>
          Da caixa para o <span className="hl">prato</span>
        </h2>
      </div>
    </section>
  );
}
