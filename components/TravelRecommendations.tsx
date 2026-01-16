'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';
import { TravelPackage, getRecommendedPackages } from '@/lib/travelPackages';
import { Compass, MapPin, Clock, DollarSign, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { generatePackages } from '@/hooks/generatePackages';

const Globe3D = dynamic(() => import('./Globe3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-slate-600 dark:text-slate-400">Loading interactive globe...</div>
    </div>
  ),
});

interface TravelRecommendationsProps {
  personality: string;
  pace: string;
  budgetLevel: string;
  travelWith: string;
  interests: string[];
  days_range: string;
}

export default function TravelRecommendations({
  personality,
  pace,
  budgetLevel,
  travelWith,
  interests,
  days_range
}: TravelRecommendationsProps) {
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [recommendedPackages, setRecommendedPackages] = useState<TravelPackage[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setMounted(true);

    const quizAnswers = {
      interests,
      personality,
      pace,
      budget_level: budgetLevel,
      travel_with: travelWith,
      days_range,
    };

    async function loadPackages() {
      try {
        setLoading(true);

        const res = await generatePackages(quizAnswers);

        const mappedPackages = res.packages.map((pkg: any, index: number) => ({
          id: index,
          name: pkg.destination,
          country: pkg.country_code,
          city: pkg.destination.split(", ")[1],
          lat: pkg.lat,
          lng: pkg.lng,
          image: pkg.image,
          description: pkg.why_this_destination,
          duration: `${pkg.trip_duration_days} days`,
          price: `$${pkg.estimated_budget.total_trip}`,
          tags: interests,
          matchScore: 90,
        }));

        setRecommendedPackages(mappedPackages);
      } catch (error) {
        console.error("Failed to load packages:", error);
      } finally {
        setLoading(false); // ✅ مهم
      }
    }

    loadPackages();
  }, [
    personality,
    pace,
    budgetLevel,
    travelWith,
    interests,
    days_range,
  ]);

  function PackageSkeleton() {
    return (
      <div className="animate-pulse backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 rounded-2xl p-4 shadow-lg border border-white/20 dark:border-slate-700/30">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-xl bg-slate-300/40 dark:bg-slate-700/40" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-3/4 bg-slate-300/40 dark:bg-slate-700/40 rounded" />
            <div className="h-3 w-1/2 bg-slate-300/40 dark:bg-slate-700/40 rounded" />
            <div className="h-3 w-full bg-slate-300/40 dark:bg-slate-700/40 rounded" />
            <div className="h-3 w-1/3 bg-slate-300/40 dark:bg-slate-700/40 rounded" />
          </div>
        </div>
      </div>
    );
  }


  useEffect(() => {
    if (mounted && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [mounted]);

  useEffect(() => {
    if (packagesRef.current) {
      const cards = packagesRef.current.querySelectorAll('.package-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.5,
        }
      );
    }
  }, [recommendedPackages]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-slate-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] dark:opacity-30 opacity-40" />

      <div ref={containerRef} className="relative ">
        <div className="max-w-7xl  mx-auto p-4 md:p-8">
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              وجهات مصممة خصيصًا لك
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              اضغط على أي وجهة لاكتشاف التفاصيل
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="relative backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 rounded-[2rem] shadow-2xl border border-white/20 dark:border-slate-700/30 overflow-hidden h-[500px] lg:h-[600px]">
              {loading ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center gap-2 text-slate-600 dark:text-slate-400">
                  <span className="text-lg font-semibold">
                    نبحث عن الرحلة المثالية لك
                  </span>
                  <span className="text-sm">
                    نحلل تفضيلاتك ونقترح أفضل الوجهات...
                  </span>
                </div>
              ) : (
                <Globe3D
                  packages={recommendedPackages}
                  selectedPackage={selectedPackage}
                  onPackageSelect={setSelectedPackage}
                />
              )}
            </div>

            <div className="space-y-4 max-h-[500px] lg:max-h-[600px] overflow-y-auto custom-scrollbar">
              <div ref={packagesRef} className="space-y-4">
                {loading ? (
                  <>
                    <PackageSkeleton />
                    <PackageSkeleton />
                    <PackageSkeleton />
                  </>
                ) : (
                  recommendedPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`package-card group cursor-pointer relative backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden transition-all duration-500 border-2 ${selectedPackage?.id === pkg.id
                        ? 'bg-white/90 dark:bg-slate-800/90 border-blue-500 scale-[1.02]'
                        : 'bg-white/70 dark:bg-slate-900/70 border-white/20 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:scale-[1.01]'
                        }`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <div className="flex gap-4 p-4">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {pkg.name}
                            </h3>
                            {pkg.matchScore && pkg.matchScore > 50 && (
                              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold">
                                <Sparkles className="w-3 h-3" />
                                {pkg.matchScore}%
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {pkg.city}, {pkg.country}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                            {pkg.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                              <Clock className="w-4 h-4" />
                              <span>{pkg.duration.replace("days", "يوم")}</span>
                            </div>
                            <div className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400">
                              <DollarSign className="w-4 h-4" />
                              <span>{pkg.price.replace('$', '')}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {pkg.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {selectedPackage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPackage(null)}
        >
          <div
            className="relative max-w-2xl w-full backdrop-blur-2xl bg-white/90 dark:bg-slate-900/90 rounded-[2rem] shadow-2xl border border-white/20 dark:border-slate-700/30 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/50 text-white hover:bg-slate-900/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedPackage.image}
              alt={selectedPackage.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    {selectedPackage.name}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedPackage.city}, {selectedPackage.country}</span>
                  </div>
                </div>
                {selectedPackage.matchScore && selectedPackage.matchScore > 50 && (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold">
                    <Sparkles className="w-4 h-4" />
                    {selectedPackage.matchScore}% Match
                  </span>
                )}
              </div>

              <p className="text-slate-700 dark:text-slate-300 mb-6">
                {selectedPackage.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Duration</div>
                    <div className="font-bold text-slate-900 dark:text-white">{selectedPackage.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                  <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Price</div>
                    <div className="font-bold text-slate-900 dark:text-white">{selectedPackage.price}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPackage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 px-6 rounded-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-500 hover:via-cyan-500 hover:to-teal-500 text-white hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300">
                Book This Adventure
              </button>
            </div>
          </div>
        </div>
      )} */}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
}
