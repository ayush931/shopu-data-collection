import { connectToDB } from "@/config/dbConnection";
import { verifyToken } from "@/lib/auth.lib";
import Company from "@/models/company.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Login first" }, { status: 400 });
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: "Login with correct credentials" },
      { status: 400 }
    );
  }

  await connectToDB();

  const companyDetails = await Company.find().populate({
    path: 'companyName',
    select: 'name'
  });

  if (!companyDetails) {
    return NextResponse.json(
      { error: "Unable to fetch company details" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Company details",
    companyDetails,
  });
}
