import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, Insight, Lesson } from '@/types';
import { chatService } from '@/lib/chatService';

interface AppState {
  // Chat state
  chatMessages: ChatMessage[];
  currentChatConcept: string;
  isChatOpen: boolean;
  isGeneratingResponse: boolean;
  
  // Modal state
  isInsightModalOpen: boolean;
  currentInsight: Insight | null;
  isInsightsModalOpen: boolean;
  currentInsightIndex: number;
  isLessonModalOpen: boolean;
  currentLesson: Lesson | null;
  
  // Actions
  openChat: (conceptId: string) => void;
  closeChat: () => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChatMessages: () => void;
  setGeneratingResponse: (isGenerating: boolean) => void;
  
  openInsightModal: (insight: Insight) => void;
  closeInsightModal: () => void;
  
  openInsightsModal: () => void;
  closeInsightsModal: () => void;
  setCurrentInsightIndex: (index: number) => void;
  
  openLessonModal: (lesson: Lesson) => void;
  closeLessonModal: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      chatMessages: [],
      currentChatConcept: 'general',
      isChatOpen: false,
      isGeneratingResponse: false,
      isInsightModalOpen: false,
      currentInsight: null,
      isInsightsModalOpen: false,
      currentInsightIndex: 0,
      isLessonModalOpen: false,
      currentLesson: null,
      
      // Actions
      openChat: (conceptId: string) => {
        const conceptDisplayName = chatService.getConceptDisplayName(conceptId);
        
        // Add concept as user message when opening from hyperlink
        const conceptMessage: ChatMessage = {
          id: Date.now().toString(),
          content: conceptDisplayName,
          role: 'user',
          timestamp: new Date()
        };

        set({ 
          isChatOpen: true, 
          currentChatConcept: conceptId,
          chatMessages: [conceptMessage] // Start with concept message
        });

        // Auto-trigger AI response for concept
        get().setGeneratingResponse(true);
        
        // Stream AI response
        chatService.sendMessage({ message: '', concept: conceptId })
          .then((stream: ReadableStream<string>) => {
            const reader = stream.getReader();
            let fullResponse = '';
            
            const aiMessage: ChatMessage = {
              id: (Date.now() + 1).toString(),
              content: '',
              role: 'assistant',
              timestamp: new Date()
            };
            
            // Add empty AI message to start streaming
            set((state) => ({
              chatMessages: [...state.chatMessages, aiMessage]
            }));
            
            function readStream() {
              reader.read().then(({ done, value }) => {
                if (done) {
                  get().setGeneratingResponse(false);
                  return;
                }
                
                fullResponse += value;
                
                // Update the AI message with accumulated response
                set((state) => ({
                  chatMessages: state.chatMessages.map(msg => 
                    msg.id === aiMessage.id 
                      ? { ...msg, content: fullResponse }
                      : msg
                  )
                }));
                
                readStream();
              }).catch((error: any) => {
                console.error('Stream reading error:', error);
                get().setGeneratingResponse(false);
              });
            }
            
            readStream();
          })
          .catch((error: any) => {
            console.error('Chat service error:', error);
            get().setGeneratingResponse(false);
          });
      },
      
      closeChat: () => {
        set({ isChatOpen: false });
      },
      
      addChatMessage: (message: ChatMessage) => {
        set((state) => ({
          chatMessages: [...state.chatMessages, message]
        }));
      },
      
      clearChatMessages: () => {
        set({ chatMessages: [] });
      },

      setGeneratingResponse: (isGenerating: boolean) => {
        set({ isGeneratingResponse: isGenerating });
      },
      
      openInsightModal: (insight: Insight) => {
        set({ 
          isInsightModalOpen: true,
          currentInsight: insight
        });
      },
      
      closeInsightModal: () => {
        set({ 
          isInsightModalOpen: false,
          currentInsight: null
        });
      },
      
      openInsightsModal: () => {
        set({ 
          isInsightsModalOpen: true,
          currentInsightIndex: 0
        });
      },
      
      closeInsightsModal: () => {
        set({ 
          isInsightsModalOpen: false
        });
      },
      
      setCurrentInsightIndex: (index: number) => {
        set({ currentInsightIndex: index });
      },
      
      openLessonModal: (lesson: Lesson) => {
        set({ 
          isLessonModalOpen: true,
          currentLesson: lesson
        });
      },
      
      closeLessonModal: () => {
        set({ 
          isLessonModalOpen: false,
          currentLesson: null
        });
      },
    }),
    {
      name: 'cryptolearn-storage',
      partialize: (state) => ({
        // Only persist chat messages
        chatMessages: state.chatMessages,
      }),
    }
  )
);
