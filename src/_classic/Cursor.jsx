import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let x = 0, y = 0, rx = 0, ry = 0;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    window.addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const enter = () => ring.current?.classList.add('scale-150', 'border-neon-cyan');
    const leave = () => ring.current?.classList.remove('scale-150', 'border-neon-cyan');
    document.querySelectorAll('a, button, [data-magnetic]').forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed top-0 left-0 z-[60] h-2 w-2 rounded-full bg-white mix-blend-difference" />
      <div ref={ring} className="pointer-events-none fixed top-0 left-0 z-[60] h-9 w-9 rounded-full border border-white/40 transition-[transform,border-color,scale] duration-200 mix-blend-difference" />
    </>
  );
}
