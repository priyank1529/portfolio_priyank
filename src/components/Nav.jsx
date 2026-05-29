import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/theme.js';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', ...links.map((l) => l.id)];
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(id); }),
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? 'backdrop-blur-md border-b' : ''
        }`}
        style={scrolled ? { background: 'rgb(var(--c-ink-900) / 0.75)', borderColor: 'var(--border-soft)' } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button onClick={() => go('hero')} className="flex items-center gap-2 group">
            <span className="relative inline-flex h-7 w-7 rounded-full bg-gradient-to-br from-accent-blue via-accent-violet to-accent-mint" />
            <span className="font-display font-semibold tracking-tight text-paper-100">priyank<span className="text-accent-blue">.</span></span>
          </button>

          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <button key={l.id} onClick={() => go(l.id)}
                className={`relative px-3 py-2 text-[12px] font-mono uppercase tracking-[0.16em] transition group ${
                  activeId === l.id ? 'text-accent-blue' : 'text-paper-100/65 hover:text-paper-100'
                }`}>
                {l.label}
              </button>
            ))}

            <ThemeToggle theme={theme} toggle={toggle} />

            <a href="#contact" onClick={(e)=>{e.preventDefault();go('contact');}} className="ml-2 btn-primary !py-2 !px-4 text-[12px]">let's talk</a>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} toggle={toggle} compact />
            <button className="text-paper-100 inline-flex h-10 w-10 items-center justify-center -mr-2" onClick={()=>setOpen((s)=>!s)} aria-label="Menu" aria-expanded={open}>
              {open ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>

        {open && (
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} className="md:hidden border-t"
            style={{ background: 'rgb(var(--c-ink-900) / 0.95)', borderColor: 'var(--border-mid)' }}>
            <div className="px-6 py-4 grid gap-1">
              {links.map((l)=>(
                <button key={l.id} onClick={()=>go(l.id)} className="text-left py-3 text-[15px] font-mono uppercase tracking-[0.16em] text-paper-100/80 hover:text-accent-blue">{l.label}</button>
              ))}
              <a href="#contact" onClick={(e)=>{e.preventDefault();go('contact');}} className="mt-2 btn-primary justify-center">let's talk</a>
            </div>
          </motion.div>
        )}
      </motion.header>

      <aside className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
        {['hero', ...links.map((l) => l.id)].map((id, i) => {
          const isActive = activeId === id;
          const label = id === 'hero' ? 'intro' : links.find((l) => l.id === id)?.label?.toLowerCase();
          return (
            <button key={id} onClick={() => go(id)}
              className="group relative flex items-center justify-end" aria-label={label}>
              <span className={`mr-2 font-mono text-[10px] uppercase tracking-[0.22em] transition ${
                isActive ? 'opacity-100 text-accent-blue' : 'opacity-0 group-hover:opacity-100 text-paper-100/70'
              }`}>{String(i).padStart(2, '0')} · {label}</span>
              <span className={`relative inline-flex transition-all ${
                isActive ? 'h-2.5 w-2.5' : 'h-1.5 w-1.5'
              }`}>
                <span className={`absolute inset-0 rounded-full transition-all ${
                  isActive ? 'bg-accent-blue' : 'bg-paper-100/30 group-hover:bg-paper-100/60'
                }`} />
                {isActive && <span className="absolute inset-[-6px] rounded-full bg-accent-blue/20 animate-ping" />}
              </span>
            </button>
          );
        })}
      </aside>
    </>
  );
}

function ThemeToggle({ theme, toggle, compact = false }) {
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden transition
        ${compact ? 'h-9 w-9' : 'h-9 w-9 ml-1'}
        border text-paper-100/80 hover:text-accent-blue`}
      style={{ borderColor: 'var(--border-mid)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span key="m" initial={{ y: 14, opacity: 0, rotate: -45 }} animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 45 }} transition={{ duration: 0.25 }}>
            <Moon size={15} />
          </motion.span>
        ) : (
          <motion.span key="s" initial={{ y: 14, opacity: 0, rotate: -45 }} animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 45 }} transition={{ duration: 0.25 }}>
            <Sun size={15} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
