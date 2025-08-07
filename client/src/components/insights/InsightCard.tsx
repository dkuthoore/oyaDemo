import { ArrowRight } from 'lucide-react';
import { Insight } from '@/types';
import { useAppStore } from '@/stores/appStore';

interface InsightCardProps {
  insight: Insight;
}

export default function InsightCard({ insight }: InsightCardProps) {
  const { openInsightModal, openChat } = useAppStore();

  const handleHyperlinkClick = (e: React.MouseEvent, conceptId: string) => {
    e.stopPropagation();
    openChat(conceptId);
  };

  const renderContentWithHyperlinks = () => {
    let lastIndex = 0;
    const elements: React.ReactNode[] = [];

    insight.hyperlinks.forEach((link, idx) => {
      // Add text before hyperlink
      if (link.position.start > lastIndex) {
        elements.push(
          <span key={`text-${idx}`}>
            {insight.content.slice(lastIndex, link.position.start)}
          </span>
        );
      }

      // Add hyperlink
      elements.push(
        <button
          key={`link-${idx}`}
          onClick={(e) => handleHyperlinkClick(e, link.conceptId)}
          className="insight-hyperlink"
          data-testid={`hyperlink-${link.conceptId}`}
        >
          {link.text}
        </button>
      );

      lastIndex = link.position.end;
    });

    // Add remaining text
    if (lastIndex < insight.content.length) {
      elements.push(
        <span key="text-final">
          {insight.content.slice(lastIndex)}
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
    <div
      className="glassmorphism rounded-2xl p-6 hover:shadow-card-glow transition-all duration-300 cursor-pointer group"
      onClick={() => openInsightModal(insight)}
      data-testid={`insight-card-${insight.id}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`px-3 py-1 ${getCategoryColor(insight.category)} rounded-full text-xs font-medium`}>
          {insight.category}
        </div>
        <div className="text-text-secondary text-sm">{insight.timestamp}</div>
      </div>
      
      <h3 className="text-lg font-semibold mb-3 group-hover:text-yellow-400 transition-colors">
        {insight.title}
      </h3>
      
      <p className="text-text-secondary mb-4 leading-relaxed">
        {renderContentWithHyperlinks()}
      </p>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex space-x-2">
          {insight.tags.map((tag) => (
            <button
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                openChat(tag.toLowerCase().replace(/\s+/g, '-'));
              }}
              className="px-2 py-1 bg-white/10 rounded-md text-xs hover:bg-white/20 transition-colors"
              data-testid={`tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="text-accent-success">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
