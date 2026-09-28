import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

    const file = await fs.readFile(filePath, 'utf-8');

    const data = JSON.parse(file);

    const users = (data.users ?? []).map((user: Record<string, unknown>) => {
      const { password: _password, ...safeUser } = user;

      return safeUser;
    });

    return NextResponse.json({
      users,
    });
  } catch (error) {
    console.error('Failed to load users:', error);

    return NextResponse.json(
      {
        message: 'Unable to load users.',
      },
      { status: 500 },
    );
  }
}
