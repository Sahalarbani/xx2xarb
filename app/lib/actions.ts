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

// 1. CREATE SKIN
export async function createSkin(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") return { message: "Access Denied: Unauthorized Operator." };

  const validatedFields = ManualSkinSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    downloadUrl: formData.get("downloadUrl"),
    category: formData.get("category"),
    published: formData.get("published") === "true",
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors, message: "Data Integrity Violation: Validation Failed." };
  }

  const { title, description, image, downloadUrl, category, published } = validatedFields.data;

  try {
    await prisma.skin.create({
      data: { title, description, image, downloadUrl, category, published, author: session.user.name || "Anonymous" },
    });
  } catch (error) {
    console.error("[DATABASE_ERROR]:", error);
    return { message: "System Failure: Database Connection Failed." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/");
  redirect("/dashboard");
}

// 2. DELETE SKIN
export async function deleteSkin(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") return { message: "Security Breach: Unauthorized Destructive Attempt." };

  try {
    await prisma.skin.delete({ where: { id } });
    revalidatePath("/dashboard");
    revalidatePath("/");
    return { message: "Asset Terminated Successfully." };
  } catch (error) {
    return { message: "Operation Failed: Deletion Sequence Interrupted." };
  }
}

// 3. INCREMENT DOWNLOAD
export async function incrementDownload(id: string) {
  try {
    await prisma.skin.update({ where: { id }, data: { downloads: { increment: 1 } } });
    revalidatePath("/");
    revalidatePath(`/skin/${id}`);
    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
  }
}

// 4. UPDATE SKIN
export async function updateSkin(id: string, prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") return { message: "Access Denied." };

  const validatedFields = ManualSkinSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    downloadUrl: formData.get("downloadUrl"),
    category: formData.get("category"),
    published: formData.get("published") === "true",
  });

  if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors, message: "Update Failed." };
  const { title, description, image, downloadUrl, category, published } = validatedFields.data;

  try {
    await prisma.skin.update({
      where: { id },
      data: { title, description, image, downloadUrl, category, published },
    });
  } catch (error) {
    return { message: "System Failure: Update Sequence Failed." };
  }
  revalidatePath("/dashboard");
  revalidatePath("/");
  redirect("/dashboard");
}

// 5. PRESETS (FITUR BARU)
export async function getPresets() {
  const session = await auth();
  if (!session?.user) return [];
  try {
    return await prisma.descriptionPreset.findMany({ orderBy: { createdAt: 'desc' } });
  } catch (error) { return []; }
}

export async function savePreset(name: string, content: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") return { success: false, message: "Unauthorized" };
  if (!name || !content) return { success: false, message: "Empty Data" };
  try {
    await prisma.descriptionPreset.create({ data: { name, content } });
    return { success: true, message: "Preset Saved" };
  } catch (error) { return { success: false, message: "DB Error" }; }
}

export async function deletePreset(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") return { success: false, message: "Unauthorized" };
  try {
    await prisma.descriptionPreset.delete({ where: { id } });
    return { success: true, message: "Preset Deleted" };
  } catch (error) { return { success: false, message: "Delete Failed" }; }
}
