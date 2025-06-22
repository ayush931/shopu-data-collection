import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function verifyToken(token: string) {
  const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret';

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }
}
