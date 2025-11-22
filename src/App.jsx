import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import Logo from './components/Logo';
import UploadSection from './components/UploadSection';
import TestSection from './components/TestSection';
import Documentation from './components/Documentation';
import { Button } from './components/ui/Button';

function App() {
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 overflow-hidden flex flex-col">
      {/* Centered Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-20 border-b border-border/50 flex items-center justify-center px-8 bg-black/30 backdrop-blur-xl z-50 relative"
      >
        {/* Gradient Accent Line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        {/* Centered Logo */}
        <div className="flex items-center gap-8">
          <Logo />

          {/* Docs Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDocsOpen(true)}
            className="flex items-center gap-2 border-primary/30 hover:border-primary/50 hover:bg-primary/10 text-primary"
          >
            <BookOpen className="w-4 h-4" />
            Docs
          </Button>
        </div>

        {/* Version Badge - Absolute positioned */}
        <div className="absolute right-8 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-xs font-mono text-primary">
          v2.0.0
        </div>
      </motion.header>

      {/* Documentation Modal */}
      <Documentation isOpen={isDocsOpen} onClose={() => setIsDocsOpen(false)} />

      {/* Main Content - Two Column Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-border to-transparent" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent opacity-0"
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Left Column: Upload */}
        <section className="relative h-full flex flex-col border-b lg:border-b-0 border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
          <UploadSection onUploadComplete={setIsUploadComplete} />
        </section>

        {/* Right Column: Test */}
        <section className="relative h-full flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-bl from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
          <TestSection />
        </section>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="h-12 border-t border-border/50 flex items-center justify-center px-8 bg-black/20 backdrop-blur-sm relative"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
        <p className="text-xs text-muted-foreground font-mono">
          Powered by <span className="text-gradient-animate font-semibold">InstantRAG AI</span>
        </p>
      </motion.footer>
    </div>
  );
}

export default App;
