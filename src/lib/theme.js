import { useEffect, useState, useCallback } from 'react';

export const THEME_KEY = 'priyank-portfolio-theme';

/* Light is now the default — only honour stored preference. */
function readInitial() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch (_) { /* ignore */ }
  return 'light';
}

function apply(theme) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.classList.toggle('light', theme === 'light');
  html.classList.toggle('dark',  theme === 'dark');
  html.style.colorScheme = theme;
  try { window.localStorage.setItem(THEME_KEY, theme); } catch (_) { /* ignore */ }
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitial);
  useEffect(() => { apply(theme); }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return { theme, setTheme, toggle };
}

export function useThemeReactive() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
  useEffect(() => {
    const h = (e) => setTheme(e.detail);
    window.addEventListener('themechange', h);
    return () => window.removeEventListener('themechange', h);
  }, []);
  return theme;
}

export function bootstrapTheme() {
  apply(readInitial());
}
