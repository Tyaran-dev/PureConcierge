'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TravelDNAQuiz from './TravelDNAQuiz';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QuizSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;

    if (!section || !header) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="quiz" ref={sectionRef} className="relative py-24">
      <div ref={headerRef} className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Discover Your Travel DNA
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Answer a few questions to unlock personalized travel recommendations
        </p>
      </div>

      <TravelDNAQuiz />
    </section>
  );
}
