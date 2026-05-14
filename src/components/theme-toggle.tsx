"use client";

import { useEffect, useState } from "react";
import { THEME_CHANGE_EVENT, THEME_STORAGE_KEY } from "@/lib/theme";

type ThemeMode = "light" | "dark";

function getSystemTheme(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme(): ThemeMode | null {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }));
}

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncTheme = () => {
      const storedTheme = readStoredTheme();
      const nextTheme =
        storedTheme ??
        ((document.documentElement.dataset.theme as ThemeMode | undefined) ?? getSystemTheme());

      applyTheme(nextTheme);
      setTheme(nextTheme);
      setIsMounted(true);
    };

    const handleSystemThemeChange = () => {
      if (readStoredTheme() !== null) {
        return;
      }

      const nextTheme = media.matches ? "dark" : "light";
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    syncTheme();
    media.addEventListener("change", handleSystemThemeChange);

    return () => {
      media.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {}

    setTheme(nextTheme);
  };

  const isDark = theme === "dark";
  const ariaLabel = !isMounted
    ? "Toggle theme"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";
  const Icon = isDark ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/72 text-foreground shadow-[0_8px_20px_rgba(71,85,105,0.06)] backdrop-blur-xl transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
      onClick={toggleTheme}
    >
      <Icon />
    </button>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
      <path
        d="M14.8 3.6a8.6 8.6 0 1 0 5.6 12.4A7 7 0 0 1 14.8 3.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.8v2.4M12 18.8v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.8 12h2.4M18.8 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
