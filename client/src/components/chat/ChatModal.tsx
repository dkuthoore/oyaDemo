import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Send, X, Bot, User, BookOpen, Loader2 } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { chatService } from '@/lib/chatService';
import { ChatMessage } from '@/types';
import ReactMarkdown from 'react-markdown';

export default function ChatModal() {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const { 
    isChatOpen, 
    currentChatConcept, 
    closeChat, 
    chatMessages, 
    addChatMessage, 
    isGeneratingResponse,
    setGeneratingResponse 
  } = useAppStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [chatMessages, isGeneratingResponse]);

  const handleSend = async () => {
    if (input.trim() && !isGeneratingResponse) {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: input.trim(),
        role: 'user',
        timestamp: new Date()
      };
      
      addChatMessage(userMessage);
      setInput('');
      setGeneratingResponse(true);
      
      try {
        const stream = await chatService.sendMessage({ message: input.trim() });
        const reader = stream.getReader();
        let fullResponse = '';
        
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: '',
          role: 'assistant', 
          timestamp: new Date()
        };
        
        addChatMessage(aiMessage);
        
        const readStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              setGeneratingResponse(false);
              return;
            }
            
            fullResponse += value;
            // Update the AI message with accumulated response in real-time
            const currentMessages = useAppStore.getState().chatMessages;
            const updatedMessages = currentMessages.map(msg => 
              msg.id === aiMessage.id 
                ? { ...msg, content: fullResponse }
                : msg
            );
            useAppStore.setState({ chatMessages: updatedMessages });
            readStream();
          }).catch((error: any) => {
            console.error('Stream reading error:', error);
            setGeneratingResponse(false);
          });
        };
        
        readStream();
      } catch (error) {
        console.error('Chat service error:', error);
        setGeneratingResponse(false);
      }
    }
  };

  const handleSuggestedQuestion = async (question: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: question,
      role: 'user',
      timestamp: new Date()
    };
    
    addChatMessage(userMessage);
    setGeneratingResponse(true);
    
    try {
      const stream = await chatService.sendMessage({ message: question });
      const reader = stream.getReader();
      let fullResponse = '';
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: '',
        role: 'assistant',
        timestamp: new Date()
      };
      
      addChatMessage(aiMessage);
      
      const readStream = () => {
        reader.read().then(({ done, value }) => {
          if (done) {
            setGeneratingResponse(false);
            return;
          }
          
          fullResponse += value;
          // Update the AI message with accumulated response in real-time
          const currentMessages = useAppStore.getState().chatMessages;
          const updatedMessages = currentMessages.map(msg => 
            msg.id === aiMessage.id 
              ? { ...msg, content: fullResponse }
              : msg
          );
          useAppStore.setState({ chatMessages: updatedMessages });
          readStream();
        }).catch((error: any) => {
          console.error('Stream reading error:', error);
          setGeneratingResponse(false);
        });
      };
      
      readStream();
    } catch (error) {
      console.error('Chat service error:', error);
      setGeneratingResponse(false);
    }
  };

  const handleCreateLesson = () => {
    toast({
      title: "Creating Lesson",
      description: `Creating a comprehensive lesson about ${getConceptDisplayName(currentChatConcept)}...`,
    });
    closeChat();
    setTimeout(() => {
      setLocation('/lessons');
      toast({
        title: "Lesson Created",
        description: "Your new lesson is ready in the Lessons section!",
      });
    }, 1500);
  };

  const getConceptDisplayName = (conceptId: string) => {
    if (conceptId === 'general') return 'General Chat';
    return conceptId.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Dialog open={isChatOpen} onOpenChange={closeChat}>
      <DialogContent 
        className="glassmorphism border-glassmorphism-border max-w-md h-[600px] flex flex-col p-0 fixed bottom-20 right-6 left-auto top-auto translate-x-0 translate-y-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
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
          <Button
            onClick={handleCreateLesson}
            variant="outline"
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border-white/20"
            data-testid="button-create-lesson"
          >
            <BookOpen className="w-4 h-4" />
            <span>Create Lesson</span>
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollRef} className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4 min-h-0">
            {chatMessages.length === 0 && (
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
            
            {chatMessages.map((message: ChatMessage) => (
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
                  <div className="text-sm chat-markdown">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="text-white text-sm" size={16} />
                  </div>
                )}
              </div>
            ))}
            
            {isGeneratingResponse && (
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
              disabled={isGeneratingResponse}
              data-testid="input-chat-message"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isGeneratingResponse}
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
