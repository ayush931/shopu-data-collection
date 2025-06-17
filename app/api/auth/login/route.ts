import { connectToDB } from "@/config/dbConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
  const { email, password } = await request.json();
  
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  await connectToDB();

  const user = await User.findOne({ email }).select('+password');

  console.log(user?.password)

  if (!user) {
    return NextResponse.json(
      { error: "Please register" },
      { status: 400 }
    )
  }

  //@ts-ignore
  const validatePassword = await user.comparePassword(password);

  if (!validatePassword) {
    return NextResponse.json(
      { error: "Invalid Password" },
      { status: 400 }
    )
  }

  //@ts-ignore
  const token = await user.generateJwtToken();

  if (!token) {
    return NextResponse.json(
      { error: "Token not generated" },
      { status: 400 }
    )
  }

  const response = NextResponse.json({
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone
    },
    sucess: true,
    message: "Logged in successfully"
  })

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  return response;
}