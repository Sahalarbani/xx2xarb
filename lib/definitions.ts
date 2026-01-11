import { z } from 'zod';

export const SkinSchema = z.object({
  title: z.string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100),
  description: z.string()
    .min(10, { message: "Description must be at least 10 characters long." }),
  imageUrl: z.string()
    .url({ message: "Please enter a valid image URL (starting with http/https)." }),
  downloadUrl: z.string()
    .url({ message: "Please enter a valid download URL." }),
  category: z.enum(['racing', 'street', 'drift', 'rally'], {
    errorMap: () => ({ message: "Please select a valid category." }),
  }),
  published: z.coerce.boolean(),
});

export type SkinFormState = {
  errors?: {
    title?: string[];
    description?: string[];
    imageUrl?: string[];
    downloadUrl?: string[];
    category?: string[];
    published?: string[];
  };
  message?: string | null;
};