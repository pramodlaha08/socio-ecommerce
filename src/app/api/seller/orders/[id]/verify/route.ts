import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Seller {
  id: string;
  userId: string;
  vendorId: string;
  role: 'super_seller' | 'seller';
  status: 'active' | 'inactive';
}

interface SellersData {
  sellers: Seller[];
}

interface OrderTimelineEntry {
  status: string;
  changedBy: string;
  timestamp: string;
}

interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  vendorId: string;
  sellerId: string;
  status: string;
  payment: {
    method: string;
    status: string;
    transactionId: string | null;
    paidAt: string | null;
  };
  timeline: OrderTimelineEntry[];
  updatedAt: string;
}

interface OrdersData {
  orders: Order[];
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const sellerId = request.headers.get('x-seller-id');

    if (!sellerId) {
      return NextResponse.json(
        {
          message: 'Seller authentication is required.',
        },
        { status: 401 },
      );
    }

    const { id } = await params;

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

    const [sellersFile, ordersFile] = await Promise.all([
      fs.readFile(sellersPath, 'utf-8'),
      fs.readFile(ordersPath, 'utf-8'),
    ]);

    const sellersData = JSON.parse(sellersFile) as SellersData;
    const ordersData = JSON.parse(ordersFile) as OrdersData;

    const seller = sellersData.sellers.find(
      (item) =>
        item.id === sellerId && item.status === 'active',
    );

    if (!seller) {
      return NextResponse.json(
        {
          message: 'Active seller account not found.',
        },
        { status: 401 },
      );
    }

    const order = ordersData.orders.find(
      (item) => item.id === id,
    );

    if (!order) {
      return NextResponse.json(
        {
          message: 'Order not found.',
        },
        { status: 404 },
      );
    }

    const hasAccess =
      order.vendorId === seller.vendorId &&
      (seller.role === 'super_seller' ||
        order.sellerId === seller.id);

    if (!hasAccess) {
      return NextResponse.json(
        {
          message: 'You do not have access to this order.',
        },
        { status: 403 },
      );
    }

    if (order.status !== 'paid') {
      return NextResponse.json(
        {
          message:
            `Only paid orders can be verified. Current status: ${order.status}.`,
        },
        { status: 400 },
      );
    }

    if (order.payment.status !== 'paid') {
      return NextResponse.json(
        {
          message:
            'The order payment has not been confirmed.',
        },
        { status: 400 },
      );
    }

    const now = new Date().toISOString();

    order.status = 'processing';
    order.updatedAt = now;

    order.timeline.push({
      status: 'processing',
      changedBy: sellerId,
      timestamp: now,
    });

    await fs.writeFile(
      ordersPath,
      JSON.stringify(ordersData, null, 2),
      'utf-8',
    );

    return NextResponse.json({
      message: 'Order verified successfully.',
      order,
    });
  } catch (error) {
    console.error(
      'Failed to verify seller order:',
      error,
    );

    return NextResponse.json(
      {
        message: 'Unable to verify order.',
      },
      { status: 500 },
    );
  }
}
