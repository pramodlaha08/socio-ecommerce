'use client';

import Link from 'next/link';
import {
  BarChart3,
  FolderTree,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Tag,
  Users,
  UserRoundCog,
  UserCheck,
  LogOut,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const navigation = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'Vendors',
    href: '/admin/vendors',
    icon: Store,
  },
  {
    label: 'Pending Vendors',
    href: '/admin/vendors/pending',
    icon: UserCheck,
  },
  {
    label: 'Sellers',
    href: '/admin/sellers',
    icon: UserRoundCog,
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    label: 'Categories',
    href: '/admin/categories',
    icon: FolderTree,
  },
  {
    label: 'Reviews',
    href: '/admin/reviews',
    icon: MessageSquare,
  },
  {
    label: 'Promotions',
    href: '/admin/promotions',
    icon: Tag,
  },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: BarChart3,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const router = useRouter();

  function handleLogout() {
    router.push('/');
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-6 py-5">
        <Link href="/admin" className="text-xl font-bold text-foreground">
          Social Commerce
        </Link>

        <p className="mt-1 text-xs text-muted-foreground">Administration Panel</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-4" />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="size-4" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
