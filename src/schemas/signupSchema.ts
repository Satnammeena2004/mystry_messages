import { z } from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(2, "usernam atleast 2 character")
    .max(14, "username not more than 20 characters")
    .regex(/^[a-zA-z0-9_]+$/, "No special character in username"),
  email: z.string().email(),
  password: z.string().min(6, "minimum 6 character"),
});
