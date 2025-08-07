import { CheckCircle, PlayCircle, Lock, ArrowRight } from 'lucide-react';
import { Lesson } from '@/types';
import { useAppStore } from '@/stores/appStore';

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const { openLessonModal } = useAppStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'In Progress':
        return <PlayCircle className="w-4 h-4" />;
      case 'Locked':
        return <Lock className="w-4 h-4" />;
      default:
        return <ArrowRight className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-accent-success/20 text-accent-success';
      case 'In Progress':
        return 'bg-yellow-400/20 text-yellow-400';
      case 'Locked':
        return 'bg-white/10 text-text-secondary';
      default:
        return 'bg-white/10 text-text-secondary';
    }
  };

  const getIconComponent = (iconName: string) => {
    // Simple icon mapping - in a real app, you'd import the specific icons
    const iconSize = 24;
    switch (iconName) {
      case 'Cubes':
        return <div className="w-6 h-6 bg-white rounded" />;
      case 'ArrowLeftRight':
        return <div className="w-6 h-6 bg-white rounded" />;
      case 'Code':
        return <div className="w-6 h-6 bg-white rounded" />;
      case 'Shield':
        return <div className="w-6 h-6 bg-white rounded" />;
      default:
        return <div className="w-6 h-6 bg-white rounded" />;
    }
  };

  const getCategoryColor = (level: string) => {
    const colors: Record<string, string> = {
      'Beginner': 'bg-gradient-primary',
      'Intermediate': 'bg-gradient-secondary',
      'Advanced': 'bg-gradient-copy'
    };
    return colors[level] || 'bg-gradient-primary';
  };

  return (
    <div
      className="glassmorphism rounded-2xl p-8 hover:shadow-purple-glow transition-all duration-300 cursor-pointer group h-full min-h-[320px] flex flex-col"
      onClick={() => lesson.status !== 'Locked' && openLessonModal(lesson)}
      data-testid={`lesson-card-${lesson.id}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${getCategoryColor(lesson.level)} rounded-xl flex items-center justify-center`}>
            {getIconComponent(lesson.icon)}
          </div>
          <div>
            <h3 className="text-xl font-semibold group-hover:text-yellow-400 transition-colors">
              {lesson.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {lesson.level} • {lesson.duration}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 ${getStatusColor(lesson.status)} rounded-full text-xs font-medium flex items-center space-x-1`}>
          {getStatusIcon(lesson.status)}
          <span>{lesson.status}</span>
        </div>
      </div>
      
      <p className="text-text-secondary mb-6 leading-relaxed flex-grow">
        {(lesson as any).isGenerated 
          ? (lesson as any).generatedContent?.summary || lesson.description
          : lesson.description}
      </p>
      
      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/10 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className={lesson.status === 'Completed' ? 'text-accent-success' : 
                          lesson.status === 'In Progress' ? 'text-yellow-400' : 
                          lesson.status === 'Locked' ? 'text-text-secondary' : 'text-accent-card-red'}>
            {getStatusIcon(lesson.status)}
          </div>
        </div>
      </div>
      
        {/* Progress bar for in-progress lessons */}
        {lesson.status === 'In Progress' && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-text-secondary">Progress</span>
              <span className="text-xs text-yellow-400">{lesson.progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-secondary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${lesson.progress}%` }}
              />
            </div>
          </div>
        )}
    </div>
  );
}
