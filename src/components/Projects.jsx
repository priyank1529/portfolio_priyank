import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github, X, ArrowUpRight } from 'lucide-react';
import { useProjects } from '../hooks/usePortfolio.js';

const CARD_TINT = [
  { from: '#C25539', to: '#A87D46' },
  { from: '#A87D46', to: '#C8A56E' },
  { from: '#C8A56E', to: '#C25539' },
  { from: '#9E4026', to: '#A87D46' },
  { from: '#C25539', to: '#1A1814' },
  { from: '#A87D46', to: '#9E4026' },
  { from: '#C8A56E', to: '#C25539' },
];

export default function Projects() {
  const { data: projects } = useProjects();
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);
  const filters = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [projects]);
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const scrollerRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const headingX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  const nudge = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    const w = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32">
      {/* sticky header — solid bg, strong contrast, accent rule */}
      <div
        className="sticky top-0 z-30 pt-20 sm:pt-24 pb-5 sm:pb-6 px-5 sm:px-6 md:px-12 lg:px-24 border-b"
        style={{
          background: 'rgb(var(--c-ink-900) / 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'var(--border-mid)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-6">
          <motion.div style={{ x: headingX }}>
            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em]" style={{ color: 'rgb(var(--c-accent))' }}>
              <span className="inline-block h-px w-8" style={{ background: 'rgb(var(--c-accent))' }} />
              04 / selected work
            </div>
            <h2 className="h-mega mt-3" style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              color: 'rgb(var(--c-paper-100))',
            }}>
              things I have{' '}
              <span className="accent-italic" style={{ color: 'rgb(var(--c-accent))' }}>
                actually shipped
              </span>
            </h2>
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => nudge(-1)}
              className="h-10 w-10 inline-flex items-center justify-center rounded-full border transition hover:scale-105"
              style={{ borderColor: 'var(--border-mid)', color: 'rgb(var(--c-paper-100) / 0.85)' }}
              aria-label="Prev">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => nudge(1)}
              className="h-10 w-10 inline-flex items-center justify-center rounded-full border transition hover:scale-105"
              style={{ borderColor: 'var(--border-mid)', color: 'rgb(var(--c-paper-100) / 0.85)' }}
              aria-label="Next">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-5 flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`chip !py-1.5 transition ${filter === f ? 'chip-acid !py-1.5' : ''}`}>
              {f}
            </button>
          ))}
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-mono"
            style={{ color: 'rgb(var(--c-paper-100) / 0.55)' }}>
            <span>{list.length} projects</span>
            <span>·</span>
            <span>scroll →</span>
          </span>
        </div>
      </div>

      <div className="relative mt-10">
        <div ref={scrollerRef}
          className="scroll-h flex gap-6 px-6 md:px-12 lg:px-24 pb-10 overflow-x-auto">
          {list.map((p, i) => {
            const tint = CARD_TINT[i % CARD_TINT.length];
            return (
              <ProjectCard key={p.slug} project={p} tint={tint} onOpen={() => setActive(p)} />
            );
          })}
          <div className="snap-card flex-none w-6 md:w-12 lg:w-24" />
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            style={{ background: 'rgb(var(--c-ink-950) / 0.65)', backdropFilter: 'blur(8px)' }}
            onClick={() => setActive(null)}>
            <motion.div initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.97, opacity: 0 }} transition={{ duration: 0.4, ease: [0.2,0.8,0.2,1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl p-8 md:p-10 max-h-[85vh] overflow-y-auto"
              style={{ background: 'rgb(var(--c-ink-900))', border: '1px solid var(--border-mid)' }}>
              <button onClick={() => setActive(null)} className="absolute top-5 right-5"
                style={{ color: 'rgb(var(--c-paper-100) / 0.55)' }} aria-label="Close">
                <X size={22} />
              </button>
              <span className="chip">{active.category}</span>
              <h3 className="mt-4 h-display text-3xl md:text-4xl" style={{ color: 'rgb(var(--c-paper-100))' }}>{active.title}</h3>
              <p className="mt-1.5" style={{ color: 'rgb(var(--c-paper-100) / 0.6)' }}>{active.subtitle}</p>
              <p className="mt-6 leading-relaxed whitespace-pre-line" style={{ color: 'rgb(var(--c-paper-100) / 0.88)' }}>{active.long_description || active.description}</p>

              {active.metrics && Object.keys(active.metrics).length > 0 && (
                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  {Object.entries(active.metrics).map(([k,v]) => (
                    <div key={k} className="glass rounded-2xl p-4">
                      <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'rgb(var(--c-paper-100) / 0.5)' }}>{k}</div>
                      <div className="mt-1 font-display text-lg" style={{ color: 'rgb(var(--c-accent))' }}>{v}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-1.5">
                {(active.tech_stack || []).map((t) => (<span key={t} className="chip">{t}</span>))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                {active.github_url && (
                  <a href={active.github_url} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={14}/> code</a>
                )}
                {active.live_url && (
                  <a href={active.live_url} target="_blank" rel="noreferrer" className="btn-primary"><ExternalLink size={14}/> live</a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({ project: p, tint, onOpen }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;
    setT({ x: (py - 0.5) * -6, y: (px - 0.5) * 8 });
  };

  return (
    <article
      data-card
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      onClick={onOpen}
      className="snap-card group flex-none w-[88vw] md:w-[58vw] lg:w-[44vw] max-w-[640px] cursor-pointer"
      style={{ perspective: 1200 }}
    >
      <div
        className="relative rounded-3xl overflow-hidden shadow-card transition-transform duration-300 will-change-transform"
        style={{
          transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)`,
          aspectRatio: '4 / 5',
          border: '1px solid var(--border-mid)',
        }}
      >
        <div className="absolute inset-0" style={{
          background: `radial-gradient(120% 80% at 20% 20%, ${tint.from}AA, transparent 60%),
                       radial-gradient(120% 80% at 80% 90%, ${tint.to}88, transparent 60%),
                       linear-gradient(160deg, #1A1814 0%, #0E0D0B 100%)`,
        }} />

        <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id={`g-${p.slug}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={tint.from} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#g-${p.slug})`} />
        </svg>

        <div className="absolute -top-1/3 -right-1/3 h-2/3 w-2/3 rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition" style={{ background: `radial-gradient(circle, ${tint.from}66, transparent 60%)` }} />

        <div className="relative h-full flex flex-col p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)', color: '#F2EDE3', backdropFilter: 'blur(6px)' }}>
                {p.category}
              </span>
              {p.featured && (
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full"
                  style={{ background: `${tint.from}33`, border: `1px solid ${tint.from}66`, color: '#FFD9B8' }}>
                  featured
                </span>
              )}
            </div>
            <ArrowUpRight size={20} style={{ color: '#F2EDE3' }} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
          </div>

          <h3 className="mt-auto h-display text-3xl md:text-4xl" style={{ letterSpacing: '-0.03em', lineHeight: 1, color: '#F8F5EC' }}>
            {p.title}
          </h3>
          <p className="mt-2 text-sm md:text-base" style={{ color: 'rgba(242,237,227,0.80)' }}>{p.subtitle}</p>

          {p.metrics && Object.keys(p.metrics).length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Object.entries(p.metrics).slice(0, 3).map(([k, v]) => (
                <span key={k} className="text-[11px] font-mono px-2 py-0.5 rounded-full"
                  style={{ border: `1px solid ${tint.from}66`, color: '#FFD9B8', background: `${tint.from}1A` }}>
                  {k}: <span style={{ color: '#F8F5EC' }}>{v}</span>
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-1 max-h-10 overflow-hidden">
            {(p.tech_stack || []).slice(0, 5).map((tk) => (
              <span key={tk} className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(242,237,227,0.85)' }}>
                {tk}
              </span>
            ))}
            {(p.tech_stack || []).length > 5 && <span className="text-[10px] font-mono" style={{ color: 'rgba(242,237,227,0.55)' }}>+{p.tech_stack.length - 5}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
