export const footerColumns = [
  {
    heading: 'Product',
    links: [
      { label: 'Overview', href: '/product' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' }
    ]
  },
  {
    heading: 'For',
    links: [
      { label: 'Brand teams', href: '/customers#brand-teams' },
      { label: 'Agencies', href: '/customers#agencies' },
      { label: 'Freelancers', href: '/customers#freelancers' },
      { label: 'Enterprise', href: '/contact' }
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Help center', href: '/help' },
      { label: 'Status', href: 'https://status.plum.app' },
      { label: 'Brand kit', href: '/brand' }
    ]
  }
] as const;

export const legalLinks = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' }
] as const;

export const socialLinks = [
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com/plum',
    icon: 'twitter' as const
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/plum',
    icon: 'linkedin' as const
  },
  {
    label: 'GitHub',
    href: 'https://github.com/plum',
    icon: 'github' as const
  }
] as const;
