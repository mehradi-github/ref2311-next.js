"use server";

import { z } from "zod";

export interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});
export const createPost = async (
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> => {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  return { errors: {} };
};
