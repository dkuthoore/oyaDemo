import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Send, X, Bot, User } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useChat } from '@/hooks/useChat';

export default function ChatModal() {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isChatOpen, currentChatConcept, closeChat } = useAppStore();
  const { messages, isLoading, sendMessage, suggestedQuestions } = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  const getConceptDisplayName = (conceptId: string) => {
    if (conceptId === 'general') return 'General Chat';
    return conceptId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Dialog open={isChatOpen} onOpenChange={closeChat}>
      <DialogContent className="glassmorphism border-glassmorphism-border max-w-2xl max-h-[80vh] flex flex-col p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-glassmorphism-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Chat Assistant</h3>
              <p className="text-sm text-text-secondary" data-testid="text-concept-name">
                {getConceptDisplayName(currentChatConcept)}
              </p>
            </div>
          </div>
          <button
            onClick={closeChat}
            className="text-text-secondary hover:text-white transition-colors"
            data-testid="button-close-chat"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollRef} className="flex-1 p-6">
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white text-sm" size={16} />
                </div>
                <div className="glassmorphism rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">
                    Hello! I'm your AI assistant. I can help explain crypto concepts, answer questions about DeFi, blockchain technology, and more. What would you like to learn about?
                  </p>
                </div>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'justify-end' : ''
                }`}
                data-testid={`message-${message.role}-${message.id}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="text-white text-sm" size={16} />
                  </div>
                )}
                
                <div className="glassmorphism rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">{message.content}</p>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-white text-sm" size={16} />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white text-sm" size={16} />
                </div>
                <div className="glassmorphism rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Questions */}
        {suggestedQuestions.length > 0 && messages.length === 0 && (
          <div className="px-6 py-3 border-t border-glassmorphism-border">
            <p className="text-xs text-text-secondary mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                  data-testid={`suggestion-${idx}`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 border-t border-glassmorphism-border">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me about crypto concepts..."
              className="flex-1 bg-white/5 border border-glassmorphism-border rounded-lg px-4 py-3 text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
              data-testid="input-chat-message"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-primary text-white rounded-lg hover:scale-105 transition-all duration-300"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
