import NextLink from 'next/link';
import Container from '@/components/layout/Container';
import EarlyAccessForm from '@/components/patterns/EarlyAccessForm';
import Eyebrow from '@/components/ui/Eyebrow';
import Phrase from '@/components/ui/Phrase';
import Caption from '@/components/ui/Caption';
import { footerColumns, legalLinks, socialLinks } from '@/content/footer';
import { cn } from '@/lib/cn';

export default function Footer() {
  return (
    <footer className="relative mt-24 md:mt-32">
      {/* Peach veil — soft top fade, per brand brief */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[76px] bg-gradient-peach-veil pointer-events-none"
      />

      <Container className="relative pt-24 md:pt-28 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-12">
          {/* Brand column: wide; holds wordmark, soft phrase, early-access capture */}
          <div className="col-span-2 md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-plum-900">
              <PetalMark />
              <span className="text-[18px] font-bold tracking-tight">Plum</span>
            </div>
            <Phrase className="text-[26px] md:text-[28px]">
              a place a brand lives, intact
            </Phrase>
            <div className="mt-2">
              <Eyebrow className="mb-3 text-ink-3">Closed beta</Eyebrow>
              <EarlyAccessForm tone="inline" source="footer" />
            </div>
          </div>

          {footerColumns.map((col) => (
            <FooterColumn key={col.heading} heading={col.heading}>
              {col.links.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </FooterColumn>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          <Caption>
            © {new Date().getFullYear()} Plum. bloom early — even in the harshest
            weather.
          </Caption>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-2 hover:text-plum-900 transition-colors duration-200 ease-soft"
                >
                  <SocialIcon name={s.icon} />
                </a>
              ))}
            </div>
            <ul className="flex items-center gap-5">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <NextLink
                    href={l.href}
                    className="text-[13px] text-ink-2 hover:text-plum-900 transition-colors duration-200 ease-soft"
                  >
                    {l.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  heading,
  children
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Eyebrow className="text-ink-3 mb-1">{heading}</Eyebrow>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <li>
      <NextLink
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="text-[15px] text-ink-2 hover:text-plum-900 transition-colors duration-200 ease-soft"
      >
        {children}
      </NextLink>
    </li>
  );
}

function PetalMark() {
  return (
    <svg
      width="20"
      height="20"
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

// Inlined brand glyphs — Lucide removed brand icons in 2024 over trademark concerns.
function SocialIcon({ name }: { name: 'twitter' | 'linkedin' | 'github' }) {
  const cls = cn('h-[18px] w-[18px]');
  switch (name) {
    case 'twitter':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cls}
          fill="currentColor"
          aria-hidden
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cls}
          fill="currentColor"
          aria-hidden
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.064 2.062 2.062 0 112.063 2.064zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.778-.773 1.778-1.729V1.729C24.001.774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'github':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cls}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      );
  }
}
