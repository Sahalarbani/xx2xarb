import NextAuth from "next-auth";
import { auth } from "./auth";

export default NextAuth(auth).auth;

export const config = {
  // Logic matcher ini sudah benar, pertahankan
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
