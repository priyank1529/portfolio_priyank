import { motion } from 'framer-motion';
import { profile, education } from '../lib/portfolioData';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.4 }}
          transition={{ duration: 0.8 }} className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neon-cyan">// about</div>
          <h2 className="h-display text-4xl md:text-6xl mt-4">
            Engineer first.<br/><span className="text-gradient">AI second.</span>
          </h2>
          <p className="mt-6 text-white/70 leading-relaxed whitespace-pre-line">{profile.bio}</p>
          <p className="mt-5 text-white/55 leading-relaxed">
            I have shipped AI for an enterprise media client — hybrid RAG, multi-agent SQL, OCR + STT pipelines —
            and the Django / FastAPI services that make them production-ready. Latency, evaluation, and grounding are
            the parts I obsess over.
          </p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.4 }}
          transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
          {[
            { k:'Role', v:profile.role },
            { k:'Based in', v:profile.location },
            { k:'Email', v:profile.email },
            { k:'Phone', v:profile.phone },
          ].map((c)=>(
            <div key={c.k} className="glass rounded-2xl p-5">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">{c.k}</div>
              <div className="mt-2 font-display text-lg text-white/90 break-all">{c.v}</div>
            </div>
          ))}

          <div className="sm:col-span-2 glass rounded-2xl p-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/45 mb-4">Education</div>
            <ul className="space-y-4">
              {education.map((e)=>(
                <li key={e.degree} className="grid grid-cols-[auto_1fr] gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet shadow-glow-cyan" />
                  <div>
                    <div className="font-display font-medium text-white/90">{e.degree}</div>
                    <div className="text-sm text-white/55">{e.school} · {e.location}</div>
                    <div className="text-xs font-mono text-white/45 mt-0.5">{e.period}{e.detail ? ` · ${e.detail}` : ''}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
