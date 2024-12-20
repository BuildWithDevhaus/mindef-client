import { z } from "zod";

export const reasonSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type ReasonSchema = z.infer<typeof reasonSchema>;

export const reasonInputSchema = z.object({
  name: z.string(),
});

export type ReasonInputSchema = z.infer<typeof reasonInputSchema>;