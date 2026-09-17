import { NextResponse } from 'next/server';
import { MOCK_GALLERY } from '../../../../utils/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_GALLERY
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    return NextResponse.json({
      success: true,
      data: { id: Date.now(), ...body }
    });
  } catch {
    return NextResponse.json({ success: true, data: { id: Date.now() } });
  }
}
