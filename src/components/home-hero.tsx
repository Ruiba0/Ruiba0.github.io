import Link from "next/link";
import localFont from "next/font/local";
import { HomeHeroVanta } from "@/components/home-hero-vanta";

const LETTERS = ["R", "u", "i", "b", "a", "o"];

const heroArtFont = localFont({
  src: "../fonts/Aileron-BoldItalic.otf",
  display: "swap",
  weight: "700",
  style: "italic",
});

export function HomeHero() {
  return (
    <section className="hero-stage relative isolate min-h-[calc(100svh-5rem)] overflow-hidden">
      <HomeHeroVanta />
      <div className="hero-vanta-veil" />

      <div className="relative flex min-h-[calc(100svh-5rem)] items-center justify-center px-6 text-center">
        <h1 className={`${heroArtFont.className} hero-wordmark`} aria-label="Ruibao">
          {LETTERS.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="hero-letter"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      <div className="absolute inset-x-0 bottom-8 flex justify-center">
        <Link
          aria-label="Scroll to latest"
          className="flex h-14 w-8 items-start justify-center rounded-full border border-border bg-background/38 p-2 backdrop-blur-md transition-colors hover:bg-background/54"
          href="#recent"
        >
          <span className="scroll-dot h-3 w-1 rounded-full bg-foreground/48" />
        </Link>
      </div>
    </section>
  );
}
