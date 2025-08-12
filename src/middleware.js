import { NextResponse } from "next/server";

export function middleware(req) {
    console.log("Cookies:", req.cookies.get("_customer_token")); // Log the token for debugging purposes
    const protectedRoutes = ["/my-account", "/checkout"];
    const token = req.cookies.get("_customer_token"); // Assuming you store the auth token in cookies

    // Check if the request URL matches any protected route
    if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
        // If no token is found, redirect to the login page
        if (!token) {
            const loginUrl = new URL("/auth/login", req.url);
            console.log("Redirecting to login:", loginUrl.toString());
            return NextResponse.redirect(loginUrl);
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Specify the routes where the middleware should run
export const config = {
    matcher: ["/my-account/:path*", "/checkout/:path*"], // Protect all subpaths
};