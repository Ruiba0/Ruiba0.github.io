import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "关于",
  description: siteConfig.description,
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
      <section className="rounded-[30px] border border-border bg-surface/82 p-8 shadow-[0_24px_80px_rgba(90,99,112,0.10)] md:p-10">
        <p className="text-[11px] uppercase tracking-[0.36em] text-muted-foreground">关于</p>
        <div className="mt-4 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(15rem,0.8fr)] md:items-start">
          <div>
            {/* <h1 className="font-display text-4xl font-semibold tracking-[-0.05em] text-foreground md:text-5xl">
              Ruibao
            </h1> */}
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-[17px]">
              这里会持续记录我的工作、学习当中的技术心得体会。
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-[17px]">
              如果有对某些内容感兴趣，欢迎联系我。
            </p>
          </div>

          <div className="rounded-[24px] border border-border bg-background/70 p-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">联系</p>
            <div className="mt-5 space-y-4">
              <Link
                className="flex items-center gap-3 rounded-[18px] border border-border px-4 py-3 text-sm text-foreground transition-colors hover:bg-surface"
                href={siteConfig.github}
                rel="noreferrer"
                target="_blank"
              >
                <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path
                      d="M9 19c-4.5 1.4-4.5-2.5-6.3-3m12.6 6v-3.6a3.2 3.2 0 0 0-.9-2.5c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.4-3.6 4.9 4.9 0 0 0-.1-3.6s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7.2 0C5.3 1.5 4 1.9 4 1.9a4.9 4.9 0 0 0-.1 3.6 5.3 5.3 0 0 0-1.4 3.6c0 5.3 3.2 6.5 6.2 6.8a3.2 3.2 0 0 0-.9 2.5V22"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">GitHub</span>
                  <span className="truncate">{siteConfig.github}</span>
                </span>
              </Link>

              <a
                className="flex items-center gap-3 rounded-[18px] border border-border px-4 py-3 text-sm text-foreground transition-colors hover:bg-surface"
                href={`mailto:${siteConfig.email}`}
              >
                <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full border border-border">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 6.5h16v11H4z" strokeLinejoin="round" />
                    <path d="m5 7 7 6 7-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Email</span>
                  <span className="truncate">{siteConfig.email}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
