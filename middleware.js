// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const protectedRoutes = ["/projects", "/projects/*", "/addAdmin"];

//   const url = req.nextUrl.clone();
//   const isProtectedRoute = protectedRoutes.some((route) => new RegExp(`^${route.replace("*", ".*")}$`).test(url.pathname));

//   if (isProtectedRoute) {
//     const token = await getToken({ req, secret: process.env.AUTH_SECRET });
//     console.log("tokennnnnnnnnnnnnnn", token);
//   }
//   if (!token) {
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   return NextResponse.next();
// }

// export const config = { matcher: ["/projects/:path*", "/addAdmin"] };
import { getSession } from "next-auth/client"; // Ensure you import the necessary functions
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const protectedRoutes = ["/projects", "/projects/.*", "/addAdmin"];
  const url = req.nextUrl.clone();
  const isProtectedRoute = protectedRoutes.some((route) => new RegExp(`^${route}$`).test(url.pathname));

  if (isProtectedRoute) {
    try {
      // Check session first
      const session = await getSession({ req });
      if (session) {
        // Retrieve token
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });
        if (token) {
          // User is authenticated, continue
          return NextResponse.next();
        }
      }
      // No session or token, redirect to login
      url.pathname = "/login";
      return NextResponse.redirect(url);
    } catch (error) {
      console.error("Authentication error:", error);
      // Redirect to login on error
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // For non-protected routes, continue without modification
  return NextResponse.next();
}
