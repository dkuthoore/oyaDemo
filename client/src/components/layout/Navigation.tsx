import { useLocation } from 'wouter';
import { Brain, ChevronDown, BookOpen, ClipboardList, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/appStore';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const { openInsightsModal } = useAppStore();
  
  const handleInsightsClick = () => {
    openInsightsModal();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 glassmorphism">
      <button 
        onClick={() => setLocation('/')}
        className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity"
        data-testid="link-home"
      >
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Brain className="text-white text-sm" size={16} />
        </div>
        <span className="font-bold text-lg gradient-text">OyaChat Demo</span>
      </button>
      
      <div className="flex space-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="px-4 py-2 rounded-full bg-white/10 text-icon-color hover:bg-white/20 transition-all flex items-center space-x-2"
              data-testid="nav-survey"
            >
              <ClipboardList className="w-4 h-4" />
              <span className="text-sm">Survey</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Functionality disabled for this demo.</p>
          </TooltipContent>
        </Tooltip>
        <button
          onClick={handleInsightsClick}
          className="px-4 py-2 rounded-full bg-white/10 text-icon-color hover:bg-white/20 transition-all flex items-center space-x-2"
          title="Insights"
          data-testid="nav-insights"
        >
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm">Insights</span>
        </button>
        <button
          onClick={() => setLocation('/lessons')}
          className={cn(
            "px-4 py-2 rounded-full transition-all flex items-center space-x-2",
            location === '/lessons'
              ? "bg-gradient-primary text-white"
              : "bg-white/10 text-icon-color hover:bg-white/20"
          )}
          title="Lessons"
          data-testid="nav-lessons"
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">Lessons</span>
        </button>
      </div>
    </nav>
  );
}
