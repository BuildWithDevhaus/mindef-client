import { z } from "zod";
import { drawUniformSchema } from "./drawUniform";

export const shirtSchema = z.object({
  id: z.number(),
  rfidNo: z.string(),
  belongsTo: z.string(),
  uniformType: z.string(),
  gender: z.string(),
  shoulderLen: z.string(),
  sleeve: z.string(),
  collarLen: z.string(),
  row: z.string(),
  rack: z.string(),
  status: z.string(),
  deleteReasonId: z.number().optional(),
  disposalDate: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  drawUniform: z.array(drawUniformSchema),
});

export type ShirtSchema = z.infer<typeof shirtSchema>;

export const shirtInputSchema = z.object({
  rfidNo: z.string(),
  belongsTo: z.string(),
  uniformType: z.string(),
  gender: z.string(),
  shoulderLen: z.string(),
  sleeve: z.string(),
  collarLen: z.string(),
  row: z.string(),
  rack: z.string(),
});

export type ShirtInputSchema = z.infer<typeof shirtInputSchema>;

export const shirtDimensionsSchema = z.object({
  shoulderLen: z.array(z.number()),
  sleeve: z.array(z.number()),
  collarLen: z.array(z.number())
})

export type ShirtDimensionsSchema = z.infer<typeof shirtDimensionsSchema>;