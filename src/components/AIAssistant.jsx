import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Send, Sparkles, X, FolderTree, FileText, ChevronRight, Network } from 'lucide-react';
import { traverse, suggestions } from '../lib/aiKnowledge.js';

function streamAnswer(text, onTick, onDone) {
  const tokens = text.split(/(\s+)/);
  let i = 0;
  const tick = () => {
    if (i >= tokens.length) { onDone?.(); return; }
    onTick(tokens.slice(0, i + 1).join(''));
    i += 1;
    setTimeout(tick, 14 + Math.random() * 18);
  };
  tick();
}

function kindIcon(kind) {
  if (kind === 'leaf') return FileText;
  if (kind === 'fallback') return Network;
  return FolderTree;
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi — I'm a PageIndex-style RAG demo. No embeddings, no vector DB. I reason over Priyank's portfolio as a hierarchical TOC and walk to the relevant node. Ask anything.",
      path: [],
      done: true,
      init: true,
    },
  ]);
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  const ask = (q) => {
    if (!q.trim() || busy) return;
    setInput('');
    setBusy(true);

    const result = traverse(q);

    // Push user message + empty assistant message with progressive path reveal.
    setMessages((m) => [
      ...m,
      { role: 'user', text: q },
      { role: 'assistant', text: '', path: [], fullPath: result.path, done: false, init: false },
    ]);

    // Reveal path steps one by one, then stream the answer.
    let stepIdx = 0;
    const revealStep = () => {
      if (stepIdx >= result.path.length) {
        // path done — stream the answer
        streamAnswer(
          result.answer,
          (partial) => setMessages((m) => m.map((msg, i) => i === m.length - 1 ? { ...msg, text: partial } : msg)),
          () => {
            setMessages((m) => m.map((msg, i) => i === m.length - 1 ? { ...msg, done: true } : msg));
            setBusy(false);
          },
        );
        return;
      }
      stepIdx += 1;
      setMessages((m) => m.map((msg, i) => i === m.length - 1
        ? { ...msg, path: result.path.slice(0, stepIdx) }
        : msg));
      setTimeout(revealStep, 280);
    };
    setTimeout(revealStep, 200);
  };

  const submit = (e) => { e.preventDefault(); ask(input); };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-6 right-6 z-[70] group"
        aria-label="Open AI assistant"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-violet via-neon-blue to-neon-cyan blur-xl opacity-60 group-hover:opacity-100 transition" />
        <span className="relative h-14 w-14 rounded-full bg-gradient-to-br from-neon-violet via-neon-blue to-neon-cyan flex items-center justify-center text-white shadow-glow">
          <Bot size={22} />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-ink-950" />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed bottom-24 right-4 md:right-6 z-[70] w-[min(92vw,440px)] h-[min(76vh,600px)] glass-strong rounded-3xl overflow-hidden flex flex-col shadow-glow"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <span className="relative h-9 w-9 rounded-2xl bg-gradient-to-br from-neon-violet via-neon-blue to-neon-cyan inline-flex items-center justify-center">
                  <Sparkles size={16} />
                </span>
                <div>
                  <div className="font-display text-white/95 text-sm">PageIndex RAG</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> vectorless · reasoning trace
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/55 hover:text-white" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-br from-neon-violet/30 to-neon-blue/20 border border-white/10 text-white'
                      : 'bg-white/[0.04] border border-white/10 text-white/85'
                  }`}>
                    {/* reasoning trace */}
                    {m.role === 'assistant' && m.path && m.path.length > 0 && (
                      <div className="mb-2 pb-2 border-b border-white/5 space-y-1">
                        {m.path.map((step, idx) => {
                          const Icon = kindIcon(step.kind);
                          const isLast = idx === m.path.length - 1 && !m.done;
                          return (
                            <motion.div
                              key={step.id + idx}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.25 }}
                              className="flex items-center gap-1.5 text-[10px] font-mono text-white/55"
                              style={{ paddingLeft: idx * 8 }}
                            >
                              {idx > 0 && <ChevronRight size={10} className="text-white/30 -ml-1" />}
                              <Icon size={11} className={
                                step.kind === 'leaf'
                                  ? 'text-emerald-400'
                                  : step.kind === 'fallback'
                                    ? 'text-amber-300'
                                    : 'text-neon-cyan'
                              } />
                              <span className={step.kind === 'leaf' ? 'text-emerald-300' : 'text-white/70'}>
                                {step.title}
                              </span>
                              {isLast && (
                                <span className="inline-block w-1 h-2.5 align-text-bottom bg-neon-cyan animate-pulse" />
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    )}

                    {/* answer */}
                    {(m.text || m.init) && (
                      <p className="whitespace-pre-wrap">
                        {m.text}
                        {m.role === 'assistant' && !m.done && m.text && (
                          <span className="inline-block w-1.5 h-3.5 ml-0.5 align-text-bottom bg-neon-cyan animate-pulse" />
                        )}
                      </p>
                    )}

                    {/* final breadcrumb */}
                    {m.role === 'assistant' && m.done && m.path && m.path.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1 text-[10px] font-mono">
                        <span className="text-white/35">node:</span>
                        {m.path.map((step, idx) => (
                          <span key={step.id + 'b' + idx} className="flex items-center gap-1">
                            {idx > 0 && <span className="text-white/25">›</span>}
                            <span className={
                              idx === m.path.length - 1
                                ? 'px-1.5 py-0.5 rounded-full border border-emerald-400/40 text-emerald-300'
                                : 'text-white/55'
                            }>
                              {step.id}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {messages.length <= 1 && (
              <div className="px-5 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => ask(s)} className="chip hover:border-neon-cyan/50 text-left">
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={submit} className="p-3 border-t border-white/[0.08] flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={busy}
                placeholder="Ask — I walk the TOC to find the answer…"
                className="flex-1 bg-white/[0.04] border border-white/10 focus:border-neon-cyan/60 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/35 outline-none transition"
              />
              <button type="submit" disabled={busy || !input.trim()}
                className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-gradient-to-br from-neon-violet via-neon-blue to-neon-cyan text-white disabled:opacity-40">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
