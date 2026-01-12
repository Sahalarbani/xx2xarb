import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // Import yang RINGAN

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
