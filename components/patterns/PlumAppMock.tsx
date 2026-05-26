import { cn } from '@/lib/cn';

type Variant = 'library' | 'workspace' | 'collections';

type Props = {
  variant?: Variant;
  /** When true, mark with aria-label & describe; default false (decorative). */
  labelled?: boolean;
  className?: string;
};

/**
 * In-repo composition that stands in for a real Plum app screenshot.
 * Pure presentation — no interactivity, no real data, just tokens.
 * Swap for an actual product capture once one ships.
 */
export default function PlumAppMock({
  variant = 'library',
  labelled = false,
  className
}: Props) {
  return (
    <div
      role={labelled ? 'img' : 'presentation'}
      aria-label={
        labelled
          ? 'A preview of the Plum library — sidebar of brands, grid of brand assets, soft warm interface.'
          : undefined
      }
      className={cn(
        'relative overflow-hidden bg-white border border-line shadow-lg',
        'rounded-2xl',
        className
      )}
    >
      {/* Window chrome — quiet, no trafficked dots */}
      <div className="flex items-center gap-2 px-5 h-10 border-b border-line bg-cream-100/60">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-300/70" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-peach-400/70" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-sage-300/70" aria-hidden />
        </div>
        <div className="flex-1" />
        <div className="text-[11px] text-ink-3 tracking-wide">
          plum.app/library
        </div>
      </div>

      <div className="flex h-[440px] md:h-[480px]">
        <Sidebar variant={variant} />
        <div className="flex-1 flex flex-col">
          <Toolbar variant={variant} />
          <AssetGrid variant={variant} />
        </div>
      </div>
    </div>
  );
}

function Sidebar({ variant }: { variant: Variant }) {
  const brands: { name: string; tone: string; active?: boolean }[] = [
    {
      name: 'Atlas Studio',
      tone: 'bg-plum-800',
      active: variant === 'library'
    },
    {
      name: 'Hermes & Co.',
      tone: 'bg-rose-500',
      active: variant === 'workspace'
    },
    {
      name: 'North Field',
      tone: 'bg-sage-300',
      active: variant === 'collections'
    },
    { name: 'Marquee', tone: 'bg-peach-400' },
    { name: 'Vellum Press', tone: 'bg-plum-700' },
    { name: 'Coast & Pine', tone: 'bg-rose-300' }
  ];
  return (
    <aside className="w-[180px] md:w-[210px] shrink-0 border-r border-line p-4 flex flex-col gap-1">
      <div className="px-2 pb-3 pt-1">
        <div className="text-[11px] uppercase tracking-eyebrow font-semibold text-ink-3">
          Brands
        </div>
      </div>
      {brands.map((b) => (
        <div
          key={b.name}
          className={cn(
            'flex items-center gap-2.5 px-2 py-2 rounded-md text-[13px]',
            b.active
              ? 'bg-plum-800/[0.06] text-plum-900 font-medium'
              : 'text-ink-2'
          )}
        >
          <span
            aria-hidden
            className={cn('h-3 w-3 rounded-sm shrink-0', b.tone)}
          />
          <span className="truncate">{b.name}</span>
        </div>
      ))}
      <div className="mt-auto px-2 pt-4 pb-1 flex items-center gap-2 text-[12px] text-ink-3">
        <span
          aria-hidden
          className="inline-block h-5 w-5 rounded-full bg-plum-800 text-cream-100 grid place-items-center text-[10px] font-bold"
        >
          A
        </span>
        Alma Ortega
      </div>
    </aside>
  );
}

function Toolbar({ variant }: { variant: Variant }) {
  const filters = (() => {
    switch (variant) {
      case 'library':
        return ['All', 'Logos', 'Photography', 'Type', 'Color'];
      case 'workspace':
        return ['Shared with you', 'In review', 'Approved', 'Archived'];
      case 'collections':
        return ['Spring 2026', 'Launch', 'Internal', 'Partner kit'];
    }
  })();
  return (
    <div className="h-14 px-5 border-b border-line flex items-center gap-3">
      <div className="flex-1 max-w-[220px] h-9 rounded-md bg-cream-100 border border-line flex items-center gap-2 px-3">
        <span aria-hidden className="text-ink-3 text-[14px]">
          ⌕
        </span>
        <span className="text-[13px] text-ink-3">Search assets</span>
      </div>
      <div className="hidden md:flex items-center gap-1.5 overflow-hidden">
        {filters.map((f, i) => (
          <span
            key={f}
            className={cn(
              'inline-flex h-7 items-center px-3 rounded-full text-[12px] whitespace-nowrap',
              i === 0
                ? 'bg-plum-800 text-cream-100'
                : 'bg-cream-100 text-ink-2'
            )}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="flex-1" />
      <div className="text-[11px] text-ink-3 tracking-wide hidden md:block">
        12 480 assets
      </div>
    </div>
  );
}

function AssetGrid({ variant }: { variant: Variant }) {
  // Six brand-object tiles. Each one is a different *kind* of asset surface —
  // not a fake photo, but a considered piece of brand IP.
  const tiles: { node: React.ReactNode; meta: string; size: string }[] = [
    {
      node: (
        <div className="absolute inset-0 bg-plum-800 grid place-items-center">
          <span className="text-cream-100 text-[28px] font-extrabold tracking-tight">
            ATLAS
          </span>
        </div>
      ),
      meta: 'wordmark — primary',
      size: '8.4 MB'
    },
    {
      node: (
        <div className="absolute inset-0 grid grid-cols-5">
          {['bg-plum-800', 'bg-rose-500', 'bg-peach-400', 'bg-sage-300', 'bg-cream-100'].map(
            (c, i) => (
              <div key={i} className={cn(c, 'h-full')} aria-hidden />
            )
          )}
        </div>
      ),
      meta: 'palette — spring 26',
      size: '212 KB'
    },
    {
      node: (
        <div className="absolute inset-0 bg-peach-400 grid place-items-center">
          <span className="text-plum-900 font-soft font-light text-[22px] lowercase tracking-tight px-4 text-center leading-tight">
            bloom early — even in the harshest weather
          </span>
        </div>
      ),
      meta: 'poster — manifesto',
      size: '4.1 MB'
    },
    {
      node: (
        <div className="absolute inset-0 bg-cream-100 grid place-items-center">
          <svg
            viewBox="0 0 106.401 110.668"
            className="h-16 w-16 text-plum-800"
            fill="currentColor"
            aria-hidden
          >
            <path d="M 27.953 103.414 C 36.021 108.029 45.352 110.668 55.285 110.668 C 77.564 110.668 96.811 97.4 105.553 78.336 C 105.848 77.691 106.131 77.041 106.401 76.384 C 97.04 75.016 88.322 71.624 80.717 66.659 C 78.623 65.291 76.62 63.809 74.707 62.218 C 60.514 50.408 51.465 32.609 51.465 12.732 C 51.465 8.375 51.904 4.115 52.728 0 C 23.428 1.344 0 25.632 0 55.307 C 0 72.636 7.99 88.127 20.474 98.286 C 21.647 99.244 22.863 100.148 24.114 101.01 C 25.359 101.865 26.635 102.667 27.947 103.42 L 27.953 103.414 Z" />
          </svg>
        </div>
      ),
      meta: 'mark — full bleed',
      size: '32 KB'
    },
    {
      node: (
        <div className="absolute inset-0 bg-sage-300 grid place-items-center">
          <span className="text-plum-900 text-[48px] font-extrabold leading-none">
            A
          </span>
        </div>
      ),
      meta: 'monogram — sage',
      size: '24 KB'
    },
    {
      node: (
        <div className="absolute inset-0 bg-white flex flex-col">
          <div className="border-b border-line h-8 flex items-center px-3">
            <div className="h-1.5 w-12 rounded-full bg-plum-800/20" aria-hidden />
          </div>
          <div className="flex-1 p-3 grid grid-cols-4 gap-1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-[2px]',
                  i % 3 === 0
                    ? 'bg-plum-800/10'
                    : i % 3 === 1
                    ? 'bg-peach-400/40'
                    : 'bg-rose-300/40'
                )}
                aria-hidden
              />
            ))}
          </div>
        </div>
      ),
      meta: 'guidelines — page 14',
      size: '1.2 MB'
    }
  ];

  return (
    <div className="flex-1 overflow-hidden p-5">
      <div className="grid grid-cols-3 gap-4 h-full">
        {tiles.map((t, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="relative flex-1 rounded-md overflow-hidden border border-line">
              {t.node}
            </div>
            <div className="flex items-baseline justify-between gap-2 min-w-0">
              <span className="text-[12px] text-ink-1 truncate">{t.meta}</span>
              <span className="text-[11px] text-ink-3 shrink-0">{t.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
