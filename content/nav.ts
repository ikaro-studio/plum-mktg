export const navItems = [
  { label: 'Product', href: '/product' },
  { label: 'Customers', href: '/customers' },
  { label: 'Resources', href: '/blog' }
] as const;

export type NavItem = (typeof navItems)[number];
