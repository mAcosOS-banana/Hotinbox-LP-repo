# Hortinbox — landing page

Landing page da Hortinbox em React + TypeScript + Tailwind CSS v4, com Vite.

## Rodar

Requer Node.js 20+ e pnpm.

```sh
pnpm install
pnpm dev       # servidor de desenvolvimento em http://localhost:5173
pnpm build     # gera o site estático em dist/
pnpm preview   # serve o dist/ em http://localhost:4173
```

Para publicar, envie o conteúdo de `dist/` para qualquer hospedagem estática.

## Estrutura

- `src/components/` — as cinco seções (Hero, QuemSomos, NossosKits, Propositos, Chamada) e os desenhos à mão (`doodles.tsx`, `Brotinho.tsx`).
- `src/index.css` — tokens de cor e fonte e as classes do mundo visual (caixas riscadas, marca-texto, fita, botão).
- `src/lib/site.ts` — número e mensagem padrão do WhatsApp e os links da navegação.
- `public/assets/` — logo, ícones e as fotos reais do kit.
- `legacy/` — a versão anterior em HTML/CSS e as fotos originais em alta resolução.
