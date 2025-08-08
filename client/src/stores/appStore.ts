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
  
  // Lesson progress state
  lessonProgress: Record<string, {
    currentSectionIndex: number;
    completedSections: Set<number>;
    quizCompleted: boolean;
    isCompleted: boolean;
  }>;
  
  // Actions
  openChat: (conceptId?: string) => void;
  openChatWithConcept: (conceptId: string) => void;
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
  closeAllModals: () => void;
  
  // Lesson progress actions
  updateLessonProgress: (lessonId: string, progress: Partial<AppState['lessonProgress']['']>) => void;
  markLessonCompleted: (lessonId: string) => void;
  getLessonProgress: (lessonId: string) => AppState['lessonProgress'][''] | null;
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
      lessonProgress: {},
      
      // Actions
      openChat: (conceptId?: string) => {
        set({ 
          isChatOpen: true, 
          currentChatConcept: conceptId || 'general',
          chatMessages: [] // Start with empty messages for manual chat opening
        });
      },

      openChatWithConcept: (conceptId: string) => {
        const conceptDisplayName = chatService.getConceptDisplayName(conceptId);
        
        // Add concept as formatted user message when opening from hyperlink
        const conceptMessage: ChatMessage = {
          id: Date.now().toString(),
          content: `Teach me about ${conceptDisplayName}`,
          role: 'user',
          timestamp: new Date()
        };

        set({ 
          isChatOpen: true, 
          currentChatConcept: conceptId,
          chatMessages: [conceptMessage] // Start with formatted concept message
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

      closeAllModals: () => {
        set({
          isChatOpen: false,
          isInsightModalOpen: false,
          currentInsight: null,
          isInsightsModalOpen: false,
          isLessonModalOpen: false,
          currentLesson: null
        });
      },
      
      updateLessonProgress: (lessonId: string, progress: Partial<AppState['lessonProgress']['']>) => {
        set((state) => {
          const existingProgress = state.lessonProgress[lessonId] || {
            currentSectionIndex: 0,
            completedSections: new Set(),
            quizCompleted: false,
            isCompleted: false
          };
          
          return {
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: {
                ...existingProgress,
                ...progress
              }
            }
          };
        });
      },
      
      markLessonCompleted: (lessonId: string) => {
        set((state) => ({
          lessonProgress: {
            ...state.lessonProgress,
            [lessonId]: {
              ...state.lessonProgress[lessonId],
              isCompleted: true,
              quizCompleted: true
            }
          }
        }));
      },
      
      getLessonProgress: (lessonId: string) => {
        const state = get();
        return state.lessonProgress[lessonId] || null;
      },
    }),
    {
      name: 'cryptolearn-storage',
      partialize: (state) => ({
        // Persist chat messages and lesson progress
        chatMessages: state.chatMessages,
        lessonProgress: state.lessonProgress,
      }),
    }
  )
);
