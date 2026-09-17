import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, fullName } = body || {};

    return NextResponse.json({
      success: true,
      message: 'Account registered successfully',
      data: {
        id: Date.now(),
        username: username || 'client',
        email: email || 'client@demo.com',
        fullName: fullName || username || 'Demo Client',
        roles: ['ROLE_USER', 'ROLE_CLIENT'],
        token: `demo-jwt-token-client-${Date.now()}`
      }
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 200 }
    );
  }
}
