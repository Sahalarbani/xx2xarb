"use server";

import { auth } from "@/auth";
import { SkinSchema, SkinFormState } from "@/lib/definitions";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createSkin(prevState: SkinFormState, formData: FormData) {
  const session = await auth();
  if (!session?.user) return { message: "Access Denied: Unauthorized Operator." };

  const validatedFields = SkinSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    downloadUrl: formData.get("downloadUrl"),
    category: formData.get("category"),
    published: formData.get("published") === "true",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Data Integrity Violation: Validation Failed.",
    };
  }

  const { title, description, imageUrl, downloadUrl, category, published } = validatedFields.data;

  try {
    await prisma.skin.create({
      data: {
        title,
        description,
        imageUrl,
        downloadUrl,
        category,
        published,
        authorId: session.user.id!,
        authorName: session.user.name || "Anonymous Operator",
      },
    });
  } catch (error) {
    console.error("[DATABASE_ERROR]:", error);
    return { message: "System Failure: Deployment to Matrix Failed." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/");
  redirect("/dashboard");
}

export async function deleteSkin(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Security Breach: Unauthorized Destructive Attempt.");

  try {
    await prisma.skin.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
    revalidatePath("/");
    return { message: "Asset Terminated Successfully." };
  } catch (error) {
    console.error("[DATABASE_ERROR]:", error);
    return { message: "Operation Failed: Deletion Sequence Interrupted." };
  }
}