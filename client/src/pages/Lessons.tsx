import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { mockLessons } from '@/data/mockData';
import LessonCard from '@/components/lessons/LessonCard';

export default function Lessons() {
  const { data: lessons = [] } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Load generated lessons from localStorage
      const generatedLessons = JSON.parse(localStorage.getItem('generatedLessons') || '[]');
      
      // Convert generated lessons to lesson card format
      const convertedLessons = generatedLessons.map((generatedLesson: any) => ({
        id: generatedLesson.id,
        title: generatedLesson.title,
        description: `AI-generated lesson covering ${Object.keys(generatedLesson.tableOfContents).length} comprehensive sections`,
        level: 'Beginner',
        duration: `${Object.keys(generatedLesson.tableOfContents).length * 2} min read`,
        status: 'Available',
        progress: 0,
        tags: ['AI Generated', 'Interactive'],
        icon: 'Code',
        isGenerated: true,
        generatedContent: generatedLesson
      }));
      
      // Combine mock lessons with generated lessons
      return [...convertedLessons, ...mockLessons];
    }
  });

  const progressData = [
    { level: 'Beginner', progress: 75, color: 'bg-gradient-primary', description: 'Blockchain Fundamentals' },
    { level: 'Intermediate', progress: 45, color: 'bg-gradient-secondary', description: 'DeFi Protocols' },
    { level: 'Advanced', progress: 15, color: 'bg-gradient-copy', description: 'Smart Contract Development' }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold gradient-text mb-4"
          >
            Lessons
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary"
          >
            Comprehensive learning modules tailored to your interests and learning level
          </motion.p>
        </div>
        
        {/* Learning Path Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-semibold mb-6">Your Learning Progress</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {progressData.map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
                data-testid={`progress-${item.level.toLowerCase()}`}
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${item.color} flex items-center justify-center`}>
                  <span className="text-2xl font-bold">{item.progress}%</span>
                </div>
                <h4 className="font-medium mb-2">{item.level}</h4>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Lesson Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <LessonCard lesson={lesson} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
