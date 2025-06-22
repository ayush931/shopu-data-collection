import { connectToDB } from '@/config/dbConnection';
import { verifyToken } from '@/lib/auth.lib';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Login First' }, { status: 400 });
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: 'Login with correct account' },
      { status: 400 }
    );
  }

  await connectToDB();

  const user = await User.find({});

  if (!user) {
    return NextResponse.json(
      { error: 'Not able to fetch detail' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'User details',
    user,
  });
}
