import { NextResponse, type NextRequest } from "next/server";
import { HOST_CANONICAL } from "@/lib/site-hosts";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const preferred = HOST_CANONICAL[host];
  const stripDefaultLang = request.nextUrl.searchParams.get("lang") === "sr";

  if (preferred && preferred !== host) {
    const dest = new URL(request.url);
    dest.protocol = "https:";
    dest.hostname = preferred;
    dest.port = "";
    if (stripDefaultLang) dest.searchParams.delete("lang");
    return NextResponse.redirect(dest, 308);
  }

  if (stripDefaultLang) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("lang");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
