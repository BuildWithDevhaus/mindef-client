import { z } from "zod";

export const staffSchema = z.object({
  nricNo: z.string(),
  name: z.string(),
  division: z.string(),
  gender: z.string(),
  shoulderLen: z.number().optional(),
  sleeve: z.number().optional(),
  collarLen: z.number().optional(),
  waist: z.number().optional(),
  length: z.number().optional(),
});

export type StaffSchema = z.infer<typeof staffSchema>;