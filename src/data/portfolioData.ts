import { Project, EducationItem, SkillCategory, Achievement, Internship } from '../types';

export const PERSONAL_INFO = {
  name: "THANGARAJ S",
  title: "Aspiring AI Engineer",
  subtitle: "B.Tech Artificial Intelligence & Data Science Student",
  institution: "AVS Engineering College (Anna University)",
  tagline: "Developing intelligent, data-driven solutions and building innovative full-stack applications.",
  phone: "+91 9790390337",
  email: "ssdharan304@gmail.com",
  collegeEmail: "thangaraj.ad24@avsenggcollege.ac.in",
  address: "56/21, Gopal Street, Ponnampet",
  linkedin: "https://linkedin.com/in/thangaraj-s-694bb73b1",
  linkedinHandle: "linkedin.com/in/thangaraj-s-694bb73b1",
  github: "https://github.com/ThangarajS-developer",
  githubHandle: "github.com/ThangarajS-developer",
  objective: `Aspiring AI Engineer and B.Tech Artificial Intelligence & Data Science student with a strong foundation in programming, web development, and problem-solving. Passionate about developing intelligent, data-driven solutions and building innovative full-stack applications. Seeking opportunities to apply my technical knowledge, continuously learn emerging AI technologies, and contribute to organizational success while growing as a skilled AI professional.`,
  stats: [
    { label: "B.Tech CGPA", value: "8.01" },
    { label: "Hackathons & Contests", value: "4+" },
    { label: "Core AI Projects", value: "2+" },
    { label: "1st Prize", value: "Ctrl+Z Quest" }
  ]
};

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "B.Tech – Artificial Intelligence & Data Science",
    institution: "AVS Engineering College (Anna University)",
    period: "2024 – 2028",
    score: "8.01",
    scoreLabel: "CGPA",
    details: "Specializing in Machine Learning, Deep Learning, Data Analytics, Natural Language Processing, and Cloud Full-Stack Development."
  },
  {
    degree: "Higher Secondary (HSC)",
    institution: "St. Paul's Higher Secondary School",
    boardOrAffiliation: "State Board",
    period: "2023 – 2024",
    score: "68.5%",
    scoreLabel: "Percentage",
    details: "Major in Mathematics, Physics, Chemistry, and Computer Science."
  },
  {
    degree: "Secondary School (SSLC)",
    institution: "St. Paul's Higher Secondary School",
    boardOrAffiliation: "State Board",
    period: "2021 – 2022",
    score: "72.6%",
    scoreLabel: "Percentage",
    details: "Foundational secondary education with distinction in sciences and mathematics."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    iconName: "Code2",
    skills: [
      { name: "Python", level: 88, tag: "Primary / AI" },
      { name: "C", level: 82, tag: "System Programming" },
      { name: "C++", level: 80, tag: "OOP & DSA" },
      { name: "JavaScript", level: 85, tag: "ES6+ / Web" }
    ]
  },
  {
    title: "Web Technologies",
    iconName: "Globe",
    skills: [
      { name: "HTML5", level: 92 },
      { name: "CSS3", level: 88 },
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 75, tag: "Basics" },
      { name: "Node.js", level: 72, tag: "Basics" },
      { name: "Bootstrap", level: 85 },
      { name: "Express.js", level: 70, tag: "Basics" }
    ]
  },
  {
    title: "Database Systems",
    iconName: "Database",
    skills: [
      { name: "MySQL", level: 84, tag: "Relational Queries" },
      { name: "PostgreSQL", level: 74, tag: "Basics" },
      { name: "MongoDB", level: 70, tag: "NoSQL" }
    ]
  },
  {
    title: "Tools & Development",
    iconName: "Wrench",
    skills: [
      { name: "VS Code", level: 92 },
      { name: "Git", level: 85 },
      { name: "GitHub", level: 86 },
      { name: "Figma", level: 78, tag: "UI/UX Design" },
      { name: "Canva", level: 88, tag: "Graphic Design" }
    ]
  }
];

export const SOFT_SKILLS = [
  { name: "Communication", desc: "Clear articulation of complex technical concepts to both technical and non-technical stakeholders." },
  { name: "Problem Solving", desc: "Analytical mindset breaking down real-world enterprise problems into programmatic solutions." },
  { name: "Leadership", desc: "Proven team coordination in academic projects, hackathon squads, and competitive athletics." },
  { name: "Quick Learning", desc: "Rapid adoption of emerging frameworks, LLM integrations, and modern developer tooling." }
];

export const LANGUAGES = [
  { name: "Tamil", fluency: "Native", code: "ta-IN", flag: "IN" },
  { name: "English", fluency: "Fluent", code: "en-US", flag: "US" },
  { name: "Telugu", fluency: "Spoken", code: "te-IN", flag: "IN" }
];

export const INTERNSHIP_INFO: Internship = {
  role: "Web Development Intern",
  company: "CodeBind Technologies",
  duration: "1 Month",
  points: [
    "Developed responsive web pages using HTML, CSS, and JavaScript with cross-browser compatibility.",
    "Enhanced front-end development skills by working on practical web development client deliverables and modern design specifications.",
    "Collaborated with senior developers on layout refinement, accessibility, and performance optimization."
  ]
};

export const PROJECTS_LIST: Project[] = [
  {
    id: "voice-erp",
    title: "Voice-Controlled ERP Assistant in Tamil & English",
    tagline: "Multilingual Voice-Driven Enterprise Resource Planning with LLMs for MSMEs",
    category: "AI & Full-Stack",
    demoType: "voice",
    description: [
      "Developed a full-stack web application using LLM and NLP to provide a voice-based ERP assistant specifically tailored for Micro, Small & Medium Enterprises (MSMEs).",
      "The system manages business operations, inventory, production, and delivers real-time business reports to the owner through intuitive voice interaction.",
      "Supports seamless bi-lingual voice queries in Tamil and English to democratize enterprise tooling for regional entrepreneurs."
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Gemini API",
      "Web Speech API",
      "NLP"
    ],
    features: [
      "Real-time speech-to-text with bilingual Tamil and English voice processing",
      "AI-powered inventory query answering and automated low-stock notifications",
      "Owner daily production report generation with audio synthesis summaries",
      "Zero-complexity voice interface built for non-technical workshop & factory owners"
    ],
    metrics: "Designed for 100+ MSME regional operations"
  },
  {
    id: "trash-to-treasure",
    title: "Trash to Treasure – Sustainable E-Commerce Platform",
    tagline: "Eco-Conscious Reusable Product Exchange & Circular Economy Marketplace",
    category: "Web Platform",
    demoType: "ecommerce",
    description: [
      "Developed an innovative digital platform to exchange old or reusable products for new items, directly fostering product reuse and waste reduction.",
      "Connects environmentally conscious consumers with local refurbishers and exchange hubs, generating economic savings while minimizing landfill waste.",
      "Delivers a dual-benefit model: consumers acquire budget-friendly items while store owners gain refurbished inventory streams."
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "MySQL",
      "Bootstrap"
    ],
    features: [
      "Intelligent item exchange valuation algorithm based on condition & category",
      "Interactive product catalog with category filtering and condition verification",
      "Customer-to-store trade-in request workflow and automated receipt generation",
      "Comprehensive admin dashboard for stock tracking and refurbished product listings"
    ],
    metrics: "Promotes circular economy and waste reduction"
  }
];

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: "ach-1",
    title: "Ctrl+Z Quest – 1st Prize Winner",
    organization: "Muthayammal Engineering College",
    type: "award",
    badge: "1st Prize",
  },
  {
    id: "ach-2",
    title: "Zonal Level 3rd Prize in Hockey",
    organization: "Sports Tournament",
    year: "2025",
    type: "sports",
    badge: "3rd Prize (Zonal)",
  },
  {
    id: "ach-3",
    title: "Shortlisted in MSME Hackathon",
    organization: "Government of India / MSME Initiative",
    year: "2026",
    type: "hackathon",
    badge: "Shortlisted Finalist",
  },
  {
    id: "ach-4",
    title: "Participated in Smart India Hackathon (SIH)",
    organization: "Ministry of Education / AICTE",
    year: "2025",
    type: "hackathon",
    badge: "National Hackathon",
  },
  {
    id: "ach-5",
    title: "Participated in HackIndia",
    organization: "HackIndia National Competition",
    year: "2025",
    type: "hackathon",
    badge: "National Hackathon",
  }
];
