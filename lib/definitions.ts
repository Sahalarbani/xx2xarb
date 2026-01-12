import { z } from 'zod';

export const SkinSchema = z.object({
  title: z.string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100),
  description: z.string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  
  // ✅ FIX 1: Ganti jadi 'image' (bukan imageUrl)
  image: z.string().min(1, { message: "Image URL is required." }),

  downloadUrl: z.string()
    .min(1, { message: "Download URL is required." }), // Boleh hapus .url() kalau mau fleksibel
    
  // ✅ FIX 2: Ganti enum jadi string biasa (biar bisa Custom Category)
  category: z.string().min(1, { message: "Please enter a valid category." }),
  
  published: z.coerce.boolean(),
});

export type SkinFormState = {
  errors?: {
    title?: string[];
    description?: string[];
    image?: string[];      // ✅ FIX 3: Ini juga ganti jadi 'image'
    downloadUrl?: string[];
    category?: string[];
    published?: string[];
  };
  message?: string | null;
};
