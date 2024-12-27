import { z } from "zod";

export const yearlyReportSchema = z.object({
    uniformType: z.string(),
    topBottom: z.string(),
    size: z.number(),
    rack: z.string(),
    row: z.string(),
    gender: z.string(),
    deleteReason: z.string(),
    dateOfDisposal: z.string(),
});

export type YearlyReportSchema = z.infer<typeof yearlyReportSchema>;