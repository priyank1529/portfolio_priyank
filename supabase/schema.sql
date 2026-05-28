-- Priyank Salot Portfolio — Supabase schema
-- Run in Supabase SQL editor. Anon-key read; service-role write.

create extension if not exists "uuid-ossp";

create table if not exists public.projects (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  title         text not null,
  subtitle      text,
  description   text not null,
  long_description text,
  image_url     text,
  tech_stack    text[] not null default '{}',
  category      text default 'AI/ML',
  github_url    text,
  live_url      text,
  featured      boolean default false,
  metrics       jsonb default '{}'::jsonb,
  display_order int default 0,
  created_at    timestamptz default now()
);
create index if not exists projects_featured_idx on public.projects (featured desc, display_order asc);

create table if not exists public.skills (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  category     text not null check (category in ('Frontend','Backend','AI/ML','Databases','Cloud/DevOps','Tools')),
  level        int not null check (level between 0 and 100),
  icon         text,
  display_order int default 0,
  created_at   timestamptz default now()
);
create index if not exists skills_category_idx on public.skills (category, display_order);

create table if not exists public.experiences (
  id          uuid primary key default uuid_generate_v4(),
  role        text not null,
  company     text not null,
  location    text,
  start_date  date not null,
  end_date    date,
  current     boolean default false,
  summary     text,
  highlights  text[] default '{}',
  tech_stack  text[] default '{}',
  created_at  timestamptz default now()
);
create index if not exists experiences_date_idx on public.experiences (start_date desc);

create table if not exists public.services (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  tagline      text,
  description  text not null,
  icon         text,
  bullets      text[] default '{}',
  display_order int default 0,
  created_at   timestamptz default now()
);

create table if not exists public.contact_messages (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text not null,
  subject    text,
  message    text not null,
  source     text default 'portfolio',
  read       boolean default false,
  created_at timestamptz default now()
);

alter table public.projects          enable row level security;
alter table public.skills            enable row level security;
alter table public.experiences       enable row level security;
alter table public.services          enable row level security;
alter table public.contact_messages  enable row level security;

create policy "public read projects"     on public.projects     for select using (true);
create policy "public read skills"       on public.skills       for select using (true);
create policy "public read experiences"  on public.experiences  for select using (true);
create policy "public read services"     on public.services     for select using (true);
create policy "anon insert messages"     on public.contact_messages for insert with check (true);

insert into public.projects (slug, title, subtitle, description, long_description, tech_stack, category, featured, metrics, display_order) values
('adsales-rag-assistant','AdSales Hybrid RAG Assistant','Production GenAI for an enterprise media client','Architected a sub-2s, zero-hallucination Hybrid RAG assistant grounding ad-sales queries on 60+ master entities with full source citation.','Hybrid retrieval: pgvector HNSW semantic + PostgreSQL BM25 fused via Reciprocal Rank Fusion and cross-encoder reranking. 3-tier conversation memory. LLM-as-Judge evaluation. Fine-tuned GPT-4o and Llama-3.1-8B-Instruct.',ARRAY['Python','Django','DRF','pgvector','LangChain','CrewAI','GPT-4o','Llama-3.1','Redis','Celery','bge-reranker'],'AI/ML',true,'{"latency":"sub-2s P95","accuracy":"zero hallucination","scale":"60+ entities"}'::jsonb,1),
('multi-agent-sql','Multi-Agent SQL Query System','Natural-language DB access for non-technical users','CrewAI orchestration with planner, generator, validator, and formatter agents.','Specialized agents: Schema Explorer, SQL Planner, Generator, Validator, Result Formatter. ReAct planner-executor pattern with prompt versioning and JSON-schema enforced outputs.',ARRAY['Python','CrewAI','LangChain','PostgreSQL','OpenAI','Prompt Engineering'],'AI/ML',true,'{"efficiency":"+85% retrieval gain"}'::jsonb,2),
('doc-intelligence-aws','AI Document Intelligence on AWS','Serverless microservice for invoices, contracts, KYC','FastAPI service on EC2 with S3-triggered Lambda extraction, AWS Bedrock summarization, confidence-scored review queue.','S3 → Lambda → Bedrock Claude/Titan → RDS. Per-field confidence routes low-confidence outputs to human review. IAM least-privilege, CloudWatch, JWT, EC2 auto-scaling.',ARRAY['Python','FastAPI','AWS Lambda','EC2','RDS','S3','AWS Bedrock','IAM','CloudWatch'],'AI/ML',true,'{"deployment":"AWS serverless","models":"Claude + Titan"}'::jsonb,3),
('llm-fine-tuning','LLM Fine-Tuning Pipeline','GPT-4o + Llama-3.1-8B on editorial datasets','Curated dataset, tokenization, validation-split, prompt-completion formatting, post-generation validation.','Fine-tuned via OpenAI Fine-Tuning API (GPT-4o) and Ollama (Llama-3.1-8B-Instruct). Benchmarked closed vs open-source on quality, cost, latency, and deployment flexibility.',ARRAY['OpenAI Fine-Tuning API','Ollama','Llama-3.1','GPT-4o','sentence-transformers','Python'],'AI/ML',true,'{"models":"GPT-4o + Llama-3.1-8B"}'::jsonb,4),
('mdm-adsales-platform','MDM + AdSales Enterprise Platform','Django master data and ad-sales backbone','Centralized 60+ master entities, JWT + RBAC, rule-driven rate-card pricing, multi-level approval workflow, SAP OData bidirectional sync.','Configurable workflow engine with rule-based routing, multi-level approvals, send-for-correction, reprocess history, geography mapping. Dynamic discount slabs and position-based ad pricing. HR SSO and hierarchical role-based location allocation.',ARRAY['Python','Django','DRF','PostgreSQL','MySQL','Redis','Celery','SAP OData','Docker','GCP'],'Backend',true,'{"entities":"60+","integration":"SAP OData"}'::jsonb,5),
('industrial-forecasting','Industrial Sensor Forecasting','XGBoost time-series for NOx emissions','EDA on multi-sensor telemetry, engineered lag and rolling features, grid-search tuned XGBoost with automated retraining on drift.','Compared Random Forest, XGBoost, and LSTM — XGBoost selected on lowest RMSE with time-series CV. Live benchmarking dashboard for drift detection and threshold-triggered retraining loop.',ARRAY['Python','Scikit-learn','XGBoost','Pandas','NumPy','Time Series CV','MLOps'],'AI/ML',false,'{"site":"Billings Refinery"}'::jsonb,6),
('atlas-property','ATLAS Property Management Platform','Django real-estate platform with ML pricing','JWT auth, RBAC, REST APIs, third-party ingestion pipelines, plus collaborative-filtering recommendations and Scikit-learn price prediction.','Large-scale property platform with normalized PostgreSQL schemas, optimized indexing, migration scripts for third-party API ingestion, and admin workflows.',ARRAY['Django','Python','PostgreSQL','Scikit-learn','REST APIs','JWT'],'Backend',false,'{}'::jsonb,7);

insert into public.skills (name, category, level, display_order) values
('Python','Backend',95,1),('Django','Backend',95,2),('Django REST Framework','Backend',92,3),('FastAPI','Backend',90,4),('REST APIs','Backend',95,5),
('LangChain','AI/ML',92,10),('CrewAI','AI/ML',90,11),('RAG Pipelines','AI/ML',95,12),('LLM Fine-Tuning','AI/ML',88,13),('GPT-4o','AI/ML',90,14),('Llama-3.1','AI/ML',88,15),('Ollama','AI/ML',85,16),('Prompt Engineering','AI/ML',92,17),('Scikit-learn','AI/ML',88,18),('XGBoost','AI/ML',85,19),('Time Series','AI/ML',80,20),
('PostgreSQL','Databases',92,30),('MySQL','Databases',85,31),('Redis','Databases',85,32),('pgvector','Databases',92,33),('Qdrant','Databases',80,34),('Pinecone','Databases',78,35),('FAISS','Databases',82,36),
('AWS','Cloud/DevOps',85,40),('GCP','Cloud/DevOps',78,41),('Docker','Cloud/DevOps',85,42),('Celery','Cloud/DevOps',85,43),('AWS Bedrock','Cloud/DevOps',82,44),('AWS Lambda','Cloud/DevOps',82,45),('MLOps','Cloud/DevOps',78,46),
('SAP OData','Tools',80,50);

insert into public.experiences (role, company, location, start_date, end_date, current, summary, highlights, tech_stack) values
('Software Engineer (AI/ML)','NeoSOFT','Ahmedabad, India','2024-06-01',null,true,'Shipping production GenAI for an enterprise media client — hybrid RAG, multi-agent systems, LLM fine-tuning, and MDM/AdSales backbone.',ARRAY['Architected production Hybrid RAG AdSales Assistant — sub-2s P95 latency, zero hallucination','Built multi-agent SQL system with CrewAI — 85% retrieval efficiency gain','Fine-tuned GPT-4o and Llama-3.1-8B-Instruct on editorial datasets','Designed MDM platform for 60+ entities with JWT, RBAC, workflow engine, SAP OData sync','Deployed FastAPI document-intelligence on AWS Lambda + Bedrock'],ARRAY['Python','Django','FastAPI','pgvector','LangChain','CrewAI','GPT-4o','Llama-3.1','AWS','SAP OData']),
('Python Developer','Swan Softweb Solutions','Ahmedabad, India','2023-04-01','2024-05-31',false,'Led end-to-end development of the ATLAS property management platform with ML-driven pricing and recommendations.',ARRAY['Built ATLAS platform with Django + JWT + RBAC','Shipped property price prediction (Scikit-learn) and collaborative filtering recommender','Designed normalized PostgreSQL schemas and high-volume ingestion pipelines'],ARRAY['Django','Python','PostgreSQL','Scikit-learn','REST APIs','JWT']),
('Python Intern','Infolabz','Ahmedabad, India','2022-08-01','2023-03-31',false,'Built a Django e-commerce app and applied ML fundamentals.',ARRAY['Developed product, order, and auth modules','Applied Scikit-learn, Pandas, NumPy for EDA and basic classification/regression'],ARRAY['Django','Python','Scikit-learn','Pandas','NumPy']);

insert into public.services (title, tagline, description, icon, bullets, display_order) values
('Production RAG Systems','Grounded, low-latency, zero-hallucination','I design and ship hybrid retrieval pipelines that actually survive production — semantic + lexical fusion, cross-encoder reranking, evaluation harnesses, and source-cited answers.','database',ARRAY['Hybrid retrieval (pgvector + BM25 + RRF)','Cross-encoder reranking','3-tier conversation memory','LLM-as-Judge evaluation','Sub-2s P95 latency'],1),
('Multi-Agent Systems','CrewAI · LangGraph · ReAct','Specialized agents with planner-executor patterns, JSON-schema enforced outputs, tool calling, and auditable behavior.','workflow',ARRAY['CrewAI / LangGraph orchestration','Read-only guardrails','Schema-aware validation','Prompt versioning'],2),
('LLM Fine-Tuning','Closed and open-source models','Dataset curation, tokenization, validation pipelines, and benchmarking across GPT-4o, Llama-3.1, and Ollama.','sparkles',ARRAY['GPT-4o fine-tuning (OpenAI API)','Llama-3.1-8B on Ollama','Quality / cost / latency benchmarks','Post-generation validation'],3),
('Python Backend Engineering','Django · FastAPI · PostgreSQL','Enterprise-grade Python services — REST APIs, async workers, RBAC, configurable workflow engines, and third-party integrations.','server',ARRAY['Django + DRF / FastAPI','Hierarchical RBAC + JWT','Celery + Redis async','SAP / OData integrations'],4),
('MLOps & Cloud Deployment','AWS · GCP · Docker','From model to production — Lambda, Bedrock, EC2 autoscaling, drift monitoring, and automated retraining loops.','cloud',ARRAY['AWS Lambda + Bedrock','Drift detection + auto-retrain','Docker + CI/CD','GCP deployments'],5),
('AI Consulting & Architecture','From idea to shippable system','I help teams pick the right model, retrieval strategy, evaluation framework, and deployment surface.','compass',ARRAY['Architecture reviews','Cost-aware model routing','Evaluation strategy','Production readiness audits'],6);
