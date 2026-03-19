import createMiddleware from 'next-intl/middleware';
import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest } from 'next/server'
import { routing } from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Apply intl middleware
  const intlResponse = intlMiddleware(request);
  
  // Apply session update
  const sessionResponse = await updateSession(intlResponse as NextRequest);
  
  return sessionResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
