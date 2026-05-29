import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { submitContact } from '../hooks/usePortfolio.js';
import { profile } from '../lib/portfolioData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState({ status: 'idle', msg: '' });

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setState({ status: 'error', msg: 'Please fill in every field.' });
      return;
    }
    setState({ status: 'sending', msg: '' });
    const res = await submitContact(form);
    if (res.ok) {
      setState({ status: 'success', msg: res.simulated ? 'Demo mode — message simulated locally.' : 'Message sent. I will reply within 24h.' });
      setForm({ name: '', email: '', message: '' });
    } else {
      setState({ status: 'error', msg: 'Something went wrong. Try email instead.' });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
          transition={{ duration: 0.8 }} className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neon-cyan">// contact</div>
          <h2 className="h-display text-4xl md:text-6xl mt-4">Let us build something <span className="text-gradient">grounded</span>.</h2>
          <p className="mt-5 text-white/65 max-w-md">Architecture review, GenAI build-out, or a discovery call — I respond within 24 hours.</p>

          <div className="mt-10 space-y-3">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-white/80 hover:text-white transition group min-w-0">
              <span className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-xl glass"><Mail size={16}/></span>
              <span className="break-all">{profile.email}</span>
            </a>
            <div className="flex items-center gap-3 text-white/80">
              <span className="h-10 w-10 flex-none inline-flex items-center justify-center rounded-xl glass"><MapPin size={16}/></span>
              {profile.location}
            </div>
            <div className="flex items-center gap-3">
              <a href={profile.github} target="_blank" rel="noreferrer" className="h-10 w-10 inline-flex items-center justify-center rounded-xl glass hover:border-white/30 transition"><Github size={16}/></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="h-10 w-10 inline-flex items-center justify-center rounded-xl glass hover:border-white/30 transition"><Linkedin size={16}/></a>
            </div>
          </div>
        </motion.div>

        <motion.form onSubmit={submit}
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-7 glass-strong rounded-3xl p-7 md:p-10 grid gap-5">
          <Field label="Name" value={form.name} onChange={update('name')} placeholder="What should I call you?" />
          <Field label="Email" type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" />
          <Field as="textarea" rows={5} label="Message" value={form.message} onChange={update('message')} placeholder="What are you trying to build, and what is stopping you?" />

          <div className="flex items-center justify-between gap-4">
            <AnimatePresence mode="wait">
              {state.msg && (
                <motion.p key={state.status} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  className={`text-sm flex items-center gap-2 ${state.status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {state.status === 'success' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
                  {state.msg}
                </motion.p>
              )}
            </AnimatePresence>
            <button type="submit" disabled={state.status === 'sending'} className="btn-primary ml-auto group disabled:opacity-60">
              {state.status === 'sending' ? 'Sending…' : (<>Send message <Send size={16} className="transition-transform group-hover:translate-x-0.5"/></>)}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, as = 'input', ...rest }) {
  const Tag = as;
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/45">{label}</span>
      <Tag
        {...rest}
        className="mt-2 w-full bg-white/[0.04] border border-white/10 focus:border-neon-cyan/60 focus:bg-white/[0.07]
          rounded-2xl px-4 py-3 text-white placeholder-white/35 outline-none transition resize-none"
      />
    </label>
  );
}
