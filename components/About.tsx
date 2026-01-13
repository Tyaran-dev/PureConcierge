'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Heart, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        image,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      );

      const features = content.querySelectorAll('.feature-item');
      gsap.fromTo(
        features,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'تخصيص مدعوم بالذكاء الاصطناعي',
      description: 'خوارزميات متقدمة تحلل تفضيلاتك لإنشاء تجارب سفر فريدة حقًا.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Heart,
      title: 'علم نفس السفر',
      description: 'فهم ما يحركك للتوصية بوجهات تتناغم مع روحك.',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      icon: Sparkles,
      title: 'تخطيط ذكي',
      description: 'توصيات ذكية للتوقيت والأنشطة والتجارب التي تتناسب مع أسلوبك.',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div ref={contentRef}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              عن سفر.AI
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              نؤمن بأن السفر يجب أن يكون فريدًا مثلك تمامًا. تجمع منصتنا المدعومة بالذكاء الاصطناعي بين التكنولوجيا المتطورة والرؤى العميقة في علم نفس السفر لإنشاء تجارب تتناغم حقًا مع هويتك.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
              من خلال فهم شخصيتك وتفضيلاتك وأسلوب سفرك، نصمم رحلات مخصصة تتجاوز الوجهات السياحية النموذجية.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item flex gap-4 p-6 rounded-2xl backdrop-blur-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shrink-0`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20" />
              <div className="aspect-square bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 dark:from-blue-900 dark:via-cyan-900 dark:to-teal-900 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-6 shadow-2xl">
                    <Brain className="w-16 h-16" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    مدعوم بالذكاء الاصطناعي
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    خوارزميات ذكية تفهم حمضك النووي الفريد للسفر
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full blur-3xl opacity-30" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}
