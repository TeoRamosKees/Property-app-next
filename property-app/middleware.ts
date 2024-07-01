import { NextRequest } from "next/server";
import { updateSession } from "./lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function middleware(request: NextRequest) {
  const currentSession = cookies().get('session')?.value;
 
  if (currentSession && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard/properties', request.url))
  }
 
  if (!currentSession && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }

  return await updateSession(request);
}