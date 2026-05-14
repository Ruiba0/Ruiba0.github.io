import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/")) {
      return (
        <Link className="font-medium text-accent underline-offset-4 hover:underline" href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a
        className="font-medium text-accent underline-offset-4 hover:underline"
        href={href}
        rel="noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  },
  h2: ({ children, ...props }) => (
    <h2
      className="mt-14 scroll-mt-24 font-display text-2xl font-semibold tracking-[0.01em] text-foreground md:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="mt-10 scroll-mt-24 font-display text-xl font-semibold tracking-[0.01em] text-foreground md:text-2xl"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="my-6 text-[15px] leading-8 text-foreground/92 first:mt-0 last:mb-0 md:text-[16px]"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="space-y-3 pl-5 text-[15px] leading-7 text-foreground/92 md:text-[16px] md:leading-8" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="space-y-3 pl-5 text-[15px] leading-7 text-foreground/92 md:text-[16px] md:leading-8" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => <li {...props}>{children}</li>,
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-8 rounded-[24px] border-l-4 border-accent bg-surface px-5 py-4 text-foreground/80"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
  pre: ({ children, ...props }) => (
    <pre
      className="my-8 overflow-x-auto rounded-[24px] bg-[#201b19] px-5 py-4 text-sm leading-7 text-stone-100"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }) => {
    if (className) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code
        className="rounded-md bg-[color:rgba(181,112,71,0.12)] px-1.5 py-1 text-[0.92em] text-accent"
        {...props}
      >
        {children}
      </code>
    );
  },
};
