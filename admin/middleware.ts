import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Belt-and-suspenders with robots.ts and the layout's robots meta tag — this
// header is what actually stops a search engine indexing a page even if it
// somehow gets linked/crawled before robots.txt is respected.
function withNoIndexHeader(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("axon_admin_token")?.value;
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      return withNoIndexHeader(NextResponse.redirect(loginUrl));
    }
  }

  return withNoIndexHeader(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
