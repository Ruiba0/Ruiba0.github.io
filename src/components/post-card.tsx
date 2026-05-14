import Link from "next/link";
import { formatShortDate, type PostSummary } from "@/lib/posts";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-[18px] border border-border bg-surface/78 p-5 shadow-[0_10px_28px_rgba(0,0,0,0.08),0_1px_0_rgba(0,0,0,0.06)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent/30 md:p-6">
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="min-w-0 font-display text-xl font-semibold leading-tight tracking-[-0.03em] text-foreground transition-colors group-hover:text-accent md:text-2xl">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h3>
          <time className="shrink-0 pt-1 text-sm text-muted-foreground" dateTime={post.publishedAt}>
            {formatShortDate(post.publishedAt)}
          </time>
        </div>
        <p className="overflow-hidden text-sm leading-7 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] md:text-[15px]">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
