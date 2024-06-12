// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   // Define the routes you want to protect
//   const protectedRoutes = ["/projects", "/projects/*", "/addAdmin"];

//   // Check if the current request is for a protected route
//   const url = req.nextUrl.clone();
//   const isProtectedRoute = protectedRoutes.some((route) => new RegExp(`^${route.replace("*", ".*")}$`).test(url.pathname));

//   if (isProtectedRoute) {
//     // Get the token from the request
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//     // If no token is found, redirect to login
//     if (!token) {
//       url.pathname = "/login";
//       return NextResponse.redirect(url);
//     }
//   }

//   // Allow the request if it's not a protected route or if a token is found
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/projects/:path*", "/addAdmin"],
// };

//222222222222//
// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const protectedRoutes = ["/projects", "/projects/*", "/addAdmin"];
//   const url = req.nextUrl.clone();
//   const isProtectedRoute = protectedRoutes.some((route) => new RegExp(`^${route.replace("*", ".*")}$`).test(url.pathname));

//   console.log(`Requesting URL: ${url.pathname}`);
//   if (isProtectedRoute) {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//     console.log(`Token: ${token ? "Found" : "Not Found"}`);
//     if (!token) {
//       console.log("Redirecting to login...");
//       url.pathname = "/login";
//       return NextResponse.redirect(url);
//     }
//     console.log("Token is valid, proceeding to protected route.");
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/projects/:path*", "/addAdmin"],
// };

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req, res) {
  console.log("22222222222222222222222");
  // Add CORS headers
  req.headers.set("Access-Control-Allow-Origin", "*");
  req.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  req.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const protectedRoutes = ["/projects", "/projects/*", "/addAdmin"];
  const url = req.nextUrl.clone();
  const isProtectedRoute = protectedRoutes.some((route) => new RegExp(`^${route.replace("*", ".*")}$`).test(url.pathname));

  console.log(`Requesting URL: ${url.pathname}`);
  if (isProtectedRoute) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(`Token: ${token ? "Found" : "Not Found"}`);
    if (!token) {
      console.log("Redirecting to login...");
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    console.log("Token is valid, proceeding to protected route.");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/projects/:path*", "/addAdmin"],
};
