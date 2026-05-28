import { useEffect } from 'react';
import Lenis from 'lenis';
import Nav from './components/Nav.jsx';
import Cursor from './components/Cursor.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Terminal from './components/Terminal.jsx';
// import AIAssistant from './components/AIAssistant.jsx';     // hidden — PageIndex RAG (revive when needed)
// import CommandPalette from './components/CommandPalette.jsx'; // hidden — ⌘K agent prompt

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let raf;
    const tick = (t) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <div className="relative min-h-screen bg-aurora text-white selection:bg-neon-cyan/40">
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Terminal />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
        <Footer />
      </main>
      {/* <CommandPalette /> */}
      {/* <AIAssistant /> */}
    </div>
  );
}
