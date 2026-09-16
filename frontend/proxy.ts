import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "./env";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const newURL = new URL(url.pathname.replace(/^\/api/, ""), api);
  newURL.search = url.search;

  return NextResponse.rewrite(newURL);
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: "/api/:path*",
};
