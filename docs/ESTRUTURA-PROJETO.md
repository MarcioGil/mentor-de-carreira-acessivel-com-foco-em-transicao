# 📁 ESTRUTURA COMPLETA DO PROJETO

## 🎯 **Visão Geral da Arquitetura**

Este projeto segue uma **arquitetura fullstack moderna** com separação clara de responsabilidades, otimizada para **escalabilidade**, **manutenibilidade** e **performance mobile**.

```text
mentor-de-carreira-acessivel-com-foco-em-transicao/
├── 📱 frontend/                 # Interface mobile-first (Next.js 14)
├── 🔧 backend/                  # API e lógica de negócio (FastAPI)
├── 🗄️ database/                 # Esquemas e migrações (PostgreSQL)
├── 🧠 ai-components/            # Motor de IA e RAG
├── 📚 docs/                     # Documentação técnica
├── 🎨 assets/                   # Recursos visuais
├── 🔐 .env.example             # Variáveis de ambiente
├── 🐳 docker-compose.yml       # Orquestração de containers
├── 📋 README.md                # Visão geral do projeto
└── 📄 .gitignore               # Arquivos ignorados pelo Git
```

---

## 📱 **FRONTEND/ - Interface Mobile-First**

```text
frontend/
├── 🏗️ src/
│   ├── 📱 app/                     # Next.js 14 App Router
│   │   ├── 🏠 (dashboard)/         # Grupo de rotas principais
│   │   │   ├── 📊 page.tsx         # Dashboard principal
│   │   │   ├── 📝 analyze/         # Analisador de currículo
│   │   │   │   ├── page.tsx        # Interface de análise
│   │   │   │   └── loading.tsx     # Loading state
│   │   │   ├── 🎤 interview/       # Simulador de entrevista
│   │   │   │   ├── page.tsx        # Interface de simulação
│   │   │   │   └── components/     # Componentes específicos
│   │   │   ├── 💬 chat/            # Chat com mentor IA
│   │   │   │   ├── page.tsx        # Interface de chat
│   │   │   │   └── hooks/          # Hooks do chat
│   │   │   └── 👤 profile/         # Perfil do usuário
│   │   │       ├── page.tsx        # Configurações do perfil
│   │   │       └── settings/       # Configurações detalhadas
│   │   ├── 🔐 auth/                # Autenticação
│   │   │   ├── login/              # Página de login
│   │   │   └── register/           # Página de registro
│   │   ├── 🌐 globals.css          # Estilos globais mobile-first
│   │   ├── 📱 layout.tsx           # Layout principal responsivo
│   │   └── 🔄 loading.tsx          # Loading global
│   ├── 🧩 components/              # Componentes reutilizáveis
│   │   ├── 📱 mobile/              # Componentes específicos mobile
│   │   │   ├── MobileLayout.tsx    # Layout otimizado para mobile
│   │   │   ├── BottomNav.tsx       # Navegação inferior
│   │   │   ├── VoiceButton.tsx     # Botão central de voz
│   │   │   └── MobileChat.tsx      # Chat otimizado mobile
│   │   ├── 🎙️ voice/               # Componentes de comandos de voz
│   │   │   ├── VoiceControl.tsx    # Controle principal de voz
│   │   │   ├── VoiceCommands.tsx   # Lista de comandos
│   │   │   └── NoiseFilter.tsx     # Filtro anti-ruído
│   │   ├── 🎨 ui/                  # Componentes base de UI
│   │   │   ├── Button.tsx          # Botão customizado
│   │   │   ├── Input.tsx           # Input acessível
│   │   │   ├── Modal.tsx           # Modal responsivo
│   │   │   └── Skeleton.tsx        # Loading skeletons
│   │   └── 📊 analytics/           # Componentes de métricas
│   │       ├── MetricsTracker.tsx  # Rastreamento de uso
│   │       └── PerformanceMonitor.tsx # Monitor de performance
│   ├── 🎣 hooks/                   # Custom hooks
│   │   ├── 🎙️ useVoiceCommands.ts  # Comandos de voz
│   │   ├── 📶 useOfflineMode.ts    # Modo offline
│   │   ├── 📱 useMobileOptimized.ts # Otimizações mobile
│   │   ├── 🔐 useAuth.ts           # Autenticação
│   │   └── 💾 useLocalStorage.ts   # Persistência local
│   ├── 📚 lib/                     # Utilitários e configurações
│   │   ├── 🎙️ voiceEngine.ts       # Motor de comandos de voz
│   │   ├── 💾 mobileCache.ts       # Cache para mobile
│   │   ├── 📡 api.ts               # Cliente da API
│   │   ├── 🔧 utils.ts             # Funções utilitárias
│   │   └── 📊 analytics.ts         # Analytics tracking
│   ├── 🎨 styles/                  # Estilos customizados
│   │   ├── 📱 mobile.css           # Estilos específicos mobile
│   │   ├── 🎙️ voice.css            # Estilos para comandos de voz
│   │   └── 🌗 themes.css           # Temas (claro/escuro)
│   └── 🔧 types/                   # Definições TypeScript
│       ├── 🎙️ voice.ts             # Tipos para comandos de voz
│       ├── 📊 analytics.ts         # Tipos para métricas
│       └── 🔐 auth.ts              # Tipos de autenticação
├── 🌐 public/                      # Assets estáticos
│   ├── 📱 icons/                   # Ícones PWA
│   │   ├── icon-192x192.png        # Ícone médio
│   │   ├── icon-512x512.png        # Ícone grande
│   │   └── favicon.ico             # Favicon
│   ├── 📄 manifest.json            # Manifest PWA
│   ├── 👷 sw.js                    # Service Worker
│   └── 🎨 images/                  # Imagens otimizadas
├── 📋 package.json                 # Dependências e scripts
├── 🔧 next.config.js               # Configuração Next.js + PWA
├── 🎨 tailwind.config.js           # Configuração TailwindCSS
├── 📝 tsconfig.json                # Configuração TypeScript
└── 📖 README.md                    # Documentação do frontend
```

### **🎯 Explicação do Frontend:**

- **📱 Mobile-First**: Toda interface pensada primeiro para mobile
- **🎙️ Voice Commands**: Comandos de voz nativos em todos os componentes
- **⚡ PWA**: Progressive Web App para funcionar offline
- **🎨 Acessibilidade**: WCAG 2.1 AA compliance em todos os componentes
- **📊 Analytics**: Tracking de uso para melhorar UX

---

## 🔧 **BACKEND/ - API e Lógica de Negócio**

```text
backend/
├── 🏗️ app/
│   ├── 🔗 api/                     # Endpoints da API REST
│   │   ├── 📊 v1/                  # Versão 1 da API
│   │   │   ├── 🔐 auth/            # Autenticação e autorização
│   │   │   │   ├── login.py        # Endpoint de login
│   │   │   │   ├── register.py     # Endpoint de registro
│   │   │   │   └── refresh.py      # Refresh de tokens
│   │   │   ├── 📝 analysis/        # Análise de currículos
│   │   │   │   ├── cv_analyzer.py  # Endpoint principal
│   │   │   │   ├── job_matcher.py  # Matching com vagas
│   │   │   │   └── reports.py      # Relatórios detalhados
│   │   │   ├── 🎤 interview/       # Simulação de entrevistas
│   │   │   │   ├── simulator.py    # Simulador principal
│   │   │   │   ├── questions.py    # Geração de perguntas
│   │   │   │   └── feedback.py     # Feedback automático
│   │   │   ├── 💬 chat/            # Chat com mentor IA
│   │   │   │   ├── mentor.py       # Endpoint do mentor
│   │   │   │   ├── history.py      # Histórico de conversas
│   │   │   │   └── context.py      # Gerenciamento de contexto
│   │   │   ├── 👤 users/           # Gestão de usuários
│   │   │   │   ├── profile.py      # Perfil do usuário
│   │   │   │   ├── preferences.py  # Preferências e configurações
│   │   │   │   └── analytics.py    # Analytics do usuário
│   │   │   └── 📊 metrics/         # Métricas e monitoramento
│   │   │       ├── health.py       # Health checks
│   │   │       ├── performance.py  # Métricas de performance
│   │   │       └── usage.py        # Métricas de uso
│   │   └── 🔧 deps.py              # Dependências comuns
│   ├── 🧠 ai_engine/               # Motor de IA e RAG
│   │   ├── 🔍 rag/                 # Retrieval-Augmented Generation
│   │   │   ├── retriever.py        # Busca semântica
│   │   │   ├── generator.py        # Geração de respostas
│   │   │   ├── embeddings.py       # Processamento de embeddings
│   │   │   └── context_manager.py  # Gerenciamento de contexto
│   │   ├── 🎭 personas/            # Diferentes personas da IA
│   │   │   ├── career_mentor.py    # Mentor de carreira
│   │   │   ├── hr_specialist.py    # Especialista em RH
│   │   │   ├── tech_recruiter.py   # Recrutador técnico
│   │   │   └── interview_coach.py  # Coach de entrevistas
│   │   ├── 🔧 prompts/             # Templates de prompts
│   │   │   ├── analysis_prompts.py # Prompts para análise
│   │   │   ├── interview_prompts.py # Prompts para entrevistas
│   │   │   └── chat_prompts.py     # Prompts para chat
│   │   └── 🎯 evaluators/          # Avaliação de qualidade
│   │       ├── response_quality.py # Qualidade das respostas
│   │       ├── relevance_scorer.py # Score de relevância
│   │       └── bias_detector.py    # Detector de viés
│   ├── 🗄️ models/                  # Modelos de dados (SQLAlchemy)
│   │   ├── 👤 user.py              # Modelo de usuário
│   │   ├── 📝 analysis.py          # Modelo de análise
│   │   ├── 🎤 interview.py         # Modelo de entrevista
│   │   ├── 💬 conversation.py      # Modelo de conversa
│   │   └── 📊 metrics.py           # Modelo de métricas
│   ├── 🔧 services/                # Lógica de negócio
│   │   ├── 📝 cv_service.py        # Serviço de análise de CV
│   │   ├── 🎤 interview_service.py # Serviço de entrevistas
│   │   ├── 💬 chat_service.py      # Serviço de chat
│   │   ├── 👤 user_service.py      # Serviço de usuários
│   │   ├── 🔐 auth_service.py      # Serviço de autenticação
│   │   └── 📊 analytics_service.py # Serviço de analytics
│   ├── 🛠️ utils/                   # Utilitários
│   │   ├── 🔐 security.py          # Funções de segurança
│   │   ├── 📧 email.py             # Envio de emails
│   │   ├── 📄 pdf_processor.py     # Processamento de PDFs
│   │   ├── 🎙️ voice_utils.py       # Utilitários de voz
│   │   └── 📊 data_validation.py   # Validação de dados
│   ├── ⚙️ core/                    # Configurações centrais
│   │   ├── config.py               # Configurações da aplicação
│   │   ├── database.py             # Configuração do banco
│   │   ├── security.py             # Configurações de segurança
│   │   └── logging.py              # Configuração de logs
│   └── 🧪 tests/                   # Testes automatizados
│       ├── 🔗 test_api/            # Testes da API
│       ├── 🧠 test_ai/             # Testes do motor de IA
│       ├── 🔧 test_services/       # Testes dos serviços
│       └── 🛠️ test_utils/          # Testes dos utilitários
├── 📋 requirements.txt             # Dependências Python
├── 🐳 Dockerfile                  # Imagem Docker
├── 🔧 pyproject.toml               # Configuração do projeto
└── 📖 README.md                    # Documentação do backend
```

### **🎯 Explicação do Backend:**

- **🔗 API REST**: Endpoints bem estruturados e versionados
- **🧠 AI Engine**: Motor RAG customizado com múltiplas personas
- **🔐 Security**: JWT, rate limiting, validação de dados
- **📊 Analytics**: Métricas detalhadas de uso e performance
- **🧪 Testing**: Cobertura completa de testes

---

## 🗄️ **DATABASE/ - Persistência e Dados**

```text
database/
├── 📋 schemas/                     # Esquemas das tabelas
│   ├── 👤 users.sql               # Tabela de usuários
│   ├── 📝 cv_analyses.sql         # Análises de currículo
│   ├── 🎤 interviews.sql          # Sessões de entrevista
│   ├── 💬 conversations.sql       # Conversas com IA
│   ├── 🧠 knowledge_vectors.sql   # Vetores da knowledge base
│   └── 📊 analytics.sql           # Tabelas de métricas
├── 🔄 migrations/                 # Migrações do banco
│   ├── 001_initial_schema.sql     # Schema inicial
│   ├── 002_add_voice_features.sql # Features de voz
│   ├── 003_add_analytics.sql      # Tabelas de analytics
│   └── 004_add_indexes.sql        # Índices de performance
├── 🌱 seeds/                      # Dados iniciais
│   ├── sample_users.sql           # Usuários de exemplo
│   ├── knowledge_base.sql         # Base de conhecimento
│   └── sample_data.sql            # Dados para desenvolvimento
├── 📊 indexes/                    # Índices especializados
│   ├── vector_indexes.sql         # Índices para busca vetorial
│   ├── performance_indexes.sql    # Índices de performance
│   └── analytics_indexes.sql      # Índices para analytics
├── 🔧 procedures/                 # Stored procedures
│   ├── analytics_aggregation.sql  # Agregação de métricas
│   ├── vector_search.sql          # Busca vetorial otimizada
│   └── data_cleanup.sql           # Limpeza de dados antigos
├── 🐳 docker-compose.yml          # PostgreSQL + pgvector + Redis
├── 📋 init.sql                    # Script de inicialização
└── 📖 README.md                   # Documentação do banco
```

### **🎯 Explicação do Database:**

- **🧠 pgvector**: Extensão para busca vetorial (RAG)
- **📊 Analytics**: Tabelas otimizadas para métricas
- **🔍 Indexes**: Índices especializados para performance
- **🔄 Migrations**: Versionamento controlado do schema

---

## 🧠 **AI-COMPONENTS/ - Motor de IA e RAG**

```text
ai-components/
├── 📚 knowledge_base/             # Base de conhecimento curada
│   ├── 📄 articles/               # Artigos especializados
│   │   ├── career_guidance/       # Orientação de carreira
│   │   ├── interview_tips/        # Dicas de entrevista
│   │   ├── cv_writing/            # Escrita de currículo
│   │   └── industry_insights/     # Insights do mercado
│   ├── 📊 datasets/               # Datasets para treinamento
│   │   ├── job_descriptions/      # Descrições de vagas
│   │   ├── successful_cvs/        # CVs de sucesso
│   │   └── interview_questions/   # Perguntas de entrevista
│   ├── 🎯 templates/              # Templates e modelos
│   │   ├── cv_templates/          # Templates de currículo
│   │   ├── cover_letter_templates/ # Templates de carta
│   │   └── email_templates/       # Templates de email
│   └── 📖 processed/              # Dados processados
│       ├── embeddings/            # Embeddings gerados
│       ├── chunks/                # Texto segmentado
│       └── metadata/              # Metadados dos documentos
├── 🔍 rag_engine/                 # Motor RAG principal
│   ├── 🔧 core/                   # Componentes centrais
│   │   ├── retriever.py           # Recuperação de documentos
│   │   ├── generator.py           # Geração de respostas
│   │   ├── reranker.py            # Re-ranking de resultados
│   │   └── evaluator.py           # Avaliação de qualidade
│   ├── 🎭 personas/               # Diferentes especialistas IA
│   │   ├── career_advisor.py      # Conselheiro de carreira
│   │   ├── hr_expert.py           # Especialista em RH
│   │   ├── tech_mentor.py         # Mentor técnico
│   │   └── interview_coach.py     # Coach de entrevistas
│   ├── 🔧 processors/             # Processadores de texto
│   │   ├── text_cleaner.py        # Limpeza de texto
│   │   ├── chunk_splitter.py      # Divisão em chunks
│   │   ├── metadata_extractor.py  # Extração de metadados
│   │   └── quality_checker.py     # Verificação de qualidade
│   └── 🎯 prompts/                # Sistema de prompts
│       ├── system_prompts.py      # Prompts do sistema
│       ├── user_prompts.py        # Prompts do usuário
│       └── evaluation_prompts.py  # Prompts de avaliação
├── 🔢 embeddings/                 # Processamento de embeddings
│   ├── 🏗️ generators/             # Geradores de embeddings
│   │   ├── openai_embeddings.py   # Embeddings OpenAI
│   │   ├── sentence_transformers.py # Sentence Transformers
│   │   └── custom_embeddings.py   # Embeddings customizados
│   ├── 💾 storage/                # Armazenamento de vetores
│   │   ├── chromadb_client.py     # Cliente ChromaDB
│   │   ├── pgvector_client.py     # Cliente pgvector
│   │   └── faiss_client.py        # Cliente FAISS
│   └── 🔧 utils/                  # Utilitários de embeddings
│       ├── vector_operations.py   # Operações vetoriais
│       ├── similarity_search.py   # Busca por similaridade
│       └── clustering.py          # Agrupamento de vetores
├── 📊 evaluation/                 # Avaliação e métricas
│   ├── 🎯 metrics/                # Métricas de qualidade
│   │   ├── relevance_score.py     # Score de relevância
│   │   ├── coherence_score.py     # Score de coerência
│   │   ├── factuality_score.py    # Score de factualidade
│   │   └── bias_detection.py      # Detecção de viés
│   ├── 🧪 benchmarks/             # Benchmarks padronizados
│   │   ├── career_qa_benchmark.py # Benchmark Q&A carreira
│   │   ├── cv_analysis_benchmark.py # Benchmark análise CV
│   │   └── interview_benchmark.py # Benchmark entrevistas
│   └── 📈 reports/                # Relatórios de avaliação
│       ├── quality_report.py      # Relatório de qualidade
│       ├── performance_report.py  # Relatório de performance
│       └── bias_report.py         # Relatório de viés
├── 🔧 config/                     # Configurações da IA
│   ├── models_config.yaml         # Configuração dos modelos
│   ├── rag_config.yaml            # Configuração do RAG
│   ├── prompts_config.yaml        # Configuração dos prompts
│   └── evaluation_config.yaml     # Configuração da avaliação
└── 📖 README.md                   # Documentação dos componentes IA
```

### **🎯 Explicação dos AI Components:**

- **📚 Knowledge Base**: Conteúdo curado e processado para RAG
- **🔍 RAG Engine**: Motor principal de recuperação e geração
- **🔢 Embeddings**: Sistema vetorial para busca semântica
- **📊 Evaluation**: Métricas e benchmarks para qualidade

---

## 📚 **DOCS/ - Documentação Técnica**

```text
docs/
├── 🏗️ ARQUITETURA.md              # Arquitetura técnica completa
├── 🎙️ COMANDOS-DE-VOZ.md          # Documentação de comandos de voz
├── 📱 GUIA-MOBILE.md               # Guia de uso mobile
├── 💼 DOCUMENTACAO-RECRUTADORES.md # Documentação para recrutadores
├── 📁 ESTRUTURA-PROJETO.md         # Este arquivo
├── 🚀 DEPLOYMENT.md                # Guia de deploy
├── 🧪 TESTING.md                   # Estratégias de teste
├── 🔐 SECURITY.md                  # Documentação de segurança
├── 📊 ANALYTICS.md                 # Métricas e analytics
├── ♿ ACCESSIBILITY.md             # Guia de acessibilidade
├── 🎨 UI-UX.md                     # Guia de design
├── 🔧 API.md                       # Documentação da API
├── 🧠 AI-RAG.md                    # Documentação técnica do RAG
├── 🎭 personas/                    # Documentação das personas IA
│   ├── career-mentor.md            # Persona do mentor
│   ├── hr-specialist.md            # Persona do especialista RH
│   └── interview-coach.md          # Persona do coach
├── 📊 benchmarks/                  # Resultados de benchmarks
│   ├── performance-metrics.md      # Métricas de performance
│   ├── ai-quality-scores.md        # Scores de qualidade IA
│   └── mobile-performance.md       # Performance mobile
└── 🎓 tutorials/                  # Tutoriais passo a passo
    ├── setup-desenvolvimento.md    # Setup para desenvolvedores
    ├── contribuindo.md             # Como contribuir
    └── troubleshooting.md          # Solução de problemas
```

### **🎯 Explicação da Documentação:**

- **📋 Completa**: Cobre todos os aspectos técnicos e de uso
- **👥 Multi-audiência**: Desenvolvedores, usuários, recrutadores
- **📊 Data-driven**: Benchmarks e métricas reais
- **🎓 Educativa**: Tutoriais e guias práticos

---

## 🎨 **ASSETS/ - Recursos Visuais**

```text
assets/
├── 🎨 images/                      # Imagens do projeto
│   ├── 📱 mobile-screenshots/      # Screenshots mobile
│   ├── 💻 desktop-screenshots/     # Screenshots desktop
│   ├── 🎙️ voice-interface/         # Interface de voz
│   └── 📊 architecture-diagrams/   # Diagramas de arquitetura
├── 🎞️ videos/                      # Vídeos demonstrativos
│   ├── 📱 mobile-demo.mp4          # Demo mobile
│   ├── 🎙️ voice-commands-demo.mp4  # Demo comandos de voz
│   └── 🔍 cv-analysis-demo.mp4     # Demo análise CV
├── 📊 charts/                      # Gráficos e métricas
│   ├── performance-charts/         # Gráficos de performance
│   ├── usage-analytics/            # Analytics de uso
│   └── ai-quality-metrics/         # Métricas de qualidade IA
├── 🎨 design/                      # Assets de design
│   ├── 🎨 brand-guidelines.pdf     # Diretrizes da marca
│   ├── 🖼️ logos/                   # Logos em vários formatos
│   ├── 🎨 color-palette.pdf        # Paleta de cores
│   └── 📱 mockups/                 # Mockups de interface
└── 📋 presentations/               # Apresentações
    ├── 💼 pitch-recrutadores.pdf   # Pitch para recrutadores
    ├── 🎯 vision-produto.pdf       # Visão do produto
    └── 📊 metricas-impacto.pdf     # Métricas de impacto
```

---

## 🔧 **ARQUIVOS DE CONFIGURAÇÃO RAIZ**

```text
📄 .env.example                    # Template de variáveis de ambiente
📄 .gitignore                      # Arquivos ignorados pelo Git
📄 docker-compose.yml             # Orquestração completa
📄 docker-compose.dev.yml         # Ambiente de desenvolvimento
📄 docker-compose.prod.yml        # Ambiente de produção
📄 Makefile                       # Comandos automatizados
📄 package.json                   # Dependências do workspace
📄 README.md                      # Visão geral do projeto
📄 CONTRIBUTING.md                # Guia de contribuição
📄 LICENSE                        # Licença do projeto
📄 CHANGELOG.md                   # Histórico de mudanças
```

---

## 🚀 **COMANDOS PRINCIPAIS**

### **🛠️ Desenvolvimento Local**

```bash
# Setup completo do projeto
make setup

# Rodar ambiente de desenvolvimento
make dev

# Rodar testes
make test

# Build de produção
make build

# Deploy
make deploy
```

### **🐳 Docker**

```bash
# Ambiente completo
docker-compose up

# Apenas backend
docker-compose up backend database

# Apenas frontend
docker-compose up frontend

# Produção
docker-compose -f docker-compose.prod.yml up
```

---

## 🎯 **VANTAGENS DA ESTRUTURA**

### **📊 Para Desenvolvedores:**

- ✅ **Separação clara** de responsabilidades
- ✅ **Escalabilidade** - fácil adicionar features
- ✅ **Manutenibilidade** - código bem organizado
- ✅ **Testabilidade** - estrutura facilita testes

### **💼 Para Recrutadores:**

- ✅ **Arquitetura empresarial** - padrões da indústria
- ✅ **Documentação completa** - profissionalismo
- ✅ **Tecnologias modernas** - stack atualizada
- ✅ **Boas práticas** - qualidade de código

### **👥 Para Usuários:**

- ✅ **Performance** - otimizada para mobile
- ✅ **Acessibilidade** - comandos de voz
- ✅ **Confiabilidade** - estrutura robusta
- ✅ **Facilidade de uso** - interface intuitiva

---

## 📈 **ROADMAP DE EXPANSÃO**

### **🎯 Próximas Funcionalidades:**

```text
├── 🤖 ai-components/
│   ├── multimodal/                # IA multimodal (texto + voz + imagem)
│   ├── personalization/           # Personalização avançada
│   └── real-time-training/        # Treinamento em tempo real
├── 🌐 integrations/               # Integrações externas
│   ├── linkedin/                  # API LinkedIn
│   ├── job-boards/                # Sites de vagas
│   └── video-calls/               # Chamadas de vídeo
└── 📊 advanced-analytics/         # Analytics avançados
    ├── ml-insights/               # Insights com ML
    ├── predictive-analytics/      # Analytics preditivos
    └── user-behavior/             # Análise comportamental
```

---

*Esta estrutura foi pensada para **crescer junto com o projeto**, mantendo **qualidade técnica** e **facilidade de manutenção** mesmo com **milhões de usuários**.* 
 