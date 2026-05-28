import { motion } from 'framer-motion';
import { useSkills } from '../hooks/usePortfolio.js';

const categories = ['AI/ML', 'Backend', 'Databases', 'Cloud/DevOps', 'Tools', 'Frontend'];

const accent = {
  'AI/ML': 'from-neon-violet via-neon-fuchsia to-neon-cyan',
  'Backend': 'from-neon-cyan via-neon-blue to-neon-violet',
  'Databases': 'from-neon-fuchsia via-neon-violet to-neon-blue',
  'Cloud/DevOps': 'from-neon-blue via-neon-cyan to-neon-violet',
  'Tools': 'from-neon-cyan to-neon-violet',
  'Frontend': 'from-neon-violet to-neon-cyan',
};

export default function Skills() {
  const { data: skills } = useSkills();
  const grouped = categories
    .map((cat) => ({ cat, items: skills.filter((s) => s.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <section id="skills" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
          transition={{ duration: 0.8 }}>
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neon-cyan">// stack</div>
          <h2 className="h-display text-4xl md:text-6xl mt-4">A stack that <span className="text-gradient">ships GenAI</span>.</h2>
          <p className="mt-4 text-white/60 max-w-2xl">From prompt to production — retrieval, agents, fine-tuning, async workers, vector stores, and the cloud surfaces underneath.</p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          {grouped.map((g, idx) => (
            <motion.div key={g.cat} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.05 }} className="glass rounded-3xl p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl">{g.cat}</h3>
                <span className="chip">{g.items.length} tools</span>
              </div>

              <div className="mt-6 grid gap-3">
                {g.items.map((s) => (
                  <div key={s.name} className="group">
                    <div className="flex items-baseline justify-between">
                      <span className="text-white/85 font-medium">{s.name}</span>
                      <span className="text-xs font-mono text-white/40">{s.level}</span>
                    </div>
                    <div className="mt-1.5 h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.2,0.8,0.2,1] }}
                        className={`h-full rounded-full bg-gradient-to-r ${accent[g.cat] || accent['AI/ML']}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
