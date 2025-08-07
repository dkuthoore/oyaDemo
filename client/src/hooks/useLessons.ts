import { useQuery } from '@tanstack/react-query';
import { mockLessons } from '@/data/mockData';
import { Lesson } from '@/types';

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
