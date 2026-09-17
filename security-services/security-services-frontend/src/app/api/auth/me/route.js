import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      id: 1,
      username: 'admin',
      email: 'admin@abcsecurity.com',
      fullName: 'Chief Operations Commander (Admin)',
      roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_STAFF'],
      token: 'demo-jwt-token-admin'
    }
  });
}
