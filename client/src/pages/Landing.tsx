import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Brain, Lightbulb, MessageCircle, GraduationCap } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

export default function Landing() {
  const [, setLocation] = useLocation();
  const { openInsightsModal } = useAppStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text font-bold gradient-text mb-6 leading-tight"
            >
              Master Crypto with AI-Powered Learning
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Discover cryptocurrency insights, get instant AI explanations, and dive deep into comprehensive lessons tailored for your learning journey.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={openInsightsModal}
                className="px-8 py-4 bg-gradient-primary text-white font-medium rounded-xl hover:scale-105 transition-all duration-300 shadow-purple-glow"
                data-testid="button-explore-insights"
              >
                Explore Insights
              </Button>
              <Button
                onClick={() => setLocation('/lessons')}
                className="px-8 py-4 glassmorphism text-text-primary font-medium rounded-xl hover:scale-105 transition-all duration-300"
                variant="ghost"
                data-testid="button-start-learning"
              >
                Start Learning
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
