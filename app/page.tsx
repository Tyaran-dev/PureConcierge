'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import TravelDNAQuiz from '@/components/TravelDNAQuiz';
import { Compass } from 'lucide-react';

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        setShowFloatingButton(scrollPosition > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative">
      <Header onOpenQuiz={() => setIsQuizOpen(true)} />
      <Hero onOpenQuiz={() => setIsQuizOpen(true)} />
      <HowItWorks />
      <About />
      <Contact />
      <Footer />

      <button
        onClick={() => setIsQuizOpen(true)}
        className={`fixed left-6 bottom-6 z-40 group px-6 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 flex items-center gap-2 ${
          showFloatingButton ? 'translate-x-0 opacity-100' : '-translate-x-32 opacity-0'
        }`}
        aria-label="افتح اختبار الحمض النووي للسفر"
      >
        <Compass className="w-5 h-5" />
        <span className="hidden sm:inline">الحمض النووي للسفر</span>
      </button>

      <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-0 bg-transparent shadow-none [&>button]:absolute [&>button]:left-4 [&>button]:top-4 [&>button]:z-50 [&>button]:rounded-full [&>button]:bg-white/90 [&>button]:dark:bg-slate-900/90 [&>button]:backdrop-blur-xl [&>button]:p-2 [&>button]:border [&>button]:border-white/20 [&>button]:dark:border-slate-700/30 [&>button]:shadow-lg [&>button]:hover:scale-110 [&>button]:transition-all">
          <div className="relative">
            <TravelDNAQuiz />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
