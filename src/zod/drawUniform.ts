import { z } from "zod";

export const drawUniformSchema = z.object({
  id: z.number(),
  staffId: z.number(),
  shirtId: z.number(),
  pantsId: z.number(),
  dateTimeReturn: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type DrawUniformSchema = z.infer<typeof drawUniformSchema>;