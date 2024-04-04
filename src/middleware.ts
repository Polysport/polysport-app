import { NextResponse, NextRequest } from "next/server";
import { IS_PROD } from "./configs";

export function middleware(request: NextRequest) {
    const notAllowedPaths = IS_PROD ? ["/mint", "/game"] : [];

    if (notAllowedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// export const config = {
//     matcher: ["/game/:path*", "/mint/:path*"],
// };
