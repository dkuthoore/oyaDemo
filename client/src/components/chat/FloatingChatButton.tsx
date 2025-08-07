import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/appStore';

export default function FloatingChatButton() {
  const { openChat } = useAppStore();

  return (
    <motion.button
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-primary rounded-full shadow-purple-glow hover:scale-110 transition-all duration-300 z-40 animate-float"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => openChat('general')}
      data-testid="button-floating-chat"
    >
      <MessageCircle className="w-6 h-6 text-white mx-auto" />
    </motion.button>
  );
}
