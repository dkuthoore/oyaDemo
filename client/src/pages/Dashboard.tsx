import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { mockInsights, mockStats } from '@/data/mockData';
import InsightCard from '@/components/insights/InsightCard';

export default function Dashboard() {
  const { data: insights = [] } = useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockInsights;
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockStats;
    }
  });

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold gradient-text mb-4"
          >
            Crypto Insights Dashboard
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary"
          >
            Explore interactive insights with AI-powered explanations
          </motion.p>
        </div>
        
        {/* Stats Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="glassmorphism rounded-xl p-6 text-center" data-testid="stat-active-insights">
              <div className="text-3xl font-bold text-accent-success mb-2">{stats.activeInsights}</div>
              <div className="text-sm text-text-secondary">Active Insights</div>
            </div>
            <div className="glassmorphism rounded-xl p-6 text-center" data-testid="stat-concepts-learned">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.conceptsLearned}</div>
              <div className="text-sm text-text-secondary">Concepts Learned</div>
            </div>
            <div className="glassmorphism rounded-xl p-6 text-center" data-testid="stat-progress-rate">
              <div className="text-3xl font-bold text-purple-400 mb-2">{stats.progressRate}%</div>
              <div className="text-sm text-text-secondary">Progress Rate</div>
            </div>
            <div className="glassmorphism rounded-xl p-6 text-center" data-testid="stat-lessons-completed">
              <div className="text-3xl font-bold text-accent-card-red mb-2">{stats.lessonsCompleted}</div>
              <div className="text-sm text-text-secondary">Lessons Completed</div>
            </div>
          </motion.div>
        )}
        
        {/* Insight Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <InsightCard insight={insight} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
