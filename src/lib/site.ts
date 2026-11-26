const WHATSAPP_NUMBER = "556596949561";

export const DEFAULT_MESSAGE = "Olá! Quero saber mais sobre os kits Hortinbox.";

export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { href: "#quem-somos", label: "Quem somos" },
  { href: "#kit", label: "O kit" },
  { href: "#proposito", label: "Propósito" },
] as const;
