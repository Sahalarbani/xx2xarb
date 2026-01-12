import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ambil sesi user dari server (paling aman & akurat)
  const session = await auth();

  // 🔒 CEK 1: Apakah user sudah login?
  if (!session?.user) {
    // Kalau belum, lempar ke halaman login Google
    // callbackUrl=/dashboard artinya: habis login, balikin lagi ke sini
    redirect("/api/auth/signin?callbackUrl=/dashboard");
  }

  // 🔒 CEK 2: Apakah role-nya ADMIN?
  // (Pastikan huruf besar 'ADMIN' sesuai database lu)
  if (session.user.role !== "admin") {
    // Kalau user biasa iseng coba masuk, tendang ke Home
    redirect("/");
  }

  // ✅ Kalau lolos dua cek di atas, baru boleh lihat isinya
  return (
    <>
      {children}
    </>
  );
}
