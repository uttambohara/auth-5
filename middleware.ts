import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_SUCCESS_REDIRECT,
  authRoutes,
  prefixAuthApiRoute,
  publicRoutes,
} from "./routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const prefixApiRoute = pathname.startsWith(prefixAuthApiRoute);

  if (prefixApiRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_SUCCESS_REDIRECT, req.nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
