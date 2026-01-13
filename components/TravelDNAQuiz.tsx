'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Camera,
  UtensilsCrossed,
  Landmark,
  TreePine,
  ShoppingBag,
  Palmtree,
  Waves,
  Mountain,
  Sparkles,
  Heart,
  Users,
  User,
  Baby,
  Plane,
  MapPin,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const TravelRecommendations = dynamic(() => import('./TravelRecommendations'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-slate-600 dark:text-slate-400">Loading your recommendations...</div>
    </div>
  ),
});

type TravelDNA = {
  personality: string;
  pace: string;
  budget_level: string;
  travel_with: string;
  interests: string[];
};

type StepData = {
  question: string;
  options: { value: string; label: string; icon?: React.ReactNode; gradient?: string }[];
  key: keyof TravelDNA;
  multiSelect?: boolean;
  illustration?: React.ReactNode;
};

const steps: StepData[] = [
  {
    question: "ما الذي يثيرك أكثر عند السفر؟",
    key: "personality",
    illustration: <Globe className="w-12 h-12" />,
    options: [
      {
        value: "culture",
        label: "اكتشاف ثقافات جديدة",
        icon: <Landmark className="w-5 h-5" />,
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        value: "relaxing",
        label: "الاسترخاء والانفصال",
        icon: <Palmtree className="w-5 h-5" />,
        gradient: "from-emerald-500 to-teal-500"
      },
      {
        value: "luxury",
        label: "الراحة والفخامة",
        icon: <Sparkles className="w-5 h-5" />,
        gradient: "from-amber-500 to-orange-500"
      },
      {
        value: "adventure",
        label: "المغامرة والتحديات",
        icon: <Mountain className="w-5 h-5" />,
        gradient: "from-red-500 to-rose-500"
      },
    ],
  },
  {
    question: "يوم سفرك المثالي يبدو كالتالي:",
    key: "pace",
    illustration: <Sun className="w-12 h-12" />,
    options: [
      {
        value: "packed",
        label: "جدول مزدحم من الصباح حتى الليل",
        icon: <Plane className="w-5 h-5" />,
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        value: "balanced",
        label: "نشاط رئيسي واحد، وبقية اليوم حر",
        icon: <MapPin className="w-5 h-5" />,
        gradient: "from-cyan-500 to-teal-500"
      },
      {
        value: "spontaneous",
        label: "لا خطة، تدفق مع الأحداث",
        icon: <Waves className="w-5 h-5" />,
        gradient: "from-teal-500 to-green-500"
      },
    ],
  },
  {
    question: "ما الذي يصفك بشكل أفضل؟",
    key: "budget_level",
    illustration: <Sparkles className="w-12 h-12" />,
    options: [
      {
        value: "value",
        label: "أفضل قيمة وإنفاق ذكي",
        gradient: "from-green-500 to-emerald-500"
      },
      {
        value: "balanced",
        label: "راحة متوازنة والسعر",
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        value: "premium",
        label: "تجربة فاخرة",
        gradient: "from-amber-500 to-orange-500"
      },
    ],
  },
  {
    question: "مع من تسافر عادةً؟",
    key: "travel_with",
    illustration: <Users className="w-12 h-12" />,
    options: [
      {
        value: "solo",
        label: "بمفردي",
        icon: <User className="w-5 h-5" />,
        gradient: "from-slate-500 to-gray-500"
      },
      {
        value: "partner",
        label: "شريك",
        icon: <Heart className="w-5 h-5" />,
        gradient: "from-pink-500 to-rose-500"
      },
      {
        value: "friends",
        label: "أصدقاء",
        icon: <Users className="w-5 h-5" />,
        gradient: "from-orange-500 to-amber-500"
      },
      {
        value: "family",
        label: "عائلة",
        icon: <Baby className="w-5 h-5" />,
        gradient: "from-blue-500 to-cyan-500"
      },
    ],
  },
  {
    question: "ما الأكثر أهمية بالنسبة لك؟",
    key: "interests",
    multiSelect: true,
    illustration: <Camera className="w-12 h-12" />,
    options: [
      {
        value: "photography",
        label: "التصوير الفوتوغرافي",
        icon: <Camera className="w-5 h-5" />,
        gradient: "from-blue-500 to-cyan-500"
      },
      {
        value: "food",
        label: "الطعام",
        icon: <UtensilsCrossed className="w-5 h-5" />,
        gradient: "from-orange-500 to-red-500"
      },
      {
        value: "history",
        label: "التاريخ",
        icon: <Landmark className="w-5 h-5" />,
        gradient: "from-amber-500 to-yellow-500"
      },
      {
        value: "nature",
        label: "الطبيعة",
        icon: <TreePine className="w-5 h-5" />,
        gradient: "from-green-500 to-emerald-500"
      },
      {
        value: "shopping",
        label: "التسوق",
        icon: <ShoppingBag className="w-5 h-5" />,
        gradient: "from-pink-500 to-rose-500"
      },
    ],
  },
];

export default function TravelDNAQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<TravelDNA>>({
    interests: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initial entrance animation - cinematic
  useEffect(() => {
    if (containerRef.current && mounted) {
      const tl = gsap.timeline();

      // Fade in background
      tl.fromTo(
        backgroundRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      );

      // Main container entrance with scale and blur effect
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 60, scale: 0.95, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' },
        '-=0.8'
      );

      // Animate floating icons with parallax effect
      if (floatingIconsRef.current) {
        const icons = floatingIconsRef.current.querySelectorAll('.floating-icon');
        tl.fromTo(
          icons,
          { opacity: 0, y: 100, rotate: -20 },
          {
            opacity: 0.6,
            y: 0,
            rotate: 0,
            duration: 2,
            stagger: 0.15,
            ease: 'power2.out'
          },
          '-=1'
        );

        // Continuous floating animation
        icons.forEach((icon, index) => {
          gsap.to(icon, {
            y: `${-20 + (index % 3) * 10}`,
            x: `${10 - (index % 2) * 20}`,
            rotate: `${5 - (index % 3) * 10}`,
            duration: 3 + index * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }
  }, [mounted]);

  // Step transition animation - more cinematic
  useEffect(() => {
    if (stepRef.current && mounted) {
      // Reset the step content visibility first
      gsap.set(stepRef.current, { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' });

      const tl = gsap.timeline();

      // Question entrance with blur effect
      const question = stepRef.current.querySelector('.question');
      if (question) {
        tl.fromTo(
          question,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
        );
      }

      // Illustration rotation and scale animation
      if (illustrationRef.current) {
        // Kill any existing animations on illustration
        gsap.killTweensOf(illustrationRef.current);

        tl.fromTo(
          illustrationRef.current,
          { opacity: 0, scale: 0.5, rotate: -180 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.7)' },
          '-=0.6'
        );

        // Continuous pulse animation for illustration
        gsap.to(illustrationRef.current, {
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Options with enhanced stagger and 3D-like effect
      const options = stepRef.current.querySelectorAll('.option-card');
      tl.fromTo(
        options,
        {
          opacity: 0,
          y: 40,
          rotateX: -15,
          scale: 0.9,
          filter: 'blur(5px)'
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out'
        },
        '-=0.5'
      );
    }

    // Animate progress bar with elastic effect
    if (progressRef.current) {
      const progress = ((currentStep + 1) / steps.length) * 100;
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, [currentStep, mounted]);

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleSelect = (value: string, event?: React.MouseEvent<HTMLButtonElement>) => {
    const key = currentStepData.key;

    // Haptic-like feedback animation on selection
    if (event?.currentTarget) {
      gsap.to(event.currentTarget, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }

    if (currentStepData.multiSelect) {
      const currentInterests = answers.interests || [];
      const newInterests = currentInterests.includes(value)
        ? currentInterests.filter((i) => i !== value)
        : [...currentInterests, value];
      setAnswers({ ...answers, interests: newInterests });
    } else {
      setAnswers({ ...answers, [key]: value });
    }
  };

  const isSelected = (value: string): boolean => {
    const key = currentStepData.key;
    if (currentStepData.multiSelect) {
      return (answers.interests || []).includes(value);
    }
    return answers[key] === value;
  };

  const canProceed = (): boolean => {
    const key = currentStepData.key;
    if (currentStepData.multiSelect) {
      return (answers.interests || []).length > 0;
    }
    return !!answers[key];
  };

  const handleNext = () => {
    if (!canProceed()) return;

    if (isLastStep) {
      handleSubmit();
    } else {
      // Cinematic exit animation
      if (stepRef.current) {
        gsap.to(stepRef.current, {
          opacity: 0,
          x: -100,
          scale: 0.95,
          filter: 'blur(10px)',
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            setCurrentStep(currentStep + 1);
          }
        });
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 0) return;

    if (stepRef.current) {
      gsap.to(stepRef.current, {
        opacity: 0,
        x: 100,
        scale: 0.95,
        filter: 'blur(10px)',
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentStep(currentStep - 1);
        }
      });
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const travelDNA: TravelDNA = {
      personality: answers.personality || '',
      pace: answers.pace || '',
      budget_level: answers.budget_level || '',
      travel_with: answers.travel_with || '',
      interests: answers.interests || [],
    };

    console.log('Travel DNA:', travelDNA);
    setIsSubmitted(true);

    // Cinematic success animation
    if (stepRef.current && containerRef.current) {
      const tl = gsap.timeline();

      tl.to(stepRef.current, {
        scale: 0.9,
        opacity: 0,
        filter: 'blur(20px)',
        duration: 0.6,
        ease: 'power2.in',
      });

      tl.fromTo(
        containerRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }
  };

  if (!mounted) {
    return null;
  }

  if (isSubmitted) {
    return (
      <TravelRecommendations
        personality={answers.personality || ''}
        pace={answers.pace || ''}
        budgetLevel={answers.budget_level || ''}
        travelWith={answers.travel_with || ''}
        interests={answers.interests || []}
      />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl">
      {/* Animated gradient background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 dark:from-blue-900/30 dark:via-cyan-900/30 dark:to-teal-900/30 transition-colors duration-1000 rounded-3xl"
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] dark:opacity-30 opacity-40 rounded-3xl" />

      {/* Floating travel icons for ambiance */}
      <div ref={floatingIconsRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <Plane className="floating-icon absolute top-[10%] left-[10%] w-8 h-8 text-blue-400/30 dark:text-blue-300/20" />
        <Palmtree className="floating-icon absolute top-[20%] right-[15%] w-10 h-10 text-green-400/30 dark:text-green-300/20" />
        <Camera className="floating-icon absolute bottom-[25%] left-[20%] w-7 h-7 text-cyan-400/30 dark:text-cyan-300/20" />
        <Mountain className="floating-icon absolute top-[60%] right-[25%] w-9 h-9 text-slate-400/30 dark:text-slate-300/20" />
        <Globe className="floating-icon absolute bottom-[15%] right-[10%] w-8 h-8 text-teal-400/30 dark:text-teal-300/20" />
        <MapPin className="floating-icon absolute top-[40%] left-[5%] w-6 h-6 text-blue-400/30 dark:text-blue-300/20" />
      </div>

      <div className="relative flex items-center justify-center p-6 md:p-8 bg-slate-900/60">
        <div ref={containerRef} className="w-full max-w-2xl">
          {/* Header with glassmorphism */}
          <div className="text-center mb-8">


            <div className="inline-flex items-center justify-center w-64 gap-3 mb-4 backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 px-6 py-3 rounded-full border border-white/20 dark:border-slate-700/30 shadow-lg">
              <Compass className="w-6 h-6 text-blue-600 dark:text-blue-400" />

              <Image
                src="/images/logo.png"
                alt="logo"
                width={80}
                height={80}
                className="cursor-pointer w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
                priority
              />
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-medium">اكتشف حمضك النووي للسفر</p>

            {/* Dark mode toggle */}
            {/* <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="mt-4 p-2 rounded-full backdrop-blur-xl bg-white/60 dark:bg-slate-900/60 border border-white/20 dark:border-slate-700/30 hover:scale-110 transition-transform duration-300"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button> */}
          </div>

          {/* Progress Bar with glassmorphism */}
          <div className="mb-8 backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 rounded-2xl p-4 border border-white/20 dark:border-slate-700/30 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                خطوة {currentStep + 1} من {steps.length}
              </span>
              <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="h-3 bg-slate-200/50 dark:bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-full shadow-lg"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          {/* Quiz Card with enhanced glassmorphism */}
          <div className="relative backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 rounded-[2rem] shadow-2xl border border-white/20 dark:border-slate-700/30 p-6 md:p-10 overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl opacity-20" />

            <div ref={stepRef} className="relative z-10">
              {/* Illustration icon */}
              {currentStepData.illustration && (
                <div
                  ref={illustrationRef}
                  className="flex justify-center mb-6"
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 backdrop-blur-xl border border-white/30 dark:border-slate-600/30">
                    <div className="text-blue-600 dark:text-blue-400">
                      {currentStepData.illustration}
                    </div>
                  </div>
                </div>
              )}

              {/* Question */}
              <h2 className="question text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                {currentStepData.question}
              </h2>

              {/* Options with gradient borders */}
              <div className="space-y-3 mb-8">
                {currentStepData.options.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={(e) => handleSelect(option.value, e)}
                    className={`option-card group w-full text-left p-5 md:p-6 rounded-2xl transition-all duration-500 relative overflow-hidden border-2 ${isSelected(option.value)
                        ? 'shadow-xl scale-[1.02] backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 border-blue-500'
                        : 'backdrop-blur-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70 hover:scale-[1.01] hover:shadow-lg border-white/30 dark:border-slate-700/30'
                      }`}
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    <div className="relative flex items-center gap-4">
                      {option.icon && (
                        <div
                          className={`p-3 rounded-xl transition-all duration-500 ${isSelected(option.value)
                              ? `bg-gradient-to-br ${option.gradient} text-white shadow-lg`
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-600'
                            }`}
                        >
                          {option.icon}
                        </div>
                      )}
                      <span
                        className={`font-semibold flex-1 transition-colors duration-300 ${isSelected(option.value)
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-700 dark:text-slate-300'
                          }`}
                      >
                        {option.label}
                      </span>
                      {isSelected(option.value) && (
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-lg`}>
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {currentStepData.multiSelect && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 text-center font-medium">
                  اختر كل ما ينطبق
                </p>
              )}

              {/* Navigation with glassmorphism */}
              <div className="flex gap-4">
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl backdrop-blur-xl bg-white/60 dark:bg-slate-800/60 border border-white/30 dark:border-slate-700/30 text-slate-800 dark:text-slate-200 font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                    رجوع
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex-1 py-4 px-8 rounded-xl font-bold transition-all duration-500 shadow-lg ${canProceed()
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-500 hover:via-cyan-500 hover:to-teal-500 text-white hover:shadow-2xl hover:scale-105 active:scale-95'
                      : 'bg-slate-300/50 dark:bg-slate-700/50 text-slate-400 dark:text-slate-500 cursor-not-allowed backdrop-blur-xl'
                    }`}
                >
                  {isLastStep ? 'أكمل رحلتك' : 'متابعة'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
