import { NextResponse } from 'next/server';
import { MOCK_SERVICE_CATEGORIES } from '../../../../utils/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_SERVICE_CATEGORIES
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      data: {
        id: Date.now(),
        ...body,
        slug: body.name?.toLowerCase().replace(/\s+/g, '-')
      }
    });
  } catch {
    return NextResponse.json({ success: true, data: { id: Date.now() } });
  }
}
