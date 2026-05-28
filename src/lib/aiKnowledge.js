// PageIndex-style vectorless knowledge tree for the on-page RAG demo.
// Idea: no embeddings, no vector DB. Document split into hierarchical TOC.
// Retrieval = LLM-style reasoning that walks root → branch → leaf.
// Here the "LLM reasoning" is mocked as keyword-overlap scoring so it stays
// snappy in-browser, while the visible traversal path (root › Projects › RAG)
// is the real PageIndex storyline.

export const tree = {
  id: 'root',
  title: 'Portfolio index',
  keywords: [],
  children: [
    {
      id: 'identity',
      title: 'Identity',
      keywords: ['who', 'priyank', 'about', 'intro', 'you', 'yourself', 'background', 'profile'],
      children: [
        {
          id: 'identity.bio',
          title: 'Bio',
          keywords: ['who', 'about', 'intro', 'priyank', 'yourself', 'background'],
          content:
            "I'm Priyank Salot — AI/ML Engineer in Ahmedabad, India. 3+ years shipping production GenAI: hybrid RAG, multi-agent orchestration, LLM fine-tuning, and the Python backends underneath. Latency, evaluation, and grounding are the parts I obsess over.",
        },
        {
          id: 'identity.contact',
          title: 'Contact',
          keywords: ['contact', 'email', 'hire', 'available', 'reach', 'talk', 'phone'],
          content:
            "Available for international clients and full-time roles. Email priyanksalot309@gmail.com or scroll to the Contact section. Response within 24 hours.",
        },
      ],
    },
    {
      id: 'projects',
      title: 'Projects',
      keywords: ['project', 'projects', 'built', 'work', 'shipped', 'case', 'example', 'portfolio'],
      children: [
        {
          id: 'projects.rag',
          title: 'Production RAG',
          keywords: ['rag', 'retrieval', 'hybrid', 'pgvector', 'reranker', 'bm25', 'adsales', 'semantic', 'lexical', 'fusion', 'rrf'],
          content:
            "Production Hybrid RAG assistant for an enterprise media client. pgvector HNSW semantic + PostgreSQL BM25 lexical, fused with Reciprocal Rank Fusion and reranked by a bge cross-encoder. Sub-2s P95 latency, zero hallucination, full source citation. 3-tier memory: Redis buffer, compressed summaries, pgvector episodic.",
        },
        {
          id: 'projects.agents',
          title: 'Multi-Agent SQL',
          keywords: ['agent', 'agents', 'crewai', 'multi-agent', 'multiagent', 'sql', 'natural', 'language', 'db', 'database', 'react', 'planner'],
          content:
            "Multi-Agent SQL system with CrewAI. Specialized agents: Schema Explorer, SQL Planner, Generator, Validator, Result Formatter. ReAct planner-executor pattern, JSON-schema enforced outputs, read-only guardrails, row-limit injection. 85% retrieval efficiency gain for non-technical users.",
        },
        {
          id: 'projects.finetune',
          title: 'LLM Fine-Tuning',
          keywords: ['fine', 'tune', 'tuning', 'gpt', 'gpt-4o', 'llama', 'ollama', 'editorial', 'training', 'dataset'],
          content:
            "Fine-tuned GPT-4o (OpenAI API) and Llama-3.1-8B-Instruct (Ollama) on curated editorial datasets. Tokenization + validation-split + prompt-completion pipeline. Benchmarked closed vs open-source on quality, cost, latency, deployment flexibility. Post-gen validation with rule-based style checks + semantic similarity vs gold references.",
        },
        {
          id: 'projects.cloud',
          title: 'AWS Document Intelligence',
          keywords: ['aws', 'cloud', 'lambda', 'bedrock', 's3', 'document', 'serverless', 'rds', 'ec2', 'fastapi', 'kyc', 'invoice'],
          content:
            "FastAPI document-intelligence on AWS. S3 upload → Lambda → text extraction → Bedrock (Claude / Titan) → RDS PostgreSQL. Per-field confidence routes low-confidence outputs to human review. IAM least-privilege, CloudWatch alerts, JWT-protected endpoints, EC2 auto-scaling.",
        },
        {
          id: 'projects.backend',
          title: 'MDM AdSales Platform',
          keywords: ['django', 'backend', 'mdm', 'sap', 'platform', 'master', 'data', 'odata', 'workflow', 'rbac', 'jwt', 'rate'],
          content:
            "Django MDM/AdSales platform for an enterprise media client. 60+ master entities, JWT auth, hierarchical RBAC, configurable workflow engine, rule-driven rate-card pricing, SAP OData bidirectional sync, Celery + Redis async, bulk CSV migration.",
        },
        {
          id: 'projects.ml',
          title: 'XGBoost Forecasting',
          keywords: ['forecast', 'forecasting', 'xgboost', 'timeseries', 'time-series', 'industrial', 'sensor', 'nox', 'drift', 'retraining', 'refinery'],
          content:
            "XGBoost time-series forecasting for NOx emissions at Billings Refinery. EDA on multi-sensor telemetry, lag and rolling features, grid-search tuning with time-series CV. Compared RF / XGBoost / LSTM — XGBoost won on RMSE. Live drift detection + automated retraining on threshold breach.",
        },
        {
          id: 'projects.property',
          title: 'ATLAS Property Platform',
          keywords: ['atlas', 'property', 'real', 'estate', 'recommender', 'collaborative', 'filtering', 'price', 'prediction'],
          content:
            "ATLAS property management platform built at Swan Softweb. Django + JWT + RBAC, REST APIs, normalized PostgreSQL schemas, third-party API ingestion pipelines. Scikit-learn property price prediction + collaborative filtering recommender integrated into platform API.",
        },
      ],
    },
    {
      id: 'stack',
      title: 'Stack',
      keywords: ['stack', 'skill', 'skills', 'tech', 'technology', 'tool', 'tools', 'language', 'framework', 'libraries'],
      children: [
        {
          id: 'stack.ai',
          title: 'AI / ML',
          keywords: ['ai', 'ml', 'llm', 'genai', 'langchain', 'crewai', 'prompt', 'embedding'],
          content:
            "AI/ML: LangChain · CrewAI · RAG Pipelines · LLM Fine-Tuning · GPT-4o · Llama-3.1 · Ollama · Prompt Engineering · Scikit-learn · XGBoost · Time Series Forecasting · sentence-transformers · bge-reranker.",
        },
        {
          id: 'stack.backend',
          title: 'Backend',
          keywords: ['python', 'django', 'fastapi', 'drf', 'rest', 'api', 'celery', 'backend'],
          content:
            "Backend: Python · Django · Django REST Framework · FastAPI · REST APIs · Celery + Redis async · JWT · hierarchical RBAC · configurable workflow engines · SAP OData.",
        },
        {
          id: 'stack.data',
          title: 'Databases & Vector Stores',
          keywords: ['postgres', 'postgresql', 'mysql', 'redis', 'pgvector', 'qdrant', 'pinecone', 'faiss', 'vector', 'database'],
          content:
            "Databases: PostgreSQL · MySQL · Redis. Vector stores: pgvector (HNSW) · Qdrant · Pinecone · FAISS. Indexing strategies: HNSW, GIN tsvector, partial + composite indexes for high-volume ingestion.",
        },
        {
          id: 'stack.cloud',
          title: 'Cloud & MLOps',
          keywords: ['aws', 'gcp', 'docker', 'mlops', 'bedrock', 'lambda', 'ec2', 's3', 'cloud', 'devops', 'ci'],
          content:
            "Cloud / MLOps: AWS (Lambda, EC2, RDS, S3, Bedrock, CloudWatch, IAM) · GCP · Docker · Celery · MLOps drift detection + automated retraining loops.",
        },
      ],
    },
    {
      id: 'experience',
      title: 'Experience',
      keywords: ['experience', 'work', 'history', 'company', 'neosoft', 'swan', 'infolabz', 'role', 'job', 'career'],
      content:
        "Software Engineer (AI/ML) at NeoSOFT since Jun 2024 — production GenAI for an enterprise media client. Before: Python Developer at Swan Softweb (ATLAS platform with ML pricing + recommender). Started as Python Intern at Infolabz.",
    },
    {
      id: 'services',
      title: 'Services',
      keywords: ['service', 'services', 'offer', 'help', 'consult', 'engagement', 'hire', 'build'],
      content:
        "Six service tracks: Production RAG Systems · Multi-Agent Systems · LLM Fine-Tuning · Python Backend Engineering · MLOps & Cloud Deployment · AI Consulting & Architecture. Engagements scoped from architecture review to full GenAI build-out.",
    },
    {
      id: 'metrics',
      title: 'Metrics',
      keywords: ['metric', 'metrics', 'number', 'numbers', 'stat', 'stats', 'result', 'results', 'impact', 'latency', 'accuracy', 'efficiency'],
      content:
        "Sub-2s P95 RAG latency · zero hallucination · +85% retrieval efficiency · 60% proposal turnaround reduction · 92% transcription accuracy · 60+ master entities served. Numbers from shipped systems, not demos.",
    },
    {
      id: 'method',
      title: 'How I work',
      keywords: ['how', 'method', 'approach', 'process', 'workflow', 'evaluation', 'eval', 'judge', 'memory'],
      content:
        "Eval-first. LLM-as-Judge async pipeline for drift / hallucination / regression. 3-tier memory (Redis · summary · episodic). Prompt versioning + JSON-schema enforced tool outputs. Cost-aware model routing — small model for cheap calls, big model only when needed. Ship behind feature flags.",
    },
  ],
};

/* ---------------- traversal ---------------- */

function score(node, q) {
  if (!node.keywords || !node.keywords.length) return 0;
  let s = 0;
  for (const k of node.keywords) if (q.includes(k)) s += 1;
  return s;
}

/**
 * PageIndex-style walk: root → best child → ... → leaf with content.
 * Returns { path:[{id,title,kind,reason}], answer, hit }.
 */
export function traverse(query) {
  const q = String(query || '').toLowerCase();
  const path = [{ id: tree.id, title: tree.title, kind: 'open', reason: 'load root TOC' }];

  let cur = tree;
  const safety = 6;
  let depth = 0;

  while (cur.children && cur.children.length && depth < safety) {
    let best = null;
    let bestScore = 0;
    for (const c of cur.children) {
      const s = score(c, q);
      if (s > bestScore) { best = c; bestScore = s; }
    }
    if (!best) break;
    path.push({
      id: best.id,
      title: best.title,
      kind: best.children ? 'branch' : 'leaf',
      reason: `score(${best.title}) = ${bestScore} · best child`,
    });
    cur = best;
    depth += 1;
  }

  if (cur && cur.content) {
    return { path, answer: cur.content, hit: true };
  }

  const fallback = tree.children.find((c) => c.id === 'identity')?.children?.find((c) => c.id === 'identity.bio');
  return {
    path: [...path, { id: 'fallback', title: 'Fallback → Identity / Bio', kind: 'fallback', reason: 'no scoring child — return root overview' }],
    answer: fallback?.content || 'No matching node. Try asking about RAG, agents, fine-tuning, AWS, or contact.',
    hit: false,
  };
}

export const suggestions = [
  'What is your RAG architecture?',
  'How do you fine-tune LLMs?',
  'Show me your AWS deployment',
  'What is your tech stack?',
  'How do you work?',
];
