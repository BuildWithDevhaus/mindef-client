import { z } from "zod";
import { drawUniformSchema } from "./drawUniform";

export const shirtSchema = z.object({
  id: z.number(),
  rfidNo: z.string(),
  belongsTo: z.string(),
  uniformType: z.string(),
  gender: z.string(),
  shoulderLen: z.number(),
  sleeve: z.number(),
  collarLen: z.number(),
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
  shoulderLen: z.number(),
  sleeve: z.number(),
  collarLen: z.number(),
  row: z.string(),
  rack: z.string(),
});

export type ShirtInputSchema = z.infer<typeof shirtInputSchema>;