"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ManualSkinSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
  image: z.string().url("URL Gambar harus valid (https://...)"),
  downloadUrl: z.string().url("URL Download harus valid (https://...)"),
  category: z.string().min(1, "Pilih salah satu kategori"),
  published: z.boolean().default(true),
});

export async function createSkin(prevState: any, formData: FormData) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return { message: "Access Denied: Unauthorized Operator." };
  }

  const validatedFields = ManualSkinSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"), 
    downloadUrl: formData.get("downloadUrl"),
    category: formData.get("category"),
    published: formData.get("published") === "true",
  });

  if (!validatedFields.success) {
    // ✅ Mengirim error per kolom agar bisa ditampilkan di UI
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
        author: session.user.name || "Anonymous", // ✅ Sesuai schema.prisma
      },
    });
  } catch (error) {
    console.error("[DATABASE_ERROR]:", error);
    return { message: "System Failure: Deployment to Database Failed." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/");
  redirect("/dashboard");
}
