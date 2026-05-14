"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type TocItem = {
  id: string;
  level: 2 | 3;
  text: string;
};

function collectHeadings() {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-toc-label][id], #post-body h2[id], #post-body h3[id]"))
    .map((element) => {
      const id = element.id.trim();
      const level = element.tagName === "H3" ? 3 : 2;
      const text = element.dataset.tocLabel?.trim() ?? element.textContent?.trim() ?? "";

      if (!id || !text) {
        return null;
      }

      return { id, level, text };
    })
    .filter((item, index, array): item is TocItem => {
      return item !== null && array.findIndex((candidate) => candidate?.id === item.id) === index;
    });
}

export function PostToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const nextItems = collectHeadings();
      setItems(nextItems);
      setActiveId(nextItems[0]?.id ?? "");
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => heading !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-96px 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="hidden lg:block lg:col-start-3">
      <div
        className="w-full max-w-[10.5rem] rounded-[18px] border border-border bg-surface/82 p-4 shadow-[0_10px_28px_rgba(0,0,0,0.08),0_1px_0_rgba(0,0,0,0.06)] lg:fixed lg:top-24 lg:z-20 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
        style={{ right: "max(1.5rem, calc((100vw - 78rem) / 2 + 1.5rem))" }}
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {"\u76ee\u5f55"}
        </p>
        <nav aria-label="Table of contents" className="mt-4">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  className={[
                    "block text-sm leading-6 transition-colors hover:text-foreground",
                    item.level === 3 ? "pl-4 text-muted-foreground" : "text-foreground/82",
                    activeId === item.id ? "text-foreground" : "",
                  ].join(" ")}
                  href={`#${item.id}`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
