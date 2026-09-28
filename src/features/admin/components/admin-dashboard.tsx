'use client';

import { useEffect, useState } from 'react';
import {
  BarChart3,
  MessageSquare,
  Package,
  ShoppingCart,
  Store,
  UserCheck,
  Users,
  UserRoundCog,
} from 'lucide-react';
import { toast } from 'sonner';

import { AdminStatCard } from './admin-stat-card';

import type { AdminStats } from '../types/admin';
import { getAdminStats } from '../services/admin-service';

const defaultStats: AdminStats = {
  totalUsers: 0,
  totalVendors: 0,
  pendingVendors: 0,
  totalSellers: 0,
  totalProducts: 0,
  totalOrders: 0,
  totalReviews: 0,
};

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>(defaultStats);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const dashboardStats = await getAdminStats();

        setStats(dashboardStats);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to load dashboard.';

        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">Overview of your Social Commerce platform.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard title="Total Users" value={isLoading ? 0 : stats.totalUsers} icon={Users} />

        <AdminStatCard
          title="Total Vendors"
          value={isLoading ? 0 : stats.totalVendors}
          icon={Store}
        />

        <AdminStatCard
          title="Pending Vendors"
          value={isLoading ? 0 : stats.pendingVendors}
          icon={UserCheck}
          description="Awaiting approval"
        />

        <AdminStatCard
          title="Total Sellers"
          value={isLoading ? 0 : stats.totalSellers}
          icon={UserRoundCog}
        />

        <AdminStatCard
          title="Products"
          value={isLoading ? 0 : stats.totalProducts}
          icon={Package}
        />

        <AdminStatCard
          title="Orders"
          value={isLoading ? 0 : stats.totalOrders}
          icon={ShoppingCart}
        />

        <AdminStatCard
          title="Reviews"
          value={isLoading ? 0 : stats.totalReviews}
          icon={MessageSquare}
        />

        <AdminStatCard title="Reports" value={0} icon={BarChart3} description="Coming soon" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href="/admin/vendors/pending"
              className="rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <p className="font-medium text-foreground">Review Vendors</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Review pending vendor registrations.
              </p>
            </a>

            <a
              href="/admin/users"
              className="rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <p className="font-medium text-foreground">Manage Users</p>

              <p className="mt-1 text-sm text-muted-foreground">
                View and manage registered users.
              </p>
            </a>

            <a
              href="/admin/products"
              className="rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <p className="font-medium text-foreground">Manage Products</p>

              <p className="mt-1 text-sm text-muted-foreground">Manage marketplace products.</p>
            </a>

            <a
              href="/admin/categories"
              className="rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <p className="font-medium text-foreground">Manage Categories</p>

              <p className="mt-1 text-sm text-muted-foreground">Manage product categories.</p>
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Platform Status</h2>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">User Registration</span>

              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Vendor Registration</span>

              <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Vendor Approval</span>

              <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
                In Development
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Orders</span>

              <span className="rounded-full bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
                In Development
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
