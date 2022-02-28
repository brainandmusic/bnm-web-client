import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";
import { roleConfig } from "lib/roleConfig";

export default withAuth(
  function middleware(req, ev) {
    const { pathname } = req.nextUrl;
    if (pathname == "/") {
      return NextResponse.redirect(
        new URL(roleConfig[req.nextauth.token.role][0].route, req.url)
      );
    }
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/signin",
      error: "/auth/error",
    },
  }
);
