'use client';

import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'الرئيسية', id: 'hero' },
    { label: 'كيف يعمل', id: 'how-it-works' },
    { label: 'من نحن', id: 'about' },
    { label: 'اتصل بنا', id: 'contact' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-20" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Safar.AI
            </h3>
            <p className="text-slate-400 max-w-md">
              تجارب سفر مدعومة بالذكاء الاصطناعي مصممة خصيصًا لشخصيتك. اكتشف وجهات تتناسب مع حمضك النووي الفريد للسفر.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">تواصل معنا</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              {currentYear} Safar.AI. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-slate-400 hover:text-white transition-colors duration-300">
                سياسة الخصوصية
              </button>
              <button className="text-slate-400 hover:text-white transition-colors duration-300">
                شروط الخدمة
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
