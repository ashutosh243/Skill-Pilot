import { z } from 'zod';

export const question = z.object({ que: z.string(), ans: z.string()});
export const allquestion=z.object({ que: z.string(), ans: z.string(),type:z.string()})
export const State = z.object({

    role: z.string().min(2),
    technology: z.array(z.string()),
    experience: z.number(),
    questionWeb: z.array(question).optional().default([]),
    questionAi: z.array(question).optional().default([]),
    allquestion:z.array(allquestion).optional().default([]),
    websearch: z.string().optional(),
    decision: z.boolean().optional(),
    searchQuery: z.string().optional(),
    message: z.string().optional()

})
export type State = z.infer<typeof State>;