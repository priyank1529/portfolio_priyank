import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { useProjects } from '../hooks/usePortfolio.js';

function TiltCard({ children, onClick }) {
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ x: (py - 0.5) * -10, y: (px - 0.5) * 12 });
  };
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      onClick={onClick}
      className="group relative cursor-pointer"
      style={{ perspective: 1200 }}
    >
      <div
        style={{ transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
        className="transition-transform duration-300 will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}

export default function Projects() {
  const { data: projects } = useProjects();
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);

  const filters = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [projects]);
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
          transition={{ duration: 0.8 }} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-neon-cyan">// selected work</div>
            <h2 className="h-display text-4xl md:text-6xl mt-4">Things I have <span className="text-gradient">actually shipped</span>.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`chip transition ${filter === f ? 'bg-white/15 border-white/30 text-white' : 'hover:border-white/25'}`}>
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {list.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, amount:0.2 }} transition={{ duration: 0.7, delay: (i % 6) * 0.05 }}>
              <TiltCard onClick={() => setActive(p)}>
                <div className="glass rounded-3xl p-7 h-full relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br from-neon-violet/40 via-neon-blue/20 to-transparent blur-3xl opacity-60 group-hover:opacity-100 transition" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <span className="chip">{p.category}</span>
                      {p.featured && <span className="chip ml-2 border-neon-cyan/40 text-neon-cyan">featured</span>}
                    </div>
                    <ExternalLink size={18} className="text-white/40 group-hover:text-white transition" />
                  </div>

                  <h3 className="relative mt-5 h-display text-2xl md:text-3xl">{p.title}</h3>
                  <p className="relative mt-1.5 text-white/55 text-sm">{p.subtitle}</p>
                  <p className="relative mt-4 text-white/70 leading-relaxed">{p.description}</p>

                  {p.metrics && Object.keys(p.metrics).length > 0 && (
                    <div className="relative mt-5 flex flex-wrap gap-2">
                      {Object.entries(p.metrics).map(([k,v]) => (
                        <span key={k} className="chip border-neon-violet/30">{k}: <span className="ml-1 text-white">{v}</span></span>
                      ))}
                    </div>
                  )}

                  <div className="relative mt-6 flex flex-wrap gap-1.5">
                    {(p.tech_stack || []).slice(0, 8).map((t) => (<span key={t} className="chip">{t}</span>))}
                    {(p.tech_stack || []).length > 8 && <span className="chip">+{p.tech_stack.length - 8}</span>}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-md"
            onClick={() => setActive(null)}>
            <motion.div initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.97, opacity: 0 }} transition={{ duration: 0.4, ease: [0.2,0.8,0.2,1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl glass-strong rounded-3xl p-8 md:p-10 max-h-[85vh] overflow-y-auto">
              <button onClick={() => setActive(null)} className="absolute top-5 right-5 text-white/60 hover:text-white" aria-label="Close">
                <X size={22} />
              </button>
              <span className="chip">{active.category}</span>
              <h3 className="mt-4 h-display text-3xl md:text-4xl">{active.title}</h3>
              <p className="mt-1.5 text-white/55">{active.subtitle}</p>
              <p className="mt-6 text-white/80 leading-relaxed whitespace-pre-line">{active.long_description || active.description}</p>

              {active.metrics && Object.keys(active.metrics).length > 0 && (
                <div className="mt-6 grid sm:grid-cols-3 gap-3">
                  {Object.entries(active.metrics).map(([k,v]) => (
                    <div key={k} className="glass rounded-2xl p-4">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">{k}</div>
                      <div className="mt-1 font-display text-lg text-white">{v}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-1.5">
                {(active.tech_stack || []).map((t) => (<span key={t} className="chip">{t}</span>))}
              </div>

              <div className="mt-8 flex items-center gap-3">
                {active.github_url && (
                  <a href={active.github_url} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={16}/> Code</a>
                )}
                {active.live_url && (
                  <a href={active.live_url} target="_blank" rel="noreferrer" className="btn-primary"><ExternalLink size={16}/> Live</a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
