import { verifyToken } from '@/lib/auth.lib';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get('token')?.value;

  if (!authToken) {
    return NextResponse.json({ error: 'Login first' }, { status: 400 });
  }

  const payload = await verifyToken(authToken);

  if (!payload) {
    return NextResponse.json(
      { error: 'Please login with correct credentials' },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully',
  });

  response.cookies.set({
    name: 'token',
    value: '',
    expires: new Date(0), // Expire immediately
    httpOnly: true,
  });
  return response;
}
