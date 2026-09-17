import { NextResponse } from 'next/server';
import { MOCK_CLIENTS } from '../../../../utils/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_CLIENTS
  });
}
