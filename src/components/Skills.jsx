import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSkills } from '../hooks/usePortfolio.js';

const CAT_ORDER = ['AI/ML', 'Backend', 'Data', 'Database', 'Vector Store', 'Cloud/DevOps', 'Tools', 'Frontend'];

const CAT_META = {
  'AI/ML':        { kicker: '01',  blurb: 'retrieval · agents · fine-tuning' },
  'Backend':      { kicker: '02',  blurb: 'python services · APIs · workers' },
  'Data':         { kicker: '03',  blurb: 'wrangling · processing · pipelines' },
  'Database':     { kicker: '04a', blurb: 'relational · OLTP' },
  'Vector Store': { kicker: '04b', blurb: 'embeddings · HNSW · ANN' },
  'Cloud/DevOps': { kicker: '05',  blurb: 'AWS · GCP · Docker · MLOps' },
  'Tools':        { kicker: '06',  blurb: 'utilities · integrations' },
  'Frontend':     { kicker: '07',  blurb: 'UI · interaction' },
};

const TIER = {
  core:        { dots: 5, label: 'core' },
  production:  { dots: 4, label: 'production' },
  proficient:  { dots: 3, label: 'proficient' },
  exploring:   { dots: 2, label: 'exploring' },
};

const TIER_RANK = { core: 0, production: 1, proficient: 2, exploring: 3 };

export default function Skills() {
  const { data: skills } = useSkills();

  const grouped = useMemo(() => {
    const sorted = (arr) => [...arr].sort(
      (a, b) => (TIER_RANK[a.tier] ?? 9) - (TIER_RANK[b.tier] ?? 9) || a.name.localeCompare(b.name),
    );
    return CAT_ORDER
      .map((cat) => ({ cat, items: sorted(skills.filter((s) => s.category === cat)) }))
      .filter((g) => g.items.length > 0);
  }, [skills]);

  return (
    <section id="skills" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
          transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.3em]"
            style={{ color: 'rgb(var(--c-accent))' }}>
            <span className="inline-block h-px w-8" style={{ background: 'rgb(var(--c-accent))' }} />
            03 / stack
          </div>
          <h2 className="h-mega mt-3" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.6rem)', color: 'rgb(var(--c-paper-100))' }}>
            stack that{' '}
            <span className="accent-italic" style={{ color: 'rgb(var(--c-accent))' }}>ships GenAI</span>.
          </h2>
          <p className="mt-4 max-w-2xl" style={{ color: 'rgb(var(--c-paper-100) / 0.7)' }}>
            What I work with daily. Sorted by depth, not numbers.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {grouped.map((g, idx) => {
            const meta = CAT_META[g.cat] || { kicker: '·', blurb: '' };
            return (
              <motion.div
                key={g.cat}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, amount:0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.05 }}
                className="rounded-3xl p-6 md:p-7"
                style={{ background: 'var(--surface)', border: '1px solid var(--border-soft)' }}
              >
                <header className="flex items-baseline justify-between gap-3 pb-4 mb-4"
                  style={{ borderBottom: '1px solid var(--border-soft)' }}>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: 'rgb(var(--c-paper-100) / 0.45)' }}>
                      {meta.kicker} · {meta.blurb}
                    </div>
                    <h3 className="h-display text-2xl md:text-[28px] mt-1.5 tracking-tight"
                      style={{ color: 'rgb(var(--c-paper-100))' }}>{g.cat}</h3>
                  </div>
                  <span className="font-mono text-[11px]"
                    style={{ color: 'rgb(var(--c-paper-100) / 0.45)' }}>
                    {g.items.length}
                  </span>
                </header>

                <ul className="space-y-2.5">
                  {g.items.map((s) => (
                    <SkillRow key={s.name} skill={s} />
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillRow({ skill }) {
  const tier = TIER[skill.tier] || TIER.proficient;
  return (
    <li className="group flex items-center gap-3 py-1.5">
      <span className="font-medium text-[15px] md:text-base flex-1 min-w-0 truncate"
        style={{ color: 'rgb(var(--c-paper-100))' }}>
        {skill.name}
      </span>

      <span className="hidden sm:inline-flex items-center gap-[3px]" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="block h-1.5 w-3 rounded-[2px] transition"
            style={{
              background: i < tier.dots
                ? 'rgb(var(--c-accent))'
                : 'rgb(var(--c-paper-100) / 0.10)',
            }}
          />
        ))}
      </span>

      <span
        className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
        style={{
          color: skill.tier === 'core'
            ? 'rgb(var(--c-accent))'
            : 'rgb(var(--c-paper-100) / 0.62)',
          border: skill.tier === 'core'
            ? '1px solid rgb(var(--c-accent) / 0.5)'
            : '1px solid var(--border-soft)',
          background: skill.tier === 'core'
            ? 'rgb(var(--c-accent) / 0.07)'
            : 'transparent',
          minWidth: '92px',
          textAlign: 'center',
        }}
      >
        {tier.label}
      </span>
    </li>
  );
}
