import { z } from "zod";

export const UserNameSchema_ZOD = z
  .string()
  .min(4, "usernam atleast 2 character")
  .max(14, "username not more than 20 characters")
  .regex(/^[a-zA-z0-9_]+$/, "No special character in username");



export const SignUpSchema_ZOD = z.object({
  username: UserNameSchema_ZOD,
  email: z.string().email(),
  password: z.string().min(6, "minimum 6 character"),
});
