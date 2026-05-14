import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/76 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between gap-4 px-6 py-2.5">
        <Link
          href="/"
          className="font-sans text-[1rem] font-semibold tracking-[-0.06em] text-foreground"
        >
          Ruibao&apos;s blog
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-1 rounded-full border border-border bg-surface/72 p-[3px] text-sm shadow-[0_8px_20px_rgba(71,85,105,0.06)] backdrop-blur-xl"
          >
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-muted-foreground transition-colors hover:bg-background/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
