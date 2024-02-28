import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  otherRoutes,
  publicRoutes,
} from "@/routes";
import { getCurrentRole } from "./lib/helpers/auth";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isOtherRoute = otherRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const currentRole = await getCurrentRole();

  // if it is api-auth route
  if (isApiAuthRoute) {
    return null;
  }

  // if it is auth route and user is logged in
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // if user not logged in and route is not public route
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // if user is logged in and route is not public route and other route
  if (isLoggedIn && !isPublicRoute && !isOtherRoute) {
    // restrict every users to their roles
    if (currentRole === "seller" && !pathname.startsWith("/seller")) {
      return Response.redirect(new URL(`/`, nextUrl));
    }
    if (currentRole === "buyer" && !pathname.startsWith("/buyer")) {
      return Response.redirect(new URL(`/`, nextUrl));
    }
    if (currentRole === "admin" && !pathname.startsWith("/admin")) {
      return Response.redirect(new URL(`/`, nextUrl));
    }
  }

  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
