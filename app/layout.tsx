import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import localFont from 'next/font/local';

const dinNextArabic = localFont({
  src: [
    {
      path: '../public/fonts/DINNextLTArabic-Regular-3.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/DINNextLTArabic-Medium-3.ttf',
      weight: '500',
      style: 'normal',
    },

  ],
  variable: '--font-din-next-arabic',
  display: 'swap',
});



export const metadata: Metadata = {
  metadataBase: new URL('https://safar-ai.example.com'),
  title: 'سفر.AI - اكتشف حمضك النووي للسفر',
  description: 'تجارب سفر مدعومة بالذكاء الاصطناعي مصممة خصيصًا لشخصيتك. اكتشف وجهات تتناسب مع حمضك النووي الفريد للسفر.',
  keywords: ['سفر', 'ذكاء اصطناعي', 'تخصيص', 'توصيات سفر', 'تخطيط سفر', 'وجهات'],
  openGraph: {
    title: 'سفر.AI - اكتشف حمضك النووي للسفر',
    description: 'تجارب سفر مدعومة بالذكاء الاصطناعي مصممة خصيصًا لشخصيتك',
    type: 'website',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سفر.AI - اكتشف حمضك النووي للسفر',
    description: 'تجارب سفر مدعومة بالذكاء الاصطناعي مصممة خصيصًا لشخصيتك',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={dinNextArabic.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
