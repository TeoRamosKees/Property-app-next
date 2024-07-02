import { NextRequest } from "next/server";
import { updateSession } from "./lib";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const currentSession = cookies().get('session')?.value;
 
  if (currentSession && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard/properties', request.url))
  }
 
  if (!currentSession && (!request.nextUrl.pathname.startsWith('/login') || !request.nextUrl.pathname.startsWith('/signup')) ) {
    return Response.redirect(new URL('/login', request.url))
  }

  return await updateSession(request);
}