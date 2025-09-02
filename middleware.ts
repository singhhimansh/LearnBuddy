import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./server/supabase/middleware";

const AUTH_EXCLUDE_PATHS = ["/api/auth"];
export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // const bypass = Boolean(
    //   parseInt(process.env.NEXT_PUBLIC_AUTHENTICATION_BYPASS!),
    // );

    // Only check API routes starting with /api/ except excluded routes
    if (
      !pathname.startsWith("/api/") ||
      AUTH_EXCLUDE_PATHS.includes(pathname)
    ) {
      return NextResponse.next();
    }

    return await updateSession(request);
  } catch (error: any) {
    console.error(" Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
  // runtime: "nodejs",
};
