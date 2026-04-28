<!--
  ============================================================================
  PROPRIETÁRIO: Mauricio Spark
  MARCA: WINSOFT
  PROJETO: FORJA
  VERSÃO: 1.0.0
  LINHAGEM: SPARK
  ============================================================================
  COPYRIGHT: © 2026 WINSOFT / Mauricio Spark. All rights reserved.
  ============================================================================
-->

# 📚 Documentação Completa - FORJA v1.0.0

> **Documento Oficial de Especificação e Arquitetura**

---

## 📋 Índice

1. [Conceito e Visão](#1-conceito-e-visão)
2. [Arquitetura Técnica](#2-arquitetura-técnica)
3. [Estrutura do Escopo](#3-estrutura-do-escopo)
4. [Fluxo de Funcionamento](#4-fluxo-de-funcionamento)
5. [Módulos Detalhados](#5-módulos-detalhados)
6. [Identidade Visual](#6-identidade-visual)
7. [Especificações Técnicas](#7-especificações-técnicas)
8. [Referências](#8-referências)

---

## 1. Conceito e Visão

### 🛠️ O Conceito

O **FORJA** é um guia interativo para desenvolvedores, disfarçado de formulário, que ajuda a criar o **escopo técnico completo** de um projeto (sites, aplicativos, etc.). Ele funciona como um consultor de engenharia que garante que nenhum detalhe seja esquecido, desde a construção até a segurança e hospedagem.

### 🎯 Proposta de Valor

| Problema | Solução FORJA |
|----------|---------------|
| Esquecer requisitos de segurança | Checklists obrigatórios por tipo de projeto |
| Ignorar conformidade LGPD | Módulo específico de conformidade legal |
| Falta de planejamento de infra | Questionários de deploy e CI/CD |
| Documentação incompleta | Geração automática de Markdown estruturado |

### 🌟 Conceito de "Forja"

> Transformar a ideia bruta em um projeto robusto e "temperado".

Assim como um ferreiro forja metal em ferramentas resistentes, o FORJA transforma conceitos vagos em especificações técnicas sólidas e prontas para produção.

---

## 2. Arquitetura Técnica (Stack)

### 🧠 Stack Principal

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| **Frontend** | HTML5, CSS3, JS Puro | Zero dependências, máxima portabilidade |
| **Lógica** | JavaScript ES6+ | Árvore de decisão pura, sem IA |
| **Dados** | JSON estruturado | Fácil manutenção, versionável |
| **Hospedagem** | GitHub Pages | Estático, rápido, custo zero |

### 🚫 Filosofia: Sem Inteligência Artificial

O FORJA usa **lógica de programação pura** (árvore de decisão) para ser:

- ⚡ **Rápido** — Respostas instantâneas, zero latência
- 🔒 **Previsível** — Mesma entrada = mesma saída sempre
- 🌐 **Offline-friendly** — Funciona sem internet após carregado
- 🛠️ **Manutenível** — Regras claras em JSON, não caixa-preta

### 📦 Componentes

```
┌─────────────────────────────────────────┐
│           FORJA Application             │
├─────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────┐  │
│  │   UI Layer   │  │  Engine Layer   │  │
│  │  (HTML/CSS)  │  │   (JS Logic)    │  │
│  └──────────────┘  └─────────────────┘  │
├─────────────────────────────────────────┤
│         Data Layer (JSON)               │
│  ┌──────────────┬─────────────────────┐ │
│  │  knowledge-  │   Sections:         │ │
│  │   base.json  │   • fundacao        │ │
│  │              │   • seguranca       │ │
│  │              │   • lgpd            │ │
│  │              │   • infraestrutura  │ │
│  └──────────────┴─────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 3. Estrutura do Escopo (O "Tudo Tudo Tudo")

O sistema cobre obrigatoriamente **4 pilares fundamentais**:

### 3.1 Fundação
**Base do projeto** — Define o que está sendo construído.

- Tipo de projeto (Site Institucional, E-commerce, Web App, Mobile, API, SaaS)
- Objetivo e propósito de negócio
- Funcionalidades core (cadastro, login, pagamentos, etc.)
- Público-alvo

### 3.2 Segurança
**Proteção da aplicação** — Ativado automaticamente baseado nas funcionalidades escolhidas.

**Métodos de Autenticação:**
- JWT (JSON Web Tokens)
- OAuth 2.0 / OpenID Connect
- Sessões Server-Side
- Multi-Fator (MFA/2FA)
- API Keys

**Criptografia:**
- Hash de senhas (bcrypt/Argon2)
- Criptografia em repouso (AES-256)
- TLS 1.3 para transmissão
- Criptografia de backups

**Proteções:**
- SQL Injection (prepared statements)
- XSS (sanitização)
- CSRF (tokens)
- Rate Limiting
- Headers de segurança (HSTS, CSP)
- WAF (Web Application Firewall)

### 3.3 LGPD
**Conformidade legal** — Módulo ativado quando há coleta de dados pessoais.

**Checklist de Coleta:**
- Identificação de dados pessoais coletados
- Base legal para processamento
- Mecanismos para direitos do titular
- Política de retenção

**Direitos do Titular:**
- Confirmação de tratamento
- Acesso aos dados
- Correção
- Anonimização/bloqueio
- Portabilidade
- Eliminação (direito ao esquecimento)
- Revogação de consentimento

### 3.4 Hospedagem/Infraestrutura
**Deploy e operações** — Infraestrutura para produção.

**Plataformas:**
- AWS, GCP, Azure
- Vercel, Netlify
- Heroku, DigitalOcean
- On-premise / Multi-cloud

**Estratégias de Deploy:**
- CI/CD Automatizado
- Docker Containers
- Kubernetes
- Serverless
- Blue-Green / Canary

**Monitoramento:**
- Logs centralizados
- APM (Application Performance Monitoring)
- Alertas automáticos
- Health checks
- Dashboard de métricas

---

## 4. Fluxo de Funcionamento

### 🔄 Diagrama de Fluxo

```
┌─────────────────────────────────────────────────────────────┐
│                      1. ENTRADA                             │
│                   (Formulário Web)                          │
├─────────────────────────────────────────────────────────────┤
│ • Usuário responde perguntas dinâmicas                      │
│ • Campos aparecem/ desaparecem baseado em respostas         │
│ • Validação em tempo real                                   │
└──────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   2. PROCESSAMENTO                          │
│                (Motor de Decisão)                           │
├─────────────────────────────────────────────────────────────┤
│ • ForjaEngine processa respostas                            │
│ • Identifica triggers (ex: login → seguranca_autenticacao)  │
│ • Desbloqueia seções relevantes                             │
│ • Coleta checklists específicos                             │
└──────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      3. SAÍDA                               │
│                (Markdown Gerado)                            │
├─────────────────────────────────────────────────────────────┤
│ • Documento estruturado em Markdown                         │
│ • Pronto para README do GitHub                              │
│ • Contém: fundação, segurança, LGPD, infra, checklists      │
│ • Próximos passos com checklist de implementação            │
└─────────────────────────────────────────────────────────────┘
```

### 🌳 Árvore de Decisão (Simplificada)

```
projeto_tipo = "web_app" + login
         │
         ├──► Trigger: seguranca_autenticacao
         │         ├──► Pergunta: "Qual método de auth?"
         │         ├──► Se JWT: checklist_jwt ativado
         │         └──► Se OAuth: checklist_oauth ativado
         │
         ├──► Trigger: lgpd_dados (se coleta dados)
         │         └──► Módulo LGPD desbloqueado
         │
         └──► Trigger: infra_escalabilidade
                   └──► Perguntas de deploy
```

---

## 5. Módulos Detalhados

### 5.1 Módulo Fundação

**Perguntas:**
| Campo | Tipo | Obrigatório | Triggers |
|-------|------|-------------|----------|
| projeto_nome | text | Sim | - |
| projeto_tipo | single_choice | Sim | Vários (ex: web_app → seguranca_autenticacao) |
| projeto_objetivo | textarea | Sim | - |
| publico_alvo | text | Sim | - |
| funcionalidades_core | multi_choice | Não | Dependem da escolha |

### 5.2 Módulo Segurança

**Ativação:** Quando `funcionalidades_core` inclui cadastro, login, pagamentos, etc.

**Checklists Automáticos:**

**JWT:**
- Usar algoritmo RS256 ou ES256 (nunca HS256)
- Implementar refresh tokens
- Armazenar em httpOnly cookies
- Implementar blacklist/logout

**OAuth 2.0:**
- Validar redirect URIs estritamente
- Usar PKCE para clients públicos
- Implementar state parameter
- Verificar escopos

**Sessões:**
- IDs aleatórios e longos (128+ bits)
- Regenerar ID após login
- Timeout de inatividade (30min)
- Cookies seguros (Secure, HttpOnly, SameSite)

### 5.3 Módulo LGPD

**Checklist Básico:**
- [ ] Publicar política de privacidade
- [ ] Implementar termo de consentimento
- [ ] Criar canal para exercício de direitos
- [ ] Documentar operações de tratamento (RIPD)
- [ ] Treinar equipe sobre LGPD

**Checklist Avançado (SaaS/E-commerce):**
- [ ] Realizar DPIA (Avaliação de Impacto)
- [ ] Implementar Privacy by Design
- [ ] Criar procedimento para brechas
- [ ] Manter registro de consentimentos
- [ ] Contratos com operadores (terceiros)

### 5.4 Módulo Infraestrutura

**Checklist AWS:**
- Configurar IAM (menor privilégio)
- MFA para acesso root
- Secrets Manager para credenciais
- VPC com subnets privadas
- CloudTrail para auditoria
- AWS WAF
- CloudFront CDN
- Auto Scaling + CloudWatch

**Checklist Docker:**
- Imagens oficiais e minimalistas
- Não rodar como root
- Multi-stage builds
- Scan de vulnerabilidades
- Health checks
- Limitar recursos

---

## 6. Identidade Visual

### 🎨 Design System

| Elemento | Especificação |
|----------|---------------|
| **Estilo** | Minimalista, técnico, dark mode |
| **Fundo Principal** | `#0d1117` (GitHub Dark) |
| **Fundo Secundário** | `#161b22` |
| **Cor Principal** | Hunter Green `#355E3B` |
| **Cor Secundária** | Hunter Green Light `#4a7c52` |
| **Texto Principal** | `#e6edf3` |
| **Texto Secundário** | `#8b949e` |

### 🔤 Tipografia

- **UI:** Inter (weights: 300, 400, 500, 600, 700)
- **Código:** JetBrains Mono (weights: 400, 500)

### ✨ Elementos Visuais

- **Bordas arredondadas:** 4px, 6px, 8px, 12px
- **Sombras:** Escala de 0.3 a 0.5 opacidade
- **Brilho Hunter:** `box-shadow: 0 0 20px rgba(53, 94, 59, 0.3)`
- **Gradientes:** `linear-gradient(135deg, #161b22 0%, #26422a 100%)`

---

## 7. Especificações Técnicas

### 📁 Estrutura de Arquivos

```
forja/
├── index.html                    # Ponto de entrada
├── README.md                     # Documentação usuário
├── documentacao_completa.md      # Especificação técnica (este arquivo)
├── start.bat                     # Script Windows
├── css/
│   └── style.css                # Tema dark + Hunter Green
├── js/
│   └── app.js                   # ForjaEngine (motor de decisão)
├── data/
│   └── knowledge-base.json      # Base de conhecimento
└── .vscode/
    └── settings.json            # Configuração Live Server
```

### 🔧 ForjaEngine (Core)

**Classe Principal:**
```javascript
class ForjaEngine {
  constructor() {
    this.knowledgeBase = null;      // JSON carregado
    this.answers = {};              // Respostas do usuário
    this.activeTriggers = new Set(); // Triggers ativos
    this.currentSection = 'fundacao'; // Seção atual
  }
  
  // Métodos principais:
  init()           // Carrega knowledge base
  renderQuestion() // Renderiza pergunta dinâmica
  processTriggers() // Ativa/desativa triggers
  buildMarkdown()  // Gera documento final
}
```

### 📊 Formatos de Saída

**Markdown Gerado inclui:**
1. Header com nome do projeto
2. Seção Fundação
3. Seção Segurança (se aplicável)
4. Seção LGPD (se aplicável)
5. Seção Infraestrutura
6. Checklists específicos
7. Próximos passos (checklist de implementação)

---

## 8. Referências

### 📚 Documentos Relacionados

| Arquivo | Propósito |
|---------|-----------|
| `README.md` | Documentação para usuários |
| `Projeto FORJA` | Especificação original |
| `knowledge-base.json` | Base de dados técnica |
| `documentacao_completa.md` | Este documento (especificação completa) |

### 🔗 Recursos Externos

- **Hunter Green:** Cor oficial `#355E3B`
- **Inter Font:** https://rsms.me/inter/
- **JetBrains Mono:** https://www.jetbrains.com/lp/mono/
- **GitHub Pages:** https://pages.github.com/

### 📞 Metadados Oficiais

```yaml
PROPRIETÁRIO: Mauricio Spark
MARCA: WINSOFT
PROJETO: FORJA
VERSÃO: 1.0.0
LINHAGEM: SPARK
COPYRIGHT: © 2026 WINSOFT / Mauricio Spark. All rights reserved.
```

---

<p align="center">
  <strong>🔥 FORJA v1.0.0</strong><br>
  <em>Forjando o futuro, um escopo de cada vez.</em><br>
  <sub>© 2026 WINSOFT / Mauricio Spark — All rights reserved.</sub>
</p>