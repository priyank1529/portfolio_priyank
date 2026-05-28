import { profile } from '../lib/portfolioData';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full px-6 md:px-12 lg:px-24 py-14 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-gradient-to-br from-neon-violet via-neon-blue to-neon-cyan shadow-glow" />
          <span className="font-display text-white/85">{profile.name}</span>
        </div>
        <div className="text-xs font-mono text-white/40 uppercase tracking-[0.3em]">
          © {year} — built with React · R3F · Framer · GSAP · Supabase
        </div>
      </div>
    </footer>
  );
}
