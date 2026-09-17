import { NextResponse } from 'next/server';
import { MOCK_USERS } from '../../../../utils/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_USERS
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    return NextResponse.json({
      success: true,
      data: { id: Date.now(), enabled: true, ...body }
    });
  } catch {
    return NextResponse.json({ success: true, data: { id: Date.now() } });
  }
}
