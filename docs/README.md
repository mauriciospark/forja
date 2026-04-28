<!--
  AUTHOR: Mauricio Spark
  BRAND: WINSOFT
  VERSION: 1.0.0
  PROJECT: FORJA
  LINEAGE: SPARK
  COPYRIGHT: © 2026 WINSOFT / Mauricio Spark. All rights reserved.
-->

# � DOCUMENTAÇÃO MASTER FORJA v1.0.0

> **Documentação Técnica Oficial - Arquitetura, Configuração e Roadmap**

---

## 1. Introdução e Visão Geral

### 🔥 A Forja Digital

O **FORJA** representa a metáfora da ferraria aplicada ao desenvolvimento de software: assim como um ferreiro transforma metal bruto em ferramentas temperadas e resistentes, o FORJA converte **ideias vagas em escopos técnicos completos e robustos**.

> *"Transformando ideias brutas em projetos temperados"*

### 🎯 Diferenciais Tecnológicos

| Princípio | Implementação |
|-----------|---------------|
| **Zero IA** | Motor de decisão 100% baseado em árvore lógica JSON — nenhum modelo de machine learning, total previsibilidade |
| **Local-First** | Todo processamento ocorre no navegador — sem dados enviados a servidores externos |
| **Privacidade Total** | Zero rastreamento, zero cookies de terceiros, zero telemetria |
| **Offline-Ready** | Após carregado inicialmente, funciona sem conexão com internet |

### ⚡ Por que Zero IA?

- **Determinismo**: Mesma entrada sempre produz mesma saída
- **Transparência**: Regras de negócio visíveis no JSON, não caixa-preta
- **Velocidade**: Resposta instantânea, zero latência de API
- **Manutenibilidade**: Alterar regras = editar JSON, não re-treinar modelo

---

## 2. Arquitetura do Projeto

### 📁 File Tree

```
forja/
│
├── 📂 html/
│   └── index.html              # Interface principal (SPA)
│
├── 📂 js/
│   └── script.js               # Motor de decisão (ForjaEngine)
│
├── 📂 css/
│   └── style.css               # Tema dark + Hunter Green
│
├── 📂 data/
│   └── knowledge-base.json     # Base de conhecimento (regras JSON)
│
├── � favicon/
│   └── forja.jpeg              # Identidade visual
│
├── 📂 docs/
│   └── README.md               # Esta documentação
│
├── 📂 .vscode/
│   └── settings.json           # Configuração Live Server
│
└── start.bat                   # Script de inicialização Windows
```

### 📂 Descrição dos Diretórios

| Pasta | Função | Conteúdo Típico |
|-------|--------|-----------------|
| `/html` | Interface do usuário | Estrutura HTML, elementos de formulário, modais |
| `/js` | Lógica de aplicação | Classes ES6+, manipulação de DOM, geração de Markdown |
| `/css` | Estilização | Variáveis CSS, tema dark, responsividade, animações |
| `/data` | Base de conhecimento | JSON com árvore de decisão, checklists, templates |
| `/favicon` | Assets visuais | Ícones, logos, manifestos |
| `/docs` | Documentação | Guias técnicos, API references |

---

## 3. Especificações Técnicas

### ⚙️ Motor de Lógica

O **ForjaEngine** processa a árvore de decisão através de triggers:

```javascript
// Fluxo de Processamento
Resposta do Usuário → Identifica Triggers → Ativa Seções → 
Coleta Checklists → Gera Markdown
```

**Exemplo de Trigger:**
```json
{
  "value": "web_app",
  "label": "Web Application", 
  "triggers": ["seguranca_autenticacao", "infra_escalabilidade"]
}
```

Quando o usuário seleciona "Web Application", automaticamente:
1. Seção **Segurança** é desbloqueada
2. Checklist de JWT/OAuth é preparado
3. Seção **Infraestrutura** recebe prioridade de escalabilidade

### 🛡️ Segurança por Design

| Camada | Mecanismo |
|--------|-----------|
| **Input Sanitization** | Todos os inputs são tratados como texto antes de renderização |
| **XSS Prevention** | Nenhuma injeção de script é possível via JSON (conteúdo escapado) |
| **CSRF-Free** | Zero requisições POST/DELETE — apenas fetch local de JSON estático |
| **CSP-Ready** | Estrutura preparada para Content Security Policy headers |

### ⚖️ Conformidade LGPD

**Privacidade por Arquitetura:**
- ✅ **Processamento Local**: Nenhum dado do usuário sai do navegador
- ✅ **Sem Persistência**: Respostas ficam apenas em `localStorage` (opcional)
- ✅ **Zero Identificação**: Não coleta IP, user-agent ou fingerprint
- ✅ **Exportação Controlada**: Markdown gerado é salvo localmente pelo usuário

---

## 4. Guia de Configuração (Setup)

### 🚀 Opção 1: VS Code + Live Server (Recomendado)

1. Instale a extensão **"Live Server"** (Ritwick Dey)
2. Clique em **"Go Live"** na barra de status inferior
3. Acesse `http://localhost:8080/html/`

### 🐍 Opção 2: Python Server

```bash
cd forja
python -m http.server 8080
```
Acesse: `http://localhost:8080/html/`

### 🪟 Opção 3: Windows (start.bat)

Duplo clique em `start.bat` — script detecta Python/Node automaticamente.

### 📝 Como Atualizar a Base de Conhecimento

1. Edite `data/knowledge-base.json`
2. Estrutura básica de uma seção:
```json
{
  "id": "nova_secao",
  "title": "Título",
  "questions": [
    {
      "id": "pergunta_id",
      "type": "single_choice",
      "question": "Texto da pergunta?",
      "options": [
        {"value": "opcao", "label": "Opção", "triggers": ["trigger_id"]}
      ]
    }
  ]
}
```
3. Recarregue o navegador (F5)

---

## 5. Identidade Visual

### 🎨 Sistema de Design

**Conceito:** Estilo minimalista técnico que reduz fadiga visual durante sessões longas de planejamento.

### Paleta de Cores

| Elemento | Cor | Hex | Uso |
|----------|-----|-----|-----|
| **Fundo Primário** | Dark | `#0d1117` | Background geral |
| **Fundo Secundário** | Dark+1 | `#161b22` | Cards e seções |
| **Cor Principal** | Hunter Green | `#355E3B` | Botões, destaques |
| **Cor Secundária** | Hunter Green Light | `#4a7c52` | Hover, bordas |
| **Texto Principal** | Off-white | `#e6edf3` | Headings |
| **Texto Secundário** | Cinza | `#8b949e` | Descrições |

### Por que Hunter Green?

- 🌿 **Redução de fadiga**: Verde é a cor mais fácil para os olhos humanos
- 🎯 **Concentração**: Tons de verde promovem foco em tarefas técnicas
- 🔗 **Metáfora**: Verde remete à natureza, crescimento e "forjamento orgânico"
- 🌙 **Dark mode**: Contraste ideal para desenvolvedores que trabalham à noite

### Tipografia

- **UI**: Inter (sans-serif moderno, ótima legibilidade em telas)
- **Código/Monospace**: JetBrains Mono (ligatures, alinhamento de caracteres)

---

## 6. Roadmap (Futuro)

### 🗺️ Versão 2.0 (Planejado)

| Feature | Descrição | Status |
|---------|-----------|--------|
| **Exportação PDF** | Geração de escopo em PDF formatado | 📋 Planejado |
| **Módulo de Orçamentação** | Estimativas de horas/custo baseado em escopo | 📋 Planejado |
| **Templates Customizáveis** | Usuário cria seus próprios templates de saída | 📋 Planejado |
| **Multi-língua** | Suporte a EN, ES além do PT-BR | 📋 Planejado |

### 🗺️ Versão 3.0 (Visão)

| Feature | Descrição | Status |
|---------|-----------|--------|
| **API REST** | Endpoint para geração de escopo via API | 🔮 Visão |
| **Integração GitHub** | Criar issues automaticamente do escopo | 🔮 Visão |
| **Módulo de Sprints** | Quebrar escopo em sprints automaticamente | 🔮 Visão |
| **Dashboard de Projetos** | Gerenciar múltiplos escopos salvos | 🔮 Visão |

---

## 7. Referências e Recursos

### 📚 Documentos Internos
- `/data/knowledge-base.json` — Estrutura completa da árvore de decisão
- `/js/script.js` — Implementação do ForjaEngine
- `/.vscode/settings.json` — Configuração de desenvolvimento

### 🔗 Recursos Externos
- [Inter Font](https://rsms.me/inter/)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- [Hunter Green Color](https://www.colorhexa.com/355e3b)
- [JSON Schema](https://json-schema.org/)

---

<p align="center">
  <strong>🔥 FORJA v1.0.0</strong><br>
  <em>Forjando o futuro, um escopo de cada vez.</em><br>
  <br>
  <sub>© 2026 WINSOFT / Mauricio Spark — All rights reserved.</sub><br>
  <sub>AUTHOR: Mauricio Spark | BRAND: WINSOFT | VERSION: 1.0.0</sub>
</p>

