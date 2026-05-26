import SupabaseProvider from './supabase-provider';
import Footer from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar';
import SkipToContent from '@/components/global/SkipToContent';
import ThemeProvider from '@/components/global/ThemeProvider';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';
import 'styles/main.css';

const avioSans = localFont({
  variable: '--font-avio',
  display: 'swap',
  src: [
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-RegularItalic.woff2', weight: '400', style: 'italic' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-SemiBoldItalic.woff2', weight: '600', style: 'italic' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-ExtraBold.woff2', weight: '800', style: 'normal' },
    { path: '../public/fonts/AvioSans-v0.8/AvioSans-ExtraBoldItalic.woff2', weight: '800', style: 'italic' }
  ]
});

const meta = {
  title: 'Plum — the place a brand lives, intact',
  description:
    'Plum is a Digital Asset Management platform. We consolidate brand files so teams, freelancers, and agencies always work from the same source of truth.',
  cardImage: '/brand/plum-lockup-cream.png',
  robots: 'follow, index',
  url: 'https://plum.app',
  type: 'website'
};

export const metadata = {
  title: meta.title,
  description: meta.description,
  robots: meta.robots,
  openGraph: {
    url: meta.url,
    title: meta.title,
    description: meta.description,
    images: [meta.cardImage],
    type: meta.type,
    siteName: 'Plum'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@plum',
    title: meta.title,
    description: meta.description,
    images: [meta.cardImage]
  }
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={avioSans.variable}
    >
      <body className="bg-surface text-fg font-sans antialiased">
        <ThemeProvider>
          <SupabaseProvider>
            <SkipToContent />
            <Navbar />
            <main id="main" className="pt-16 lg:pt-[72px]">{children}</main>
            <Footer />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
