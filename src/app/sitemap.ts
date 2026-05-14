import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAbsoluteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/posts", "/about"];
  const posts = getAllPosts().map((post) => ({
    url: getAbsoluteUrl(`/posts/${post.slug}/`),
    lastModified: post.publishedAt,
  }));

  return [
    ...pages.map((page) => ({
      url: getAbsoluteUrl(page || "/"),
      lastModified: new Date().toISOString(),
    })),
    ...posts,
  ];
}
