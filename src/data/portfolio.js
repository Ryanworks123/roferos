const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const profile = {
  name: "Ryan Roferos",
  role: "Frontend Engineer",
  headline: "React, TypeScript & Frontend Architecture",
  location: "Carmen, Cagayan de Oro, Misamis Oriental",
  email: "ryanroferos.work@gmail.com",
  phone: "+63 9455105552",
  linkedIn: "https://www.linkedin.com/in/ryanganiii",
  github: "https://github.com/Ryanworks123",
  portfolio: "https://roferosryan.vercel.app",
  resume: publicAsset("Ryan_Roferos_Resume.pdf"),
  summary:
    "Frontend engineer building responsive React and TypeScript applications with reusable component architecture, accessible interactions, robust form validation, predictable state management, and API-integrated workflows.",
};

export const about = [
  "I engineer React and TypeScript interfaces around reusable components, clear data flow, and maintainable boundaries.",
  "I design responsive, accessible experiences with deliberate interaction states, form validation, and practical error recovery.",
  "My projects connect polished frontend work with APIs, authentication concepts, SQL data modeling, and production-style application structure.",
  "My Information Technology and technical-support background strengthens how I diagnose issues, communicate tradeoffs, and deliver reliable solutions.",
];

export const aboutHighlights = [
  {
    label: "Architecture",
    title: "Reusable frontend systems",
    detail:
      "I structure React and TypeScript applications around reusable components, typed data flow, clear state ownership, and maintainable boundaries. My GitHub work spans focused UI tools, dashboards, and production-oriented application shells.",
  },
  {
    label: "Product UI",
    title: "Interfaces for real workflows",
    detail:
      "I build responsive dashboards, searchable and paginated data views, validated forms, accessible dialogs, charts, mobile navigation, theme systems, and error states designed around the task a user needs to complete.",
  },
  {
    label: "Integration",
    title: "Frontend connected to the platform",
    detail:
      "Projects such as OrbitOps, Linkly, PromptForge, and Nimbus connect polished UI with REST APIs, TanStack Query, authentication, role-based access, PostgreSQL data, uploads, email, persistent preferences, and offline-aware behavior.",
  },
  {
    label: "Delivery",
    title: "Quality beyond the happy path",
    detail:
      "I support delivery with schema validation, semantic HTML, reduced-motion support, Vitest, Testing Library, Playwright, linting, formatting, CI, and security-minded controls. My technical-support background reinforces disciplined debugging and clear communication.",
  },
];

export const skills = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    category: "Styling",
    items: [
      "Tailwind CSS",
      "Bootstrap",
      "Responsive Design",
      "Mobile-First Design",
      "UI/UX Principles",
    ],
  },
  {
    category: "Backend Knowledge",
    items: ["Node.js", "PHP", "Python (FastAPI)", "REST APIs", "Prisma"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "SQL", "Supabase"],
  },
  {
    category: "Authentication",
    items: ["JWT", "OAuth", "Supabase Auth", "Role-Based Access"],
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "VS Code", "Vite", "Figma", "Vercel"],
  },
  {
    category: "Other Skills",
    items: [
      "Debugging",
      "Troubleshooting",
      "Cross-browser Compatibility",
      "Performance Optimization",
    ],
  },
];

export const experiences = [
  {
    title: "IT Intern (Computer Technician)",
    company: "MAKOTEK Computer Sales Inc.",
    duration: "540 Hours",
    responsibilities: [
      "Diagnosed hardware and software issues",
      "Performed computer maintenance and system diagnostics",
      "Delivered technical support and customer assistance",
      "Explained compatibility, product options, and practical next steps",
    ],
  },
  {
    title: "IT Intern (Retail Sales)",
    company: "MAKOTEK Computer Sales Inc.",
    duration: "540 Hours",
    responsibilities: [
      "Translated technical details into clear product recommendations",
      "Supported retail customers with compatibility-focused guidance",
      "Built communication discipline in a real customer-facing environment",
    ],
  },
];

export const projects = [
  {
    title: "Personal Portfolio Website",
    technologies: ["React.js", "JavaScript", "Framer Motion", "Three.js", "Vercel"],
    description:
      "A recruiter-focused portfolio with reusable content data, accessible navigation and theme controls, reduced-motion support, performance-aware 3D enhancements, and a serverless contact workflow.",
    features: ["Responsive Design", "Accessible Interactions", "Serverless Contact", "Performance"],
    challenges:
      "Balancing polished motion and 3D presentation with accessibility, maintainable content, and clear recruiter messaging.",
    learned:
      "Improved component organization, portfolio storytelling, deployment workflow, and keeping public claims aligned with documented experience.",
    liveDemo: "https://roferosryan.vercel.app",
    github: "https://github.com/Ryanworks123/roferos",
    image: "/favicon.svg",
  },
  {
    title: "Inventory Management System",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Zod"],
    description:
      "A production-style inventory application with normalized data modeling for users, products, suppliers, categories, locations, stock levels, and immutable stock movements.",
    features: ["SQL Data Model", "Role Hierarchy", "Centralized API Errors", "Repository Layer"],
    challenges:
      "Designing inventory workflows around consistent API responses, validation, pagination-ready queries, and transaction-backed list/count operations.",
    learned:
      "Practiced clean architecture, Prisma schema design, role-based access concepts, and separating API concerns from data-access logic.",
    liveDemo: "",
    github: "https://github.com/Ryanworks123",
    image: "/favicon.svg",
  },
  {
    title: "PromptForge AI",
    technologies: ["React", "TypeScript", "Zustand", "React Hook Form", "Zod"],
    description:
      "A prompt-generation workspace with schema-validated forms, live markdown/plain-text preview, quality scoring, persistent state, prompt library/history flows, export actions, and toast feedback.",
    features: ["Validated Forms", "Live Preview", "Prompt Scoring", "Persistent State"],
    challenges:
      "Keeping the generator responsive while updating previews, quality scores, autosaved history, and reusable prompt-library state from one form workflow.",
    learned:
      "Strengthened TypeScript form modeling, client-side state design, validation patterns, and reusable UI composition.",
    liveDemo: "",
    github: "https://github.com/Ryanworks123/promptforge-ai",
    image: "/favicon.svg",
  },
  {
    title: "GridCraft CSS Grid Inspector",
    technologies: ["JavaScript", "HTML", "CSS"],
    description:
      "A visual CSS Grid inspection tool focused on layout debugging and front-end learning workflows.",
    features: ["CSS Grid", "Visual Debugging", "DOM Interaction", "Responsive Layouts"],
    challenges:
      "Making grid behavior easier to inspect visually while keeping the interface lightweight and browser-native.",
    learned:
      "Deepened practical DOM, styling, and layout-debugging skills through a focused JavaScript utility project.",
    liveDemo: "",
    github: "https://github.com/Ryanworks123/gridcraft-css-grid-inspector",
    image: "/favicon.svg",
  },
];

export const certifications = [
  {
    name: "Introduction to Agent Skills",
    issuer: "Anthropic",
    issued: "Jul 2026",
    credentialId: "xkqyrsr5fq46",
    image: publicAsset("certificates/certificate-xkqyrsr5fq46-1784964350.jpg"),
    featured: true,
  },
  {
    name: "Claude Platform 101",
    issuer: "Anthropic",
    issued: "Jul 2026",
    credentialId: "mcp6stwx2ugr",
    image: publicAsset("certificates/certificate-mcp6stwx2ugr-1784961375.jpg"),
    featured: true,
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    issued: "Jul 2026",
    credentialId: "9efge4tngs6r",
    image: publicAsset("certificates/certificate-9efge4tngs6r-1784961072.jpg"),
    featured: true,
  },
  {
    name: "Building with the Claude API",
    issuer: "Anthropic",
    issued: "Jul 2026",
    credentialId: "egtzh73xk7kx",
    image: publicAsset("certificates/certificate-egtzh73xk7kx-1783768137.jpg"),
    featured: true,
  },
  {
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    issued: "Jul 2026",
    credentialId: "u68f9xewbsqs",
    image: publicAsset("certificates/certificate-u68f9xewbsqs-1783766354.jpg"),
    featured: true,
  },
  {
    name: "AI Fluency: AI Capabilities & Limitations",
    issuer: "Anthropic",
    issued: "Jul 2026",
    credentialId: "dhr6ax6ezvj2",
    image: publicAsset("certificates/certificate-dhr6ax6ezvj2-1784964751.jpg"),
    featured: true,
  },
  { name: "JavaScript Programming", issuer: "Bro Code", duration: "8 hours" },
  { name: "HTML and CSS", issuer: "Telugu", duration: "9 hours and 7 minutes" },
  { name: "PHP for Web Development", issuer: "CodeMy", duration: "2 hours and 33 minutes" },
  { name: "Databases with SQL", issuer: "CS50", duration: "" },
  {
    name: "Introduction to the Fundamentals of Databases",
    issuer: "Training Program",
    duration: "",
  },
  { name: "MongoDB Database Training", issuer: "Training Program", duration: "11 hours" },
  { name: "Windows Server 2012", issuer: "ltfreetraining", duration: "9 hours and 24 minutes" },
  { name: "Active Directory", issuer: "ltfreetraining", duration: "14 hours and 51 minutes" },
  { name: "OJT Completion", issuer: "MAKOTEK Computer Sales Inc.", duration: "540 hours" },
  {
    name: "Certificate of Recognition",
    issuer: "School Voting Management System of College Students Elections",
    duration: "",
  },
];

export const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "Misamis Oriental Institute of Science and Technology Inc.",
    period: "2025 - 2026",
  },
  {
    degree: "ABM Strand",
    institution: "Talisayan National Senior High School",
    location: "San Jose",
    period: "2021 - 2022",
  },
  {
    degree: "High School",
    institution: "St. Mary's Academy of Carmen",
    period: "2019 - 2020",
  },
];
