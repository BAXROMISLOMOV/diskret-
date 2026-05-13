export interface Chapter {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  complexity: string;
  slides: Slide[];
}

export type SlideType = 'text' | 'visualizer' | 'quiz' | 'chart' | 'code';

export interface Slide {
  id: string;
  characterExpression: 'happy' | 'neutral' | 'thinking' | 'surprised';
  dialogue: string;
  content?: any;
  type: SlideType;
  codeSnippet?: string;
}

export interface QuizContent {
  question: string;
  options: string[];
  correctAnswer: number;
}
