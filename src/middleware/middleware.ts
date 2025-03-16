import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get('token')?.value
  const isAuthenticated = !!token
  const isPositionsRoute = request.nextUrl.pathname.startsWith('/positions')
  
  // If accessing /positions routes and not authenticated, redirect to login
  if (isPositionsRoute && !isAuthenticated) {
    // Store the original URL to redirect back after login
    const url = new URL('/signin', request.url)
    url.searchParams.set('redirectUrl', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: ['/positions/:path*'],
}