// import { NextRequest, NextResponse } from 'next/server';

// // CORS headers allowing only the Swagger UI origin
// const corsHeaders = {
//   'Access-Control-Allow-Credentials': 'true',
//   'Access-Control-Allow-Origin': 'http://localhost:18512', // Default port of the Swagger UI server
//   'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
//   'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
// };

// export function middleware(request: NextRequest) {
//     console.log('Middleware applied');
//   if (request.method === 'OPTIONS') {
//     return new NextResponse(null, { headers: corsHeaders });
//   }

//   const response = NextResponse.next();
//   response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);
//   response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
//   response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
//   response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
//   return response;
// }

// export const config = {
//   matcher: '/api/:path*', // Apply middleware to all API routes
// };

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
