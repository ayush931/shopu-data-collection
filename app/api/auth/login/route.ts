import { connectToDB } from "@/config/dbConnection";
import { generateToken } from "@/lib/token.lib";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

interface TokenPayload {
  userId: string;
  email: string;
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  await connectToDB();

  const user = await User.findOne({ email }).select("+password");

  console.log(user?.password);

  if (!user) {
    return NextResponse.json({ error: "Please register" }, { status: 400 });
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
  }

  // Generate token with properly typed payload
  const userPayload: TokenPayload = {
    userId: user._id.toString(),
    email: user.email,
  };
  const token = generateToken(userPayload);

  if (!token) {
    return NextResponse.json({ error: "Token not generated" }, { status: 400 });
  }

  const response = NextResponse.json({
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    success: true,
    message: "Logged in successfully",
  });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });

  return response;
}
