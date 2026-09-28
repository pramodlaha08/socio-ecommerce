export interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  pendingVendors: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
  totalReviews: number;
}

export interface AdminNavItem {
  label: string;
  href: string;
  icon: string;
}
