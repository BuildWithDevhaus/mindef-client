import { z } from "zod";

export const unitWingSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type UnitWingSchema = z.infer<typeof unitWingSchema>;

export const unitWingInputSchema = z.object({
  name: z.string(),
});

export type UnitWingInputSchema = z.infer<typeof unitWingInputSchema>;