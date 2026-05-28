// Static fallback derived from Priyank Salot's resumes.
// Used when Supabase env is not configured; same shape as DB.

export const profile = {
  name: 'Priyank Salot',
  shortName: 'Priyank',
  role: 'AI/ML Engineer',
  tagline: 'I build production GenAI — hybrid RAG, multi-agent systems, and grounded LLM assistants that ship.',
  headline: 'Production GenAI · RAG · Multi-Agent · Python at scale',
  location: 'Ahmedabad, India',
  email: 'priyanksalot309@gmail.com',
  phone: '+91-6359168656',
  github: 'https://github.com/priyank1529',
  linkedin: 'https://linkedin.com/in/priyank-salot',
  bio: `AI/ML Engineer shipping Generative AI to production — hybrid RAG pipelines, multi-agent orchestration with CrewAI and LangGraph, LLM fine-tuning, and the Python backends that hold it all together. I care about latency, evaluation, and grounded answers — not demos.`,
  socialPreview: 'Priyank Salot — AI/ML Engineer · Production RAG, Multi-Agent Systems, LLM Fine-Tuning',
  stats: [
    { label: 'Production systems', value: '4' },
    { label: 'P95 RAG latency',    value: '<2s' },
    { label: 'Retrieval gain',     value: '85%' },
    { label: 'STT accuracy',       value: '92%' },
  ],
};

export const projects = [
  { slug:'adsales-rag-assistant', title:'AdSales Hybrid RAG Assistant', subtitle:'Production GenAI for an enterprise media client', description:'Architected a sub-2s, zero-hallucination Hybrid RAG assistant grounding ad-sales queries on 60+ master entities with full source citation.', long_description:'Hybrid retrieval: pgvector HNSW semantic + PostgreSQL BM25 fused via Reciprocal Rank Fusion and cross-encoder reranking. 3-tier conversation memory (Redis buffer, compressed summaries, pgvector episodic). LLM-as-Judge evaluation pipeline. Fine-tuned GPT-4o and Llama-3.1-8B-Instruct on editorial datasets. Integrated into Django MDM/AdSales backend.', tech_stack:['Python','Django','DRF','pgvector','LangChain','CrewAI','GPT-4o','Llama-3.1','Redis','Celery','bge-reranker'], category:'AI/ML', featured:true, metrics:{latency:'sub-2s P95', accuracy:'zero hallucination', scale:'60+ entities'} },
  { slug:'multi-agent-sql', title:'Multi-Agent SQL Query System', subtitle:'Natural-language DB access for non-technical users', description:'CrewAI orchestration with planner, generator, validator, and formatter agents. Read-only guardrails and schema-aware validation.', long_description:'Specialized agents: Schema Explorer, SQL Planner, Generator, Validator, Result Formatter. ReAct planner-executor pattern with prompt versioning and JSON-schema enforced outputs. Natural-language explanation accompanies every generated SQL for auditability.', tech_stack:['Python','CrewAI','LangChain','PostgreSQL','OpenAI','Prompt Engineering'], category:'AI/ML', featured:true, metrics:{efficiency:'+85% retrieval gain'} },
  { slug:'doc-intelligence-aws', title:'AI Document Intelligence on AWS', subtitle:'Serverless microservice for invoices, contracts, KYC', description:'FastAPI service on EC2 with S3-triggered Lambda extraction, AWS Bedrock summarization, and confidence-scored review queue.', long_description:'S3 upload triggers Lambda → text extraction → Bedrock Claude/Titan for entity extraction and classification → structured persistence in RDS. Per-field confidence scoring routes low-confidence outputs to human review. IAM least-privilege, CloudWatch alerting, JWT-protected endpoints, EC2 auto-scaling.', tech_stack:['Python','FastAPI','AWS Lambda','EC2','RDS','S3','AWS Bedrock','IAM','CloudWatch'], category:'AI/ML', featured:true, metrics:{deployment:'AWS serverless', models:'Claude + Titan'} },
  { slug:'llm-fine-tuning', title:'LLM Fine-Tuning Pipeline', subtitle:'GPT-4o + Llama-3.1-8B on editorial datasets', description:'Curated dataset, tokenization, validation-split, prompt-completion formatting, and post-generation validation with rule-based + semantic similarity scoring.', long_description:'Fine-tuned via OpenAI Fine-Tuning API (GPT-4o) and Ollama (Llama-3.1-8B-Instruct). Benchmarked closed vs open-source on quality, cost, latency, deployment flexibility. Gold-reference semantic similarity for regression detection.', tech_stack:['OpenAI Fine-Tuning API','Ollama','Llama-3.1','GPT-4o','sentence-transformers','Python'], category:'AI/ML', featured:true, metrics:{models:'GPT-4o + Llama-3.1-8B'} },
  { slug:'mdm-adsales-platform', title:'MDM + AdSales Enterprise Platform', subtitle:'Django master data and ad-sales backbone', description:'Centralized 60+ master entities, JWT + RBAC, rule-driven rate-card pricing, multi-level approval workflow, and SAP OData bidirectional sync.', long_description:'Configurable workflow engine with rule-based routing, multi-level approvals, send-for-correction, reprocess history, and geography mapping. Dynamic discount slabs and position-based ad pricing. HR SSO and hierarchical role-based location allocation. Bulk CSV migration commands.', tech_stack:['Python','Django','DRF','PostgreSQL','MySQL','Redis','Celery','SAP OData','Docker','GCP'], category:'Backend', featured:true, metrics:{entities:'60+', integration:'SAP OData'} },
  { slug:'industrial-forecasting', title:'Industrial Sensor Forecasting', subtitle:'XGBoost time-series for NOx emissions', description:'EDA on multi-sensor telemetry, lag and rolling features, grid-search tuned XGBoost with automated retraining on drift.', long_description:'Compared Random Forest, XGBoost, and LSTM — XGBoost selected on lowest RMSE with time-series CV. Live benchmarking dashboard for drift detection and threshold-triggered retraining loop.', tech_stack:['Python','Scikit-learn','XGBoost','Pandas','NumPy','Time Series CV','MLOps'], category:'AI/ML', featured:false, metrics:{site:'Billings Refinery'} },
  { slug:'atlas-property', title:'ATLAS Property Management Platform', subtitle:'Django real-estate platform with ML pricing', description:'JWT auth, RBAC, REST APIs, third-party ingestion pipelines, plus collaborative-filtering recommendations and Scikit-learn price prediction.', long_description:'Large-scale property platform with normalized PostgreSQL schemas, optimized indexing, migration scripts for third-party API ingestion, and admin workflows.', tech_stack:['Django','Python','PostgreSQL','Scikit-learn','REST APIs','JWT'], category:'Backend', featured:false, metrics:{} },
];

/* Skills use semantic tiers instead of numbers:
   core        — bedrock, used every day, multiple production systems
   production  — shipped in production at least once, comfortable
   proficient  — confident, used regularly but not daily
   exploring   — actively learning / occasional use
*/
export const skills = [
  // Backend
  { name:'Python',                category:'Backend', tier:'core' },
  { name:'Django',                category:'Backend', tier:'core' },
  { name:'Django REST Framework', category:'Backend', tier:'core' },
  { name:'FastAPI',               category:'Backend', tier:'production' },
  { name:'REST APIs',              category:'Backend', tier:'core' },

  // AI / ML
  { name:'LangChain',          category:'AI/ML', tier:'core' },
  { name:'LangGraph',          category:'AI/ML', tier:'production' },
  { name:'CrewAI',             category:'AI/ML', tier:'production' },
  { name:'RAG Pipelines',      category:'AI/ML', tier:'core' },
  { name:'LLM Fine-Tuning',    category:'AI/ML', tier:'production' },
  { name:'Ollama',             category:'AI/ML', tier:'production' },
  { name:'Prompt Engineering', category:'AI/ML', tier:'core' },
  { name:'Scikit-learn',       category:'AI/ML', tier:'production' },
  { name:'XGBoost',            category:'AI/ML', tier:'production' },
  { name:'Time Series',        category:'AI/ML', tier:'proficient' },

  // Data
  { name:'Pandas',       category:'Data', tier:'core' },
  { name:'NumPy',        category:'Data', tier:'production' },
  { name:'Apache Spark', category:'Data', tier:'exploring' },

  // Database (relational)
  { name:'PostgreSQL', category:'Database', tier:'core' },
  { name:'MySQL',      category:'Database', tier:'production' },
  { name:'Redis',      category:'Database', tier:'production' },

  // Vector Store
  { name:'pgvector', category:'Vector Store', tier:'core' },
  { name:'Qdrant',   category:'Vector Store', tier:'proficient' },
  { name:'Pinecone', category:'Vector Store', tier:'proficient' },
  { name:'FAISS',    category:'Vector Store', tier:'production' },

  // Cloud / DevOps
  { name:'AWS',         category:'Cloud/DevOps', tier:'production' },
  { name:'GCP',         category:'Cloud/DevOps', tier:'proficient' },
  { name:'Docker',      category:'Cloud/DevOps', tier:'production' },
  { name:'Celery',      category:'Cloud/DevOps', tier:'production' },
  { name:'AWS Bedrock', category:'Cloud/DevOps', tier:'production' },
  { name:'AWS Lambda',  category:'Cloud/DevOps', tier:'production' },
  { name:'MLOps',       category:'Cloud/DevOps', tier:'proficient' },
];

export const experiences = [
  { role:'Software Engineer (AI/ML)', company:'NeoSOFT', location:'Ahmedabad, India', start_date:'2024-06-01', end_date:null, current:true,
    summary:'Shipping production GenAI for an enterprise media client — hybrid RAG, multi-agent systems, LLM fine-tuning, and MDM/AdSales backbone.',
    highlights:['Architected production Hybrid RAG AdSales Assistant — sub-2s P95 latency, zero hallucination, full source citation','Built multi-agent SQL system with CrewAI — 85% retrieval efficiency gain','Fine-tuned GPT-4o and Llama-3.1-8B-Instruct on editorial datasets','Designed MDM platform for 60+ master entities with JWT, RBAC, workflow engine, SAP OData sync','Deployed FastAPI document-intelligence on AWS Lambda + Bedrock'],
    tech_stack:['Python','Django','FastAPI','pgvector','LangChain','CrewAI','GPT-4o','Llama-3.1','AWS','SAP OData'] },
  { role:'Python Developer', company:'Swan Softweb Solutions', location:'Ahmedabad, India', start_date:'2023-04-01', end_date:'2024-05-31', current:false,
    summary:'Led end-to-end development of the ATLAS property management platform with ML-driven pricing and recommendations.',
    highlights:['Built ATLAS platform with Django + JWT + RBAC','Shipped property price prediction (Scikit-learn) and collaborative filtering recommender','Designed normalized PostgreSQL schemas and high-volume ingestion pipelines'],
    tech_stack:['Django','Python','PostgreSQL','Scikit-learn','REST APIs','JWT'] },
  { role:'Python Intern', company:'Infolabz', location:'Ahmedabad, India', start_date:'2022-08-01', end_date:'2023-03-31', current:false,
    summary:'Built a Django e-commerce app and applied ML fundamentals for preprocessing and classification.',
    highlights:['Developed product, order, and auth modules','Applied Scikit-learn, Pandas, NumPy for EDA and basic classification/regression'],
    tech_stack:['Django','Python','Scikit-learn','Pandas','NumPy'] },
];

export const education = [
  { degree:'Master of Computer Applications (MCA)', school:'Gujarat Technological University', location:'Ahmedabad', period:'Aug 2023 — Apr 2025', detail:'CGPA 7.76' },
  { degree:'Bachelor of Computer Applications (BCA)', school:'Som-lalit Institute of Computer Application', location:'Ahmedabad', period:'Jul 2020 — Apr 2023', detail:null },
];

export const services = [
  { title:'Production RAG Systems', tagline:'Grounded, low-latency, zero-hallucination', description:'I design and ship hybrid retrieval pipelines that survive production — semantic + lexical fusion, cross-encoder reranking, evaluation harnesses, and source-cited answers.', icon:'database', bullets:['Hybrid retrieval (pgvector + BM25 + RRF)','Cross-encoder reranking','3-tier conversation memory','LLM-as-Judge evaluation','Sub-2s P95 latency'] },
  { title:'Multi-Agent Systems', tagline:'CrewAI · LangGraph · ReAct', description:'Specialized agents with planner-executor patterns, JSON-schema enforced outputs, tool calling, and auditable behavior — for SQL access, workflows, and operations.', icon:'workflow', bullets:['CrewAI / LangGraph orchestration','Read-only guardrails','Schema-aware validation','Prompt versioning'] },
  { title:'LLM Fine-Tuning', tagline:'Closed and open-source models', description:'Dataset curation, tokenization, validation pipelines, and benchmarking across GPT-4o, Llama-3.1, and Ollama — with semantic similarity scoring against gold references.', icon:'sparkles', bullets:['GPT-4o fine-tuning (OpenAI API)','Llama-3.1-8B on Ollama','Quality / cost / latency benchmarks','Post-generation validation'] },
  { title:'Python Backend Engineering', tagline:'Django · FastAPI · PostgreSQL', description:'Enterprise-grade Python services — REST APIs, async workers, RBAC, configurable workflow engines, and third-party integrations.', icon:'server', bullets:['Django + DRF / FastAPI','Hierarchical RBAC + JWT','Celery + Redis async','SAP / OData integrations'] },
  { title:'MLOps & Cloud Deployment', tagline:'AWS · GCP · Docker', description:'From model to production — Lambda, Bedrock, EC2 autoscaling, drift monitoring, and automated retraining loops.', icon:'cloud', bullets:['AWS Lambda + Bedrock','Drift detection + auto-retrain','Docker + CI/CD','GCP deployments'] },
  { title:'AI Consulting & Architecture', tagline:'From idea to shippable system', description:'I help teams pick the right model, retrieval strategy, evaluation framework, and deployment surface — without the GenAI hype tax.', icon:'compass', bullets:['Architecture reviews','Cost-aware model routing','Evaluation strategy','Production readiness audits'] },
];

export const bubbles = [
  { id:'about',      label:'About',      color:'#22d3ee', position:[-2.8,  1.4,  0.4] },
  { id:'skills',     label:'Skills',     color:'#8b5cf6', position:[ 2.6,  1.6, -0.2] },
  { id:'projects',   label:'Projects',   color:'#d946ef', position:[ 0.0, -1.2,  0.8], featured:true },
  { id:'experience', label:'Experience', color:'#3b82f6', position:[-2.4, -1.8, -0.4] },
  { id:'services',   label:'Services',   color:'#22d3ee', position:[ 2.8, -1.4,  0.6] },
  { id:'contact',    label:'Contact',    color:'#d946ef', position:[ 0.2,  2.4, -0.6] },
];
