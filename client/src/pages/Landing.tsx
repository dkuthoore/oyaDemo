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
                data-testid="button-view-lessons"
              >
                View Lessons
              </Button>
            </motion.div>
            
            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-8 mt-16"
            >
              <div className="glassmorphism rounded-2xl p-8 hover:shadow-card-glow transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-secondary rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Lightbulb className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4">Personalized Insights</h3>
                <p className="text-text-secondary leading-relaxed">Relevant crypto news and insights, based on your experience and interests</p>
              </div>
              
              <div className="glassmorphism rounded-2xl p-8 hover:shadow-card-glow transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-copy rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Chat Tutor</h3>
                <p className="text-text-secondary leading-relaxed">Get instant explanations and clarifications through our privacy-focused AI chat.</p>
              </div>
              
              <div className="glassmorphism rounded-2xl p-8 hover:shadow-card-glow transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI-Generated Lessons and Quizzes</h3>
                <p className="text-text-secondary leading-relaxed">Comprehensive learning modules with structured content and quizzes to test your understanding.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
