import { z } from "zod";

const usernameSchema = z
  .string()
  .min(3, { message: "username must be 3 characters" })
  .max(14, { message: "username not more than 14 characters" })
  .trim();
const emailSchema = z
  .string()
  .min(12, { message: "email must be 12 characters" })
  .max(30, { message: "username not more than 30 characters" })
  .email({ message: "please enter valid email" });
export const signInSchema = z.object({
  indentifier: z.union([usernameSchema, emailSchema]),
  password: z
    .string()
    .min(5, { message: "password must be 5 characters" })
    .max(25, { message: "password not more than 25 characters" })
    .trim(),
});
