import { z } from "zod";

export const signupInput = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
});

export const signinInput = z.object({
  email: z.email(),
  password: z.string().min(6),
});
