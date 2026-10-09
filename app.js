
/* =========================================================
   PAYMENTS MANAGER — APP.JS
   Roadmap, métricas, homologação e navegação
   ========================================================= */

"use strict";

/* =========================================================
   1. DADOS DO ROADMAP
   ========================================================= */

const sprintData = [
  { id: 1, fase: "F0 + MVP", release: "R1", nome: "Fundação técnica I", inicio: 1, fim: 2, historias: 8, sp: 37.5, objetivo: "Prepara a base técnica do sistema para o restante do projeto.", entregas: "Estrutura do backend e frontend; ambiente de desenvolvimento; multitenancy; login com MFA; auditoria e logs; armazenamento imutável de dados." },
  { id: 2, fase: "F0 + MVP", release: "R2", nome: "Fundação técnica II", inicio: 3, fim: 4, historias: 19, sp: 89.5, objetivo: "Completa a infraestrutura e habilita serviços essenciais.", entregas: "Integração contínua e testes automatizados; permissões e perfis de acesso; criptografia e gestão de chaves; ambientes de desenvolvimento, homologação e produção; observabilidade e logs; catálogos regulatórios e base de dados." },
  { id: 3, fase: "F0 + MVP", release: "R3", nome: "Núcleo do DTE", inicio: 5, fim: 6, historias: 12, sp: 82, objetivo: "Implementa o núcleo do pagaré eletrônico com validações e assinaturas.", entregas: "Catálogo de estados e eventos; XML validado (XSD); motor de assinatura digital; integração com serviço de selo; cadastro de clientes e contratos; modelo de contrato e parcelas." },
  { id: 4, fase: "F0 + MVP", release: "R4", nome: "Evidências e pagamentos", inicio: 7, fim: 8, historias: 17, sp: 101, objetivo: "Habilita o registro de evidências e a base de pagamentos.", entregas: "Registro de evidências e auditoria; modelo de dados monetários; armazenamento seguro de arquivos; base para conciliação de pagamentos; ambiente mais robusto e monitorado." },
  { id: 5, fase: "F0 + MVP", release: "R5", nome: "Emissão ponta a ponta e atos dispositivos", inicio: 9, fim: 10, historias: 14, sp: 90, objetivo: "Entrega o fluxo completo de emissão do pagaré eletrônico.", entregas: "Emissão do DTE; assinatura pelo devedor; geração do PDF/A; validação e preservação do documento; histórico de eventos; atos dispositivos (ex.: endosso)." },
  { id: 6, fase: "F0 + MVP", release: "R6", nome: "Restrições, plataforma e saída", inicio: 11, fim: 12, historias: 18, sp: 97.5, objetivo: "Implementa controles de restrições e os canais de consulta.", entregas: "Bloqueios e cancelamentos; regras de restrição; portal de consulta pública; APIs de integração; notificações de eventos; saída de dados e serviços externos." },
  { id: 7, fase: "F0 + MVP", release: "R7", nome: "Robustez e conformidade", inicio: 13, fim: 14, historias: 14, sp: 98, objetivo: "Reforça a segurança, observabilidade e os requisitos regulatórios.", entregas: "Testes de segurança; trilhas de auditoria completas; relatórios de rastreabilidade; conformidade regulatória; melhorias de desempenho; documentação e evidências operacionais." },
  { id: 8, fase: "F0 + MVP", release: "R8", nome: "Fechamento dos fluxos", inicio: 15, fim: 16, historias: 18, sp: 95, objetivo: "Consolida os fluxos principais da operação.", entregas: "Fluxos de contrato, parcelas e pagamentos completos; endosso e transferência de titularidade; conciliação bancária; tratamento de exceções; relatórios e painéis de gestão; integrações estabilizadas." },
  { id: 9, fase: "F0 + MVP", release: "R9", nome: "Acabamento para a entrada em produção", inicio: 17, fim: 18, historias: 21, sp: 79.5, objetivo: "Deixa o sistema pronto para operar no BASA.", entregas: "Ajustes finais de usabilidade; correções e estabilização; preparação para o ambiente de produção; treinamento e documentação; operação assistida e suporte inicial." },
  { id: 10, fase: "F2", release: "R10", nome: "F2 I — Carteira e migração", inicio: 19, fim: 20, historias: 12, sp: 86.5, objetivo: "Evolui a gestão de carteira e viabiliza a migração de dados.", entregas: "Gestão avançada de carteira de crédito; processos de migração de dados; funcionalidades de apoio à operação; melhorias de integração e desempenho." },
  { id: 11, fase: "F2", release: "R11", nome: "F2 II — Complementos", inicio: 21, fim: 22, historias: 14, sp: 67.5, objetivo: "Entrega os complementos e as funcionalidades finais da F2.", entregas: "Funcionalidades complementares; melhorias pós-produção; aprimoramentos em relatórios e integrações; encerramento do escopo planejado." }
];

const roadmapTotals = {
  historias: 167,
  storyPoints: 924,
  sprints: 11,
  semanas: 22,
  mvpHistorias: 141,
  mvpStoryPoints: 770,
  mvpSprints: 9,
  mvpSemanas: 18,
  f2Historias: 26,
  f2StoryPoints: 154,
  f2Sprints: 2,
  f2Semanas: 4
};

/* =========================================================
   2. PREMISSAS DO PROJETO
   ========================================================= */

const assumptions = [
  {
    titulo: "Equipe de desenvolvimento",
    valor: "4 desenvolvedores",
    descricao: "Planejamento dimensionado para uma equipe de quatro desenvolvedores."
  },
  {
    titulo: "Duração da sprint",
    valor: "2 semanas",
    descricao: "Cada sprint representa um ciclo de desenvolvimento de duas semanas."
  },
  {
    titulo: "Estratégia de releases",
    valor: "1 release por sprint",
    descricao: "Cada sprint prevê uma entrega identificada por uma release."
  },
  {
    titulo: "Apoio ao desenvolvimento",
    valor: "Claude Code",
    descricao: "A estimativa considera o uso da ferramenta como apoio ao desenvolvimento."
  },
  {
    titulo: "Fase F0 + MVP",
    valor: "18 semanas",
    descricao: "Nove sprints para o conjunto inicial de entregas."
  },
  {
    titulo: "Fase F2",
    valor: "4 semanas",
    descricao: "Duas sprints adicionais para as evoluções previstas."
  },
  {
    titulo: "Homologação",
    valor: "Fora do backlog",
    descricao: "Atividades regulatórias, jurídicas, operacionais e de contratação não compõem os story points de desenvolvimento."
  }
];

/* =========================================================
   3. ATIVIDADES DE HOMOLOGAÇÃO
   ========================================================= */

const homologacaoData = [
  {
    "id": "H01",
    "categoria": "Regulatório",
    "etapa": "Pedido de habilitación da SOSDocs como PSDTE (formulário FOR-DTE-01)",
    "responsavel": "Compliance + Jurídico",
    "quando": "Preparar desde a R1; protocolar quando a documentação operativa estiver pronta",
    "referencia": "Art. 11–14; Q-94"
  },
  {
    "id": "H02",
    "categoria": "Regulatório",
    "etapa": "Contratar o OEC credenciado e passar pela avaliação (matriz do Anexo 6)",
    "responsavel": "Compliance",
    "quando": "Contratar até a R5; avaliação depois da R9",
    "referencia": "Art. 14; Anexo 6"
  },
  {
    "id": "H03",
    "categoria": "Regulatório",
    "etapa": "Homologação do Sistema PSDTE e publicação da resolução de habilitación",
    "responsavel": "MIC/DGCE (acompanhamento: Compliance)",
    "quando": "Antes do primeiro pagaré em produção",
    "referencia": "Art. 11–14; Art. 29; Q-48"
  },
  {
    "id": "H04",
    "categoria": "Regulatório",
    "etapa": "Comunicar à DGCE cada prestador de suporte crítico (nuvem, HSM, TSA, assinatura, SMS)",
    "responsavel": "Compliance + Tech",
    "quando": "Antes de usar cada prestador em produção",
    "referencia": "Art. 15"
  },
  {
    "id": "H05",
    "categoria": "Regulatório",
    "etapa": "Confirmar se existe suíte de conformidade do OEC e se precisamos entregar um corpus de exemplos",
    "responsavel": "Compliance",
    "quando": "Até a R4",
    "referencia": "Q-118"
  },
  {
    "id": "H06",
    "categoria": "Regulatório",
    "etapa": "Depois da produção: submeter cada mudança substancial à DGCE antes de implantar",
    "responsavel": "Compliance + Tech",
    "quando": "Contínuo",
    "referencia": "Art. 26"
  },
  {
    "id": "H07",
    "categoria": "Documentação",
    "etapa": "Declaração de práticas (DPS), políticas e procedimentos",
    "responsavel": "Compliance + Jurídico",
    "quando": "Rascunho até a R6; versão final antes do pedido de habilitación",
    "referencia": "Art. 22–29"
  },
  {
    "id": "H08",
    "categoria": "Documentação",
    "etapa": "Perfil DTE do pagaré, catálogo de estados e eventos, tabela de assinaturas por ato",
    "responsavel": "Compliance + PO + Tech",
    "quando": "Junto com as decisões de layout e catálogo (até a R3)",
    "referencia": "Art. 42; 50; 52"
  },
  {
    "id": "H09",
    "categoria": "Documentação",
    "etapa": "Plano de continuidade e de resposta a incidentes",
    "responsavel": "Tech + Compliance",
    "quando": "Até a R8",
    "referencia": "Anexo 7"
  },
  {
    "id": "H10",
    "categoria": "Segurança",
    "etapa": "Pentest externo: contratar empresa, executar, corrigir os achados e reexecutar (no backlog só entra a varredura automática na CI)",
    "responsavel": "Tech",
    "quando": "Contratar até a R7; executar entre a R9 e a produção",
    "referencia": "Q-79"
  },
  {
    "id": "H11",
    "categoria": "Segurança",
    "etapa": "Cerimônia de geração da chave do selo do PSDTE, com custódia dividida entre vários responsáveis",
    "responsavel": "Tech + Compliance",
    "quando": "Depois de contratar o HSM ou selo remoto, antes da produção",
    "referencia": "BR-SEC-37"
  },
  {
    "id": "H12",
    "categoria": "Segurança",
    "etapa": "Pessoas: checagem de antecedentes, termo de confidencialidade e treinamento de segurança na entrada e anual",
    "responsavel": "RH + Compliance",
    "quando": "Antes de qualquer acesso à produção",
    "referencia": "Art. 77; BR-SEC-11"
  },
  {
    "id": "H13",
    "categoria": "Segurança",
    "etapa": "Simulações de incidente, de mesa e técnicas",
    "responsavel": "Tech + Compliance",
    "quando": "Antes da produção e depois periodicamente",
    "referencia": "Anexo 7"
  },
  {
    "id": "H14",
    "categoria": "Segurança",
    "etapa": "Revisão dos controles de segurança: anual, e semestral para os críticos",
    "responsavel": "Compliance",
    "quando": "Primeira antes da avaliação do OEC",
    "referencia": "Art. 87"
  },
  {
    "id": "H15",
    "categoria": "Segurança",
    "etapa": "Certificações da empresa (ISO 27001, SOC 2), se exigidas pelo banco ou pelo OEC",
    "responsavel": "Diretoria + Compliance",
    "quando": "Decidir até a R3",
    "referencia": "Q-63"
  },
  {
    "id": "H16",
    "categoria": "Operação",
    "etapa": "Exercícios de restauração (trimestral) e de failover (semestral), com tempos medidos (o mecanismo de backup é história; o exercício é rotina)",
    "responsavel": "Tech / operação",
    "quando": "Primeiro antes da produção",
    "referencia": "Anexo 7; BR-SEC-19"
  },
  {
    "id": "H17",
    "categoria": "Operação",
    "etapa": "Coletar certificados e relatórios SOC do provedor de nuvem",
    "responsavel": "Tech + Compliance",
    "quando": "Anual",
    "referencia": "BR-SEC-03"
  },
  {
    "id": "H18",
    "categoria": "Contratos e compras",
    "etapa": "Hospedagem e região",
    "responsavel": "Diretoria + Tech",
    "quando": "Antes da R1 (sem isso não há ambiente online)",
    "referencia": "Q-12"
  },
  {
    "id": "H19",
    "categoria": "Contratos e compras",
    "etapa": "Provedor de assinatura qualificada e assinatura de uso único com prova de vida (OneShot)",
    "responsavel": "Diretoria + Tech",
    "quando": "Até a R4",
    "referencia": "Q-06; Q-67"
  },
  {
    "id": "H20",
    "categoria": "Contratos e compras",
    "etapa": "Certificado de selo do PSDTE, HSM ou selo remoto, e carimbo de tempo qualificado",
    "responsavel": "Diretoria + Tech",
    "quando": "Até a R4",
    "referencia": "Q-07"
  },
  {
    "id": "H21",
    "categoria": "Contratos e compras",
    "etapa": "Contratos com cada prestador de suporte crítico (SLA, auditoria, continuidade, saída)",
    "responsavel": "Jurídico",
    "quando": "Junto com cada contratação",
    "referencia": "Art. 15"
  },
  {
    "id": "H22",
    "categoria": "Contratos e compras",
    "etapa": "Aditivo ao contrato SaaS com o BASA (itens da Res. BCP 10/2022)",
    "responsavel": "Jurídico + Comercial",
    "quando": "Antes do aviso do banco à Superintendência",
    "referencia": "Res. BCP 10/2022, Art. 6; Q-64"
  },
  {
    "id": "H23",
    "categoria": "Jurídico",
    "etapa": "Parecer sobre a admissibilidade das evidências em juízo",
    "responsavel": "Jurídico",
    "quando": "Antes da produção",
    "referencia": "Q-61"
  },
  {
    "id": "H24",
    "categoria": "Jurídico",
    "etapa": "Procedimento de cessação aprovado pelo MIC",
    "responsavel": "Jurídico + Compliance",
    "quando": "Antes da habilitación",
    "referencia": "Q-62"
  },
  {
    "id": "H25",
    "categoria": "Jurídico",
    "etapa": "Divisão de obrigações entre banco e PSDTE",
    "responsavel": "Jurídico",
    "quando": "Até a R3",
    "referencia": "Q-64"
  },
  {
    "id": "H26",
    "categoria": "Jurídico",
    "etapa": "Proteção de dados e sigilo bancário no validador pago (o validador pago é F2)",
    "responsavel": "Jurídico",
    "quando": "Até a R6",
    "referencia": "Q-80; Q-70"
  },
  {
    "id": "H27",
    "categoria": "Jurídico",
    "etapa": "Obter as fontes normativas que faltam (FOR-DTE-01, Res. MIC 0391/2026 aprovada, Res. MIC 0760/2025, Decreto 7576/2022, DOC-ICPP-06, Ley 6822/2021)",
    "responsavel": "Jurídico + Philipe",
    "quando": "Já orientam a homologação",
    "referencia": "Q-94"
  },
  {
    "id": "H28",
    "categoria": "BASA e prontidão",
    "etapa": "Aviso do BASA à Superintendência de Bancos, com pelo menos 30 dias úteis de antecedência, e diligência de terceirização do banco",
    "responsavel": "BASA (apoio: Compliance SOSDocs com o pacote de supervisão)",
    "quando": "Pelo menos 30 dias úteis antes da produção",
    "referencia": "Res. BCP 10/2022, Art. 8"
  },
  {
    "id": "H29",
    "categoria": "BASA e prontidão",
    "etapa": "Homologação funcional pelo BASA (UAT)",
    "responsavel": "BASA + PO",
    "quando": "Depois da R9 (1 a 2 sprints de estabilização)",
    "referencia": ""
  },
  {
    "id": "H30",
    "categoria": "Trabalho humano no backlog",
    "etapa": "DPIA da biometria do OneShot (E12-14)",
    "responsavel": "Jurídico",
    "quando": "",
    "referencia": "E12-14",
    "software": "Insumos técnicos",
    "parteHumana": "Análise e conclusão pelo Jurídico"
  },
  {
    "id": "H31",
    "categoria": "Trabalho humano no backlog",
    "etapa": "Inventário de dados pessoais (E12-13)",
    "responsavel": "",
    "quando": "",
    "referencia": "E12-13",
    "software": "Classificação no código",
    "parteHumana": "Validação legal"
  },
  {
    "id": "H32",
    "categoria": "Trabalho humano no backlog",
    "etapa": "Matriz de compliance (E10-6, F2)",
    "responsavel": "OEC",
    "quando": "",
    "referencia": "E10-6; F2",
    "software": "Tela e rastreabilidade com os testes",
    "parteHumana": "Avaliação linha a linha com o OEC. Recomendação: antecipar a matriz para o MVP, porque o OEC avalia com ela."
  }
];

/* Disponibiliza os dados para outros scripts da página. */
window.sprintData = sprintData;
window.assumptions = assumptions;
window.homologacaoData = homologacaoData;
window.roadmapTotals = roadmapTotals;

/* =========================================================
   4. FUNÇÕES UTILITÁRIAS
   ========================================================= */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const formatRoadmapNumber = (value) => new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(value);

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function setHTML(id, html) {
  const element = document.getElementById(id);
  if (element) element.innerHTML = html;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getCategoryClass(category) {
  return normalizeText(category)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* =========================================================
   5. NAVEGAÇÃO ENTRE ABAS
   ========================================================= */

function showTab(tabId) {
  const target = document.getElementById(tabId);

  if (!target || !target.classList.contains("tab-panel")) {
    return;
  }

  $$(".tab-panel").forEach((panel) => {
    const active = panel.id === tabId;
    panel.classList.toggle("active", active);
    panel.classList.toggle("hidden", !active);
    panel.hidden = !active;
    panel.setAttribute("aria-hidden", String(!active));
  });

  $$("[data-tab]").forEach((button) => {
    const active = button.dataset.tab === tabId;

    button.classList.toggle("active", active);
    button.classList.toggle("nav-item-ativo", active);
    button.classList.toggle("nav-item-inativo", !active);

    if (active) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  document.body.dataset.activeTab = tabId;

  closeMobileMenu();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

window.showTab = showTab;

function closeMobileMenu() {
  const overlay = $("#mobileNavOverlay");
  const sidebar = $("#sideNav");

  overlay?.classList.add("hidden");
  overlay?.classList.remove("active");
  sidebar?.classList.remove("mobile-aberto");
  $("#mobileMenuBtn")?.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
}

function openMobileMenu() {
  const overlay = $("#mobileNavOverlay");
  const sidebar = $("#sideNav");

  overlay?.classList.remove("hidden");
  overlay?.classList.add("active");
  sidebar?.classList.add("mobile-aberto");
  $("#mobileMenuBtn")?.setAttribute("aria-expanded", "true");

  document.body.classList.add("menu-open");
}

/* =========================================================
   6. RENDERIZAÇÃO DAS SPRINTS
   ========================================================= */

function sprintCard(sprint) {
  const faseClass = sprint.fase === "F2" ? "f2" : "mvp";

  return `
    <article class="sprint-card ${faseClass}" data-sprint="${sprint.id}">
      <div class="sprint-card-top">
        <span class="sprint-release">${escapeHTML(sprint.release)}</span>
        <span class="sprint-phase">${escapeHTML(sprint.fase)}</span>
      </div>

      <h3>${escapeHTML(sprint.nome)}</h3>

      <p class="sprint-objective">${escapeHTML(sprint.objetivo)}</p>
      <h4>Entregas planejadas</h4>
      <ul class="sprint-deliverables">${sprint.entregas.split("; ").map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>

      <div class="sprint-period">
        <span>Semanas</span>
        <strong>${sprint.inicio}–${sprint.fim}</strong>
      </div>

      <div class="sprint-stats">
        <div>
          <span>Histórias</span>
          <strong>${sprint.historias}</strong>
        </div>

        <div>
          <span>Story Points</span>
          <strong>${formatRoadmapNumber(sprint.sp)}</strong>
        </div>
      </div>

    </article>
  `;
}

function renderSprints() {
  const allContainer = $("#all-sprints");
  if (!allContainer) return;

  const filter = normalizeText($("#sprintFilter")?.value || "todas");
  const search = normalizeText($("#sprintSearch")?.value || "");

  const filtered = sprintData.filter((sprint) => {
    const matchesPhase =
      filter === "todas" ||
      filter === "todos" ||
      filter === "all" ||
      (filter === "mvp" && sprint.fase === "F0 + MVP") ||
      (filter === "f2" && sprint.fase === "F2");

    const searchable = normalizeText([
      sprint.release,
      sprint.nome,
      sprint.fase,
      sprint.objetivo,
      sprint.entregas,
      `sprint ${sprint.id}`
    ].join(" "));

    return matchesPhase && searchable.includes(search);
  });

  allContainer.innerHTML = filtered.length
    ? filtered.map(sprintCard).join("")
    : `<p class="empty-state">Nenhuma sprint encontrada.</p>`;

  const mvpContainer = $("#mvp-sprints");
  if (mvpContainer) {
    const mvp = sprintData.filter((sprint) => sprint.fase === "F0 + MVP");
    mvpContainer.innerHTML = mvp.map(sprintCard).join("");
  }

  const f2Container = $("#f2-sprints");
  if (f2Container) {
    const f2 = sprintData.filter((sprint) => sprint.fase === "F2");
    f2Container.innerHTML = f2.map(sprintCard).join("");
  }

  setText("sprint-result-count", `${filtered.length} sprint(s)`);
}

/* =========================================================
   7. RENDERIZAÇÃO DAS MÉTRICAS
   ========================================================= */

function renderMetrics() {
  const metricsContainer = $("#metric-cards");

  if (metricsContainer) {
    const metrics = [
      {
        label: "Histórias totais",
        value: roadmapTotals.historias,
        detail: `${roadmapTotals.mvpHistorias} F0 + MVP · ${roadmapTotals.f2Historias} F2`
      },
      {
        label: "Story Points",
        value: roadmapTotals.storyPoints,
        detail: `${roadmapTotals.mvpStoryPoints} F0 + MVP · ${roadmapTotals.f2StoryPoints} F2`
      },
      {
        label: "Sprints",
        value: roadmapTotals.sprints,
        detail: "11 releases planejadas"
      },
      {
        label: "Duração",
        value: `${roadmapTotals.semanas} sem.`,
        detail: "22 semanas previstas"
      }
    ];

    metricsContainer.innerHTML = metrics.map((metric) => `
      <article class="metric-card">
        <span class="metric-label">${escapeHTML(metric.label)}</span>
        <strong class="metric-value">${escapeHTML(metric.value)}</strong>
        <span class="metric-detail">${escapeHTML(metric.detail)}</span>
      </article>
    `).join("");
  }

  const phaseBars = $("#phase-bars");
  const metricsPhaseBars = $("#metrics-phase-bars");

  if (phaseBars || metricsPhaseBars) {
    const phases = [
      {
        name: "F0 + MVP",
        historias: roadmapTotals.mvpHistorias,
        sp: roadmapTotals.mvpStoryPoints,
        semanas: roadmapTotals.mvpSemanas
      },
      {
        name: "F2",
        historias: roadmapTotals.f2Historias,
        sp: roadmapTotals.f2StoryPoints,
        semanas: roadmapTotals.f2Semanas
      }
    ];

    const phaseHTML = phases.map((phase) => {
      const percentage = Math.round(
        phase.sp / roadmapTotals.storyPoints * 100
      );

      return `
        <article class="phase-bar-card">
          <div class="phase-bar-heading">
            <strong>${escapeHTML(phase.name)}</strong>
            <span>${percentage}% dos SP planejados</span>
          </div>

          <div class="phase-progress-track">
            <span style="width:${percentage}%"></span>
          </div>

          <div class="phase-bar-details">
            <span>${phase.historias} histórias</span>
            <span>${phase.sp} SP</span>
            <span>${phase.semanas} semanas</span>
          </div>
        </article>
      `;
    }).join("");
    if (phaseBars) phaseBars.innerHTML = phaseHTML;
    if (metricsPhaseBars) metricsPhaseBars.innerHTML = phaseHTML;
  }

  const sprintCharts = $("#sprint-charts");
  if (sprintCharts) {
    const chart = (label, key, unit) => `
      <article class="plan-chart">
        <h3>${label} por sprint</h3>
        <div class="plan-chart-bars" role="img" aria-label="${label} planejados por release">
          ${sprintData.map((sprint) => `
            <div class="plan-chart-column" title="${sprint.release}: ${sprint[key]} ${unit}">
              <span class="plan-chart-value">${formatRoadmapNumber(sprint[key])}</span>
              <span class="plan-chart-bar ${sprint.fase === "F2" ? "f2" : "mvp"}" style="--bar-height:${Math.max(5, sprint[key] / Math.max(...sprintData.map((row) => row[key])) * 100)}%"></span>
              <span class="plan-chart-label">${sprint.release}</span>
            </div>`).join("")}
        </div>
        <p>Estimativa planejada (${unit}); sem dados de execução.</p>
      </article>`;
    sprintCharts.innerHTML = chart("Histórias", "historias", "histórias") + chart("Story points", "sp", "SP");
  }
}

/* =========================================================
   8. RENDERIZAÇÃO DAS PREMISSAS
   ========================================================= */

function renderAssumptions() {
  const container = $("#assumption-list");
  if (!container) return;

  container.innerHTML = assumptions.map((item) => `
    <article class="assumption-card">
      <div class="assumption-card-heading">
        <h3>${escapeHTML(item.titulo)}</h3>
        <strong>${escapeHTML(item.valor)}</strong>
      </div>

      <p>${escapeHTML(item.descricao)}</p>
    </article>
  `).join("");
}

/* =========================================================
   9. RENDERIZAÇÃO DAS ATIVIDADES DE HOMOLOGAÇÃO
   ========================================================= */

function homologacaoCard(item) {
  return `
    <article class="homologacao-card">
      <span class="category-label">${escapeHTML(item.categoria)}</span>
      <h3>${escapeHTML(item.etapa)}</h3>
      ${item.software ? `<div class="source-pair"><div><span>Parte de software</span><strong>${escapeHTML(item.software)}</strong></div><div><span>Parte humana</span><strong>${escapeHTML(item.parteHumana)}</strong></div></div>` : ""}
      <div class="homologacao-meta">
        ${item.responsavel ? `<div><span>Dono sugerido</span><strong>${escapeHTML(item.responsavel)}</strong></div>` : ""}
        ${item.quando ? `<div><span>Quando</span><strong>${escapeHTML(item.quando)}</strong></div>` : ""}
        ${item.referencia ? `<div><span>Referência</span><strong>${escapeHTML(item.referencia)}</strong></div>` : ""}
      </div>
    </article>`;
}

function getHomologacaoFilter() {
  const select = $("#homologacaoFilter");
  return normalizeText(select?.value || "todas");
}

function getHomologacaoSearch() {
  return normalizeText($("#homologacaoSearch")?.value || "");
}

function matchesHomologacaoCategory(item, filter) {
  if (!filter || filter === "todas" || filter === "todos" || filter === "all") {
    return true;
  }

  return normalizeText(item.categoria) === filter;
}

function matchesHomologacaoSearch(item, search) {
  if (!search) return true;
  return normalizeText([item.categoria, item.etapa, item.software, item.parteHumana, item.responsavel, item.quando, item.referencia].join(" ")).includes(search);
}

function renderHomologacao() {
  const container = $("#homologacao-list");
  if (!container) return;

  const filter = getHomologacaoFilter();
  const search = getHomologacaoSearch();

  const filtered = homologacaoData.filter((item) => {
    return matchesHomologacaoCategory(item, filter) &&
      matchesHomologacaoSearch(item, search);
  });

  container.innerHTML = filtered.length
    ? filtered.map(homologacaoCard).join("")
    : `<p class="empty-state">Nenhuma atividade encontrada.</p>`;

  setText("homologacao-count", `${filtered.length} atividade(s)`);
}

function renderCategoryList(containerId, categories, searchId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const search = normalizeText($("#" + searchId)?.value || "");
  const filtered = homologacaoData.filter((item) => categories.includes(item.categoria) && matchesHomologacaoSearch(item, search));
  container.innerHTML = filtered.length
    ? filtered.map(homologacaoCard).join("")
    : `<p class="empty-state">Nenhuma atividade encontrada.</p>`;
}

function renderSeguranca() {
  renderCategoryList(
    "seguranca-list",
    ["Segurança", "Operação"],
    "segurancaSearch"
  );
}

function renderDocumentacao() {
  renderCategoryList(
    "documentacao-list",
    ["Documentação", "Contratos e compras", "Jurídico"],
    "documentacaoSearch"
  );
}

function renderBasa() {
  renderCategoryList(
    "basa-list",
    ["BASA e prontidão", "Trabalho humano no backlog"],
    "basaSearch"
  );
}

/* =========================================================
   11. FILTROS
   ========================================================= */

function bindFilters() {
  $("#sprintFilter")?.addEventListener("change", renderSprints);
  $("#sprintSearch")?.addEventListener("input", renderSprints);

  $("#homologacaoFilter")?.addEventListener("change", renderHomologacao);
  $("#homologacaoSearch")?.addEventListener("input", renderHomologacao);

  $("#segurancaSearch")?.addEventListener("input", renderSeguranca);
  $("#documentacaoSearch")?.addEventListener("input", renderDocumentacao);
  $("#basaSearch")?.addEventListener("input", renderBasa);

}

/* =========================================================
   13. MENU MOBILE
   ========================================================= */

function bindMobileMenu() {
  $("#mobileMenuBtn")?.addEventListener("click", openMobileMenu);
  $("#mobileMenuCloseBtn")?.addEventListener("click", closeMobileMenu);
  $("#mobileNavOverlay")?.addEventListener("click", closeMobileMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

/* =========================================================
   14. EXPORTAÇÃO / IMPRESSÃO
   ========================================================= */

function bindExportButtons() {
  const exportButtons = [
    $("#exportBtn"),
    $("#exportBtnDesktop")
  ].filter(Boolean);

  exportButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.print();
    });
  });
}

/* =========================================================
   15. NAVEGAÇÃO POR DATA-TAB
   ========================================================= */

function bindNavigation() {
  $$("[data-tab]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showTab(button.dataset.tab);
    });
  });

  $$('[data-go="regulatorio"]').forEach((button) => {
    button.addEventListener("click", () => showTab("regulatorio"));
  });
}

/* =========================================================
   16. INICIALIZAÇÃO
   ========================================================= */

function initializeApp() {
  bindNavigation();
  bindFilters();
  bindMobileMenu();
  bindExportButtons();

  renderSprints();
  renderMetrics();
  renderAssumptions();
  renderHomologacao();
  renderSeguranca();
  renderDocumentacao();
  renderBasa();

  const firstActive = $(".tab-panel.active") || $("#visao-geral");

  if (firstActive) {
    showTab(firstActive.id);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}
