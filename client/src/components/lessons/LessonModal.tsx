import { X, CheckCircle, Circle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/stores/appStore';

export default function LessonModal() {
  const { isLessonModalOpen, currentLesson, closeLessonModal } = useAppStore();

  if (!currentLesson) return null;

  const getCategoryColor = (level: string) => {
    const colors: Record<string, string> = {
      'Beginner': 'bg-gradient-primary',
      'Intermediate': 'bg-gradient-secondary',
      'Advanced': 'bg-gradient-copy'
    };
    return colors[level] || 'bg-gradient-primary';
  };

  const getIconComponent = (iconName: string) => {
    return <div className="w-6 h-6 bg-white rounded" />;
  };

  return (
    <Dialog open={isLessonModalOpen} onOpenChange={closeLessonModal}>
      <DialogContent className="glassmorphism border-glassmorphism-border max-w-5xl max-h-[80vh] flex p-0">
        {/* Sidebar */}
        <div className="w-80 border-r border-glassmorphism-border p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Course Content</h3>
            <button
              onClick={closeLessonModal}
              className="text-text-secondary hover:text-white transition-colors"
              data-testid="button-close-lesson-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2">
            {currentLesson.sections.map((section, index) => (
              <div
                key={section.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  index === 0 ? 'bg-gradient-primary/20' : 'hover:bg-white/5'
                }`}
                data-testid={`section-${section.id}`}
              >
                <div className="flex items-center space-x-3">
                  {section.completed ? (
                    <CheckCircle className="w-4 h-4 text-accent-success" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-secondary" />
                  )}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
                <div className="text-xs text-text-secondary mt-1 ml-7">{section.duration}</div>
              </div>
            ))}
          </div>
          
          {/* Progress */}
          <div className="mt-8 p-4 glassmorphism rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Overall Progress</span>
              <span className="text-sm text-accent-success">{currentLesson.progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full" 
                style={{ width: `${currentLesson.progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-8">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 ${getCategoryColor(currentLesson.level)} rounded-xl flex items-center justify-center`}>
                  {getIconComponent(currentLesson.icon)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold" data-testid="text-lesson-title">
                    Introduction to Blockchain
                  </h2>
                  <p className="text-text-secondary">
                    8 minutes • {currentLesson.level}
                  </p>
                </div>
              </div>
              
              {/* Video Placeholder */}
              <div className="bg-gradient-to-br from-purple-900/50 to-orange-900/50 rounded-xl h-64 flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 bg-white rounded-full" />
                  </div>
                  <p className="text-text-secondary">Video Player Component</p>
                </div>
              </div>
            </div>
            
            {/* Content Sections */}
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold mb-4">What is Blockchain?</h3>
                <div className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
                  <p className="mb-4">
                    A blockchain is a distributed ledger technology that maintains a continuously growing list of records, called blocks, 
                    which are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, 
                    a timestamp, and transaction data.
                  </p>
                  <p className="mb-4">
                    The key innovation of blockchain technology is its decentralized nature, which eliminates the need for a central authority 
                    or intermediary to validate transactions.
                  </p>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-4">Key Properties</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glassmorphism rounded-lg p-4">
                    <h4 className="font-medium text-accent-success mb-2">Immutability</h4>
                    <p className="text-sm text-text-secondary">Once data is recorded, it becomes extremely difficult to alter or delete.</p>
                  </div>
                  <div className="glassmorphism rounded-lg p-4">
                    <h4 className="font-medium text-yellow-400 mb-2">Transparency</h4>
                    <p className="text-sm text-text-secondary">All transactions are visible to network participants.</p>
                  </div>
                  <div className="glassmorphism rounded-lg p-4">
                    <h4 className="font-medium text-purple-400 mb-2">Decentralization</h4>
                    <p className="text-sm text-text-secondary">No single point of control or failure.</p>
                  </div>
                  <div className="glassmorphism rounded-lg p-4">
                    <h4 className="font-medium text-accent-card-red mb-2">Security</h4>
                    <p className="text-sm text-text-secondary">Cryptographic hashing ensures data integrity.</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-4">Interactive Quiz</h3>
                <div className="glassmorphism rounded-lg p-6">
                  <p className="mb-4">What is the primary benefit of blockchain's decentralized nature?</p>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-white/5">
                      <input type="radio" name="quiz1" value="a" className="text-purple-500" />
                      <span>Faster transaction processing</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-white/5">
                      <input type="radio" name="quiz1" value="b" className="text-purple-500" />
                      <span>Eliminates need for central authority</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-white/5">
                      <input type="radio" name="quiz1" value="c" className="text-purple-500" />
                      <span>Reduces energy consumption</span>
                    </label>
                  </div>
                  <Button className="mt-4 px-6 py-2 bg-gradient-primary text-white rounded-lg hover:scale-105 transition-all duration-300">
                    Submit Answer
                  </Button>
                </div>
              </section>
            </div>
          </ScrollArea>
          
          {/* Navigation */}
          <div className="flex items-center justify-between p-6 border-t border-glassmorphism-border">
            <Button
              variant="ghost"
              className="px-6 py-3 glassmorphism text-text-secondary rounded-lg hover:scale-105 transition-all duration-300"
              disabled
              data-testid="button-previous-section"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="text-center">
              <div className="text-sm text-text-secondary mb-1">Section 1 of {currentLesson.sections.length}</div>
              <div className="w-32 h-1 bg-white/10 rounded-full mx-auto">
                <div className="w-8 h-1 bg-gradient-primary rounded-full"></div>
              </div>
            </div>
            <Button
              className="px-6 py-3 bg-gradient-primary text-white rounded-lg hover:scale-105 transition-all duration-300"
              data-testid="button-next-section"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
