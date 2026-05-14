import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl justify-end px-6 py-8 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-foreground" href="/posts">
            文章
          </Link>
          <Link className="hover:text-foreground" href="/about">
            关于
          </Link>
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
