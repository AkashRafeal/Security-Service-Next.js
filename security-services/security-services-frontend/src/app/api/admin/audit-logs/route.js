import { NextResponse } from 'next/server';
import { MOCK_AUDIT_LOGS } from '../../../../utils/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_AUDIT_LOGS
  });
}
