import { connectToDB } from '@/config/dbConnection';
import { verifyToken } from '@/lib/auth.lib';
import CompayName from '@/models/companyName.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Login first' }, { status: 400 });
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: 'Login with correct credentials' },
      { status: 400 }
    );
  }

  await connectToDB();

  const { name } = await request.json();

  if (!name) {
    return NextResponse.json({ error: 'Provide the name' }, { status: 400 });
  }

  const newCompanyName = await CompayName.create({
    name,
  });

  if (!newCompanyName) {
    return NextResponse.json(
      { error: 'Company name creation failed' },
      { status: 400 }
    );
  }

  await newCompanyName.save();

  return NextResponse.json({
    success: true,
    message: 'Company name created successfully',
    newCompanyName,
  });
}
