import { NextResponse } from 'next/server';
import { MOCK_ADMIN_STATS } from '../../../../../utils/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_ADMIN_STATS
  });
}
