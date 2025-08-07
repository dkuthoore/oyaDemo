import { X, CheckCircle, Circle, ChevronLeft, ChevronRight, BookOpen, Award } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppStore } from '@/stores/appStore';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function LessonModal() {
  const { isLessonModalOpen, currentLesson, closeLessonModal } = useAppStore();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  if (!currentLesson) return null;

  // Check if this is a generated lesson
  const isGeneratedLesson = (currentLesson as any).isGenerated;
  const generatedContent = isGeneratedLesson ? (currentLesson as any).generatedContent : null;
  
  // Get sections based on lesson type
  const sections = isGeneratedLesson && generatedContent 
    ? generatedContent.content 
    : currentLesson.sections;
    
  const currentSection = showQuiz 
    ? { title: 'Quiz', body: '' }
    : sections[currentSectionIndex];

  const totalSections = sections.length;
  const allSectionsCompleted = completedSections.size === totalSections;

  useEffect(() => {
    if (isLessonModalOpen) {
      setCurrentSectionIndex(0);
      setCompletedSections(new Set());
      setShowQuiz(false);
      setSelectedAnswers({});
      setShowQuizResults(false);
    }
  }, [isLessonModalOpen]);

  const markSectionComplete = () => {
    setCompletedSections(prev => new Set(prev).add(currentSectionIndex));
  };

  const navigateToSection = (index: number) => {
    if (index >= 0 && index < totalSections) {
      setCurrentSectionIndex(index);
      setShowQuiz(false);
    }
  };

  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      markSectionComplete();
      setCurrentSectionIndex(prev => prev + 1);
    } else if (allSectionsCompleted && !showQuiz) {
      markSectionComplete();
      setShowQuiz(true);
    }
  };

  const handlePrevious = () => {
    if (showQuiz) {
      setShowQuiz(false);
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const handleQuizSubmit = () => {
    setShowQuizResults(true);
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
            {sections.map((section: any, index: number) => (
              <div
                key={section.id || section.sectionNumber}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentSectionIndex && !showQuiz ? 'bg-gradient-primary/20' : 'hover:bg-white/5'
                }`}
                onClick={() => navigateToSection(index)}
                data-testid={`section-${section.id || section.sectionNumber}`}
              >
                <div className="flex items-center space-x-3">
                  {completedSections.has(index) ? (
                    <CheckCircle className="w-4 h-4 text-accent-success" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-secondary" />
                  )}
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
                <div className="text-xs text-text-secondary mt-1 ml-7">
                  {section.duration || `Section ${section.sectionNumber || index + 1}`}
                </div>
              </div>
            ))}
            
            {/* Quiz Section */}
            {isGeneratedLesson && generatedContent?.quiz && (
              <div
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  showQuiz ? 'bg-gradient-primary/20' : allSectionsCompleted ? 'hover:bg-white/5' : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => allSectionsCompleted && setShowQuiz(true)}
                data-testid="quiz-section"
              >
                <div className="flex items-center space-x-3">
                  {showQuizResults ? (
                    <Award className="w-4 h-4 text-accent-success" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-text-secondary" />
                  )}
                  <span className="text-sm font-medium">Quiz</span>
                </div>
                <div className="text-xs text-text-secondary mt-1 ml-7">
                  {allSectionsCompleted ? 'Test your knowledge' : 'Complete all sections to unlock'}
                </div>
              </div>
            )}
          </div>
          
          {/* Progress */}
          <div className="mt-8 p-4 glassmorphism rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Overall Progress</span>
              <span className="text-sm text-accent-success">
                {Math.round((completedSections.size / totalSections) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${Math.round((completedSections.size / totalSections) * 100)}%` }}
              />
            </div>
            <div className="text-xs text-text-secondary mt-2">
              {completedSections.size} of {totalSections} sections completed
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-glassmorphism-border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {showQuiz ? 'Quiz Time!' : currentSection?.title}
                </h2>
                <p className="text-text-secondary">
                  {showQuiz 
                    ? `Test your knowledge with ${generatedContent?.quiz?.length} questions`
                    : `Section ${currentSectionIndex + 1} of ${totalSections}`}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  disabled={currentSectionIndex === 0 && !showQuiz}
                  className="flex items-center space-x-2"
                  data-testid="button-previous-section"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={showQuiz && !allSectionsCompleted}
                  className="flex items-center space-x-2"
                  data-testid="button-next-section"
                >
                  <span>
                    {showQuiz 
                      ? 'Finish' 
                      : currentSectionIndex === totalSections - 1 
                        ? 'Complete & Quiz' 
                        : 'Next'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <ScrollArea className="flex-1 p-6">
            {showQuiz ? (
              <div className="space-y-6">
                {!showQuizResults ? (
                  <>
                    <div className="glassmorphism rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Quiz Instructions</h3>
                      <p className="text-text-secondary mb-4">
                        Answer all questions to test your understanding of the lesson material.
                        Select the best answer for each question.
                      </p>
                    </div>
                    
                    {generatedContent?.quiz?.map((question: any, questionIndex: number) => (
                      <div key={questionIndex} className="glassmorphism rounded-lg p-6">
                        <h4 className="font-medium mb-4">
                          Question {questionIndex + 1}: {question.question}
                        </h4>
                        <div className="space-y-2">
                          {question.options.map((option: string, optionIndex: number) => (
                            <label
                              key={optionIndex}
                              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                            >
                              <input
                                type="radio"
                                name={`question-${questionIndex}`}
                                value={option}
                                checked={selectedAnswers[questionIndex] === option}
                                onChange={(e) => setSelectedAnswers(prev => ({
                                  ...prev,
                                  [questionIndex]: e.target.value
                                }))}
                                className="text-primary"
                              />
                              <span className="text-sm">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-center">
                      <Button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(selectedAnswers).length !== generatedContent?.quiz?.length}
                        className="px-8 py-3"
                        data-testid="button-submit-quiz"
                      >
                        Submit Quiz
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="glassmorphism rounded-lg p-8">
                      <Award className="w-16 h-16 mx-auto mb-4 text-accent-success" />
                      <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                      <p className="text-text-secondary mb-6">
                        Great job completing this lesson. You've mastered the fundamentals!
                      </p>
                      <div className="space-y-2">
                        {generatedContent?.quiz?.map((question: any, questionIndex: number) => {
                          const isCorrect = selectedAnswers[questionIndex] === question.answer;
                          return (
                            <div
                              key={questionIndex}
                              className={`p-3 rounded-lg text-sm ${
                                isCorrect ? 'bg-accent-success/20 text-accent-success' : 'bg-red-500/20 text-red-400'
                              }`}
                            >
                              Question {questionIndex + 1}: {isCorrect ? 'Correct' : 'Incorrect'}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                {isGeneratedLesson ? (
                  <ReactMarkdown>
                    {currentSection?.body || 'No content available'}
                  </ReactMarkdown>
                ) : (
                  <div>
                    <p className="text-text-secondary leading-relaxed">
                      {currentSection?.content || 'No content available'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}