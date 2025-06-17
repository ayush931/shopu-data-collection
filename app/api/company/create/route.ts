import { connectToDB } from "@/config/dbConnection";
import { verifyToken } from "@/lib/auth.lib";
import Company from "@/models/company.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Login first' },
      { status: 400 }
    )
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return NextResponse.json(
      { error: 'Login with correct credentials' },
      { status: 400 }
    )
  }

  await connectToDB();

  const { shopName, addressLine1, addressLine2, state, city, pincode, phone, companyName } = await request.json();

  if (!shopName || !addressLine1 || !addressLine2 || !state || !city || !pincode || !phone || !companyName) {
    return NextResponse.json(
      { error: 'Provide all the details' },
      { status: 400 }
    )
  }

  const createCompany = await Company.create({
    shopName,
    addressLine1,
    addressLine2,
    state,
    city,
    pincode,
    phone,
    companyName
  })

  if (!createCompany) {
    return NextResponse.json(
      { error: 'Failed to create company data' },
      { status: 400 }
    )
  }

  await createCompany.save();

  return NextResponse.json({
    success: true,
    message: 'Company created successfully'
  })
}