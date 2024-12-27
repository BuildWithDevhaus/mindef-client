import { z } from "zod";

export const monthlyReportSchema = z.object({
    name: z.string(),
    division: z.string(),
    uniformType: z.string(),    
    top: z.number(),
    bottom: z.string(),
    Gender: z.string(),
    dateOfDrawing: z.string(),
    dateOfReturn: z.string(),
});

export type MonthlyReportSchema = z.infer<typeof monthlyReportSchema>;