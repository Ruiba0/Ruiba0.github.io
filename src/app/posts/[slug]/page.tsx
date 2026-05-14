import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";
import { PostToc } from "@/components/post-toc";
import {
  formatPublishedDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import { getAbsoluteUrl } from "@/lib/site-config";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "\u6587\u7ae0\u4e0d\u5b58\u5728",
    };
  }

  const postUrl = getAbsoluteUrl(`/posts/${post.slug}/`);

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: postUrl,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug);

  return (
    <div className="mx-auto w-full max-w-[78rem] px-6 py-10 sm:py-14 lg:grid lg:grid-cols-[11rem_minmax(0,52rem)_11rem] lg:items-start lg:gap-6">
      <div className="mx-auto min-w-0 w-full max-w-[52rem] lg:col-start-2">
        <article className="mx-auto w-full rounded-[20px] border border-border bg-surface/82 p-7 shadow-[0_12px_32px_rgba(0,0,0,0.08),0_1px_0_rgba(0,0,0,0.06)] md:p-9">
          <header className="border-b border-border pb-8">
            <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
              <Link
                aria-label="Back to posts"
                className="text-xl font-medium text-accent transition-colors hover:text-foreground md:text-2xl"
                href="/posts"
              >
                &larr;
              </Link>
              <time dateTime={post.publishedAt}>{formatPublishedDate(post.publishedAt)}</time>
            </div>

            <h1 className="mt-5 max-w-4xl font-display text-3xl font-semibold leading-[1.14] tracking-[-0.02em] text-foreground md:text-4xl">
              {post.title}
            </h1>
          </header>

          <div
            id="post-body"
            data-toc-label={"\u6b63\u6587"}
            className="prose mt-10 max-w-none"
          >
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>
        </article>

        {relatedPosts.length > 0 ? (
          <section
            id="post-related"
            className="mx-auto mt-10 w-full space-y-5"
          >
            <h2 className="font-display text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-3xl">
              {"\u7ee7\u7eed\u9605\u8bfb"}
            </h2>

            <div className="grid gap-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} className="group block" href={`/posts/${relatedPost.slug}`}>
                  <span className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                    {relatedPost.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <PostToc />
    </div>
  );
}
