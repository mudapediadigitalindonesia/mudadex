import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

const middleware = async (req: NextRequest) => {

  const ip = await fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((res) => res.ip)

  const token = await getToken({
    req,
    secret: process.env.NEXT_PRIVATE_HASH_KEY,
  })
  const { pathname, origin } = req.nextUrl

  if (pathname.startsWith("/api")) {
    // Contoh validasi origin
    const allowedOrigins = ["https://www.nusadex.com", "http://localhost:3000"]
    const allowedIps = ["2a06:98c0:3600::103"]
    if (!allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: `Origin not allowed : ${origin}` },
        { status: 403 },
      )
    }
  }

  if (!token) {
    if (pathname.startsWith("/bot") && pathname !== "/bot/login") {
      return NextResponse.redirect(new URL("/bot/login", req.url))
    }
    return NextResponse.next()
  }

  if (token) {
    if (pathname === "/bot") {
      return NextResponse.redirect(new URL("/bot/dashboard", req.url))
    }

    if (pathname === "/bot/login") {
      return NextResponse.redirect(new URL("/bot/dashboard", req.url))
    }
  }

  return NextResponse.next()
}

export default middleware

export const config = {
  matcher: ["/bot/:path*", "/api/:path*"]
}
