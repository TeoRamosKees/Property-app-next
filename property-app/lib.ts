import { getUser } from "@/app/actions";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { addDays } from "date-fns";
const bcrypt = require('bcrypt');

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24 hours from now")
      .sign(key);
  }

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  // Verify credentials && get the user

  const user = { email: formData.get("email"), password: formData.get("password")};
  if (!user.email || !user.password) {
    return "Faltan datos";
  }
  const dbUser = await getUser(user.email.toString());
    if (!dbUser) {
        return "Datos incorrectos. Intente de nuevo";
    }
  const passwordMatch = await bcrypt.compare(user.password.toString(), dbUser.password);
    if (!passwordMatch) {
        return "Datos incorrectos. Intente de nuevo";
    }

  // Create the session
  const expires = new Date(addDays(new Date(), 1));
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires =  addDays(new Date(), 1) // one day from now
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}