import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE = 'admin_session';

function makeToken(secret: string) {
  return Buffer.from(`${secret}:authenticated`).toString('base64');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const session  = request.cookies.get(COOKIE)?.value;
  const expected = makeToken(process.env.SESSION_SECRET ?? 'eshan-enterprise-admin-2025');

  if (!session || session !== expected) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
