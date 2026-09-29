import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

import type { SellerOrder } from '@/features/sellers/types/order';

interface StoredSeller {
  id: string;
  userId: string;
  vendorId: string;
  role: 'super_seller' | 'seller';
  status: 'active' | 'inactive';
}

interface SellersData {
  sellers: StoredSeller[];
}

interface OrdersData {
  orders: SellerOrder[];
}

export async function GET(
  request: NextRequest,
) {
  try {
    const sellerId =
      request.headers.get('x-seller-id');

    if (!sellerId) {
      return NextResponse.json(
        {
          message:
            'Seller authentication is required.',
        },
        { status: 401 },
      );
    }

    const sellersPath = path.join(
      process.cwd(),
      'src',
      'data',
      'sellers.json',
    );

    const ordersPath = path.join(
      process.cwd(),
      'src',
      'data',
      'orders.json',
    );

    const [
      sellersFile,
      ordersFile,
    ] = await Promise.all([
      fs.readFile(
        sellersPath,
        'utf-8',
      ),
      fs.readFile(
        ordersPath,
        'utf-8',
      ),
    ]);

    const sellersData =
      JSON.parse(
        sellersFile,
      ) as SellersData;

    const ordersData =
      JSON.parse(
        ordersFile,
      ) as OrdersData;

    const seller =
      sellersData.sellers.find(
        (item) =>
          item.id === sellerId &&
          item.status === 'active',
      );

    if (!seller) {
      return NextResponse.json(
        {
          message: 'Seller not found.',
        },
        { status: 404 },
      );
    }

    const orders =
      seller.role === 'super_seller'
        ? ordersData.orders.filter(
            (order) =>
              order.vendorId ===
              seller.vendorId,
          )
        : ordersData.orders.filter(
            (order) =>
              order.vendorId ===
                seller.vendorId &&
              order.sellerId ===
                seller.id,
          );

    return NextResponse.json({
      orders,
    });
  } catch (error) {
    console.error(
      'Failed to load seller orders:',
      error,
    );

    return NextResponse.json(
      {
        message:
          'Unable to load seller orders.',
      },
      { status: 500 },
    );
  }
}
