import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Command, Search, Mail, Github, Linkedin, ArrowRight, Sparkles, FolderGit2, Briefcase, Cog, User, Database } from 'lucide-react';
import { profile, projects } from '../lib/portfolioData.js';

const baseCommands = [
  { id: 'nav-about',      label: 'Go to About',      kind: 'nav', icon: User,       run: () => scrollTo('about') },
  { id: 'nav-skills',     label: 'Go to Skills',     kind: 'nav', icon: Sparkles,   run: () => scrollTo('skills') },
  { id: 'nav-projects',   label: 'Go to Projects',   kind: 'nav', icon: FolderGit2, run: () => scrollTo('projects') },
  { id: 'nav-experience', label: 'Go to Experience', kind: 'nav', icon: Briefcase,  run: () => scrollTo('experience') },
  { id: 'nav-services',   label: 'Go to Services',   kind: 'nav', icon: Cog,        run: () => scrollTo('services') },
  { id: 'nav-contact',    label: 'Go to Contact',    kind: 'nav', icon: Mail,       run: () => scrollTo('contact') },
  { id: 'copy-email',     label: 'Copy email address', kind: 'action', icon: Mail,    run: () => navigator.clipboard?.writeText(profile.email) },
  { id: 'open-github',    label: 'Open GitHub',      kind: 'link', icon: Github,     run: () => window.open(profile.github,   '_blank') },
  { id: 'open-linkedin',  label: 'Open LinkedIn',    kind: 'link', icon: Linkedin,   run: () => window.open(profile.linkedin, '_blank') },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((s) => !s);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { if (open) { setQ(''); setActive(0); } }, [open]);

  const items = useMemo(() => {
    const projectCmds = projects.map((p) => ({
      id: `proj-${p.slug}`,
      label: `Open project — ${p.title}`,
      kind: 'project',
      icon: Database,
      run: () => scrollTo('projects'),
    }));
    const all = [...baseCommands, ...projectCmds];
    if (!q.trim()) return all;
    const t = q.toLowerCase();
    return all.filter((c) => c.label.toLowerCase().includes(t) || c.id.toLowerCase().includes(t));
  }, [q]);

  useEffect(() => { if (active >= items.length) setActive(0); }, [items, active]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter')   { e.preventDefault(); const c = items[active]; if (c) { c.run(); setOpen(false); } }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
        onClick={() => setOpen(true)}
        className="hidden md:inline-flex fixed bottom-6 left-6 z-[65] items-center gap-2 chip glass hover:border-white/30 transition"
      >
        <Command size={12} className="text-neon-cyan" /> <span className="font-mono">⌘ K</span>
        <span className="text-white/55">— agent prompt</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-ink-950/70 backdrop-blur-md flex items-start justify-center pt-[12vh] px-4"
          >
            <motion.div
              initial={{ y: -20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0,   scale: 1,    opacity: 1 }}
              exit={{    y: -20, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl glass-strong rounded-2xl overflow-hidden shadow-glow"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                <Sparkles size={16} className="text-neon-cyan" />
                <input
                  autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKeyDown}
                  placeholder="Prompt the agent — search projects, copy email, jump to a section…"
                  className="flex-1 bg-transparent text-white placeholder-white/35 outline-none text-sm"
                />
                <span className="chip text-[10px]">esc</span>
              </div>

              <ul className="max-h-[55vh] overflow-y-auto py-2">
                {items.length === 0 && (
                  <li className="px-5 py-6 text-sm text-white/55">No matches. Try "rag", "contact", or "github".</li>
                )}
                {items.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.id}>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onClick={() => { c.run(); setOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 flex items-center gap-3 ${
                          i === active ? 'bg-white/[0.05]' : ''
                        }`}
                      >
                        <Icon size={14} className="text-neon-cyan" />
                        <span className="text-sm text-white/85 flex-1 truncate">{c.label}</span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">{c.kind}</span>
                        {i === active && <ArrowRight size={14} className="text-white/55" />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/35 uppercase tracking-[0.18em]">
                <span><Search size={10} className="inline mr-1" /> fuzzy match</span>
                <span>↑↓ navigate · ⏎ run · ⌘K toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
