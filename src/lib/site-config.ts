export const siteConfig = {
  name: "Blog",
  author: "Ruibao",
  description: "代码、系统与长期记录。",
  intro: "代码、系统与长期记录。",
  email: "1090829111@qq.com",
  github: "https://github.com/Ruiba0",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://example.com",
  navigation: [
    {
      href: "/",
      label: "首页",
    },
    {
      href: "/posts",
      label: "文章",
    },
    {
      href: "/about",
      label: "关于",
    },
  ],
} as const;

export function getAbsoluteUrl(path = "/") {
  if (!path || path === "/") {
    return siteConfig.siteUrl;
  }

  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
