import type { NextConfig } from "next";

const repoName = process.env.REPO_NAME;
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isUserSite = repoName?.toLowerCase().endsWith(".github.io");
const basePath =
  isGithubActions && repoName && !isUserSite ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
