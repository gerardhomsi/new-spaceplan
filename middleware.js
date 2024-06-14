import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const protectedRoutes = ["/projects", "/projects/*", "/addAdmin"];

  const url = req.nextUrl.clone();
  const isProtectedRoute = protectedRoutes.some((route) => new RegExp(`^${route.replace("*", ".*")}$`).test(url.pathname));

  if (isProtectedRoute) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    console.log("tokennnnnnnnnnnnnnn", token);
    console.log("AUTH_SECRET", process.env.AUTH_SECRET);

    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/projects/:path*", "/addAdmin"] };

// export { auth as middleware } from "@/auth";
