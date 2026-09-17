import { NextResponse } from 'next/server';
import { MOCK_SERVICES } from '../../../../../utils/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_SERVICES.slice(0, 3)
  });
}
