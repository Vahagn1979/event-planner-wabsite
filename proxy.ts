// import { NextRequest } from "next/server";

import { NextRequest, NextResponse } from "next/server";

function isServerActionPost(request: NextRequest) {
    if(request.method !== "POST") return false;
    const h = request.headers;
    return Boolean(h.get("Next-Action") ?? h.get("next-action"));
}

export default async function proxy(request: NextRequest) {
    if (isServerActionPost(request)) {
        return NextResponse.next();
    }
    
    const { auth } = await import("@/lib/auth/server")
    return auth.middleware({loginUrl: "/auth/sign-in"})(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api
         * - _next/static
         * - _next/image
         * - favicon.ico
         */
        // "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/dashboard/:path*",
        "/events/:path*"
    ],
};