/**
 * Single source of truth for all site content.
 * Sourced from Alex Silva's LinkedIn résumé.
 */

export const profile = {
  name: "Alex Silva",
  firstName: "Alex",
  lastName: "Silva",
  role: "Data Consultant",
  headline: "Data Consultant — SQL, Python & Big Data Specialist",
  tagline: "I turn complex data into decisions that move the business.",
  location: "Argentina · Working globally (US · EU · LATAM)",
  summary:
    "I'm an Economist and Data Scientist with over 8 years of experience in data and visualization for strategic decision-making. I've led projects across multiple industries using advanced tools such as SQL, Python, Tableau, Power BI, and Big Data technologies. My passion is transforming complex data into actionable insights that drive business success — and I'm constantly seeking new challenges to sharpen my technical and leadership skills.",
  summaryShort:
    "Economist & Data Scientist. 8+ years building data pipelines, models, and dashboards that drive strategy across finance, consulting, and tech.",
} as const;

export const links = {
  email: "silva.alexis94@gmail.com",
  linkedin: "https://www.linkedin.com/in/aleex-silva",
  linkedinLabel: "linkedin.com/in/aleex-silva",
  portfolio: "https://alex-silva-portfolio.streamlit.app/",
  portfolioLabel: "alex-silva-portfolio.streamlit.app",
} as const;

export const stats = [
  { value: "8+", label: "Years in data" },
  { value: "4", label: "Countries worked" },
  { value: "10+", label: "Industries served" },
  { value: "∞", label: "Dashboards shipped" },
] as const;

export type Experience = {
  company: string;
  title: string;
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Confidential Client",
    title: "Data Consultant",
    period: "Jul 2021 — Present",
    location: "San Francisco, California",
    current: true,
    highlights: [
      "Designed and maintained optimal data pipeline architecture, improving end-to-end processing efficiency.",
      "Built ETL infrastructure ingesting data from diverse sources with SQL and Big Data technologies, cutting data-loading time.",
      "Fine-tuned Large Language Models (LLMs) with market-leading tooling to lift accuracy, performance, and contextual relevance.",
      "Shipped analytics tools delivering actionable insight and sharper decision-making.",
      "Partnered with ML engineers and business analysts to design and ship new product features, raising customer satisfaction.",
    ],
  },
  {
    company: "Prudential Financial",
    title: "Data Science & Data Analyst",
    period: "Jul 2020 — Jul 2021",
    location: "New York",
    highlights: [
      "Delivered information-automation tooling to analytics teams.",
      "Explored and modeled high-volume, high-variety data sources across business units.",
      "Owned data-quality control across pipelines.",
      "Translated business challenges into predictive models and Machine Learning algorithms.",
      "Ran the full Data Science lifecycle — from business need to deployed solution.",
    ],
  },
  {
    company: "Paradigma Digital",
    title: "Team Leader — Business Intelligence",
    period: "May 2019 — Aug 2020",
    location: "Madrid, Spain",
    highlights: [
      "Led the migration toward a Data-Driven culture across the organization.",
      "Owned extraction, cleansing, and analysis of business data.",
      "Built dashboards and forecasts per business unit to drive decision-making.",
      "Defined and monitored the company's key KPIs.",
      "Ran economic and financial analysis across the group's businesses.",
    ],
  },
  {
    company: "Deloitte Argentina",
    title: "Data Pricing Analyst",
    period: "Nov 2015 — May 2019",
    location: "Buenos Aires",
    highlights: [
      "Processed and analyzed large volumes of customer data, from debugging to conclusions.",
      "Designed data visualizations, reports, and dashboards for stakeholder teams.",
      "Continuously monitored core KPIs and contrasted findings against trends.",
      "Prepared transfer-pricing reports.",
    ],
  },
];

export type Education = {
  school: string;
  degree: string;
  field: string;
  period: string;
};

export const education: Education[] = [
  {
    school: "Universidad CAECE",
    degree: "Master's degree",
    field: "Data Science & Business Innovation",
    period: "2018 — 2020",
  },
  {
    school: "Universidad de Buenos Aires",
    degree: "Licenciatura",
    field: "Economics",
    period: "2012 — 2017",
  },
];

export type SkillLevel = "Expert" | "Proficient" | "Familiar";
export type SkillItem = { name: string; level: SkillLevel };
export type SkillGroup = {
  category: string;
  icon: string;
  items: SkillItem[];
};

export const skillLevelWidth: Record<SkillLevel, string> = {
  Expert: "95%",
  Proficient: "75%",
  Familiar: "50%",
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages & Data",
    icon: "Code2",
    items: [
      { name: "Python", level: "Expert" },
      { name: "SQL", level: "Expert" },
      { name: "Big Data", level: "Proficient" },
      { name: "ETL", level: "Proficient" },
      { name: "dbt", level: "Familiar" },
    ],
  },
  {
    category: "BI & Visualization",
    icon: "BarChart2",
    items: [
      { name: "Tableau", level: "Expert" },
      { name: "Power BI", level: "Expert" },
      { name: "Dashboards", level: "Expert" },
      { name: "Forecasting", level: "Proficient" },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: "Sparkles",
    items: [
      { name: "LLM Fine-tuning", level: "Proficient" },
      { name: "Predictive Modeling", level: "Expert" },
      { name: "Credit Risk Modeling", level: "Expert" },
      { name: "scikit-learn", level: "Proficient" },
    ],
  },
  {
    category: "Domain & Leadership",
    icon: "Briefcase",
    items: [
      { name: "Statistics", level: "Expert" },
      { name: "Finance", level: "Expert" },
      { name: "Technical Project Management", level: "Proficient" },
      { name: "Product Strategy", level: "Familiar" },
    ],
  },
];

export const certifications = [
  "Python for Finance",
  "AI Applications for Business Success",
  "Customer Analysis in Python",
  "Product Management for AI & Data Science",
  "Credit Risk Modeling in Python",
];

export const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "Full Professional" },
  { name: "Chinese", level: "Limited Working" },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Expertise", href: "#expertise" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export type ProjectCategory = "ML" | "BI" | "Data Engineering" | "AI" | "Engineering";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  eyebrow: string;
  description: string;
  tech: string[];
  highlights: string[];
  githubUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "gmail-rag",
    title: "Gmail RAG Assistant",
    category: "AI",
    eyebrow: "AI · Python · LangChain",
    description:
      "Retrieval-augmented generation pipeline that connects to Gmail, vectorizes your full email archive with FAISS embeddings, and surfaces answers to natural-language questions through an interactive Gradio interface.",
    tech: ["Python", "LangChain", "FAISS", "OpenAI", "Gradio", "Gmail API"],
    highlights: [
      "Indexes inbox and sent folders into a persistent FAISS vector store",
      "Natural-language Q&A over personal email archive",
      "Three-step workflow: authenticate → extract → embed & query",
    ],
    githubUrl: "https://github.com/AleexSilva/GmailRAG",
    featured: true,
  },
  {
    id: "marketing-dashboard",
    title: "Multi-Platform Marketing Dashboard",
    category: "BI",
    eyebrow: "BI · BigQuery · Power BI",
    description:
      "Unified paid-media analytics layer ingesting Facebook, Google, and TikTok campaign data into BigQuery, exposing 10 semantic views for self-service Power BI reporting.",
    tech: ["BigQuery", "Power BI", "SQL", "DAX"],
    highlights: [
      "Standardized CTR, CPC, CPM, and ROAS metrics across 3 ad platforms",
      "10 semantic views for campaign, daily trend, video, and social analytics",
      "Data integrity validated via row-count and spend reconciliation checks",
    ],
    githubUrl: "https://github.com/AleexSilva/marketing_dashboard",
  },
  {
    id: "coffee-shop-analysis",
    title: "Coffee Shop Sales Dashboard",
    category: "BI",
    eyebrow: "BI · Power BI · DAX",
    description:
      "Interactive Power BI report analyzing transactional sales across multiple coffee shop locations, with drill-through by time period, product category, and store.",
    tech: ["Power BI", "DAX", "Excel"],
    highlights: [
      "Hourly, daily, and monthly trend analysis",
      "Product category and store-level performance comparison",
      "KPI tracking: revenue, transaction count, and average order value",
    ],
    githubUrl: "https://github.com/AleexSilva/coffee_shop_analysis",
  },
  {
    id: "nyc-parking",
    title: "NYC Parking Violations Pipeline",
    category: "Data Engineering",
    eyebrow: "Data Engineering · Python · CI/CD",
    description:
      "Automated Python pipeline processing New York City open parking violation records, structured into processing, analysis, and logging layers with CI/CD via GitHub Actions.",
    tech: ["Python", "pandas", "GitHub Actions"],
    highlights: [
      "End-to-end pipeline from raw open data to analysis-ready output",
      "Automated runs via GitHub Actions CI/CD",
      "Structured logging and layered code architecture",
    ],
    githubUrl: "https://github.com/AleexSilva/NYC_ParkingViolation",
  },
  {
    id: "healthcare-assessment",
    title: "Healthcare Industry Assessment",
    category: "ML",
    eyebrow: "ML · Python · Jupyter",
    description:
      "Data science assessment of healthcare industry metrics using Python and Jupyter Notebooks, covering exploratory analysis, statistical modeling, and structured insight generation.",
    tech: ["Python", "Jupyter", "pandas", "scikit-learn"],
    highlights: [
      "Exploratory data analysis across healthcare industry metrics",
      "Statistical modeling and pattern identification",
      "Organized across code, data, and logging layers",
    ],
    githubUrl: "https://github.com/AleexSilva/healthcase_industry_assessment",
  },
  {
    id: "marketplace-analysis",
    title: "Marketplace Data Analysis",
    category: "BI",
    eyebrow: "Analytics · Python · Jupyter",
    description:
      "Exploratory data analysis and visualization of marketplace datasets using Python and Jupyter Notebooks, uncovering sales patterns and buyer behavior insights.",
    tech: ["Python", "Jupyter", "pandas", "Matplotlib"],
    highlights: [
      "EDA of marketplace transaction data",
      "Visualization of sales patterns and buyer behavior",
      "Structured into code, data, and image output layers",
    ],
    githubUrl: "https://github.com/AleexSilva/MarketplaceDataAnalysis",
  },
  {
    id: "kanban-app",
    title: "Full-Stack Kanban Board",
    category: "Engineering",
    eyebrow: "Engineering · TypeScript · Python",
    description:
      "Containerized full-stack Kanban application for task and workflow management, combining a TypeScript frontend with a Python backend and Docker Compose deployment.",
    tech: ["TypeScript", "Python", "Docker", "HTML/CSS"],
    highlights: [
      "Containerized with Docker Compose for one-command deployment",
      "TypeScript frontend paired with Python backend API",
      "Includes documentation and deployment scripts",
    ],
    githubUrl: "https://github.com/AleexSilva/Kanban-App",
  },
];
