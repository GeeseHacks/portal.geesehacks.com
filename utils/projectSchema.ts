import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, { message: "Project name is required" }).max(20, {
    message: "Description should not be longer than 20 characters",
  }),
  description: z
    .string()
    .min(1, { message: "Project description is required" })
    .max(200, {
      message: "Description should not be longer than 200 characters",
    }),
  devpostLink: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .min(1, { message: "Devpost link is required" })
    .refine((url) => url.startsWith('https://devpost.com/'), {
      message: "URL must be from Devpost (https://devpost.com/)"
    }),
  inviteLink: z
    .string()
    .url({ message: "Please enter a valid invite URL" })
    .optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
