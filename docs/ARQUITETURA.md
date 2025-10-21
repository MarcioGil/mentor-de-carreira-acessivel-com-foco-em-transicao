# 🏗️ Arquitetura Técnica - Plataforma Mentor de Carreira IA

## 📋 **Visão Geral da Arquitetura**

Esta é uma **aplicação fullstack** que implementa **RAG (Retrieval-Augmented Generation)** para mentoria de carreira personalizada, com **comandos de voz** para acessibilidade total.

---

## 🛠️ **Stack Tecnológica Detalhada**

### **Frontend** - Next.js 14 (App Router)
```
frontend/
├── app/                    # App Router do Next.js 14
├── components/            # Componentes React reutilizáveis
├── hooks/                 # Custom hooks (incluindo Web Speech API)
├── lib/                   # Utilitários e configurações
├── public/                # Assets estáticos
└── package.json          # Dependências frontend
```

**Dependências Principais:**
- **Next.js 14** - Framework React com SSR
- **TailwindCSS** - Estilização utilitária
- **Web Speech API** - Comandos de voz nativos
- **React Hook Form** - Formulários otimizados
- **Zustand** - Estado global leve

### **Backend** - Python FastAPI
```
backend/
├── app/
│   ├── api/              # Endpoints da API
│   ├── core/             # Configurações centrais
│   ├── models/           # Modelos do banco de dados
│   ├── services/         # Lógica de negócio
│   └── utils/            # Utilitários
├── ai_engine/            # Motor de IA com RAG
├── knowledge_base/       # Base de conhecimento curada
└── requirements.txt      # Dependências Python
```

**Dependências Principais:**
- **FastAPI** - Framework web moderno e rápido
- **LangChain** - Orquestração de LLMs
- **ChromaDB/pgvector** - Vector database
- **Pydantic** - Validação de dados
- **JWT** - Autenticação segura

### **Database** - PostgreSQL + pgvector
```
database/
├── migrations/           # Migrações do banco
├── schemas/             # Esquemas das tabelas
├── seeds/               # Dados iniciais
└── docker-compose.yml   # Setup do PostgreSQL
```

**Estrutura Principal:**
- **users** - Dados dos usuários
- **sessions** - Sessões de mentoria
- **analyses** - Análises de currículo
- **knowledge_vectors** - Embeddings da knowledge base

### **AI Components** - Sistema RAG
```
ai-components/
├── embeddings/          # Processamento de embeddings
├── rag_engine/          # Motor RAG principal
├── prompts/             # Templates de prompts
└── knowledge_base/      # Artigos e conteúdo curado
```

---

## 🧠 **Fluxo do Sistema RAG**

### **1. Preparação da Knowledge Base**
```python
# Processo offline de preparação
1. Coleta de artigos especializados em carreira
2. Processamento e limpeza dos textos
3. Geração de embeddings com OpenAI/Sentence-Transformers
4. Armazenamento no vector database (pgvector)
```

### **2. Consulta do Usuário**
```python
# Processo em tempo real
1. Usuário faz pergunta via chat ou comando de voz
2. Pergunta é convertida em embedding
3. Busca semântica no vector database
4. Top 5 trechos mais relevantes são recuperados
5. Contexto + pergunta enviados para LLM
6. Resposta gerada com base no conhecimento curado
```

### **3. Análise de Currículo**
```python
# Fluxo especializado
1. Usuário cola currículo + descrição da vaga
2. Prompt específico para análise comparativa
3. IA identifica gaps e compatibilidade
4. Sugestões de melhoria são geradas
5. Score de compatibilidade calculado
```

---

## 🎙️ **Sistema de Comandos de Voz**

### **Implementação Frontend (Web Speech API)**
```javascript
// Hook customizado para reconhecimento de voz
const useVoiceCommands = () => {
  const recognition = new webkitSpeechRecognition();
  
  const commands = {
    "iniciar análise de currículo": () => router.push('/analyze'),
    "começar simulação de entrevista": () => router.push('/interview'),
    "ler meu plano de carreira": () => readCareerPlan(),
    "buscar vagas em tecnologia": () => searchJobs('tecnologia')
  };
  
  // Processamento contínuo de comandos
};
```

### **Funcionalidades de Acessibilidade**
- **🎙️ Comandos de Voz**: Navegação hands-free
- **🔊 Text-to-Speech**: Leitura de respostas da IA
- **⌨️ Navegação por Teclado**: Acessível via Tab
- **♿ Screen Reader**: Compatível com NVDA/JAWS
- **🎨 Alto Contraste**: Modo para baixa visão

---

## 🔐 **Segurança e Autenticação**

### **JWT + OAuth2**
```python
# Backend - FastAPI
from fastapi_users import FastAPIUsers
from fastapi_users.authentication import JWTAuthentication

# Sistema completo de autenticação
# - Login social (Google, GitHub)
# - JWT com refresh tokens
# - Rate limiting por usuário
# - Criptografia de dados sensíveis
```

---

## 📊 **Monitoramento e Analytics**

### **Métricas Importantes**
- **Taxa de Sucesso**: Usuários que conseguem emprego
- **Engagement**: Tempo médio de sessão
- **Qualidade da IA**: Avaliações das respostas
- **Acessibilidade**: Uso de comandos de voz

---

## 🚀 **Setup de Desenvolvimento Local**

### **1. Pré-requisitos**
```bash
# Instalar dependências do sistema
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Docker (opcional)
```

### **2. Setup do Backend**
```bash
cd backend/
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### **3. Setup do Frontend**
```bash
cd frontend/
npm install
npm run dev
```

### **4. Setup do Banco**
```bash
cd database/
docker-compose up -d
# Ou configuração manual do PostgreSQL + pgvector
```

---

## 📈 **Roadmap de Implementação**

### **Fase 1: MVP (4-6 semanas)**
- ✅ Setup básico fullstack
- ✅ Autenticação JWT
- ✅ Chat básico com RAG
- ✅ Comandos de voz essenciais

### **Fase 2: Core Features (6-8 semanas)**
- ✅ Analisador de currículo completo
- ✅ Simulador de entrevista
- ✅ Dashboard personalizado
- ✅ Base de conhecimento expandida

### **Fase 3: Advanced (8-10 semanas)**
- ✅ Matching com vagas reais
- ✅ Comunidade de usuários
- ✅ Sistema de feedback
- ✅ Analytics avançadas

---

## 💡 **Considerações Técnicas Avançadas**

### **Performance**
- **Caching**: Redis para respostas frequentes
- **CDN**: Assets estáticos otimizados
- **Vector Index**: Otimização de buscas semânticas
- **Lazy Loading**: Componentes sob demanda

### **Escalabilidade**
- **Microserviços**: Backend modular
- **Load Balancing**: Múltiplas instâncias
- **Database Sharding**: Distribuição de dados
- **Queue System**: Processamento assíncrono

---

*Esta arquitetura foi desenhada para **impacto social máximo** com **excelência técnica**. Cada decisão prioriza **acessibilidade** e **qualidade da experiência do usuário**.*