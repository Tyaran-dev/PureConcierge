'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import Image from 'next/image';
export default function Header({ onOpenQuiz }: { onOpenQuiz?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          menuRef.current,
          { x: '100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }
        );

        const items = menuRef.current.querySelectorAll('.mobile-nav-item');
        gsap.fromTo(
          items,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 }
        );
      }
    }
  }, [isMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleQuizClick = () => {
    if (onOpenQuiz) {
      onOpenQuiz();
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'الرئيسية', id: 'hero' },
    { label: 'كيف يعمل', id: 'how-it-works' },
    { label: 'من نحن', id: 'about' },
    { label: 'اتصل بنا', id: 'contact' },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${scrolled
        ? 'backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <nav className="container mx-auto px-4 py-4 ">
        <div className="flex items-center justify-between ">

          <Image
            onClick={() => scrollToSection('hero')}
            src="/images/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="cursor-pointer w-[60px] h-[60px] md:w-[100px] md:h-[80px]"
            priority
          />

          <ul className="hidden  w-[50%] md:flex items-center gap-8  justify-between">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="text-slate-700  dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-3 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}

            <li>

            </li>
          </ul>


          <button
            onClick={handleQuizClick}
            className="hidden md:block px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            خطط رحلتي
          </button>


          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed  top-0 right-0 bottom-0 w-full  backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 shadow-2xl md:hidden"
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
            >
              <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </button>
          </div>
          <div className="px-8 py-12 space-y-6 bg-[#0f172a] min-h-[100vh]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="mobile-nav-item block w-full text-left text-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={handleQuizClick}
              className="mobile-nav-item w-full px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:shadow-lg transition-all duration-300"
            >
              خطط رحلتي
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
