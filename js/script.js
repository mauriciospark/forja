/**
 * AUTHOR: Mauricio Spark
 * PROJECT: FORJA
 * VERSION: 1.0.0
 * BRAND: WINSOFT
 * LINEAGE: SPARK
 * DESCRIPTION: Core logic and decision tree for project scoping.
 * COPYRIGHT: © 2026 WINSOFT / Mauricio Spark. All rights reserved.
 */

class ForjaEngine {
    constructor() {
        this.knowledgeBase = null;
        this.answers = {};
        this.activeTriggers = new Set();
        this.currentSection = 'fundacao';
        this.sections = ['fundacao', 'seguranca', 'lgpd', 'infraestrutura', 'resultado'];
        this.sectionIndex = 0;
        
        this.init();
    }

    async init() {
        try {
            const response = await fetch('../data/knowledge-base.json');
            this.knowledgeBase = await response.json();
            this.setupEventListeners();
            this.renderCurrentSection();
            this.updateProgress();
        } catch (error) {
            console.error('Erro ao carregar knowledge base:', error);
            this.showError('Erro ao carregar a base de conhecimento. Verifique se o arquivo data/knowledge-base.json existe.');
        }
    }

    setupEventListeners() {
        // Navegação
        document.getElementById('nextBtn').addEventListener('click', () => this.nextSection());
        document.getElementById('prevBtn').addEventListener('click', () => this.prevSection());
        
        // Navegação lateral
        document.querySelectorAll('.nav-section').forEach(section => {
            section.addEventListener('click', (e) => {
                if (!section.classList.contains('disabled')) {
                    const sectionId = section.dataset.section;
                    this.goToSection(sectionId);
                }
            });
        });

        // Modal
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
        document.getElementById('copyBtn').addEventListener('click', () => this.copyMarkdown());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadMarkdown());
        document.getElementById('restartBtn').addEventListener('click', () => this.restart());

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Fechar modal ao clicar fora
        document.getElementById('resultModal').addEventListener('click', (e) => {
            if (e.target.id === 'resultModal') {
                this.closeModal();
            }
        });
    }

    // ==================== NAVEGAÇÃO ====================

    nextSection() {
        if (this.currentSection === 'resultado') {
            this.generateResult();
            return;
        }

        const nextIndex = this.sectionIndex + 1;
        if (nextIndex < this.sections.length) {
            this.goToSection(this.sections[nextIndex]);
        }
    }

    prevSection() {
        const prevIndex = this.sectionIndex - 1;
        if (prevIndex >= 0) {
            this.goToSection(this.sections[prevIndex]);
        }
    }

    goToSection(sectionId) {
        if (sectionId === 'resultado') {
            this.generateResult();
            return;
        }

        this.currentSection = sectionId;
        this.sectionIndex = this.sections.indexOf(sectionId);
        
        this.updateNavigation();
        this.renderCurrentSection();
        this.updateProgress();
    }

    updateNavigation() {
        // Atualizar navegação lateral
        document.querySelectorAll('.nav-section').forEach(section => {
            section.classList.remove('active');
            if (section.dataset.section === this.currentSection) {
                section.classList.add('active');
            }
        });

        // Atualizar botões
        document.getElementById('prevBtn').disabled = this.sectionIndex === 0;
        
        const isLast = this.sectionIndex === this.sections.length - 2; // antes do resultado
        const nextBtn = document.getElementById('nextBtn');
        nextBtn.textContent = isLast ? 'Gerar Escopo' : 'Próximo';
        nextBtn.classList.toggle('btn-success', isLast);
    }

    updateProgress() {
        const completed = this.sections.filter(s => s !== 'resultado' && this.isSectionComplete(s)).length;
        const total = this.sections.length - 1;
        const percentage = Math.round((completed / total) * 100);
        
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        progressBar.style.setProperty('--progress', `${percentage}%`);
        progressBar.style.background = `linear-gradient(90deg, var(--hunter-green) 0%, var(--hunter-green-light) ${percentage}%, var(--bg-tertiary) ${percentage}%, var(--bg-tertiary) 100%)`;
        progressText.textContent = `${percentage}%`;
    }

    isSectionComplete(sectionId) {
        if (sectionId === 'resultado') return false;
        
        const section = this.knowledgeBase.sections[sectionId];
        if (!section || !section.questions) return true;
        
        // Verifica se pelo menos uma pergunta obrigatória foi respondida ou se há respostas
        const hasAnswers = section.questions.some(q => this.answers[q.id] !== undefined);
        return hasAnswers;
    }

    unlockSections() {
        // Desbloqueia seções baseado nos triggers ativos
        const securityTriggers = ['seguranca_autenticacao', 'seguranca_senha', 'seguranca_pagamento', 
                                 'seguranca_upload', 'seguranca_api', 'seguranca_websocket', 
                                 'seguranca_email', 'seguranca_api_externa', 'seguranca_autorizacao'];
        
        const lgpdTriggers = ['lgpd_dados', 'lgpd_financeiro', 'lgpd_comunicacao', 
                             'lgpd_localizacao', 'lgpd_completo'];
        
        const infraTriggers = ['infra_escalabilidade', 'infra_backend', 'infra_documentacao',
                              'infra_multi_tenant', 'infra_fila', 'infra_indexacao', 
                              'infra_storage', 'infra_dependencias'];

        const hasSecurity = securityTriggers.some(t => this.activeTriggers.has(t));
        const hasLgpd = lgpdTriggers.some(t => this.activeTriggers.has(t));
        const hasInfra = infraTriggers.some(t => this.activeTriggers.has(t)) || 
                         this.answers['projeto_tipo'] !== undefined;

        this.toggleSection('seguranca', hasSecurity);
        this.toggleSection('lgpd', hasLgpd);
        this.toggleSection('infraestrutura', hasInfra);
        
        // Resultado só se fundação estiver completa
        const fundacaoComplete = this.isSectionComplete('fundacao');
        this.toggleSection('resultado', fundacaoComplete);
    }

    toggleSection(sectionId, enabled) {
        const navSection = document.getElementById(`nav-${sectionId}`);
        if (navSection) {
            if (enabled) {
                navSection.classList.remove('disabled');
            } else {
                navSection.classList.add('disabled');
            }
        }
    }

    // ==================== RENDERIZAÇÃO ====================

    renderCurrentSection() {
        const section = this.knowledgeBase.sections[this.currentSection];
        if (!section) return;

        // Atualizar header
        document.getElementById('sectionTitle').textContent = section.title;
        document.getElementById('sectionDescription').textContent = section.description;

        // Renderizar perguntas
        const container = document.getElementById('questionsContainer');
        container.innerHTML = '';

        if (section.questions) {
            section.questions.forEach((question, index) => {
                const questionEl = this.renderQuestion(question, index);
                container.appendChild(questionEl);
            });
        }

        // Adicionar checklists se existirem
        if (section.checklists) {
            const activeChecklists = this.getActiveChecklists(section.checklists);
            if (activeChecklists.length > 0) {
                const checklistsEl = this.renderChecklists(activeChecklists);
                container.appendChild(checklistsEl);
            }
        }

        // Animação de entrada
        container.classList.add('fade-in');
        setTimeout(() => container.classList.remove('fade-in'), 300);
    }

    renderQuestion(question, index) {
        const card = document.createElement('div');
        card.className = `question-card ${question.required ? 'required' : ''}`;
        card.style.animationDelay = `${index * 0.05}s`;

        // Label
        const label = document.createElement('label');
        label.className = 'question-label';
        label.textContent = question.question;
        card.appendChild(label);

        // Input baseado no tipo
        const input = this.createInput(question);
        card.appendChild(input);

        return card;
    }

    createInput(question) {
        const type = question.type;
        const currentValue = this.answers[question.id];

        switch (type) {
            case 'text':
            case 'email':
                return this.createTextInput(question, currentValue);
            
            case 'textarea':
                return this.createTextareaInput(question, currentValue);
            
            case 'single_choice':
                return this.createSingleChoiceInput(question, currentValue);
            
            case 'multi_choice':
                return this.createMultiChoiceInput(question, currentValue);
            
            case 'boolean':
                return this.createBooleanInput(question, currentValue);
            
            case 'select':
                return this.createSelectInput(question, currentValue);
            
            default:
                return this.createTextInput(question, currentValue);
        }
    }

    createTextInput(question, value) {
        const input = document.createElement('input');
        input.type = question.type === 'email' ? 'email' : 'text';
        input.placeholder = question.placeholder || '';
        input.value = value || '';
        
        input.addEventListener('input', (e) => {
            this.setAnswer(question.id, e.target.value);
            this.updateSectionStatus(this.currentSection);
        });

        return input;
    }

    createTextareaInput(question, value) {
        const textarea = document.createElement('textarea');
        textarea.placeholder = question.placeholder || '';
        textarea.value = value || '';
        
        textarea.addEventListener('input', (e) => {
            this.setAnswer(question.id, e.target.value);
            this.updateSectionStatus(this.currentSection);
        });

        return textarea;
    }

    createSingleChoiceInput(question, value) {
        const container = document.createElement('div');
        container.className = 'options-list';

        question.options.forEach(option => {
            const item = document.createElement('label');
            item.className = 'option-item';
            if (value === option.value) {
                item.classList.add('selected');
            }

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = question.id;
            radio.value = option.value;
            radio.checked = value === option.value;

            const text = document.createElement('div');
            text.className = 'option-text';
            text.innerHTML = `<strong>${option.label}</strong>`;

            item.appendChild(radio);
            item.appendChild(text);

            item.addEventListener('click', () => {
                // Remover seleção de outros
                container.querySelectorAll('.option-item').forEach(el => {
                    el.classList.remove('selected');
                    el.querySelector('input').checked = false;
                });
                
                // Adicionar seleção atual
                item.classList.add('selected');
                radio.checked = true;
                
                this.setAnswer(question.id, option.value);
                this.processTriggers(option.triggers);
                this.unlockSections();
                this.updateSectionStatus(this.currentSection);
                this.updateProgress();
            });

            container.appendChild(item);
        });

        return container;
    }

    createMultiChoiceInput(question, value) {
        const container = document.createElement('div');
        container.className = 'options-list';
        
        const currentValues = value || [];

        question.options.forEach(option => {
            const item = document.createElement('label');
            item.className = 'option-item';
            if (currentValues.includes(option.value)) {
                item.classList.add('selected');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = option.value;
            checkbox.checked = currentValues.includes(option.value);

            const text = document.createElement('div');
            text.className = 'option-text';
            text.innerHTML = `<strong>${option.label}</strong>`;
            if (option.description) {
                text.innerHTML += `<div class="option-description">${option.description}</div>`;
            }

            item.appendChild(checkbox);
            item.appendChild(text);

            item.addEventListener('click', (e) => {
                // Evitar duplo toggle quando clica no checkbox
                if (e.target === checkbox) return;
                
                checkbox.checked = !checkbox.checked;
                item.classList.toggle('selected', checkbox.checked);
                
                const newValues = Array.from(container.querySelectorAll('input:checked'))
                    .map(cb => cb.value);
                
                this.setAnswer(question.id, newValues);
                this.processTriggers(option.triggers || [], checkbox.checked);
                this.unlockSections();
                this.updateSectionStatus(this.currentSection);
                this.updateProgress();
            });

            checkbox.addEventListener('change', () => {
                item.classList.toggle('selected', checkbox.checked);
                
                const newValues = Array.from(container.querySelectorAll('input:checked'))
                    .map(cb => cb.value);
                
                this.setAnswer(question.id, newValues);
                this.processTriggers(option.triggers || [], checkbox.checked);
                this.unlockSections();
                this.updateSectionStatus(this.currentSection);
                this.updateProgress();
            });

            container.appendChild(item);
        });

        return container;
    }

    createBooleanInput(question, value) {
        const container = document.createElement('div');
        container.className = 'boolean-toggle';

        const toggle = document.createElement('div');
        toggle.className = `toggle-switch ${value ? 'active' : ''}`;

        const label = document.createElement('span');
        label.className = 'toggle-label';
        label.textContent = value ? 'Sim' : 'Não';

        toggle.addEventListener('click', () => {
            const newValue = !toggle.classList.contains('active');
            toggle.classList.toggle('active');
            label.textContent = newValue ? 'Sim' : 'Não';
            
            this.setAnswer(question.id, newValue);
            this.processTriggers(question.triggers || [], newValue);
            this.unlockSections();
            this.updateSectionStatus(this.currentSection);
            this.updateProgress();
        });

        container.appendChild(toggle);
        container.appendChild(label);

        return container;
    }

    createSelectInput(question, value) {
        const select = document.createElement('select');
        
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecione uma opção...';
        select.appendChild(defaultOption);

        question.options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            select.appendChild(opt);
        });

        select.value = value || '';

        select.addEventListener('change', (e) => {
            const selectedOption = question.options.find(o => o.value === e.target.value);
            this.setAnswer(question.id, e.target.value);
            if (selectedOption && selectedOption.triggers) {
                this.processTriggers(selectedOption.triggers);
            }
            this.unlockSections();
            this.updateSectionStatus(this.currentSection);
            this.updateProgress();
        });

        return select;
    }

    processTriggers(triggers, isActive = true) {
        if (!triggers) return;
        
        triggers.forEach(trigger => {
            if (isActive) {
                this.activeTriggers.add(trigger);
            } else {
                this.activeTriggers.delete(trigger);
            }
        });
    }

    getActiveChecklists(checklists) {
        const active = [];
        
        // Verifica checklists baseados em triggers
        for (const [key, items] of Object.entries(checklists)) {
            // Checklist padrão sempre incluir
            if (key === 'lgpd_basico' && this.activeTriggers.has('lgpd_dados')) {
                active.push({ title: 'Checklist LGPD Básico', items });
            } else if (key === 'lgpd_avancado' && this.activeTriggers.has('lgpd_completo')) {
                active.push({ title: 'Checklist LGPD Avançado', items });
            } else if (this.activeTriggers.has(key)) {
                active.push({ title: this.formatChecklistTitle(key), items });
            }
        }
        
        return active;
    }

    formatChecklistTitle(key) {
        const titles = {
            'checklist_jwt': 'JWT - Checklist de Segurança',
            'checklist_oauth': 'OAuth 2.0 - Checklist',
            'checklist_sessao': 'Sessões - Checklist',
            'checklist_mfa': 'Multi-Fator (MFA) - Checklist',
            'checklist_api_key': 'API Keys - Checklist',
            'checklist_rotacao_segredos': 'Rotação de Segredos - Checklist',
            'checklist_aws': 'AWS - Checklist de Configuração',
            'checklist_gcp': 'GCP - Checklist',
            'checklist_azure': 'Azure - Checklist',
            'checklist_vercel': 'Vercel - Checklist',
            'checklist_netlify': 'Netlify - Checklist',
            'checklist_heroku': 'Heroku - Checklist',
            'checklist_do': 'DigitalOcean - Checklist',
            'checklist_onpremise': 'On-premise - Checklist',
            'checklist_multicloud': 'Multi-cloud - Checklist'
        };
        return titles[key] || 'Checklist';
    }

    renderChecklists(checklists) {
        const container = document.createElement('div');
        container.className = 'checklists-wrapper';

        checklists.forEach(checklist => {
            const el = document.createElement('div');
            el.className = 'checklist-container';
            
            const title = document.createElement('h4');
            title.textContent = checklist.title;
            el.appendChild(title);
            
            const ul = document.createElement('ul');
            checklist.items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            });
            el.appendChild(ul);
            
            container.appendChild(el);
        });

        return container;
    }

    // ==================== GERENCIAMENTO DE ESTADO ====================

    setAnswer(questionId, value) {
        this.answers[questionId] = value;
        
        // Salvar no localStorage
        localStorage.setItem('forja_answers', JSON.stringify(this.answers));
    }

    updateSectionStatus(sectionId) {
        const statusEl = document.getElementById(`status-${sectionId}`);
        const navEl = document.getElementById(`nav-${sectionId}`);
        
        if (this.isSectionComplete(sectionId)) {
            if (statusEl) statusEl.textContent = '✓';
            if (statusEl) statusEl.classList.add('completed');
            if (navEl) navEl.classList.add('completed');
        }
    }

    // ==================== GERAÇÃO DE RESULTADO ====================

    generateResult() {
        const markdown = this.buildMarkdown();
        
        // Atualizar preview
        document.getElementById('previewContent').innerHTML = this.markdownToHtml(markdown);
        document.getElementById('markdownOutput').value = markdown;
        
        // Abrir modal
        document.getElementById('resultModal').classList.add('active');
        
        // Atualizar status
        this.updateSectionStatus('resultado');
    }

    buildMarkdown() {
        const templates = this.knowledgeBase.output_templates;
        let markdown = '';

        // Header
        const nome = this.answers['projeto_nome'] || 'Projeto';
        const objetivo = this.answers['projeto_objetivo'] || 'Objetivo não definido';
        
        markdown += templates.readme_header
            .replace('{nome_projeto}', nome)
            .replace('{objetivo}', objetivo);

        // Fundação
        const tipoProjeto = this.getOptionLabel('projeto_tipo', this.answers['projeto_tipo']);
        const publico = this.answers['publico_alvo'] || 'Não definido';
        const funcionalidades = this.formatMultiChoice('funcionalidades_core');
        
        markdown += templates.section_fundacao
            .replace('{tipo_projeto}', tipoProjeto)
            .replace('{publico}', publico)
            .replace('{funcionalidades}', funcionalidades);

        // Segurança (se tiver triggers)
        if (this.activeTriggers.has('seguranca_autenticacao') || 
            this.answers['tipo_autenticacao'] ||
            this.answers['criptografia_dados'] ||
            this.answers['protecoes_seguranca']) {
            
            const autenticacao = this.getOptionLabel('tipo_autenticacao', this.answers['tipo_autenticacao']) || 'Não definido';
            const criptografia = this.formatMultiChoice('criptografia_dados') || 'Nenhuma';
            const protecoes = this.formatMultiChoice('protecoes_seguranca') || 'Nenhuma';
            const checklistsSeg = this.formatActiveChecklists(['checklist_jwt', 'checklist_oauth', 'checklist_sessao', 'checklist_mfa', 'checklist_api_key']);
            
            markdown += templates.section_seguranca
                .replace('{autenticacao}', autenticacao)
                .replace('{criptografia}', criptografia)
                .replace('{protecoes}', protecoes)
                .replace('{checklists_seguranca}', checklistsSeg);
        }

        // LGPD
        if (this.activeTriggers.has('lgpd_dados') || this.answers['dados_coletados']) {
            const dadosColetados = this.formatMultiChoice('dados_coletados') || 'Nenhum';
            const baseLegal = this.getOptionLabel('base_legal', this.answers['base_legal']) || 'Não definida';
            const direitos = this.formatMultiChoice('direitos_titular') || 'Nenhum';
            const checklistLgpd = this.formatActiveChecklists(['lgpd_basico', 'lgpd_avancado']);
            
            markdown += templates.section_lgpd
                .replace('{dados_coletados}', dadosColetados)
                .replace('{base_legal}', baseLegal)
                .replace('{direitos}', direitos)
                .replace('{checklist_lgpd}', checklistLgpd);
        }

        // Infraestrutura
        if (this.answers['plataforma_hospedagem']) {
            const plataforma = this.getOptionLabel('plataforma_hospedagem', this.answers['plataforma_hospedagem']);
            const banco = this.formatMultiChoice('banco_dados') || 'Não definido';
            const deploy = this.formatMultiChoice('estrategia_deploy') || 'Não definido';
            const monitoramento = this.formatMultiChoice('monitoramento') || 'Nenhum';
            const checklistsInfra = this.formatActiveChecklists(['checklist_aws', 'checklist_vercel', 'checklist_docker', 'checklist_cicd']);
            
            markdown += templates.section_infra
                .replace('{plataforma}', plataforma)
                .replace('{banco}', banco)
                .replace('{deploy}', deploy)
                .replace('{monitoramento}', monitoramento)
                .replace('{checklists_infra}', checklistsInfra);
        }

        // Adicionar seção de próximos passos
        markdown += this.buildNextSteps();

        return markdown;
    }

    buildNextSteps() {
        let steps = '\n## Próximos Passos\n\n';
        steps += '### Checklist de Implementação\n\n';
        steps += '- [ ] Configurar ambiente de desenvolvimento\n';
        steps += '- [ ] Definir arquitetura de pastas/estrutura do projeto\n';
        steps += '- [ ] Configurar controle de versão (Git)\n';
        
        if (this.answers['tipo_autenticacao']) {
            steps += '- [ ] Implementar sistema de autenticação\n';
        }
        if (this.answers['banco_dados']) {
            steps += '- [ ] Configurar banco de dados\n';
        }
        if (this.activeTriggers.has('lgpd_dados')) {
            steps += '- [ ] Criar política de privacidade\n';
            steps += '- [ ] Implementar consentimentos LGPD\n';
        }
        if (this.answers['plataforma_hospedagem']) {
            steps += '- [ ] Configurar ambiente de produção\n';
            steps += '- [ ] Configurar CI/CD\n';
        }
        
        steps += '- [ ] Documentar API (se aplicável)\n';
        steps += '- [ ] Criar testes automatizados\n';
        steps += '- [ ] Revisão de segurança\n';
        steps += '- [ ] Deploy para staging\n';
        steps += '- [ ] Testes de aceitação\n';
        steps += '- [ ] Deploy para produção\n';
        
        steps += '\n---\n\n';
        steps += '> Escopo gerado por [FORJA](https://github.com/seu-usuario/forja) - Forjando projetos robustos 🔥\n';
        
        return steps;
    }

    formatMultiChoice(questionId) {
        const values = this.answers[questionId];
        if (!values || !Array.isArray(values) || values.length === 0) {
            return '';
        }

        // Encontrar a questão para pegar os labels
        let question = null;
        for (const section of Object.values(this.knowledgeBase.sections)) {
            if (section.questions) {
                question = section.questions.find(q => q.id === questionId);
                if (question) break;
            }
        }

        if (!question || !question.options) {
            return values.join(', ');
        }

        const labels = values.map(v => {
            const option = question.options.find(o => o.value === v);
            return option ? option.label : v;
        });

        return labels.map(l => `- ${l}`).join('\n');
    }

    getOptionLabel(questionId, value) {
        if (!value) return '';

        let question = null;
        for (const section of Object.values(this.knowledgeBase.sections)) {
            if (section.questions) {
                question = section.questions.find(q => q.id === questionId);
                if (question) break;
            }
        }

        if (!question || !question.options) {
            return value;
        }

        const option = question.options.find(o => o.value === value);
        return option ? option.label : value;
    }

    formatActiveChecklists(checklistKeys) {
        const items = [];
        
        checklistKeys.forEach(key => {
            if (this.activeTriggers.has(key)) {
                const section = Object.values(this.knowledgeBase.sections)
                    .find(s => s.checklists && s.checklists[key]);
                
                if (section && section.checklists[key]) {
                    const title = this.formatChecklistTitle(key);
                    items.push(`\n**${title}:**`);
                    section.checklists[key].forEach(item => {
                        items.push(`- [ ] ${item}`);
                    });
                }
            }
        });

        return items.join('\n') || 'Nenhum checklist específico ativo.';
    }

    markdownToHtml(markdown) {
        // Conversão simples de Markdown para HTML
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            // Checkboxes
            .replace(/- \[ \] (.*$)/gim, '<div class="checkbox-item"><input type="checkbox" disabled> $1</div>')
            .replace(/- \[x\] (.*$)/gim, '<div class="checkbox-item"><input type="checkbox" checked disabled> $1</div>')
            // Listas
            .replace(/^\- (.*$)/gim, '<li>$1</li>')
            .replace(/(<li>.*<\/li>\n)+/gim, '<ul>$&</ul>')
            // Código inline
            .replace(/`([^`]+)`/gim, '<code>$1</code>')
            // Código em bloco
            .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
            // Parágrafos
            .replace(/\n\n/gim, '</p><p>')
            // Quebras de linha
            .replace(/\n/gim, '<br>');

        return `<p>${html}</p>`;
    }

    // ==================== AÇÕES DO MODAL ====================

    switchTab(tabId) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        document.getElementById(`${tabId}Pane`).classList.add('active');
    }

    closeModal() {
        document.getElementById('resultModal').classList.remove('active');
    }

    async copyMarkdown() {
        const markdown = document.getElementById('markdownOutput').value;
        
        try {
            await navigator.clipboard.writeText(markdown);
            const btn = document.getElementById('copyBtn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Copiado!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('Erro ao copiar:', err);
            alert('Erro ao copiar. Selecione e copie manualmente.');
        }
    }

    downloadMarkdown() {
        const markdown = document.getElementById('markdownOutput').value;
        const nome = this.answers['projeto_nome'] || 'escopo';
        
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `README-${nome.toLowerCase().replace(/\s+/g, '-')}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    restart() {
        if (confirm('Tem certeza que deseja começar um novo projeto? Todas as respostas serão perdidas.')) {
            this.answers = {};
            this.activeTriggers.clear();
            this.currentSection = 'fundacao';
            this.sectionIndex = 0;
            localStorage.removeItem('forja_answers');
            
            // Resetar navegação
            document.querySelectorAll('.nav-section').forEach(section => {
                section.classList.remove('completed', 'active');
                if (section.dataset.section !== 'fundacao') {
                    section.classList.add('disabled');
                }
            });
            document.querySelector('[data-section="fundacao"]').classList.add('active');
            
            // Resetar status
            document.querySelectorAll('.nav-status').forEach(status => {
                status.textContent = '○';
                status.classList.remove('completed');
            });
            
            this.closeModal();
            this.renderCurrentSection();
            this.updateProgress();
        }
    }

    showError(message) {
        const container = document.getElementById('questionsContainer');
        container.innerHTML = `
            <div class="question-card" style="border-color: var(--accent-red);">
                <h3 style="color: var(--accent-red);">Erro</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    window.forja = new ForjaEngine();
});
