import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Define the routes you want to protect
  const protectedRoutes = ["/projects", "/projects/*", "/addAdmin"];

  // Check if the current request is for a protected route
  const url = req.nextUrl.clone();
  const isProtectedRoute = protectedRoutes.some((route) => new RegExp(`^${route.replace("*", ".*")}$`).test(url.pathname));

  if (isProtectedRoute) {
    // Get the token from the request
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    console.log("tokennnnnnnnnnnnnnn", token);

    // If no token is found, redirect to login
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Allow the request if it's not a protected route or if a token is found
  return NextResponse.next();
}

export const config = { matcher: ["/projects/:path*", "/addAdmin"] };
