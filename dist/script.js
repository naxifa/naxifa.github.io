const nodeContent = {
  business: { index: "01 / FRAME", copy: "Start with the decision—not the model. Define who needs to act, what changes, and how success will be measured." },
  data: { index: "02 / EVIDENCE", copy: "Build an evidence base that is reliable, relevant, and honest about uncertainty before automating anything." },
  model: { index: "03 / DESIGN", copy: "Choose the lightest AI system that fits the workflow, risk level, and people who will use it." },
  value: { index: "04 / TRANSLATE", copy: "Connect outputs to measurable value: time saved, risk reduced, capacity created, or decisions improved." }
};

const projectData = {
  "shadow-ai": {
    index: "CASE STUDY 01 · ACTIVE RESEARCH",
    title: "Shadow AI Financial Risk Model",
    summary: "A governance investment model for healthcare organizations facing unauthorized employee use of tools such as public generative AI.",
    question: "How much could shadow AI realistically cost a hospital, and when is prevention less expensive than accepting the exposure?",
    approach: "Combine breach likelihood, financial impact, penalties, organization size, governance maturity, and implementation cost in a stochastic scenario model.",
    value: "Give hospital leaders a defensible break-even point for governance investment instead of a generic warning that AI is risky.",
    tools: "Risk-cost modeling · Monte Carlo logic · Scenario analysis · Healthcare AI governance · Python"
  },
  "raymond-james": {
    index: "CASE STUDY 02 · STRATEGY AUDIT",
    title: "Raymond James Transformation Audit",
    summary: "A structured review of six digital and AI initiatives at a major financial-services firm headquartered in St. Petersburg, Florida.",
    question: "Are the company’s initiatives transforming the business—or mainly helping existing processes run better?",
    approach: "Applied a three-level test, a five-year diagnostic, and a changed-versus-stayed analysis; then assessed organizational readiness and portfolio balance.",
    value: "Separated operational wins from transformation potential and identified where the portfolio could place a more ambitious bet.",
    tools: "Digital transformation frameworks · Portfolio analysis · Public filings · Executive communication"
  },
  "upskilling-agent": {
    index: "CASE STUDY 03 · AGENTIC AI",
    title: "Dynamic Upskilling & Apprenticeship Agent",
    summary: "An agentic learning concept designed around work itself rather than a fixed course catalog.",
    question: "How can employee development adapt to changing skills, real performance, and the next task an employee needs to complete?",
    approach: "Design an agent that observes skill gaps, selects practical tasks, adjusts support, and knows when to pass control to a human coach.",
    value: "Shorten time-to-competence while making training more relevant, measurable, and connected to enterprise workflows.",
    tools: "Agentic workflows · Human-in-the-loop design · Personalization · Process mapping"
  },
  "financial-dashboard": {
    index: "CASE STUDY 04 · BUSINESS ANALYTICS",
    title: "Financial Analytics Dashboard",
    summary: "A decision-focused view of financial performance that moves from reporting toward diagnosis.",
    question: "Which changes matter, where are exceptions forming, and what should a decision-maker investigate next?",
    approach: "Prepared and modeled the data, selected decision-relevant KPIs, and structured the interface around comparisons, trends, and exceptions.",
    value: "Reduced the distance between raw financial data and an actionable management conversation.",
    tools: "Python · SQL · Excel · Tableau / Power BI · KPI design"
  },
  "healthcare-pipeline": {
    index: "CASE STUDY 05 · DATA SYSTEMS",
    title: "Healthcare Data Quality Pipeline",
    summary: "A repeatable preparation workflow for more than 50,000 healthcare records.",
    question: "How do we make messy clinical and operational data trustworthy enough for analysis without hiding what changed?",
    approach: "Profiled missingness and inconsistencies, standardized fields, validated ranges and categories, and documented transformations.",
    value: "Created a cleaner, more explainable foundation for analytics and reduced the chance that poor inputs drive confident conclusions.",
    tools: "Python · Pandas · Data validation · Exploratory analysis · Documentation"
  },
  "anchoring-llm": {
    index: "CASE STUDY 06 · AI BEHAVIOR",
    title: "Anchoring Bias in LLMs",
    summary: "A compact experiment on whether an irrelevant starting number changes a language model’s subsequent estimate.",
    question: "Do high and low numerical anchors systematically move LLM responses, even when the underlying problem is unchanged?",
    approach: "Use controlled prompts, vary only the anchor condition, repeat trials, and compare output distributions across conditions.",
    value: "Surface a practical reliability risk for teams using generative AI in forecasting, valuation, or other estimation-heavy decisions.",
    tools: "Experimental design · Prompt controls · Comparative analysis · Responsible AI"
  }
};

const outputIndex = document.querySelector("#output-index");
const outputCopy = document.querySelector("#output-copy");
document.querySelectorAll(".map-node").forEach((node) => {
  node.addEventListener("click", () => {
    document.querySelectorAll(".map-node").forEach((item) => item.classList.remove("active"));
    node.classList.add("active");
    const content = nodeContent[node.dataset.node];
    outputIndex.textContent = content.index;
    outputCopy.textContent = content.copy;
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      const visible = filter === "all" || card.dataset.category.split(" ").includes(filter);
      card.classList.toggle("hidden", !visible);
    });
  });
});

const projectDialog = document.querySelector("#project-dialog");
const dialogFields = {
  index: document.querySelector("#dialog-index"),
  title: document.querySelector("#dialog-title"),
  summary: document.querySelector("#dialog-summary"),
  question: document.querySelector("#dialog-question"),
  approach: document.querySelector("#dialog-approach"),
  value: document.querySelector("#dialog-value"),
  tools: document.querySelector("#dialog-tools")
};

function openProject(projectId) {
  const project = projectData[projectId];
  if (!project) return;
  Object.entries(dialogFields).forEach(([key, element]) => { element.textContent = project[key]; });
  projectDialog.showModal();
  document.body.style.overflow = "hidden";
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest(".card-link") || event.currentTarget === event.target || event.target.closest(".project-card")) openProject(card.dataset.project);
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openProject(card.dataset.project); }
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => projectDialog.close());
projectDialog.addEventListener("close", () => { document.body.style.overflow = ""; });
projectDialog.addEventListener("click", (event) => {
  const rect = projectDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) projectDialog.close();
});

const commandDialog = document.querySelector("#command-menu");
document.querySelector(".command-trigger").addEventListener("click", () => commandDialog.showModal());
document.querySelector(".command-head button").addEventListener("click", () => commandDialog.close());
commandDialog.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => commandDialog.close()));
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); commandDialog.open ? commandDialog.close() : commandDialog.showModal(); }
  if (!commandDialog.open && !projectDialog.open && !event.metaKey && !event.ctrlKey && !event.altKey) {
    const destinations = { h: "#top", w: "#work", r: "#research", a: "#about" };
    const destination = destinations[event.key.toLowerCase()];
    if (destination && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) document.querySelector(destination).scrollIntoView();
  }
});

document.querySelector(".back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const cursorGlow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}
