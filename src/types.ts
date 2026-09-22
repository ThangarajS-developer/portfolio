export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string[];
  techStack: string[];
  features: string[];
  metrics?: string;
  category: 'AI & Full-Stack' | 'Web Platform';
  demoType?: 'voice' | 'ecommerce';
}

export interface EducationItem {
  degree: string;
  institution: string;
  boardOrAffiliation?: string;
  period: string;
  score: string;
  scoreLabel: string;
  details?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: number; tag?: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year?: string;
  type: 'award' | 'hackathon' | 'sports';
  badge: string;
}

export interface Internship {
  role: string;
  company: string;
  duration: string;
  points: string[];
}
