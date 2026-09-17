import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};
    const uname = (username || '').toLowerCase().trim();

    if (uname === 'admin') {
      return NextResponse.json({
        success: true,
        message: 'Admin authenticated successfully',
        data: {
          id: 1,
          username: 'admin',
          email: 'admin@abcsecurity.com',
          fullName: 'Chief Operations Commander (Admin)',
          roles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_STAFF'],
          token: `demo-jwt-token-admin-${Date.now()}`
        }
      });
    }

    if (uname === 'user') {
      return NextResponse.json({
        success: true,
        message: 'Client authenticated successfully',
        data: {
          id: 2,
          username: 'user',
          email: 'client@horizon.com',
          fullName: 'Sarah Jenkins (Client)',
          roles: ['ROLE_USER', 'ROLE_CLIENT'],
          token: `demo-jwt-token-user-${Date.now()}`
        }
      });
    }

    // Any other credentials in demo deployment
    return NextResponse.json({
      success: true,
      message: 'Authenticated successfully in demo session',
      data: {
        id: Date.now(),
        username: username || 'demo_user',
        email: `${username || 'demo'}@abcsecurity.com`,
        fullName: username || 'Demo User',
        roles: ['ROLE_USER', 'ROLE_CLIENT'],
        token: `demo-jwt-token-${username || 'demo'}-${Date.now()}`
      }
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Authentication processing failed' },
      { status: 200 }
    );
  }
}
