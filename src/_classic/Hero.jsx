import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import Scene3D from './Scene3D.jsx';
import { profile } from '../lib/portfolioData';

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      <Scene3D />

      {/* thin vignettes only at edges — dots stay visible behind text */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950/70 to-transparent z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent z-[1]" />

      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-20 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.08 }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: [0.2,0.8,0.2,1] }}
            className="inline-flex items-center gap-3 chip mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Available for international clients · {profile.location}
          </motion.div>

          <motion.h1 variants={fadeUp} transition={{ duration: 0.9, ease: [0.2,0.8,0.2,1] }}
            className="h-display text-[clamp(2.6rem,8vw,7rem)] max-w-5xl">
            I ship <span className="text-gradient">production GenAI</span><br />
            that survives the real world.
          </motion.h1>

          <motion.p variants={fadeUp} transition={{ duration: 0.9, delay: 0.05 }}
            className="mt-8 max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            {profile.tagline} Hybrid RAG, multi-agent orchestration, LLM fine-tuning, and the Python backends that hold it all together.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-primary group">
              See projects
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="btn-ghost">Hire me</a>
            <div className="ml-2 flex items-center gap-3 text-white/60">
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="GitHub"><Github size={20}/></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="LinkedIn"><Linkedin size={20}/></a>
              <a href={`mailto:${profile.email}`} className="hover:text-white transition" aria-label="Email"><Mail size={20}/></a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} transition={{ duration: 0.9, delay: 0.18 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
            {profile.stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5">
                <div className="text-3xl md:text-4xl font-display font-semibold text-gradient">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/55">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/40">
          scroll · the bubbles are clickable
        </motion.div>
      </div>
    </section>
  );
}
