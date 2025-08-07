import { useLocation } from 'wouter';
import { Brain, ChevronDown, BookOpen, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [location, setLocation] = useLocation();
  
  const navItems = [
    { path: '/dashboard', icon: Brain, label: 'Insights' },
    { path: '/lessons', icon: BookOpen, label: 'Lessons' },
  ];

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
        <span className="font-bold text-lg gradient-text">CryptoLearn AI</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      <div className="flex space-x-4">
        {navItems.map(({ path, icon: Icon, label }) => (
          <button
            key={path}
            onClick={() => setLocation(path)}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              location === path
                ? "bg-gradient-primary text-white"
                : "bg-white/10 text-icon-color hover:bg-white/20"
            )}
            title={label}
            data-testid={`nav-${label.toLowerCase()}`}
          >
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    </nav>
  );
}
