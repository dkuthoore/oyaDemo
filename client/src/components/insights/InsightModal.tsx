import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';

export default function InsightModal() {
  const { isInsightModalOpen, currentInsight, closeInsightModal, openChatWithConcept, openLessonModal } = useAppStore();

  if (!currentInsight) return null;

  const handleHyperlinkClick = (conceptId: string) => {
    openChatWithConcept(conceptId);
  };

  const renderContentWithHyperlinks = () => {
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    currentInsight.hyperlinks.forEach((link, idx) => {
      if (link.position.start > lastIndex) {
        elements.push(
          <span key={`text-${idx}`}>
            {currentInsight.content.slice(lastIndex, link.position.start)}
          </span>
        );
      }

      elements.push(
        <button
          key={`link-${idx}`}
          onClick={() => handleHyperlinkClick(link.conceptId)}
          className="insight-hyperlink"
          data-testid={`modal-hyperlink-${link.conceptId}`}
        >
          {link.text}
        </button>
      );

      lastIndex = link.position.end;
    });

    if (lastIndex < currentInsight.content.length) {
      elements.push(
        <span key="text-final">
          {currentInsight.content.slice(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'DeFi': 'bg-gradient-secondary',
      'Blockchain': 'bg-gradient-primary',
      'NFT': 'bg-gradient-copy',
      'Trading': 'bg-gradient-secondary',
      'Security': 'bg-gradient-primary',
      'Layer 2': 'bg-gradient-copy'
    };
    return colors[category] || 'bg-gradient-primary';
  };

  return (
    <Dialog open={isInsightModalOpen} onOpenChange={closeInsightModal}>
      <DialogContent className="glassmorphism border-glassmorphism-border max-w-4xl max-h-[80vh] overflow-y-auto p-0">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 ${getCategoryColor(currentInsight.category)} rounded-full text-sm font-medium`}>
                {currentInsight.category}
              </div>
              <span className="text-text-secondary text-sm">{currentInsight.timestamp}</span>
            </div>
            <button
              onClick={closeInsightModal}
              className="text-text-secondary hover:text-white transition-colors"
              data-testid="button-close-insight-modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <h2 className="text-3xl font-bold mb-6" data-testid="text-insight-title">
            {currentInsight.title}
          </h2>
          
          <div className="prose prose-invert max-w-none">
            <div className="text-lg leading-relaxed mb-8">
              <p className="mb-4">
                {renderContentWithHyperlinks()}
              </p>
              <p className="mb-4">
                This insight provides a comprehensive overview of the key concepts and mechanisms that drive innovation in the cryptocurrency space. 
                Understanding these fundamentals is crucial for anyone looking to navigate the complex world of digital assets and decentralized technologies.
              </p>
              <p className="mb-4">
                The interconnected nature of these concepts demonstrates how blockchain technology has evolved from a simple digital ledger 
                to a comprehensive ecosystem of financial and technological innovations that are reshaping traditional industries.
              </p>
              <p>
                As the space continues to evolve, staying informed about these core concepts will help you make better decisions 
                and take advantage of new opportunities as they emerge.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {currentInsight.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/10 rounded-md text-sm">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-glassmorphism-border">
            <Button
              onClick={() => {
                closeInsightModal();
                // Open a related lesson - for demo purposes, open the first lesson
                openLessonModal({
                  id: '2',
                  title: 'DeFi Protocols Deep Dive',
                  description: 'Explore the ecosystem of decentralized finance protocols.',
                  duration: '60 min',
                  level: 'Intermediate',
                  progress: 45,
                  status: 'In Progress',
                  icon: 'ArrowLeftRight',
                  tags: ['AMM', 'Yield Farming', 'Lending'],
                  sections: []
                });
              }}
              className="px-6 py-3 bg-gradient-primary text-white rounded-lg hover:scale-105 transition-all duration-300"
              data-testid="button-learn-more"
            >
              Learn More in Deep Lessons
            </Button>
            <Button
              onClick={() => {
                closeInsightModal();
                openChatWithConcept(currentInsight.hyperlinks[0]?.conceptId || 'general');
              }}
              variant="ghost"
              className="px-6 py-3 glassmorphism text-text-primary rounded-lg hover:scale-105 transition-all duration-300"
              data-testid="button-ask-ai"
            >
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
