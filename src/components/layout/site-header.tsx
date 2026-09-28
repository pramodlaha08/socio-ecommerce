'use client';

import Link from 'next/link';
import { ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      label: 'Sell on Socio',
      href: '/register/vendor',
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
    },
    {
      label: 'Register',
      href: '/register/user',
    },
  ],

  loginOptions: [
    {
      label: 'User Login',
      href: '/user/login',
      description: 'Login as a buyer',
    },
    {
      label: 'Seller Login',
      href: '/seller/login',
      description: 'Login as a seller',
    },
    {
      label: 'Admin Login',
      href: '/admin/login',
      description: 'Access administration',
    },
  ],
};

export function SiteHeader() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const router = useRouter();

  function handleLogout() {
    setIsLoginOpen(false);
    router.push('/');
  }

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
          {/* Cart + Register */}
          {headerConfig.actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {action.label}
            </Link>
          ))}

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <LogOut className="size-4" />
            Logout
          </button>

          {/* Login Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLoginOpen((current) => !current)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              aria-expanded={isLoginOpen}
              aria-haspopup="menu"
            >
              Login
              <ChevronDown
                className={`size-4 transition-transform ${isLoginOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isLoginOpen && (
              <div className="absolute right-0 z-50 mt-2 w-64 rounded-xl border border-border bg-card p-2 shadow-lg">
                {headerConfig.loginOptions.map((option) => (
                  <Link
                    key={option.label}
                    href={option.href}
                    onClick={() => setIsLoginOpen(false)}
                    className="block rounded-lg px-3 py-3 transition-colors hover:bg-muted"
                  >
                    <div className="text-sm font-medium text-foreground">{option.label}</div>

                    <div className="mt-1 text-xs text-muted-foreground">{option.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
