import { connectToDB } from '@/config/dbConnection';
import { verifyToken } from '@/lib/auth.lib';
import CompayName from '@/models/companyName.model';
import { NextRequest, NextResponse } from 'next/server';
import CacheCompanyModel from '@/models/cacheCompanyName';

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

  await connectToDB();

  // check cache data
  const cacheData = await CacheCompanyModel.findOne({});

  if (cacheData) {
    return NextResponse.json(
      { error: 'Unable to fetch company name details' },
      { status: 400 }
    )
  }

  // fetch the database if not cache
  const companyNameDetails = await CompayName.find({}, 'name').lean(); // Limit fields and use lean for faster query

  if (!companyNameDetails) {
    return NextResponse.json(
      { error: 'Unable to fetch company name details' },
      { status: 400 }
    );
  }

  await CacheCompanyModel.create({
    data: companyNameDetails,
    createdAt: new Date()
  })

  return NextResponse.json({
    success: true,
    message: 'Company name details fetched',
    companyNameDetails,
  });
}
