import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value;
    const { pathname } = req.nextUrl;

    // Public routes that don't require authentication
    const publicPaths = ["/", "/splash", "/auth", "/language-selection", "/role-selection"];
    const isPublicRoute = publicPaths.includes(pathname) 
        || pathname.startsWith("/api") 
        || pathname.startsWith("/_next")
        || pathname.startsWith("/setup")
        || pathname.startsWith("/kyc");

    // Static asset paths — always allow
    const isStaticAsset = pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|css|js|json)$/);
    if (isStaticAsset) {
        return NextResponse.next();
    }

    // If trying to access protected route without token, redirect to /auth
    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }

    // If authenticated and trying to access /auth, redirect to /splash
    if (token && pathname === "/auth") {
        return NextResponse.redirect(new URL("/splash", req.url));
    }

    // Add security headers to all responses
    const response = NextResponse.next();
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    // Add CORS configuration for API routes
    if (pathname.startsWith("/api")) {
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    return response;
}

export const config = {
    // Match all routes except static files
    matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|logo.png).*)" ],
};
