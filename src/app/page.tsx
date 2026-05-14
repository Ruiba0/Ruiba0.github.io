import Link from "next/link";
import { formatShortDate, getAllPosts } from "@/lib/posts";
import { HomeHero } from "@/components/home-hero";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="w-full pb-16 sm:pb-20">
      <HomeHero />

      <section id="recent" className="mx-auto mt-12 w-full max-w-6xl space-y-6 px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-3xl">
            最新
          </h2>
          <Link
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="/posts"
          >
            全部
          </Link>
        </div>

        <div className="grid gap-3">
          {latestPosts.map((post) => (
            <Link key={post.slug} className="group block" href={`/posts/${post.slug}`}>
              <article className="rounded-[18px] border border-border bg-surface/82 px-5 py-5 shadow-[0_10px_28px_rgba(0,0,0,0.08),0_1px_0_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 md:px-6">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-foreground transition-colors group-hover:text-accent md:text-2xl">
                    {post.title}
                  </h3>
                  <time className="shrink-0 text-sm text-muted-foreground">
                    {formatShortDate(post.publishedAt)}
                  </time>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
