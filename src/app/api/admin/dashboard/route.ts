import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

async function readJsonFile(fileName: string) {
  const filePath = path.join(process.cwd(), 'src', 'data', fileName);

  const file = await fs.readFile(filePath, 'utf-8');

  return JSON.parse(file);
}

export async function GET() {
  try {
    const [usersData, vendorsData, sellersData, productsData, reviewsData] = await Promise.all([
      readJsonFile('users.json'),
      readJsonFile('vendors.json'),
      readJsonFile('sellers.json'),
      readJsonFile('products.json'),
      readJsonFile('reviews.json'),
    ]);

    const users = usersData.users ?? [];
    const vendors = vendorsData.vendors ?? [];
    const sellers = sellersData.sellers ?? [];
    const products = productsData.products ?? [];
    const reviews = reviewsData.reviews ?? [];

    const pendingVendors = vendors.filter(
      (vendor: { status: string }) => vendor.status === 'pending',
    );

    return NextResponse.json({
      stats: {
        totalUsers: users.length,
        totalVendors: vendors.length,
        pendingVendors: pendingVendors.length,
        totalSellers: sellers.length,
        totalProducts: products.length,
        totalOrders: 0,
        totalReviews: reviews.length,
      },
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);

    return NextResponse.json(
      {
        message: 'Unable to load admin dashboard.',
      },
      { status: 500 },
    );
  }
}
