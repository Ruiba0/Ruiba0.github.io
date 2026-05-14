import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { getAllPosts, groupPostsByYear } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "全部文章。",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const yearGroups = groupPostsByYear(posts);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 sm:py-14">
      <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
        <h1 className="font-display text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl">
          文章
        </h1>
        <span className="text-sm text-muted-foreground">{posts.length}</span>
      </div>

      {yearGroups.map((group) => (
        <section key={group.year} className="mt-10">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-foreground">
            {group.year}
          </h2>
          <div className="mt-4 grid gap-4">
            {group.posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
