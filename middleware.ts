import {
  DEFAULT_LOGIN_URL,
  authRoutes,
  prefixAuthApi,
  publicRoutes,
} from "./routes";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isPrefixofApiRoute = pathname.startsWith(prefixAuthApi);

  if (isPrefixofApiRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_URL, req.nextUrl));
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
