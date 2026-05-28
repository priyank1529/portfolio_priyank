import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${scrolled ? 'glass-strong' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <button onClick={() => go('hero')} className="flex items-center gap-2 group">
          <span className="relative inline-flex h-8 w-8 rounded-full bg-gradient-to-br from-neon-violet via-neon-blue to-neon-cyan shadow-glow" />
          <span className="font-display font-semibold tracking-tight text-white/90">priyank<span className="text-neon-cyan">.</span></span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)}
              className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition group">
              {l.label}
              <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition" />
            </button>
          ))}
          <a href="#contact" onClick={(e)=>{e.preventDefault();go('contact');}} className="ml-3 btn-primary text-sm py-2 px-5">Let's talk</a>
        </nav>

        <button className="md:hidden text-white/85" onClick={()=>setOpen((s)=>!s)} aria-label="Menu">
          {open ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} className="md:hidden glass-strong border-t border-white/10">
          <div className="px-6 py-4 grid gap-2">
            {links.map((l)=>(
              <button key={l.id} onClick={()=>go(l.id)} className="text-left py-2 text-white/80 hover:text-white">{l.label}</button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
