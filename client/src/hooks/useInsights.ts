import { useQuery } from '@tanstack/react-query';
import { mockInsights } from '@/data/mockData';
import { Insight } from '@/types';

export function useInsights() {
  return useQuery({
    queryKey: ['/api/insights'],
    queryFn: (): Promise<Insight[]> => {
      // Simulate API delay
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockInsights), 500);
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
