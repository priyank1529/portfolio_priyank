import { motion } from 'framer-motion';
import { useExperiences } from '../hooks/usePortfolio.js';

function fmt(date, current) {
  if (current) return 'Present';
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Experience() {
  const { data: experiences } = useExperiences();

  return (
    <section id="experience" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
          transition={{ duration: 0.8 }}>
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neon-cyan">// timeline</div>
          <h2 className="h-display text-4xl md:text-6xl mt-4">Where I've <span className="text-gradient">shipped</span>.</h2>
        </motion.div>

        <div className="relative mt-14 max-w-4xl">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-fuchsia opacity-50" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div key={exp.role + exp.company}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="relative pl-12">
                <span className="absolute left-1 top-2 h-3 w-3 rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet shadow-glow-cyan ring-4 ring-ink-950" />
                <div className="glass rounded-3xl p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="chip">{fmt(exp.start_date)} — {fmt(exp.end_date, exp.current)}</span>
                    {exp.current && <span className="chip border-emerald-500/40 text-emerald-400">current</span>}
                  </div>
                  <h3 className="h-display text-2xl md:text-3xl">{exp.role}</h3>
                  <p className="mt-1 text-white/60">{exp.company} · {exp.location}</p>
                  <p className="mt-3 text-white/75">{exp.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/65">
                    {(exp.highlights || []).map((h) => (
                      <li key={h} className="flex items-start gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-neon-cyan flex-none" /> {h}</li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(exp.tech_stack || []).map((t) => (<span key={t} className="chip">{t}</span>))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
