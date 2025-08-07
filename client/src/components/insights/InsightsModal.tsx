import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAppStore } from '@/stores/appStore';
import { useInsights } from '@/hooks/useInsights';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function InsightsModal() {
  const { isInsightsModalOpen, closeInsightsModal, currentInsightIndex, setCurrentInsightIndex, openChat } = useAppStore();
  const { data: insights, isLoading } = useInsights();

  const currentInsight = insights?.[currentInsightIndex];

  const handleNext = () => {
    if (insights && currentInsightIndex < insights.length - 1) {
      setCurrentInsightIndex(currentInsightIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentInsightIndex > 0) {
      setCurrentInsightIndex(currentInsightIndex - 1);
    }
  };

  const handleConceptClick = (conceptId: string) => {
    openChat(conceptId);
    closeInsightsModal();
  };

  const renderContent = () => {
    if (!currentInsight) return null;

    const { content, hyperlinks } = currentInsight;
    let lastIndex = 0;
    const parts: JSX.Element[] = [];

    hyperlinks?.forEach((link, index) => {
      // Add text before the link
      if (link.position.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {content.substring(lastIndex, link.position.start)}
          </span>
        );
      }

      // Add the hyperlinked text
      parts.push(
        <button
          key={`link-${index}`}
          onClick={() => handleConceptClick(link.conceptId)}
          className={cn(
            "inline-flex items-center underline decoration-dotted underline-offset-2 transition-colors",
            link.type === 'complex'
              ? "text-purple-400 hover:text-purple-300"
              : "text-blue-400 hover:text-blue-300"
          )}
          data-testid={`concept-link-${link.conceptId}`}
        >
          {link.text}
        </button>
      );

      lastIndex = link.position.end;
    });

    // Add any remaining text
    if (lastIndex < content.length) {
      parts.push(
        <span key="text-end">
          {content.substring(lastIndex)}
        </span>
      );
    }

    return parts;
  };

  if (!insights || insights.length === 0) return null;

  return (
    <Dialog open={isInsightsModalOpen} onOpenChange={closeInsightsModal}>
      <DialogContent className="max-w-3xl bg-gray-900/95 backdrop-blur-xl border-white/10">
        <div className="relative">
          {/* Navigation arrows */}
          <button
            onClick={handlePrev}
            disabled={currentInsightIndex === 0}
            className="absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            data-testid="insights-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentInsightIndex === insights.length - 1}
            className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            data-testid="insights-next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Content */}
          <AnimatePresence mode="wait">
            {currentInsight && (
              <motion.div
                key={currentInsight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-gradient-primary text-white">
                      {currentInsight.category}
                    </Badge>
                    <span className="text-sm text-gray-400">{currentInsight.timestamp}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white">
                    {currentInsight.title}
                  </h2>
                </div>

                {/* Content with clickable concepts */}
                <p className="text-lg text-gray-300 leading-relaxed">
                  {renderContent()}
                </p>

                {/* Tags */}
                {currentInsight.tags && currentInsight.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {currentInsight.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-gray-400 border-gray-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Pagination indicator */}
                <div className="flex justify-center items-center space-x-2 pt-4">
                  {insights.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentInsightIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentInsightIndex
                          ? "w-8 bg-gradient-primary"
                          : "bg-gray-600 hover:bg-gray-500"
                      )}
                      data-testid={`pagination-dot-${index}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}