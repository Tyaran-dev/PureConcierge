'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export default function Hero({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        backgroundRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 }
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 100, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.1 },
          '-=1'
        );
      }

      tl.fromTo(
        subheadlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );

      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        '-=0.3'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // useEffect(() => {
  //   if (backgroundRef.current) {
  //     gsap.to(backgroundRef.current, {
  //       backgroundPosition: '100% 100%',
  //       duration: 20,
  //       repeat: -1,
  //       yoyo: true,
  //       ease: 'sine.inOut',
  //     });
  //   }
  // }, []);


  useEffect(() => {
    if (!heroRef.current || !backgroundRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(backgroundRef.current, {
        scale: 1,
        opacity: 1,
        transformOrigin: 'center center',
      });

      gsap.set(
        [headlineRef.current, subheadlineRef.current, ctaRef.current],
        { opacity: 1, y: 0 }
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
        .to(backgroundRef.current, {
          scale: 6.8,
          ease: "power1.inOut"
        })
        .to(
          [headlineRef.current, subheadlineRef.current, ctaRef.current],
          {
            opacity: 0,
            y: -50,
            ease: 'none',
          },
          0
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);


  const handleOpenQuiz = () => {
    onOpenQuiz();
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-end md:items-center justify-start overflow-hidden "
    >
      {/* <div
        ref={backgroundRef}
        className="absolute inset-0 "
        style={{ backgroundSize: '200% 200%' }}
      /> */}


      <div
        className="absolute inset-0 bg-[url('/images/hero-background.jpg')] bg-cover bg-center transform-gpu" />
      <Image
        ref={backgroundRef}
         alt="hero"
        src="/images/hero8.webp"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{
          // Optimize for mobile
          transform: 'translateZ(0)', // Force GPU acceleration
          backfaceVisibility: 'hidden',
        }}
      />
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div> */}

      <div className="hidden md:block relative container mx-auto px-4 ">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-white/20 dark:border-slate-700/30 mb-8">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            مدعوم بتقنية الذكاء الاصطناعي
          </span>
        </div>

        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 dark:text-white leading-tight"
        >
          <span className="word inline-block">رحلتك.</span>{' '}
          <span className="word inline-block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-blue-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
            مصممة
          </span>{' '}
          <br />
          <span className="word inline-block">خصيصًا</span>{' '}
          <span className="word inline-block">لك.</span>
        </h1>

        <p
          ref={subheadlineRef}
          className="text-xl md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl"
        >
          تجارب سفر مدعومة بالذكاء الاصطناعي مصممة خصيصًا لشخصيتك.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 opacity-1">
          <button
            onClick={handleOpenQuiz}
            className=" group px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center  gap-2"
          >
            اكتشف حمضك النووي للسفر
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={scrollToHowItWorks}
            className="px-8 py-4 rounded-full backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-white/30 dark:border-slate-700/30 text-slate-700 dark:text-slate-300 font-semibold hover:bg-white/80 dark:hover:bg-slate-900/80 hover:scale-105 transition-all duration-300"
          >
            كيف يعمل
          </button>
        </div>
      </div>
    </section>
  );
}
