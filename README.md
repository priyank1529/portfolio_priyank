# Priyank Salot — Portfolio

Premium, cinematic AI/ML engineer portfolio. React · Three.js · React Three Fiber · Framer Motion · GSAP · Tailwind · Supabase.

Inspired by the floating-bubble interaction from [antigravity.google](https://antigravity.google/), reimagined as a 3D portfolio map.

## Stack

- **Vite + React 18**
- **Three.js / React Three Fiber / Drei** — floating glassmorphism bubbles, particles, bloom
- **postprocessing** — bloom + noise
- **Framer Motion** — section reveals, modal transitions
- **GSAP** — fine-grained tween control
- **Tailwind CSS** — design tokens, glass utilities
- **Lenis** — smooth scrolling
- **React Router** — routing scaffold
- **Supabase** — dynamic content + contact form persistence
- **Lucide React** — iconography

## Local setup

```bash
# 1. install
npm install

# 2. env
cp .env.example .env
# fill VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY  (optional — falls back to static data)

# 3. dev
npm run dev      # http://localhost:5173

# 4. build
npm run build
npm run preview
```

If you skip the Supabase config the site still works — it uses the static dataset in `src/lib/portfolioData.js`.

## Supabase setup

1. Create a Supabase project
2. Open the SQL editor and run `supabase/schema.sql` — this creates tables, RLS policies, and seeds Priyank's content
3. Copy the project URL + anon key into `.env`
4. Restart `npm run dev`

### Tables

| Table | Purpose |
|---|---|
| `projects` | Featured + secondary projects with metrics, tech stack, links |
| `skills` | Categorised skills with proficiency level |
| `experiences` | Career timeline with highlights and tech stack |
| `services` | Service offerings shown in the Services section |
| `contact_messages` | Inserts from the contact form (anon insert allowed via RLS) |

## Structure

```
portfolio/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── supabase/
│   └── schema.sql
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   ├── supabase.js
    │   └── portfolioData.js
    ├── hooks/
    │   └── usePortfolio.js
    └── components/
        ├── Nav.jsx
        ├── Cursor.jsx
        ├── ScrollProgress.jsx
        ├── Scene3D.jsx       # floating bubbles, particles, bloom
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Projects.jsx      # tilt cards + cinematic modal
        ├── Experience.jsx
        ├── Services.jsx
        ├── Contact.jsx       # Supabase-backed
        └── Footer.jsx
```

## Deployment

### Vercel

```bash
npx vercel
# set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the dashboard
npx vercel --prod
```

Build command: `npm run build` · Output dir: `dist`

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Any static host

`npm run build` and serve the `dist/` folder.

## Customising

- **Profile / bio / stats** — `src/lib/portfolioData.js`
- **Bubble positions / colours** — `bubbles` array in the same file
- **3D scene** — `src/components/Scene3D.jsx` (bloom intensity, particle count, distortion)
- **Colour palette** — `tailwind.config.js` under `theme.extend.colors.neon`

## Performance notes

- DPR clamped to `[1, 1.7]` for mobile GPUs
- Postprocessing uses `multisampling={0}`; bump for high-end desktops
- Particle count is `1400` — drop to `~600` on low-end devices
- Lenis respects `prefers-reduced-motion`

## License

MIT
