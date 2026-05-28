import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Copy, Check } from 'lucide-react';

const SNIPPET = `# hybrid_rag.py — production RAG over master data
from sentence_transformers import CrossEncoder
from langchain.retrievers import EnsembleRetriever
from sqlalchemy import text

reranker = CrossEncoder("BAAI/bge-reranker-large")

def hybrid_search(query: str, k: int = 24) -> list[Doc]:
    # 1) semantic — pgvector HNSW
    vec  = embed(query)
    sem  = db.execute(text("""
        SELECT id, content, 1 - (embedding <=> :v) AS score
        FROM chunks ORDER BY embedding <=> :v LIMIT :k
    """), {"v": vec, "k": k}).fetchall()

    # 2) lexical — PostgreSQL BM25
    bm25 = db.execute(text("""
        SELECT id, content, ts_rank_cd(tsv, plainto_tsquery(:q)) AS score
        FROM chunks WHERE tsv @@ plainto_tsquery(:q)
        ORDER BY score DESC LIMIT :k
    """), {"q": query, "k": k}).fetchall()

    # 3) Reciprocal Rank Fusion
    fused = rrf_merge(sem, bm25, k=60)

    # 4) cross-encoder rerank for precision
    pairs  = [(query, d.content) for d in fused]
    scores = reranker.predict(pairs)
    return [d for _, d in sorted(zip(scores, fused), reverse=True)][:8]
`;

const TOKENS = SNIPPET.split(/(\s+)/);

const colorize = (tok) => {
  if (/^(def|from|import|return|for|in|if|else|as|class|with|lambda|async|await)$/.test(tok)) return 'text-fuchsia-400';
  if (/^(self|None|True|False)$/.test(tok)) return 'text-amber-300';
  if (/^[A-Z][A-Za-z0-9_]*$/.test(tok)) return 'text-cyan-300';
  if (/^"[^"]*"$/.test(tok) || /^'[^']*'$/.test(tok)) return 'text-emerald-300';
  if (/^#.*/.test(tok)) return 'text-white/35 italic';
  if (/^\d+$/.test(tok)) return 'text-amber-300';
  return 'text-white/85';
};

function highlight(text) {
  const out = [];
  text.split('\n').forEach((line, li) => {
    if (line.trim().startsWith('#')) {
      out.push(<span key={`c${li}`} className="text-white/35 italic">{line}</span>);
    } else {
      line.split(/(\s+|[(),:\[\]=<>+\-*/.])/).forEach((tok, ti) => {
        if (!tok) return;
        out.push(<span key={`${li}-${ti}`} className={colorize(tok)}>{tok}</span>);
      });
    }
    out.push(<br key={`br${li}`} />);
  });
  return out;
}

export default function Terminal() {
  const [shown, setShown] = useState('');
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const i = useRef(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const tick = () => {
            if (i.current >= TOKENS.length) return;
            const step = TOKENS[i.current];
            setShown((s) => s + step);
            i.current += 1;
            const delay = /\n/.test(step) ? 28 : /\s/.test(step) ? 14 : 8;
            setTimeout(tick, delay + Math.random() * 8);
          };
          tick();
        }
      });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPET);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section ref={ref} className="relative section">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
          transition={{ duration: 0.8 }} className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-neon-cyan">// in the wild</div>
          <h2 className="h-display text-4xl md:text-5xl mt-4">This is what <span className="text-gradient">production GenAI</span> looks like.</h2>
          <p className="mt-5 text-white/65 leading-relaxed">
            Not a demo. The actual shape of a hybrid retrieval pass: vector + BM25 + Reciprocal Rank Fusion + cross-encoder rerank.
            Streamed token-by-token, the way the model would write it.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 max-w-sm">
            {[
              ['pgvector', 'HNSW · cosine'],
              ['BM25', 'tsvector · GIN'],
              ['RRF', 'k=60 fusion'],
              ['bge-reranker', 'cross-encoder'],
            ].map(([k,v]) => (
              <div key={k} className="glass rounded-2xl p-3">
                <div className="text-xs font-mono text-neon-cyan">{k}</div>
                <div className="text-xs text-white/55 mt-1">{v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, amount:0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-7">
          <div className="relative glass-strong rounded-2xl overflow-hidden shadow-glow">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-black/30">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 inline-flex items-center gap-2 text-xs font-mono text-white/55">
                  <TerminalIcon size={12} /> ~/adsales-rag · hybrid_rag.py
                </span>
              </div>
              <button onClick={copy} className="text-xs font-mono text-white/55 hover:text-white inline-flex items-center gap-1.5">
                {copied ? <><Check size={12}/> copied</> : <><Copy size={12}/> copy</>}
              </button>
            </div>

            <pre className="px-5 py-5 text-[12.5px] md:text-[13px] font-mono leading-relaxed overflow-x-auto whitespace-pre">
              {highlight(shown)}
              <span className="inline-block w-2 h-4 align-text-bottom bg-neon-cyan animate-pulse" />
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
