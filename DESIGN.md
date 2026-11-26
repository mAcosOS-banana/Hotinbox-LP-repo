---
name: Hortinbox
description: Grow-at-home microgreen kits, explained like a friend sketching in marker over the real box.
colors:
  sprout: "#82d85a"
  sprout-deep: "#5fb83a"
  sprout-tint: "#e6f5dc"
  forest: "#1c7434"
  ink-green: "#10461e"
  beet: "#c2185b"
  beet-tint: "#fbe3ee"
  paper: "#f9fbf4"
  card-white: "#ffffff"
  ink: "#1a1a1a"
  ink-soft: "#3d3d3a"
typography:
  display:
    fontFamily: "Kalam, Comic Sans MS, cursive"
    fontSize: "clamp(3rem, 9vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Kalam, Comic Sans MS, cursive"
    fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.02
  title:
    fontFamily: "Kalam, Comic Sans MS, cursive"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  annotation:
    fontFamily: "Kalam, Comic Sans MS, cursive"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  nav:
    fontFamily: "Kalam, Comic Sans MS, cursive"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: "Kalam, Comic Sans MS, cursive"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.1
  lead:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  photo: "6px"
  sketch: "18px 6px 16px 8px / 8px 16px 6px 18px"
  sketch-offset: "8px 18px 6px 16px / 16px 6px 18px 8px"
  soft: "14px 5px 12px 6px / 6px 12px 5px 14px"
  button: "16px 6px 14px 7px / 7px 14px 6px 16px"
  round: "9999px"
spacing:
  veg-tile: "440px / 520px"
  vine: "180px x 36px"
  rule: "36px"
  gutter: "20px"
  gutter-sm: "32px"
  section: "80px"
  section-lg: "112px"
  block: "96px"
  container: "1280px"
components:
  button-action:
    backgroundColor: "{colors.sprout}"
    textColor: "{colors.ink-green}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "0.85rem 1.6rem"
    height: "3.75rem"
  button-action-active:
    backgroundColor: "{colors.sprout-deep}"
    textColor: "{colors.ink-green}"
  button-header:
    backgroundColor: "{colors.sprout}"
    textColor: "{colors.ink-green}"
    typography: "{typography.annotation}"
    rounded: "{rounded.soft}"
    padding: "8px 16px"
    height: "44px"
  button-floating:
    backgroundColor: "{colors.sprout}"
    textColor: "{colors.ink-green}"
    rounded: "{rounded.round}"
    size: "64px"
  card-sketch:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sketch}"
    padding: "24px"
  ruled-list:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    typography: "{typography.annotation}"
    rounded: "{rounded.sketch}"
    padding: "20px 40px 32px"
  sticky-note:
    backgroundColor: "{colors.sprout-tint}"
    textColor: "{colors.ink}"
    padding: "36px 28px 32px"
  sticky-note-beet:
    backgroundColor: "{colors.beet-tint}"
    textColor: "{colors.ink}"
    padding: "36px 28px 32px"
---

# Design System: Hortinbox

## Overview

**Creative North Star: "The Marker Explainer"**

A friend takes a black marker to a sheet of notebook paper doodled with vegetables, tapes the real kit photo to it, and draws arrows to the soil, the seeds, the sprayer and the tools. Every section is an explained drawing, not a sales block: headings are hand-lettered, boxes are ruled by hand with a second offset stroke, lists sit on lined paper, sticky notes are taped down, and a small sprout-in-a-box mascot, Brotinho, acts out each step. The page is warm and plainly instructive, the register of a notebook page someone made for you.

Density is relaxed: one idea per panel, generous section rhythm, and a light kitchen-garden ground always visible: marker-drawn edible greens scattered over the paper and soft pools of canopy light, so the page reads like a notebook left on a garden bench. Real photography carries the product truth; drawing carries the explanation. Nothing is glossy or blurred; the only gradients are the canopy light pools in the page ground. The marker world refuses the eco-D2C template of stock leaves, badge rows and equal icon cards.

Motion is the act of drawing: arrows, ticks, stars, swipes and highlighter bands draw themselves in when their section enters view. Text is never hidden, and under reduced motion or without JavaScript everything is already drawn.

**Key Characteristics:**
- Pale leaf-tinted paper with scattered marker-drawn edible greens that grow as microgreens (radish, beet, pea shoots and pods, broccoli, sunflower sprouts, basil, arugula, sprout clusters) and canopy light pools across the whole page.
- Hand-drawn leafy branches that sway gently at section corners, and leafy vines in place of ink rules between bands.
- Black marker ink for every border, arrow and outline; Kalam lettering for everything drawn, Archivo for prose.
- Hand-ruled boxes with asymmetric wobble radii and a second, offset ink stroke.
- Sprout green as the single action fill; beet magenta only as a second highlighter and marker accent.
- Annotated real photography: taped photos with drawn arrows or numbered pins.
- Brotinho the mascot as line art in numbered comic panels.
- Draw-on reveal with exponential ease-out; already drawn when motion is reduced.

## Colors

A paper-and-marker palette: near-white paper, near-black ink, two brand greens that do the talking, and one magenta marker for emphasis.

### Primary
- **Sprout Green** (#82d85a): the brand's bright green and the only solid fill an action gets (main action button, header WhatsApp button, floating WhatsApp button). Also the primary highlighter swipe behind a key word in a heading, the heading underline swipe, the mascot's leaves, and the text selection color.
- **Pressed Sprout** (#5fb83a): the action button's pressed state only.
- **Sprout Wash** (#e6f5dc): sticky-note paper; the lightest green surface.
- **Forest Green** (#1c7434): every piece of green text (emphasized words, callouts, panel numbers), the tick marks inside checkboxes, the dashed focus ring, and, through the pattern's 12 to 13% group opacity, the outlines of the background vegetables.
- **Deep Leaf Ink** (#10461e): text on sprout surfaces (button labels, selected text).

### Secondary
- **Beet Magenta** (#c2185b): the second marker. As a 28% mix it is the secondary highlighter band; at full strength it colors stars, the occasional marker label ("chega todo mês", the seed-packet annotation), small accent arrows, and the mascot's blush. At 18% it draws the rules on ruled list paper.
- **Beet Wash** (#fbe3ee): the alternate sticky-note paper.

### Neutral
- **Notebook Paper** (#f9fbf4): the page background under the vegetable ground; also the halo under arrows that cross photos and the backing of photo pins.
- **Card White** (#ffffff): the inside of hand-ruled boxes, ruled list paper, the third sticky note; at 70% it backs the footer.
- **Marker Ink** (#1a1a1a): all body text, every border, outline, arrow and doodle stroke.
- **Soft Ink** (#3d3d3a): lead paragraphs and secondary notes under headings.

### Named Rules
**The One Fill Rule.** Sprout is the only color a button is filled with, and every sprout-filled button opens WhatsApp. No second button color exists.

**The Two Markers Rule.** There are exactly two highlighters: sprout for the primary swipe and beet (28% mix) for secondary emphasis. A third highlighter color is never introduced.

**The Forest Text Rule.** Green type is always forest (#1c7434), never sprout; sprout is a fill and a highlighter, not a text color on paper.

## Typography

**Display Font:** Kalam (with Comic Sans MS, cursive)
**Body Font:** Archivo Variable (with Archivo, system-ui, sans-serif)

**Character:** Kalam is the marker in the friend's hand: headings, nav, annotations, button labels, list items on lined paper and panel numbers. Archivo is the calm typed explanation beside it, used for paragraphs and the semibold check items.

### Hierarchy
- **Display** (Kalam 700, clamp(3rem, 9vw, 4.6rem), 0.98, -0.01em): the hero headline and, slightly smaller (clamp(2.5rem, 6vw, 4.5rem)), the closing call.
- **Headline** (Kalam 700, clamp(2.25rem, 5.5vw, 3.75rem), 1.02): section titles, each followed by a sprout underline swipe. The purpose statement runs up to 4rem at 1.06.
- **Sub-section** (Kalam 700, 1.875rem rising to 2.25rem at sm, 1.25): titles of blocks inside a section ("Como funciona"); plan names at 2rem.
- **Title** (Kalam 700, 1.5rem, 1.25): comic-panel, step and sticky-note titles.
- **Annotation** (Kalam 700, 1.25rem, 1.25): photo labels, captions, marker callouts and ruled-list items (1.375rem at sm). Nav links use the same size at 400.
- **Lead** (Archivo 400, 1.25rem, 1.625): the paragraph under a heading, max 30 to 42rem wide, often in soft ink.
- **Body** (Archivo 400, 1.125rem, 1.625): panel and note text.
- **Label** (Archivo 600, 1.125rem): check-list items beside a drawn tick.

### Named Rules
**The Marker Speaks, Archivo Explains Rule.** Anything that reads as drawn or handwritten is Kalam; any sentence of explanation is Archivo. Archivo never appears as a heading.

**The Kalam Band Rule.** The highlighter band sits at 46% to 90% of the line box in Archivo and moves up to 40% to 74% in Kalam, whose tall font box would otherwise push the band below the letters.

## Layout

The whole page is one sheet of kitchen-garden notebook paper: two different marker-drawn vegetable tiles (public/assets/patterns/hortalicas-a.svg and hortalicas-b.svg, full-color fills and #1c5c2c outlines at 12 to 13% group opacity) at unrelated sizes, 440px and 520px, offset so the repeat never reads as a grid, plus four large soft pools of sprout light (16 to 22%) at the page corners and flanks. Content sits in a 1280px container with a 20px gutter (32px from 640px). Sections breathe at 80px vertical padding, 112px to 128px from 1024px, and blocks inside a section are separated by 96px.

Desktop compositions use a 12-column grid: the hero splits 5/12 copy to 7/12 annotated photo; Nossos Kits pairs a 5-column story column with a 6-column ruled list. Sequences (the three comic panels, the four steps) run as rows joined by drawn arrows on desktop and stack in a single 576px-max column on phones, where panel arrows turn downward. The header sits on a single hand-drawn rule; the logo is the binding brand mark (public/assets/images/logo.webp, a 298x240 export of the founders' logo raster for 2x display at 96px tall).

Breakpoints follow 640px (sm), 768px (md: nav appears) and 1024px (lg: multi-column, arrow annotations on the hero photo). The floating WhatsApp button follows the input, not the width: every touch screen gets it, mouse-and-trackpad screens don't. Phones on their side (landscape, at most 512px tall, under 1024px wide) get their own arrangement: a compact header, a two-column hero (copy and button left, photo right) so the button and the kit share the first screen, and a stage that lays its phrases beside a smaller plant (1.9x) with the heading kept on screen. Below 360px the headline drops to 2.5rem, the header button reads "WhatsApp" (the full label stays for screen readers), the legend is one column and the plan cards and buttons tighten so no action label wraps. Every text link in the header and footer is at least 44px tall.

### Named Rules
**The Garden Ground Rule.** The vegetable ground runs under every section; surfaces sit on it rather than covering the page. The pattern stays faint (13% group opacity at most) and sparse (tiles of 440px and up) so body text keeps full contrast.

**The Edible World Rule.** Illustration comes from the edible garden, above all the microgreens the kit grows: radish, beet, pea, broccoli, sunflower, basil, arugula and sprout clusters, drawn in the marker line with their true colors (radish pink #e0457b, beetroot #a01848 with beet-magenta stems, greens from the palette). Reach for a vegetable or a sprout before a generic leaf, and never for stock produce photography or emoji.

**The Green Band Rule.** One deliberately distinct band holds the densest content: the Nossos Kits section lays a 55% sprout wash over the leaf ground, edged top and bottom by a drawn leafy vine instead of an ink rule. The footer uses a 70% white wash with a vine on top. Use the band for a dense product section, not as a general section background.

## Elevation & Depth

Depth is drawn, not lit. Boxes get a second ink outline offset down and right, like a marker going around twice; the action button gets the same idea as an offset ink ring with a paper gap. The only soft shadows belong to paper objects that physically sit on the page: sticky notes and strips of tape, each with a 1 to 3px contact shadow. There is no ambient or blurred card elevation.

### Shadow Vocabulary
- **Second stroke** (pseudo-element, 2px ink border, translate 6px 7px, offset radii, 85% opacity): every hand-ruled box.
- **Action ring rest** (`box-shadow: 5px 6px 0 -1px var(--color-paper), 5px 6px 0 1px var(--color-ink)`): the action button at rest; grows to 7px 9px on hover and collapses to 1px 1px when pressed.
- **Paper contact** (`box-shadow: 0 2px 3px rgb(0 0 0 / 0.14)`): sticky notes.
- **Tape contact** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.12)`): tape strips.

### Named Rules
**The Second Stroke Rule.** Lift is a second offset outline in ink, never a blurred shadow. Only paper and tape cast a real (tiny) shadow.

## Shapes

No content box has a straight or uniform corner. Hand-ruled boxes use asymmetric elliptical radii (18px 6px 16px 8px / 8px 16px 6px 18px) with a 2.5px ink border; the soft box uses a lighter 2px border and tighter wobble; the action button has its own wobble. Photos are the exception that proves the rule: real objects keep a crisp 6px corner and a 2.5px ink border, taped at the corners. Panels, notes, photos and cards sit tilted by 1 to 2 degrees, alternating direction. Circles are hand-drawn open loops (panel numbers, photo pins), not perfect rings; the floating WhatsApp button is the one true circle.

### Named Rules
**The Wobble Rule.** Every bordered drawn box uses an asymmetric wobble radius and a slight tilt; only photographs and the floating button are geometrically clean.

## Components

### Buttons
Tactile marker buttons that press into the page.
- **Action button:** sprout fill, deep-leaf-ink Kalam 700 label at 1.375rem (up to 1.5rem in the closing call), 2.5px ink border with button wobble, 60px min height, the WhatsApp mark leading and sometimes a drawn arrow trailing. Full width on phones, auto from 640px.
- **Hover / Active:** lifts 1px 2px as the ring widens; pressed, it drops 4px 5px onto its ring and darkens to pressed sprout. Transitions 0.25s exponential ease-out.
- **Header button:** the soft box filled sprout, 44px min height, Kalam label; tilts -1 degree on hover.
- **Floating button:** a 64px sprout circle with the WhatsApp mark, bottom right, phones only. It stays hidden (fade and a 1rem drop, no drop under reduced motion; out of the tab order) while the hero's "Quero meu kit" button is on screen, so the two never stack; the journey's kraft box steps aside the same way. JS sets `hero-cta-in` on <html>; without JS nothing hides.
- **Focus:** a 3px dashed forest outline at 4px offset, everywhere.

### Hand-ruled box (sketch)
The primary container: comic panels, steps, plan cards, the closing call, the ruled list.
- **Corner Style:** sketch wobble, with the offset wobble on the second stroke.
- **Background:** card white.
- **Shadow Strategy:** second stroke (see Elevation).
- **Border:** 2.5px marker ink.
- **Internal Padding:** 20px to 36px; the closing call opens to 48px by 80px on desktop.

### Soft box (sketch-soft)
A lighter single-stroke box (2px border, soft wobble) for small controls such as the header WhatsApp button.

### Highlighter
A marker band behind words, clipped per line so it survives wrapping. Sprout by default; the beet variant is a 28% beet mix. One sprout swipe per heading at most. Band position follows the Kalam Band Rule. It sweeps in left to right over 0.9s on reveal.

### Tape
A translucent pale green strip (5.5rem by 1.6rem, rgb(226 236 214 / 0.82)) with dashed torn ends and a tape contact shadow. It holds photos at their corners and sticky notes at top center, always rotated.

### Ruled list paper
Card white with 18% beet rules every 36px. Content snaps to the rule: the title and each list item are exactly 36px tall, Kalam annotation size, each led by a tick. Lives inside a hand-ruled box tilted -1 degree.

### Sticky notes
Untrimmed paper squares in sprout wash, beet wash or white, with tape at top center, a paper contact shadow, tilt alternating between -2 and 1 degree, a Kalam title and Archivo body. No border.

### Leafy branch (Ramo)
A hand-drawn branch hanging from its root: a 3.6px ink stem with eleven alternating leaves (ink outline 2.6px, veins 1.4px) filled in sprout, sprout wash, pressed sprout and leaf green #a4d47c. It hangs at section corners and over the corners of boxes and notes (hero left margin from 1400px, the Quem Somos note, the contents list, Propósito from 1280px, the closing box). Each leaf sways on its own stalk (5 to 8s, ±5 degrees, staggered) and the branch rocks ±1.5 degrees from its root; both stop under reduced motion. Decorative only: aria-hidden, no pointer events.

### Leafy vine
A repeating 180 by 36px drawn vine (wavy 2.4px ink stem with small filled leaves) laid across the top and bottom edge of the green band and the top of the footer, replacing ink rules.

### Hero annotations
The hero's purpose notes live on the drawing, never as extra blocks. The full stop of "caixa." is drawn as a seed sitting on the text baseline (the real "." stays for screen readers), with a two-leaf microgreen growing from it at the headline's stroke weight: stem drawn, then leaf outlines, then their sprout fill (the ink outlines carry them against the highlighter band). Two seconds after it draws, wind blows through it on an 8s loop: a calm sway (stem ±2°, leaves ±3–4°), then a moderately strong gust that bends the stem from the seed to 17° in two pushes while the leaves flutter and then cross in an X at the peak (left swinging clockwise to 80°, right counter-clockwise to −96° and lying on top, about 48° apart), uncross on the recoil and cross again, lighter, at about 65% of the cycle, recoiling and damping out by about 86% of the cycle. The loop pauses while the headline is off screen and never runs under reduced motion, where the sprout rests complete. A taped beet-tint note with beet Kalam, "colha em até 7 dias!", sits on the photo's right edge (top-right corner on phones). The rest of the box is a taped sprout-wash note on the photo's lower-right corner with a marker pot: "e mais: 3 vasos biodegradáveis e o manual de cultivo. Tudo sem agrotóxicos." (after the legend on phones, so the pins and their names stay together). The delivery tick carries a Kalam forest signature, "feito em Tangará da Serra". Under the main button, a Kalam ink-soft line says what the tap does: "abre o WhatsApp · preço e frete combinados na conversa". One short lead at every size ("Terra, sementes, borrifador e ferramentas para plantar microverdes em casa. E a gente acompanha você do plantio à colheita."). On phones the order is headline, lead, button, photo with pins, legend, the "e mais" note, then the ticks, so the kit photo reaches the first screen; the desktop labels are hidden from assistive tech and the legend is the figure's single caption (visually hidden from 1024px). The photo ships at 640, 900 and 1200px with one srcset and sizes shared by both slots and the preload, so only one file downloads.

### Entry bush (Moita)
On the first visit, and again only after a week (a timestamp in localStorage: in-app browsers open a new session on every visit), a dense marker-drawn bush covers the screen: five back-to-front layers of leaves (forest, pressed sprout, sprout, leaf green, sprout wash), beet greens with magenta stalks and veins, radishes tumbling among the front leaves, and microgreen sprouts along the bottom, over a #bfe3a3 backing. It rustles toward the centre, then the two halves part outward and rotate away from their bottom corners (1.2s, starting at 0.12s), and the overlay fades out by 1.55s. The leaves themselves stay still: animating individual leaves inside the parting halves forced the whole drawing to repaint every frame and roughly halved the frame rate on mid-range phones. The two backings meet exactly at the centre and travel with their halves; leaves sit above both, so no seam ever shows. Any click, key, wheel or touch skips it; it never plays under reduced motion or without JavaScript, and scroll is locked only while it plays. Decorative only: aria-hidden.

### Sprout journey (scroll story)
A small kraft box (the kit's own box, with a white label) sits fixed at the bottom-left. Until the page has a gutter wide enough to hold a bigger box beside the text (1440px), it is 56px wide, 12px from the left edge, and rests with the lower half of the box below the bottom edge (22% of the drawing's height, plus the safe area), so only the lid, the top of the label and the sprout sit over the text column; from 1440px it is 96px wide, 16px from the left and 28px above the bottom edge. It moves only by translate and scale, never by layout properties. Its sprout is mapped to the scroll: a short forest-green microgreen stem (5px) starts hidden inside the box and rises out of it as the page scrolls, then two seed leaves open at its top, the same pair Brotinho wears; the right one is the leaf that falls. Before the closing section sits the demo stage "Da caixa para o prato" (Palco.tsx), 160svh tall while the journey runs, its content pinned to the screen (sticky) for 60svh of scroll. As it arrives, the grown plant eases to the centre of the screen, both horizontally and vertically, growing to 2.75 times its size on phones, 2.9 times from 768px and 1.7 times (on the 96px box) from 1440px, and three Kalam phrases appear around it one by one, rising and scaling in: "Colha em até 7 dias" (sprout highlight, arrow to the plant) at upper left, "Alimentação + Saudável" (beet highlight, arrow) at right, and the section heading "Da caixa para o prato" below; below 1024px they stack above and below the plant without arrows, anchored to its edges with a 1.75rem gap so the spacing holds on any screen height. While the stage is pinned, the right leaf lets go and falls with the scroll, swaying and turning, to the closing Brotinho, who waits without his right leaf, while the plant sinks half its height and is gone by the middle of that, so it never crosses the phrase below. The floating WhatsApp button steps aside while the stage is pinned. The leaf lands with Brotinho's head a third of the way down the screen, so he stays in view on phones. The leaf snaps into place (scale overshoot), Brotinho squashes, stretches and hops (1s), a beet sparkle bursts over him, and the heading, lead, button and delivery note bounce in one after another (0.7s each, 0.14s apart), the button ending with a wiggle. Before docking everything rewinds with the scroll; docking is final. A 2s safety net reveals the section if it sits in view undocked, and focus landing anywhere inside the section (keyboard, screen reader) docks it at once, so a focused control is never invisible. After docking, scrolling back shows the static plant resting at centre stage without its right leaf. Under reduced motion or without JavaScript, the journey never renders, the closing section shows complete, leaf included, and the stage is a compact band: the three phrases around a still sprout-in-box drawing (in a row on desktop, stacked on phones).

Journey motion, as tuned: every value follows the scroll through a 90ms exponential smoothing, so wheel steps and flicks read as one motion and scrolling back rewinds it. The stem rises out of the box on an ease-out over the first 80% of the way to the stage, and the seed leaves then swing open from a closed upright pair (±55° to 0 while scaling in). The stem leans with scroll speed (up to ±9°, from where it leaves the box) on a damped spring that sways back when scrolling stops. To centre stage the plant hops on an arc: a small crouch at take-off, the rise leading and the sideways glide lagging, growth slightly behind both, a lean of up to 9° against its travel, a stretch in flight and a squash at touchdown (when the rise ends). Before the right leaf lets go it quivers on its stalk, time-based so it keeps trembling if the visitor stops, building from about 1.5° to 9° in gusts over the last 22vh of scroll and stretching 7% as it pulls away; the falling leaf starts at the quiver's last angle. The phrases appear only once the stage has pinned. The plant moves by translate, rotate and scale written straight to its elements (cached, unchanged values skipped) and carries no will-change, so it repaints sharp at 2.75x instead of blurring.

### Doodles
Drawn SVG strokes, all in currentColor ink unless noted, round caps and joins.
- **Arrow:** one body stroke and a two-stroke head drawn 0.55s after it; 3px stroke. Arrows crossing a photo carry a paper halo 5px wider underneath.
- **Tick:** a wobbly ink box with a forest check that draws in.
- **Swipe:** a 7px sprout underline under section headings.
- **Num:** a numeral in a hand-drawn open circle, forest on panels.
- **Star:** a five-point beet marker star for bullets and callouts.

### Brotinho mascot
The kit's kraft box with a sprout growing out of it, in 3px ink line art with a hatched side, sprout leaves and beet blush. Moods: happy, tired (drooping sprout, flat eyes, a drop), idea (raised arm, light bulb), wave (raised arm with motion ticks), chat (two speech bubbles, a white one on the right and a sprout-wash one with dots on the left).

With `animated` (used in the Quem Somos panels problem → idea → our way) each mood loops its own small scene: the drop runs down the front of the box and vanishes (2.6s), the bulb pops in, lights from pale to #ffd84a with a soft glow and flickering rays, then fades (3.4s), and the speech bubbles pop in alternately, right then left (3.6s, offset by half). Under reduced motion every scene rests on its complete drawing. It appears inside comic panels, steps and the closing call, sized 96px to 256px. The kraft tones are internal to the mascot drawing, not palette colors.

### Annotated kit photo
The real kit photo, taped and tilted. From 1024px, Kalam labels sit in the margins and four haloed arrows reach into the photo, drawing in sequence. Below 1024px, numbered pins sit on the photo and a two-column numbered legend sits under it.

### Draw-on reveal
When a section first enters view, its strokes animate from stroke-dashoffset 1 to 0 over 1.1s with exponential ease-out (cubic-bezier(0.16, 1, 0.3, 1)), staggered by per-element delays; highlighter bands grow from 0% to full width. Only applied when JavaScript runs and motion is allowed.

### Navigation
Three Kalam links in the header from 768px, gaining a 3px sprout underline on hover; the header rests on a single hand-drawn ink rule. The footer repeats the links with a permanent 2px sprout underline.

## Do's and Don'ts

### Do:
- **Do** set every border, arrow and doodle in marker ink (#1a1a1a) at 2 to 3px.
- **Do** give drawn boxes an asymmetric wobble radius, a second offset stroke and a 1 to 2 degree tilt.
- **Do** keep the vegetable ground visible under every section, faint enough that text keeps full contrast.
- **Do** draw edible things, microgreens first, when a section needs an illustration.
- **Do** keep leafy branches in margins and on box corners, never over body text or photo annotations.
- **Do** annotate real photography with drawn arrows or numbered pins; tape photos down.
- **Do** use Kalam for anything drawn or handwritten and Archivo for explanation.
- **Do** make every WhatsApp action the sprout action button with deep-leaf-ink label.
- **Do** render everything fully drawn when motion is reduced or JavaScript is off.

### Don't:
- **Don't** lift cards with blurred drop shadows; depth is the second stroke.
- **Don't** fill a button with any color but sprout, or fill a box, band or note with full-strength sprout; non-action surfaces use the sprout wash.
- **Don't** set green text in sprout; green type is forest.
- **Don't** add a third highlighter color or more than one sprout swipe per heading.
- **Don't** use perfectly square or uniformly rounded borders on drawn boxes.
- **Don't** use emoji or icon-font glyphs; marks are drawn SVG strokes, and the WhatsApp mark is the brand asset.
- **Don't** hide or fade text as part of the reveal; only strokes and highlighter bands animate.


## Session notes (2026-11-26)
- Ground: tile strokes 1.6 (lighter than the ink), radish #ef8fb0 and beet #c95a82 with thinner stems, a sprout pair replaces tile B's small radish; tiles at native 320/380px below 640px; the two hero light pools stay on body, later light sits in #palco and #contato. The logo and the "chega todo mês" badge are taped paper scraps.
- Journey: after release the plant stays on stage without its right leaf and rides up with the stage; stage scale 4.6x (768px+) and 2.8x on the 96px box (1440px+). The closing content is always visible and only nudges when the leaf docks.
- Nossos kits: the microgreens photo shows at every size with a definition caption; step 4 reads "Colha em até 7 dias".
