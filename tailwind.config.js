/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: 'rgb(var(--c-ink-950) / <alpha-value>)',
          900: 'rgb(var(--c-ink-900) / <alpha-value>)',
          800: 'rgb(var(--c-ink-800) / <alpha-value>)',
          700: 'rgb(var(--c-ink-700) / <alpha-value>)',
        },
        paper: {
          50:  'rgb(var(--c-paper-50)  / <alpha-value>)',
          100: 'rgb(var(--c-paper-100) / <alpha-value>)',
          200: 'rgb(var(--c-paper-200) / <alpha-value>)',
          300: 'rgb(var(--c-paper-300) / <alpha-value>)',
        },
        accent: {
          blue:   'rgb(var(--c-accent)   / <alpha-value>)',
          deep:   'rgb(var(--c-accent-d) / <alpha-value>)',
          violet: 'rgb(var(--c-accent-2) / <alpha-value>)',
          mint:   'rgb(var(--c-accent-3) / <alpha-value>)',
          warm:   'rgb(var(--c-accent-4) / <alpha-value>)',
        },
        warm: {
          coral: 'rgb(var(--c-accent)   / <alpha-value>)',
          sand:  'rgb(var(--c-accent-2) / <alpha-value>)',
          peach: 'rgb(var(--c-accent-3) / <alpha-value>)',
          taupe: 'rgb(var(--c-paper-300) / <alpha-value>)',
          rust:  'rgb(var(--c-accent-d) / <alpha-value>)',
        },
        /* legacy aliases — keep existing classnames compiling */
        neon: {
          cyan:    'rgb(var(--c-accent)   / <alpha-value>)',
          blue:    'rgb(var(--c-accent-d) / <alpha-value>)',
          violet:  'rgb(var(--c-accent-2) / <alpha-value>)',
          fuchsia: 'rgb(var(--c-accent-3) / <alpha-value>)',
        },
        acid: {
          lime:  'rgb(var(--c-accent)   / <alpha-value>)',
          coral: 'rgb(var(--c-accent-2) / <alpha-value>)',
          mint:  'rgb(var(--c-accent-3) / <alpha-value>)',
          amber: 'rgb(var(--c-accent-4) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace'],
      },
      boxShadow: {
        glow:        '0 0 80px -20px rgb(var(--c-accent) / 0.45)',
        'glow-cyan': '0 0 80px -20px rgb(var(--c-accent-2) / 0.35)',
        card:        '0 1px 0 0 rgb(var(--c-border) / 0.4), 0 24px 60px -28px rgba(0,0,0,0.55)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
        'marquee-rev': 'marquee 42s linear infinite reverse',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
};
