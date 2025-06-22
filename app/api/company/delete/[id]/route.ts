import { connectToDB } from '@/config/dbConnection';
import { verifyToken } from '@/lib/auth.lib';
import Company from '@/models/company.model';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
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

  // Extract ID from URL pathname
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  if (!id) {
    return NextResponse.json(
      { error: 'Provide the id of the company details' },
      { status: 400 }
    );
  }

  await connectToDB();

  const companyDetails = await Company.findOneAndDelete({ _id: id });

  if (!companyDetails) {
    return NextResponse.json(
      { error: 'Unable to delete the company' },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Company details deleted successfully',
  });
}
