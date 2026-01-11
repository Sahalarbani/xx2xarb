import { auth } from "./auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardPage && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  // Matcher for all routes except static files and images
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};