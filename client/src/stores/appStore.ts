import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage, Insight, Lesson } from '@/types';

interface AppState {
  // Chat state
  chatMessages: ChatMessage[];
  currentChatConcept: string;
  isChatOpen: boolean;
  
  // Modal state
  isInsightModalOpen: boolean;
  currentInsight: Insight | null;
  isLessonModalOpen: boolean;
  currentLesson: Lesson | null;
  
  // Actions
  openChat: (conceptId: string) => void;
  closeChat: () => void;
  addChatMessage: (message: ChatMessage) => void;
  clearChatMessages: () => void;
  
  openInsightModal: (insight: Insight) => void;
  closeInsightModal: () => void;
  
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
      isInsightModalOpen: false,
      currentInsight: null,
      isLessonModalOpen: false,
      currentLesson: null,
      
      // Actions
      openChat: (conceptId: string) => {
        set({ 
          isChatOpen: true, 
          currentChatConcept: conceptId,
          chatMessages: [] // Clear messages when opening new concept
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
