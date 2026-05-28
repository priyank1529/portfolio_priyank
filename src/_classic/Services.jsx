import { motion } from 'framer-motion';
import { Database, Workflow, Sparkles, Server, Cloud, Compass } from 'lucide-react';
import { useServices } from '../hooks/usePortfolio.js';

const iconMap = { database: Database, workflow: Workflow, sparkles: Sparkles, server: Server, cloud: Cloud, compass: Compass };

export default function Services() {
  const { data: services } = useServices();

  return (
    <section id="services" className="section">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
          transition={{ duration: 0.8 }}>
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neon-cyan">// services</div>
          <h2 className="h-display text-4xl md:text-6xl mt-4">How I can <span className="text-gradient">help your team</span>.</h2>
          <p className="mt-4 text-white/60 max-w-2xl">Engagements scoped from architecture review to full GenAI build-out. No hype tax.</p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || Sparkles;
            return (
              <motion.div key={s.title}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.2 }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="group relative glass rounded-3xl p-7 overflow-hidden">
                <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br from-neon-violet/30 via-neon-blue/20 to-transparent blur-3xl opacity-50 group-hover:opacity-100 transition" />
                <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-violet/40 via-neon-blue/30 to-neon-cyan/30 border border-white/15">
                  <Icon size={22} />
                </div>
                <h3 className="relative mt-5 h-display text-xl">{s.title}</h3>
                <p className="relative text-xs font-mono uppercase tracking-[0.18em] text-neon-cyan/80 mt-1">{s.tagline}</p>
                <p className="relative mt-3 text-white/70 leading-relaxed">{s.description}</p>
                <ul className="relative mt-5 space-y-2 text-sm text-white/65">
                  {(s.bullets || []).map((b) => (
                    <li key={b} className="flex items-start gap-2"><span className="mt-1.5 h-1 w-1 rounded-full bg-neon-cyan flex-none" /> {b}</li>
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
