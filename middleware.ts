import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log({ req });
  if (!session) {
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      return new Response(JSON.stringify({ message: "No autorizado" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const validRoles = ["admin", "super-user", "SEO"];

  if (
    req.nextUrl.pathname.startsWith("/admin") &&
    !validRoles.includes(session.user.role)
  ) {
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      return new Response(JSON.stringify({ message: "No autorizado" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/checkout/address",
    "/checkout/summary",
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
