import { Chamada, FloatingWhatsApp, Footer } from "./components/Chamada";
import { Header, Hero } from "./components/Hero";
import { NossosKits } from "./components/NossosKits";
import { Propositos } from "./components/Propositos";
import { QuemSomos } from "./components/QuemSomos";

export function App() {
  return (
    <>
      <a
        href="#topo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:font-bold"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <QuemSomos />
        <NossosKits />
        <Propositos />
        <Chamada />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
