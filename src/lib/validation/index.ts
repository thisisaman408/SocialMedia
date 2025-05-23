import { z } from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name is too short",
    })
    .max(50, {
      message: "Name is too long",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username is too short",
    })
    .max(50, {
      message: "Username is too long",
    }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password is too short",
  }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password is too short",
  }),
});

export const CreatePostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});
