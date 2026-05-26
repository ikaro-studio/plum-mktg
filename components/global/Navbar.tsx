'use client';

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import Container from '@/components/layout/Container';
import RequestAccessButton from '@/components/patterns/RequestAccessButton';
import ThemeToggle from '@/components/global/ThemeToggle';
import PlumLogo from '@/components/global/PlumLogo';
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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300 ease-soft',
        scrolled
          ? 'bg-surface/70 backdrop-blur-[18px] backdrop-saturate-150 border-b border-line'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <Container>
        <div className="flex h-16 lg:h-[72px] items-center justify-between">
          <div className="flex items-center gap-10">
            <Logo />
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
                        ? 'text-fg-strong'
                        : 'text-fg-muted hover:text-fg-strong hover:bg-fg-strong/[0.04]'
                    )}
                  >
                    {item.label}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute left-3 right-3 -bottom-0.5 h-px bg-accent"
                      />
                    )}
                  </NextLink>
                );
              })}
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <NextLink
              href="/signin"
              className="text-[15px] font-medium text-fg-muted hover:text-fg-strong transition-colors duration-200 ease-soft px-3 py-2 rounded-md focus-visible:outline-none focus-visible:shadow-focus"
            >
              Sign in
            </NextLink>
            <ThemeToggle />
            <RequestAccessButton size="md" withIcon />
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-strong hover:bg-fg-strong/[0.05] transition-colors duration-200 ease-soft focus-visible:outline-none focus-visible:shadow-focus"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
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
            <DialogPanel className="fixed inset-0 flex flex-col bg-surface px-6 py-5">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-fg-strong hover:bg-fg-strong/[0.05] focus-visible:outline-none focus-visible:shadow-focus"
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
                    className="text-[28px] font-semibold leading-tight tracking-tight text-fg-strong py-3 focus-visible:outline-none focus-visible:shadow-focus rounded-sm"
                  >
                    {item.label}
                  </NextLink>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-4 border-t border-line pt-6">
                <NextLink
                  href="/signin"
                  className="text-[16px] font-medium text-fg-muted hover:text-fg-strong"
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

function Logo() {
  return (
    <NextLink
      href="/"
      aria-label="Plum, home"
      className="inline-flex items-center focus-visible:outline-none focus-visible:shadow-focus rounded-sm"
    >
      <PlumLogo width={89} height={25} />
    </NextLink>
  );
}
