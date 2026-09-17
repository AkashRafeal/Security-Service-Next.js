import { NextResponse } from 'next/server';
import { MOCK_PROJECTS } from '../../../../utils/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_PROJECTS
  });
}
