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