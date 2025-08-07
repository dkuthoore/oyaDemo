import { useQuery } from '@tanstack/react-query';
import { mockLessons } from '@/data/mockData';
import { Lesson } from '@/types';

export function useLessons() {
  return useQuery({
    queryKey: ['/api/lessons'],
    queryFn: (): Promise<Lesson[]> => {
      return new Promise((resolve) => {
        // Get generated lessons from localStorage
        const generatedLessonsJson = localStorage.getItem('generatedLessons') || '[]';
        const generatedLessons: Lesson[] = JSON.parse(generatedLessonsJson);
        
        // Merge mock lessons with generated lessons, with generated lessons first
        const allLessons = [...generatedLessons, ...mockLessons];
        
        setTimeout(() => resolve(allLessons), 300);
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - shorter to pick up new lessons faster
  });
}
