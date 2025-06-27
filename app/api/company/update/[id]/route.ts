import { connectToDB } from '@/config/dbConnection';
import { verifyToken } from '@/lib/auth.lib';
import Company from '@/models/company.model';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
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

  const url = new URL(request.url);
  const pathname = url.pathname.split('/');
  const id = pathname[pathname.length - 1];

  if (!id) {
    return NextResponse.json({
      error: 'Provide the id for the company detail',
    });
  }

  await connectToDB();

  const {
    shopName,
    addressLine1,
    addressLine2,
    state,
    city,
    pincode,
    phone,
    companyName,
  } = await request.json();

  if (
    !shopName ||
    !addressLine1 ||
    !addressLine2 ||
    !state ||
    !city ||
    !pincode ||
    !phone ||
    !companyName
  ) {
    return NextResponse.json(
      { error: 'Provide all the details' },
      { status: 400 }
    );
  }

  const updatedCompany = await Company.findByIdAndUpdate(
    id,
    {
      shopName,
      addressLine1,
      addressLine2,
      state,
      city,
      pincode,
      phone,
      companyName,
    },
    { new: true, runValidators: true }
  );

  if (!updatedCompany) {
    return NextResponse.json(
      { error: 'Unable to update the company details' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: 'Company details updated successfully',
      updatedCompany,
    },
    {
      status: 200,
    }
  );
}
