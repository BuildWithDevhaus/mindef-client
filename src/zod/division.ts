import { z } from "zod";

export const divisionSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type DivisionSchema = z.infer<typeof divisionSchema>;

export const divisionInputSchema = z.object({
  name: z.string(),
});

export type DivisionInputSchema = z.infer<typeof divisionInputSchema>;