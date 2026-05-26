'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import Container from '@/components/layout/Container';
import RequestAccessButton from '@/components/patterns/RequestAccessButton';
import { navItems } from '@/content/nav';
import { cn } from '@/lib/cn';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Close drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-soft',
        scrolled
          ? 'bg-cream-100/70 backdrop-blur-[18px] backdrop-saturate-150 border-b border-line'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <Container>
        <div className="flex h-16 lg:h-[72px] items-center justify-between">
          <div className="flex items-center gap-10">
            <NextLink
              href="/"
              aria-label="Plum, home"
              className="inline-flex items-center gap-2 text-plum-900 focus-visible:outline-none focus-visible:shadow-focus rounded-sm"
            >
              <PetalMark />
              <Wordmark />
            </NextLink>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-3 py-2 text-[15px] font-medium rounded-md',
                      'transition-colors duration-200 ease-soft',
                      'focus-visible:outline-none focus-visible:shadow-focus',
                      active
                        ? 'text-plum-900'
                        : 'text-ink-2 hover:text-plum-900 hover:bg-plum-800/[0.04]'
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute left-3 right-3 -bottom-0.5 h-px bg-rose-500"
                      />
                    )}
                  </NextLink>
                );
              })}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <NextLink
              href="/signin"
              className="text-[15px] font-medium text-ink-2 hover:text-plum-900 transition-colors duration-200 ease-soft px-3 py-2 rounded-md focus-visible:outline-none focus-visible:shadow-focus"
            >
              Sign in
            </NextLink>
            <RequestAccessButton size="md" withIcon />
          </div>

          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-plum-900 hover:bg-plum-800/[0.05] transition-colors duration-200 ease-soft focus-visible:outline-none focus-visible:shadow-focus"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </Container>

      <Transition show={mobileOpen} as={Fragment}>
        <Dialog onClose={() => setMobileOpen(false)} className="relative z-50 lg:hidden">
          <TransitionChild
            as={Fragment}
            enter="ease-soft duration-300"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="ease-soft duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="fixed inset-0 flex flex-col bg-cream-100 px-6 py-5">
              <div className="flex items-center justify-between">
                <NextLink
                  href="/"
                  aria-label="Plum, home"
                  className="inline-flex items-center gap-2 text-plum-900"
                >
                  <PetalMark />
                  <Wordmark />
                </NextLink>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-plum-900 hover:bg-plum-800/[0.05] focus-visible:outline-none focus-visible:shadow-focus"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={22} strokeWidth={1.75} aria-hidden />
                </button>
              </div>

              <nav className="flex flex-col gap-1 mt-12">
                {navItems.map((item) => (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    className="text-[28px] font-semibold leading-tight tracking-tight text-plum-900 py-3 focus-visible:outline-none focus-visible:shadow-focus rounded-sm"
                  >
                    {item.label}
                  </NextLink>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4 border-t border-line pt-6">
                <NextLink
                  href="/signin"
                  className="text-[16px] font-medium text-ink-2 hover:text-plum-900"
                >
                  Sign in
                </NextLink>
                <RequestAccessButton size="lg" withIcon className="w-full" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </header>
  );
}

function PetalMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 106.401 110.668"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M 27.953 103.414 C 36.021 108.029 45.352 110.668 55.285 110.668 C 77.564 110.668 96.811 97.4 105.553 78.336 C 105.848 77.691 106.131 77.041 106.401 76.384 C 97.04 75.016 88.322 71.624 80.717 66.659 C 78.623 65.291 76.62 63.809 74.707 62.218 C 60.514 50.408 51.465 32.609 51.465 12.732 C 51.465 8.375 51.904 4.115 52.728 0 C 23.428 1.344 0 25.632 0 55.307 C 0 72.636 7.99 88.127 20.474 98.286 C 21.647 99.244 22.863 100.148 24.114 101.01 C 25.359 101.865 26.635 102.667 27.947 103.42 L 27.953 103.414 Z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  );
}

function Wordmark() {
  return (
    <span className="text-[17px] font-bold tracking-tight text-plum-900">
      Plum
    </span>
  );
}
