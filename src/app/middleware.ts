import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/dashboard')) {
    const session = await auth();

    // If not logged in OR not an ADMIN → redirect to home
    if (!session || session.user?.role !== 'ADMIN') {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
