export interface Insight {
  id: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
  tags: string[];
  hyperlinks: ConceptLink[];
}

export interface ConceptLink {
  text: string;
  conceptId: string;
  position: { start: number; end: number };
  type: 'simple' | 'complex';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  conceptId: string;
  messages: ChatMessage[];
  suggestedQuestions: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  status: 'Available' | 'In Progress' | 'Completed' | 'Locked';
  icon: string;
  tags: string[];
  sections: LessonSection[];
}

export interface LessonSection {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
}

export interface StatsData {
  activeInsights: number;
  conceptsLearned: number;
  progressRate: number;
  lessonsCompleted: number;
}
