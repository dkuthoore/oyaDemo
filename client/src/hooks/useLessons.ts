import { useQuery } from '@tanstack/react-query';
import { mockLessons, mockLearningStats } from '@/data/mockData';
import { Lesson, LearningStats } from '@/types';

export function useLessons() {
  return useQuery({
    queryKey: ['/api/lessons'],
    queryFn: (): Promise<Lesson[]> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockLessons), 300);
      });
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useLearningStats() {
  return useQuery({
    queryKey: ['/api/learning-stats'],
    queryFn: (): Promise<LearningStats> => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockLearningStats), 200);
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
