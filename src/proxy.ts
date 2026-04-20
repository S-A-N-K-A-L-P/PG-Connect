import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAuth = !!token;
        const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

        if (isAuthPage) {
            if (isAuth) {
                // Already authenticated, redirect to appropriate dashboard
                const role = (token as any).role;
                if (role === "PG_OWNER") {
                    return NextResponse.redirect(new URL("/owner/dashboard", req.url));
                }
                return NextResponse.redirect(new URL("/", req.url));
            }
            return NextResponse.next();
        }

        // Role-based protection for owner routes
        const isOwnerRoute = req.nextUrl.pathname.startsWith("/owner");
        if (isOwnerRoute && (token as any).role !== "PG_OWNER") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");
                if (isAuthPage) return true; // Handled in logic above
                
                return !!token;
            },
        },
        pages: {
            signIn: "/login",
        },
    }
);

export const config = {
    matcher: ["/owner/:path*", "/login", "/register"],
};
