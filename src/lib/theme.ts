export const THEME_STORAGE_KEY = "theme-preference";
export const THEME_CHANGE_EVENT = "themechange";

export const themeInitScript = `
(() => {
  const storageKey = "${THEME_STORAGE_KEY}";
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  let savedTheme = null;

  try {
    savedTheme = window.localStorage.getItem(storageKey);
  } catch {}

  const theme =
    savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : media.matches
        ? "dark"
        : "light";

  root.dataset.theme = theme;
})();
`;
