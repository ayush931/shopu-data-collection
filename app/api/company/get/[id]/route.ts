import { connectToDB } from '@/config/dbConnection';
import { verifyToken } from '@/lib/auth.lib';
import Company from '@/models/company.model';
import CompanyName from '@/models/companyName.model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
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

  const company = await Company.findById(id).populate({
    path: 'companyName',
    select: 'name',
    model: CompanyName
  })

  if (!company) {
    return NextResponse.json(
      { error: 'Unable to fetch the detail' },
      { status: 400 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'Fetched the details',
    company
  })
}
