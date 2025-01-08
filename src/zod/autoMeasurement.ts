import { z } from "zod";

// TODO: Change the keys into the real one
export const autoMeasurementSchema = z.object({
  SL: z.string(),
  S: z.string(),
  CL: z.string(),
  W: z.string(),
  PL: z.string(),
});

export type AutoMeasurementSchema = z.infer<typeof autoMeasurementSchema>;