import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'vendors.json');

    const file = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(file);

    const pendingVendors = (data.vendors ?? []).filter(
      (vendor: { status: string }) => vendor.status === 'pending',
    );

    return NextResponse.json({
      vendors: pendingVendors,
    });
  } catch (error) {
    console.error('Failed to load pending vendors:', error);

    return NextResponse.json(
      {
        message: 'Unable to load pending vendors.',
      },
      { status: 500 },
    );
  }
}
