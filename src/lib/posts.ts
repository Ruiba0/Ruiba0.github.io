import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");
const postExtensions = [".md", ".mdx"] as const;
const isProduction = process.env.NODE_ENV === "production";

export type PostFrontmatter = {
  title: string;
  publishedAt: string;
  summary?: string;
  featured?: boolean;
};

export type PostSummary = PostFrontmatter & {
  excerpt: string;
  slug: string;
  readingTime: string;
};

export type PostDetail = PostSummary & {
  content: string;
};

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

function getPostFiles() {
  ensurePostsDirectory();

  return fs
    .readdirSync(postsDirectory)
    .filter((file) => postExtensions.includes(path.extname(file) as (typeof postExtensions)[number]))
    .sort();
}

function getPostSlug(file: string) {
  return file.replace(/\.(md|mdx)$/, "");
}

function resolvePostPath(slug: string) {
  for (const extension of postExtensions) {
    const fullPath = path.join(postsDirectory, `${slug}${extension}`);

    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }

  return null;
}

function calculateReadingTime(content: string) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ");
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));

  return `${minutes} min read`;
}

function stripMdx(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createExcerpt(content: string, maxLength = 110) {
  const plainText = stripMdx(content);

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}

function isBlockSyntaxLine(line: string) {
  return /^(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```|~~~)/.test(line);
}

function normalizePostContent(content: string) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const normalized: string[] = [];
  let inFencedCode = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^(```|~~~)/.test(trimmed)) {
      inFencedCode = !inFencedCode;
      normalized.push(line);
      continue;
    }

    if (inFencedCode) {
      normalized.push(line);
      continue;
    }

    if (!/^ {2}\S/.test(line)) {
      normalized.push(line);
      continue;
    }

    const plainLine = line.slice(2);
    const previousLine = normalized.at(-1) ?? "";
    const previousTrimmed = previousLine.trim();

    if (previousTrimmed && !isBlockSyntaxLine(previousTrimmed)) {
      normalized.push("");
    }

    normalized.push(plainLine);
  }

  return normalized.join("\n");
}

function normalizeFrontmatter(
  slug: string,
  data: Record<string, unknown>,
  content: string,
): PostSummary {
  if (typeof data.title !== "string" || typeof data.publishedAt !== "string") {
    throw new Error(`Post "${slug}" is missing required frontmatter.`);
  }

  const fallbackSummary = createExcerpt(content, 160);
  const summary = typeof data.summary === "string" && data.summary.trim() ? data.summary.trim() : fallbackSummary;

  return {
    excerpt: createExcerpt(content),
    slug,
    title: data.title,
    publishedAt: data.publishedAt,
    summary,
    featured: data.featured === true,
    readingTime: calculateReadingTime(content),
  };
}

function compareByDateDesc(a: PostSummary, b: PostSummary) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}

function readAllPosts() {
  return getPostFiles()
    .map((file) => {
      const slug = getPostSlug(file);
      const source = fs.readFileSync(path.join(postsDirectory, file), "utf8");
      const { data, content: rawContent } = matter(source);
      const content = normalizePostContent(rawContent);

      return normalizeFrontmatter(slug, data, content);
    })
    .sort(compareByDateDesc);
}

function readFeaturedPosts() {
  const posts = getAllPosts();
  const featured = posts.filter((post) => post.featured);

  return featured.length > 0 ? featured : posts.slice(0, 2);
}

export const getAllPosts = isProduction ? cache(readAllPosts) : readAllPosts;

export const getFeaturedPosts = isProduction ? cache(readFeaturedPosts) : readFeaturedPosts;

export function getPostBySlug(slug: string): PostDetail | null {
  const fullPath = resolvePostPath(slug);

  if (!fullPath) {
    return null;
  }

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content: rawContent } = matter(source);
  const content = normalizePostContent(rawContent);
  const frontmatter = normalizeFrontmatter(slug, data, content);

  return {
    ...frontmatter,
    content,
  };
}

export function getRelatedPosts(slug: string, limit = 2) {
  return getAllPosts().filter((post) => post.slug !== slug).slice(0, limit);
}

export function formatPublishedDate(dateString: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
    .format(new Date(dateString))
    .replace(/\//g, ".");
}

export function formatShortDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

export function getPostYear(dateString: string) {
  return new Date(dateString).getFullYear().toString();
}

export function groupPostsByYear(posts: PostSummary[]) {
  const groups: { year: string; posts: PostSummary[] }[] = [];

  for (const post of posts) {
    const year = getPostYear(post.publishedAt);
    const existing = groups.find((group) => group.year === year);

    if (existing) {
      existing.posts.push(post);
    } else {
      groups.push({ year, posts: [post] });
    }
  }

  return groups;
}
