'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { TravelPackage } from '@/lib/travelPackages';
import { RotateCcw } from 'lucide-react';

interface Globe3DProps {
  packages: TravelPackage[];
  selectedPackage: TravelPackage | null;
  onPackageSelect: (pkg: TravelPackage | null) => void;
}

export default function Globe3D({ packages, selectedPackage, onPackageSelect }: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitializedRef = useRef(false);

  // Function to stop auto-rotation
  const stopAutoRotation = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = false;
      controlsRef.current.update();
    }
    setIsAutoRotating(false);
  }, []);

  // Function to start auto-rotation
  const startAutoRotation = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = true;
      controlsRef.current.autoRotateSpeed = 0.5;
      controlsRef.current.update();
    }
    setIsAutoRotating(true);
  }, []);

  // Initialize globe once
  useEffect(() => {
    let globeInstance: any = null;
    let isMounted = true;

    const initGlobe = async () => {
      if (!containerRef.current || !isMounted || isInitializedRef.current) return;

      try {
        setIsLoading(true);
        setError(null);

        // Dynamically import globe.gl
        const { default: Globe } = await import('globe.gl');
        
        if (!isMounted) return;

        // Clear any existing content
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }

        // Get container dimensions
        const width = containerRef.current.clientWidth || 800;
        const height = containerRef.current.clientHeight || 600;

        // Create the globe instance
        globeInstance = Globe()
          .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
          .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
          .width(width)
          .height(height)
          .backgroundColor('#0f172a')
          .showAtmosphere(true)
          .atmosphereColor('#3b82f6')
          .atmosphereAltitude(0.25)
          .pointOfView({ lat: 0, lng: 0, altitude: 2 })
          .enablePointerInteraction(true);

        // Mount the globe
        const globeElement = globeInstance(containerRef.current);
        globeRef.current = globeElement;

        // Store controls reference
        const controls = globeElement.controls();
        controlsRef.current = controls;

        // Set up auto-rotation
        setTimeout(() => {
          if (controls && isMounted) {
            try {
              controls.autoRotate = true;
              controls.autoRotateSpeed = 0.5;
              controls.enableZoom = true;
              controls.enablePan = true;
              controls.update();
            } catch (err) {
              console.warn('Could not set up controls:', err);
            }
          }
        }, 100);

        // Set up point click handler
        globeInstance.onPointClick((point: TravelPackage) => {
          onPackageSelect(point);
          stopAutoRotation();
          
          // Fly to the point
          globeInstance.pointOfView(
            { lat: point.lat, lng: point.lng, altitude: 1.5 },
            1500
          );
        });

        // Handle container resize
        const handleResize = () => {
          if (globeInstance && containerRef.current) {
            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            globeInstance.width(width).height(height);
          }
        };

        window.addEventListener('resize', handleResize);

        isInitializedRef.current = true;
        setIsLoading(false);

        // Cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          isInitializedRef.current = false;
        };

      } catch (err) {
        console.error('Failed to initialize globe:', err);
        setError('Failed to load globe. Please try refreshing the page.');
        setIsLoading(false);
      }
    };

    initGlobe();

    return () => {
      isMounted = false;
      globeRef.current = null;
      controlsRef.current = null;
    };
  }, [stopAutoRotation, onPackageSelect]); // Only depend on stable functions

  // Update markers when packages or selectedPackage changes
  useEffect(() => {
    if (!globeRef.current || !isInitializedRef.current) return;

    // Process package data for markers
    const formattedData = packages.map(pkg => ({
      ...pkg,
      size: selectedPackage?.id === pkg.id ? 0.8 : 0.5,
      color: selectedPackage?.id === pkg.id ? '#ef4444' : '#3b82f6'
    }));

    // Update points data
    globeRef.current
      .pointsData(formattedData)
      .pointLat((d: TravelPackage) => d.lat)
      .pointLng((d: TravelPackage) => d.lng)
      .pointColor((d: any) => d.color)
      .pointAltitude(0.02)
      .pointRadius((d: any) => d.size)
      .pointLabel((d: TravelPackage) => `
        <div style="
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          padding: 12px 16px;
          border-radius: 12px;
          color: white;
          font-family: system-ui;
          border: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          max-width: 300px;
        ">
          <div style="font-weight: 600; margin-bottom: 4px; color: #60a5fa;">${d.name}</div>
          <div style="font-size: 13px; color: #cbd5e1; margin-bottom: 6px;">${d.city}, ${d.country}</div>
          <div style="font-size: 12px; color: #94a3b8;">${d.duration} • ${d.price}</div>
        </div>
      `);

  }, [packages, selectedPackage]);

  // Handle package selection changes
  useEffect(() => {
    if (selectedPackage && globeRef.current && isInitializedRef.current) {
      globeRef.current.pointOfView(
        { lat: selectedPackage.lat, lng: selectedPackage.lng, altitude: 1.5 },
        1500
      );
      stopAutoRotation();
    }
  }, [selectedPackage, stopAutoRotation]);

  const handleReset = () => {
    if (globeRef.current && isInitializedRef.current) {
      // Reset to default view with auto-rotation
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2 }, 1500);
      startAutoRotation();
      onPackageSelect(null);
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800">
      {/* Container for the globe */}
      <div 
        ref={containerRef} 
        className="w-full h-full"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-300">Loading interactive globe...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="text-center p-6 rounded-xl bg-slate-800/90 border border-red-500/30">
            <p className="text-red-400 mb-2">⚠️ {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Controls */}
      {!isLoading && !error && (
        <>
          {/* Reset Button */}
          {!isAutoRotating && (
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 p-3 rounded-xl backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/30 dark:border-slate-700/30 text-slate-800 dark:text-slate-200 hover:scale-110 transition-all duration-300 shadow-lg group z-10"
              title="Reset rotation and view"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          )}

          {/* Status Indicator */}
          <div className="absolute bottom-4 left-4 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/30 dark:border-slate-700/30 rounded-xl px-4 py-2 text-sm z-10">
            <p className="text-slate-700 dark:text-slate-300 flex items-center">
              {isAutoRotating ? (
                <>
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Earth is rotating
                </>
              ) : (
                <>
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2" />
                  Click and drag to explore
                </>
              )}
            </p>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 left-4 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-white/30 dark:border-slate-700/30 rounded-xl px-4 py-2 text-sm z-10">
            <p className="text-slate-700 dark:text-slate-300">
              🌍 Click on markers to view packages
            </p>
          </div>
        </>
      )}
    </div>
  );
}