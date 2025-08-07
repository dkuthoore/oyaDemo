import { useMutation } from '@tanstack/react-query';
import { useAppStore } from '@/stores/appStore';
import { mockChatResponses } from '@/data/mockData';
import { ChatMessage } from '@/types';

export const useChat = () => {
  const { 
    chatMessages, 
    currentChatConcept, 
    addChatMessage, 
    openChat, 
    closeChat 
  } = useAppStore();

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string): Promise<string> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate response based on message content or concept
      const messageKey = message.toLowerCase();
      let response = mockChatResponses[currentChatConcept];
      
      // Check for specific question patterns
      if (messageKey.includes('what is defi')) {
        response = mockChatResponses['defi'];
      } else if (messageKey.includes('smart contract')) {
        response = 'Smart contracts are self-executing contracts with terms directly written into code. They automatically execute when predetermined conditions are met, eliminating the need for intermediaries.';
      } else if (messageKey.includes('yield farming')) {
        response = mockChatResponses['yield-farming'];
      } else if (!response) {
        response = `That's an interesting question about ${currentChatConcept.replace('-', ' ')}! In the context of cryptocurrency and blockchain, there are several important aspects to consider. Could you be more specific about what you'd like to know?`;
      }
      
      return response;
    },
    onSuccess: (response, userMessage) => {
      // Add user message
      const userChatMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      };
      addChatMessage(userChatMessage);
      
      // Add AI response
      const aiChatMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      addChatMessage(aiChatMessage);
    }
  });

  const sendMessage = (message: string) => {
    if (message.trim()) {
      sendMessageMutation.mutate(message);
    }
  };

  const getSuggestedQuestions = () => {
    const suggestions = [
      'What is DeFi?',
      'How do smart contracts work?',
      'Explain yield farming',
      'What are the risks?',
      'How do I get started?'
    ];
    
    return suggestions.slice(0, 3);
  };

  return {
    messages: chatMessages,
    currentConcept: currentChatConcept,
    isLoading: sendMessageMutation.isPending,
    sendMessage,
    openChat,
    closeChat,
    suggestedQuestions: getSuggestedQuestions()
  };
};
