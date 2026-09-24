import Link from 'next/link';

const headerConfig = {
  brand: {
    name: 'Social Commerce',
    href: '/',
  },

  navigation: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'UI Library',
      href: '/ui-playground',
    },
    {
      label: 'Categories',
      href: '#',
    },
    {
      label: 'Privacy & Policy',
      href: '/privacy',
    },
    {
      label: 'Terms & Conditions',
      href: '/terms',
    },
  ],

  actions: [
    {
      label: 'Cart',
      href: '#',
      variant: 'outline',
    },
    {
      label: 'Account',
      href: '#',
      variant: 'primary',
    },
  ],
};

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand */}
        <Link
          href={headerConfig.brand.href}
          className="text-xl font-bold tracking-tight text-foreground"
        >
          {headerConfig.brand.name}
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {headerConfig.navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {headerConfig.actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={
                action.variant === 'primary'
                  ? 'rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90'
                  : 'rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary'
              }
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
