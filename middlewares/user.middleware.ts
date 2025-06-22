import { verifyToken } from '@/lib/auth.lib';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
