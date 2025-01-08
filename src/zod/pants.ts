import { z } from "zod";
import { drawUniformSchema } from "./drawUniform";

export const pantsSchema = z.object({
  id: z.number(),
  rfidNo: z.string(),
  belongsTo: z.string(),
  uniformType: z.string(),
  gender: z.string(),
  waist: z.string(),
  length: z.string(),
  row: z.string(),
  rack: z.string(),
  status: z.string(),
  deleteReasonId: z.number().optional(),
  disposalDate: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  drawUniform: z.array(drawUniformSchema),
});

export type PantsSchema = z.infer<typeof pantsSchema>;

export const pantsInputSchema = z.object({
  rfidNo: z.string(),
  belongsTo: z.string(),
  uniformType: z.string(),
  gender: z.string(),
  waist: z.string(),
  length: z.string(),
  row: z.string(),
  rack: z.string(),
});

export type PantsInputSchema = z.infer<typeof pantsInputSchema>;

export const pantsDimensionsSchema = z.object({
  waist: z.array(z.number()),
  length: z.array(z.number()),
});

export type PantsDimensionsSchema = z.infer<typeof pantsDimensionsSchema>;

export const pantsBulkInputSchema = z.object({
  "RFID No": z.string().min(1),
  "Belongs To": z.string().min(1),
  "Uniform Type": z.string().min(1),
  Gender: z.enum(['male', 'female', 'Male', 'Female']),
  Waist: z.string().min(1),
  Length: z.string().min(1),
  Row: z.string().min(1),
  Rack: z.string().min(1)
});

export type PantsBulkInput = z.infer<typeof pantsBulkInputSchema>;