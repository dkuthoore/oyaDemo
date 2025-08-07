export interface LessonSection {
  sectionNumber: number;
  title: string;
  body: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface GeneratedLesson {
  title: string;
  tableOfContents: Record<string, string>;
  content: LessonSection[];
  quiz: QuizQuestion[];
}

export interface LessonRequest {
  topic: string;
}

class VeniceService {
  async generateLesson(request: LessonRequest): Promise<GeneratedLesson> {
    const response = await fetch('/api/generate-lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to generate lesson');
    }

    const result = await response.json();
    return result.lesson;
  }
}

export const veniceService = new VeniceService();