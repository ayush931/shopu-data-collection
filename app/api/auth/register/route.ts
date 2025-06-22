import { connectToDB } from '@/config/dbConnection';
import User from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, email, password, phone } = await request.json();

  if (!name || !email || !password || !phone) {
    return NextResponse.json(
      { error: 'Provide all the details' },
      { status: 400 }
    );
  }

  await connectToDB();

  const checkUser = await User.findOne({ email });

  if (checkUser) {
    return NextResponse.json(
      { error: 'User already exists, Please login' },
      { status: 400 }
    );
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  if (!user) {
    return NextResponse.json(
      { error: 'User not created, Please try again' },
      { status: 400 }
    );
  }

  await user.save();

  user.password = '';

  const response = NextResponse.json({
    success: true,
    message: 'User registered successfully',
  });

  return response;
}
