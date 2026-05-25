import Link from 'next/link';

import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1920px] px-6 mt-24 bg-cream-100 border-t border-line">
      <div className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-12 max-w-6xl mx-auto">
        <div className="col-span-1 lg:col-span-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-plum-800"
          >
            <Logo width={28} height={28} />
            <span className="text-lg tracking-tight">Plum</span>
          </Link>
          <p className="mt-4 text-ink-2 text-sm leading-relaxed max-w-xs">
            The place a brand lives, intact. We consolidate brand files so
            teams always work from the same source of truth.
          </p>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <p className="eyebrow mb-4">PRODUCT</p>
          <ul className="flex flex-col space-y-3">
            <li>
              <Link
                href="/"
                className="text-ink-2 hover:text-plum-800 transition-colors duration-200 ease-soft text-sm"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                href="/signin"
                className="text-ink-2 hover:text-plum-800 transition-colors duration-200 ease-soft text-sm"
              >
                Sign in
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <p className="eyebrow mb-4">COMPANY</p>
          <ul className="flex flex-col space-y-3">
            <li>
              <Link
                href="/"
                className="text-ink-2 hover:text-plum-800 transition-colors duration-200 ease-soft text-sm"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-ink-2 hover:text-plum-800 transition-colors duration-200 ease-soft text-sm"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-ink-2 hover:text-plum-800 transition-colors duration-200 ease-soft text-sm"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <p className="eyebrow mb-4">LEGAL</p>
          <ul className="flex flex-col space-y-3">
            <li>
              <Link
                href="/"
                className="text-ink-2 hover:text-plum-800 transition-colors duration-200 ease-soft text-sm"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-ink-2 hover:text-plum-800 transition-colors duration-200 ease-soft text-sm"
              >
                Terms of use
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-start col-span-1 lg:col-span-2 lg:justify-end">
          <a
            aria-label="Github Repository"
            href="https://github.com/vercel/nextjs-subscription-payments"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-ink-2 hover:text-plum-800 hover:bg-plum-800/5 transition duration-200 ease-soft"
          >
            <GitHub />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between py-8 space-y-4 md:flex-row border-t border-line max-w-6xl mx-auto">
        <p className="text-ink-3 text-sm">
          &copy; {new Date().getFullYear()} Plum. All rights reserved.
        </p>
        <p className="text-ink-3 text-sm">
          bloom early — even in the harshest weather.
        </p>
      </div>
    </footer>
  );
}
