'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, DollarSign, MapPin, Clock } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    number: 1,
    title: 'فهم شخصيتك',
    description: 'يقوم الذكاء الاصطناعي لدينا بتحليل تفضيلات السفر والاهتمامات وسمات الشخصية لفهم ما يثيرك حقًا.',
    icon: Brain,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: 2,
    title: 'تحليل ميزانيتك وأسلوبك',
    description: 'نأخذ في الاعتبار ميزانيتك وأسلوب السفر وتفضيلات الراحة لضمان التوصيات المثالية.',
    icon: DollarSign,
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    number: 3,
    title: 'تصميم رحلتك المثالية',
    description: 'احصل على توصيات وجهات مخصصة مع برامج رحلات مفصلة مصممة خصيصًا لك.',
    icon: MapPin,
    gradient: 'from-teal-500 to-green-500',
  },
  {
    number: 4,
    title: 'تحسين التوقيت والتجربة',
    description: 'احصل على رؤى حول أفضل الأوقات للزيارة ونصائح محلية وأنشطة تتناسب مع حمضك النووي للسفر.',
    icon: Clock,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const cards = cardsRef.current;

    if (!section || !trigger || !cards) return;

    const cardElements = cards.querySelectorAll('.step-card');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${cardElements.length * 100}%`,
          scrub: 1,
          pin: section,
          anticipatePin: 1,
        },
      });

      cardElements.forEach((card, index) => {
        const isLast = index === cardElements.length - 1;

        if (index === 0) {
          tl.fromTo(
            card,
            { opacity: 0, y: 100, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 1 }
          );
        } else {
          tl.fromTo(
            card,
            { opacity: 0, y: 100, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 1 }
          );
        }

        if (!isLast) {
          tl.to(card, {
            opacity: 1,
            y: -50,
            scale: 0.9,
            duration: 0.5,
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef}>
      <section
        id="how-it-works"
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDIiLz48L2c+PC9zdmc+')] opacity-40" />

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              كيف يعمل
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              تقوم عمليتنا المدعومة بالذكاء الاصطناعي بإنشاء تجارب سفر مخصصة في أربع خطوات بسيطة
            </p>
          </div>

          <div ref={cardsRef} className="max-w-4xl mx-auto relative">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="step-card absolute inset-0 flex items-center justify-center"
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <div className="backdrop-blur-2xl bg-white bg-red-600 dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-white dark:border-slate-700 max-w-3xl w-full">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className={`p-6 rounded-2xl bg-gradient-to-br ${step.gradient} shrink-0`}>
                      <step.icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-lg text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center gap-2">
                    {steps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === index
                            ? 'w-12 bg-gradient-to-r from-blue-500 to-cyan-500'
                            : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-96 text-center text-slate-600 dark:text-slate-400">
            <p className="text-sm">قم بالتمرير لرؤية كل خطوة</p>
          </div>
        </div>
      </section>
    </div>
  );
}
