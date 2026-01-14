"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// ✅ Schema Validation
const ManualSkinSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
  image: z.string().url("URL Gambar harus valid (https://...)"),
  downloadUrl: z.string().url("URL Download harus valid (https://...)"),
  category: z.string().min(1, "Pilih salah satu kategori"),
  published: z.boolean().default(true),
});

// ---------------------------------------------------------
// 1️⃣ CREATE SKIN (Upload Baru)
// ---------------------------------------------------------
export async function createSkin(prevState: any, formData: FormData) {
  const session = await auth();

  // Cek Role Admin
  if (!session?.user || session.user.role !== "admin") {
    return { message: "Access Denied: Unauthorized Operator." };
  }

  // Proses Validasi
  const validatedFields = ManualSkinSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"), 
    downloadUrl: formData.get("downloadUrl"),
    category: formData.get("category"),
    published: formData.get("published") === "true",
  });

  // Kalau Validasi Gagal, Kirim Error ke UI
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data Integrity Violation: Validation Failed.",
    };
  }

  const { title, description, image, downloadUrl, category, published } = validatedFields.data;

  try {
    await prisma.skin.create({
      data: {
        title,
        description,
        image,
        downloadUrl,
        category,
        published,
        author: session.user.name || "Anonymous", // Sesuai schema prisma lu
      },
    });
  } catch (error) {
    console.error("[DATABASE_ERROR]:", error);
    return { message: "System Failure: Database Connection Failed." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/");
  redirect("/dashboard");
}

// ---------------------------------------------------------
// 2️⃣ DELETE SKIN (Hapus Data)
// ---------------------------------------------------------
export async function deleteSkin(id: string) {
  const session = await auth();
  
  // Cek Role Admin
  if (!session?.user || session.user.role !== "admin") {
    return { message: "Security Breach: Unauthorized Destructive Attempt." };
  }

  try {
    await prisma.skin.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
    revalidatePath("/");
    return { message: "Asset Terminated Successfully." };
  } catch (error) {
    console.error("[DELETE_ERROR]:", error);
    return { message: "Operation Failed: Deletion Sequence Interrupted." };
  }
}

// ---------------------------------------------------------
// 3️⃣ INCREMENT DOWNLOAD (Counter Download Otomatis)
// ---------------------------------------------------------
export async function incrementDownload(id: string) {
  try {
    await prisma.skin.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });
    // Refresh semua halaman biar angkanya update real-time
    revalidatePath("/"); 
    revalidatePath(`/skin/${id}`);
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("[DOWNLOAD_COUNT_ERROR]:", error);
  }
}
