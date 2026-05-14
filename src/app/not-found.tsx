import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
      <span className="rounded-full border border-accent/15 bg-accent-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
        404
      </span>
      <h1 className="mt-6 font-display text-5xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl">
        这篇内容不存在
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        你访问的页面可能已经移动，或者这个链接本身就不存在。可以返回首页或文章归档继续浏览。
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-surface-strong px-6 py-3 text-sm font-medium text-surface-strong-foreground"
          href="/"
        >
          返回首页
        </Link>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface/78 px-6 py-3 text-sm font-medium text-foreground"
          href="/posts"
        >
          查看文章
        </Link>
      </div>
    </div>
  );
}
