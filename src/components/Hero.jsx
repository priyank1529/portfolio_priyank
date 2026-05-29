import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import Scene3D from './Scene3D.jsx';
import { profile } from '../lib/portfolioData';

const CHARS = '!<>-_\\/[]{}—=+*^?#abcdefghijklmnopqrstuvwxyz0123456789';

function useScramble(target, delay = 0, duration = 900) {
  const [out, setOut] = useState(' '.repeat(target.length));
  useEffect(() => {
    let raf, start;
    const queue = target.split('').map((c, i) => ({
      to: c,
      startAt: (i / target.length) * (duration * 0.6),
      endAt:   (i / target.length) * (duration * 0.6) + duration * 0.4,
    }));
    const tick = (t) => {
      if (!start) start = t;
      const elapsed = t - start - delay;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      let complete = 0;
      const next = queue.map((q) => {
        if (elapsed >= q.endAt) { complete += 1; return q.to; }
        if (elapsed < q.startAt) return ' ';
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');
      setOut(next);
      if (complete < queue.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, duration]);
  return out;
}

function Scramble({ children, delay = 0 }) {
  const out = useScramble(children, delay, 950);
  return <span>{out}</span>;
}

const TICKER = [
  'LangChain', 'CrewAI', 'pgvector · HNSW', 'FastAPI', 'Django', 'GPT-4o', 'Llama-3.1',
  'Ollama', 'AWS Bedrock', 'PostgreSQL', 'Redis', 'Celery', 'XGBoost',
  'sub-2s P95 latency', '+85% retrieval gain', '0 hallucinations', '92% transcription',
];

function Marquee({ reverse = false }) {
  return (
    <div className="marquee-mask overflow-hidden py-3">
      <div className={`flex w-max gap-10 ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {[...TICKER, ...TICKER].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em] text-paper-100/55 whitespace-nowrap">
            <span className="text-accent-blue">◆</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden">
      <Scene3D />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-900/80 to-transparent z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900 to-transparent z-[1]" />

      <div className="relative z-10 min-h-screen flex flex-col px-5 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
          className="pt-24 sm:pt-28 md:pt-32 flex items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] sm:tracking-[0.22em]">
          <div className="flex items-center gap-2.5 text-paper-100/70 min-w-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent-blue animate-ping opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent-blue" />
            </span>
            available — {profile.location} / IST
          </div>
          <div className="hidden sm:flex items-center gap-4 text-paper-300/60">
            <span>portfolio · 2026</span>
            <span className="h-3 w-px bg-white/15" />
            <span>v3.2</span>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center py-12 md:py-16">
          <motion.h1 initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}
            className="h-mega max-w-5xl text-paper-100">
            <span className="block">
              <Scramble delay={0}>Building</Scramble>{' '}
              <span className="accent-italic text-gradient">grounded</span>
            </span>
            <span className="block text-paper-100/95">AI systems that</span>
            <span className="block">
              <Scramble delay={550}>actually ship</Scramble>
              <span className="text-accent-blue">.</span>
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:1.2 }}
            className="mt-8 max-w-xl font-mono text-[13px] md:text-sm leading-relaxed text-paper-100/65 uppercase tracking-[0.12em]">
            ai/ml engineer · <span className="text-paper-100">production genai</span>
            <br />
            hybrid rag · multi-agent · llm fine-tuning · python at scale
          </motion.p>

          <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:1.4 }}
            className="mt-10 flex flex-wrap items-center gap-5">
            <a href="#projects" className="btn-primary group">
              selected work
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#contact" className="group inline-flex items-center gap-1.5 text-[13px] font-mono uppercase tracking-[0.12em] text-paper-100/65 hover:text-accent-blue transition">
              <span className="border-b border-white/20 group-hover:border-accent-blue pb-0.5 transition">available for new work</span>
              <span aria-hidden>→</span>
            </a>

            <div className="ml-auto flex items-center gap-3 text-paper-100/50">
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent-blue transition" aria-label="GitHub"><Github size={16}/></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-blue transition" aria-label="LinkedIn"><Linkedin size={16}/></a>
              <a href={`mailto:${profile.email}`} className="hover:text-accent-blue transition" aria-label="Email"><Mail size={16}/></a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1, delay:1.6 }}
          className="pb-14 border-y border-white/[0.06]">
          <Marquee />
          <div className="h-rule opacity-50" />
          <Marquee reverse />
        </motion.div>
      </div>
    </section>
  );
}
