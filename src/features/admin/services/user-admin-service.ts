export interface AdminUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: string[];
  activeRole: string;
  vendorId?: string;
  status: string;
  isVerified: boolean;
  promotionStatus?: string;
  createdAt: string;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  const response = await fetch('/api/admin/users', {
    method: 'GET',
    cache: 'no-store',
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Unable to load users.');
  }

  return result.users;
}
