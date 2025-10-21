# 🚀 Makefile - Mentor de Carreira IA Platform
# Comandos automatizados para desenvolvimento e deploy

# === VARIÁVEIS ===
PROJECT_NAME = mentor-carreira
DOCKER_COMPOSE = docker-compose
FRONTEND_DIR = frontend
BACKEND_DIR = backend

# === COMANDOS PRINCIPAIS ===

.PHONY: help setup dev build test clean deploy

# 📖 Help - Lista todos os comandos disponíveis
help:
	@echo "🚀 Mentor de Carreira - Comandos Disponíveis:"
	@echo ""
	@echo "📦 SETUP E INSTALAÇÃO:"
	@echo "  make setup          - Setup completo do projeto"
	@echo "  make install         - Instala dependências"
	@echo "  make install-frontend - Instala deps do frontend"
	@echo "  make install-backend  - Instala deps do backend"
	@echo ""
	@echo "🛠️  DESENVOLVIMENTO:"
	@echo "  make dev            - Inicia ambiente de desenvolvimento"
	@echo "  make dev-frontend   - Inicia apenas frontend"
	@echo "  make dev-backend    - Inicia apenas backend"
	@echo "  make dev-db         - Inicia apenas banco de dados"
	@echo ""
	@echo "🏗️  BUILD E DEPLOY:"
	@echo "  make build          - Build completo da aplicação"
	@echo "  make build-frontend - Build do frontend"
	@echo "  make build-backend  - Build do backend"
	@echo "  make deploy         - Deploy em produção"
	@echo ""
	@echo "🧪 TESTES E QUALIDADE:"
	@echo "  make test           - Executa todos os testes"
	@echo "  make test-frontend  - Testa frontend"
	@echo "  make test-backend   - Testa backend"
	@echo "  make lint           - Linting e formatação"
	@echo "  make type-check     - Verificação de tipos"
	@echo ""
	@echo "🗄️  DATABASE:"
	@echo "  make db-migrate     - Executa migrações"
	@echo "  make db-seed        - Popula banco com dados"
	@echo "  make db-reset       - Reset completo do banco"
	@echo ""
	@echo "🧹 LIMPEZA:"
	@echo "  make clean          - Limpa arquivos temporários"
	@echo "  make clean-docker   - Remove containers e volumes"
	@echo ""

# === SETUP INICIAL ===

setup: check-env install build db-migrate db-seed
	@echo "✅ Setup completo finalizado!"
	@echo "🚀 Execute 'make dev' para iniciar o desenvolvimento"

check-env:
	@echo "🔍 Verificando environment..."
	@if [ ! -f .env ]; then \
		echo "⚠️  Arquivo .env não encontrado. Copiando .env.example..."; \
		cp .env.example .env; \
		echo "📝 Configure as variáveis no arquivo .env"; \
	fi

install: install-frontend install-backend
	@echo "✅ Todas as dependências instaladas!"

install-frontend:
	@echo "📦 Instalando dependências do frontend..."
	cd $(FRONTEND_DIR) && npm install

install-backend:
	@echo "🐍 Instalando dependências do backend..."
	cd $(BACKEND_DIR) && pip install -r requirements.txt

# === DESENVOLVIMENTO ===

dev:
	@echo "🚀 Iniciando ambiente de desenvolvimento completo..."
	$(DOCKER_COMPOSE) up --build

dev-frontend:
	@echo "📱 Iniciando frontend..."
	cd $(FRONTEND_DIR) && npm run dev

dev-backend:
	@echo "🔧 Iniciando backend..."
	cd $(BACKEND_DIR) && uvicorn app.main:app --reload --host 0.0.0.0 --port 8001

dev-db:
	@echo "🗄️ Iniciando banco de dados..."
	$(DOCKER_COMPOSE) up database redis chromadb

# === BUILD ===

build: build-frontend build-backend
	@echo "✅ Build completo finalizado!"

build-frontend:
	@echo "🏗️ Building frontend..."
	cd $(FRONTEND_DIR) && npm run build

build-backend:
	@echo "🏗️ Building backend..."
	$(DOCKER_COMPOSE) build backend

# === TESTES ===

test: test-frontend test-backend
	@echo "✅ Todos os testes executados!"

test-frontend:
	@echo "🧪 Testando frontend..."
	cd $(FRONTEND_DIR) && npm run test

test-backend:
	@echo "🧪 Testando backend..."
	cd $(BACKEND_DIR) && pytest

test-e2e:
	@echo "🎭 Executando testes E2E..."
	cd $(FRONTEND_DIR) && npx playwright test

# === QUALIDADE DE CÓDIGO ===

lint: lint-frontend lint-backend
	@echo "✅ Linting completo!"

lint-frontend:
	@echo "🎨 Linting frontend..."
	cd $(FRONTEND_DIR) && npm run lint

lint-backend:
	@echo "🐍 Linting backend..."
	cd $(BACKEND_DIR) && black . && isort . && flake8

type-check:
	@echo "🔍 Verificação de tipos..."
	cd $(FRONTEND_DIR) && npm run type-check
	cd $(BACKEND_DIR) && mypy .

# === DATABASE ===

db-migrate:
	@echo "🗄️ Executando migrações..."
	cd $(BACKEND_DIR) && alembic upgrade head

db-seed:
	@echo "🌱 Populando banco com dados iniciais..."
	cd $(BACKEND_DIR) && python scripts/seed_database.py

db-reset:
	@echo "🔄 Resetando banco de dados..."
	$(DOCKER_COMPOSE) down -v
	$(DOCKER_COMPOSE) up database -d
	sleep 5
	make db-migrate db-seed

# === PRODUÇÃO ===

deploy:
	@echo "🚀 Fazendo deploy em produção..."
	$(DOCKER_COMPOSE) -f docker-compose.prod.yml up --build -d

deploy-staging:
	@echo "🎭 Deploy em staging..."
	$(DOCKER_COMPOSE) -f docker-compose.staging.yml up --build -d

# === MONITORING ===

logs:
	@echo "📋 Visualizando logs..."
	$(DOCKER_COMPOSE) logs -f

logs-frontend:
	$(DOCKER_COMPOSE) logs -f frontend

logs-backend:
	$(DOCKER_COMPOSE) logs -f backend

status:
	@echo "📊 Status dos serviços:"
	$(DOCKER_COMPOSE) ps

# === LIMPEZA ===

clean:
	@echo "🧹 Limpando arquivos temporários..."
	cd $(FRONTEND_DIR) && rm -rf .next node_modules/.cache
	cd $(BACKEND_DIR) && find . -type d -name __pycache__ -delete
	cd $(BACKEND_DIR) && find . -type f -name "*.pyc" -delete

clean-docker:
	@echo "🐳 Removendo containers e volumes..."
	$(DOCKER_COMPOSE) down -v --remove-orphans
	docker system prune -f

clean-all: clean clean-docker
	@echo "✅ Limpeza completa realizada!"

# === BACKUP ===

backup-db:
	@echo "💾 Fazendo backup do banco..."
	docker exec mentor-carreira-db pg_dump -U postgres mentor_carreira > backup_$(shell date +%Y%m%d_%H%M%S).sql

# === SEGURANÇA ===

security-scan:
	@echo "🔒 Verificando vulnerabilidades..."
	cd $(FRONTEND_DIR) && npm audit
	cd $(BACKEND_DIR) && safety check

# === ANALYTICS ===

performance-test:
	@echo "⚡ Teste de performance..."
	cd $(FRONTEND_DIR) && npm run lighthouse

# Default target
.DEFAULT_GOAL := help