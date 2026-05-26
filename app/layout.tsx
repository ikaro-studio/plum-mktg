import SupabaseProvider from './supabase-provider';
import Footer from '@/components/global/Footer';
import Navbar from '@/components/global/Navbar';
import SkipToContent from '@/components/global/SkipToContent';
import { Sora, Quicksand } from 'next/font/google';
import { PropsWithChildren } from 'react';
import 'styles/main.css';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap'
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: ['300', '400', '500'],
  display: 'swap'
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
    <html lang="en" className={`${sora.variable} ${quicksand.variable}`}>
      <body className="bg-cream-100 text-plum-800 font-sans antialiased">
        <SupabaseProvider>
          <SkipToContent />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
