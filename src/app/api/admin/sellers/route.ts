import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'sellers.json');

    const file = await fs.readFile(filePath, 'utf-8');

    const data = JSON.parse(file);

    return NextResponse.json({
      sellers: data.sellers ?? [],
    });
  } catch (error) {
    console.error('Failed to load sellers:', error);

    return NextResponse.json(
      {
        message: 'Unable to load sellers.',
      },
      { status: 500 },
    );
  }
}
