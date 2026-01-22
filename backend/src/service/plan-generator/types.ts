import { z } from 'zod';


export const learningDaySchema = z.object({
    day: z.string(),
    heading: z.string(),
    explanation: z.string(),
    completed: z.boolean().default(false),
    reminderSent: z.array(z.number()).default([])
});

export const State = z.object({

    userId: z.string(),
    goal: z.string().min(3, "Goal must be at least 3 characters"),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    timePerDay: z.number(),
    currentSkills: z.array(z.string()).default([]),
    targetSkills: z.array(z.string()).optional(),
    missingSkills: z.array(z.string()).default([]),
    learningPath: z.array(learningDaySchema).optional(),
    decision: z.enum(["save", "regenerate", "discard"]).optional(),
    status: z.string().optional()
})
export type State = z.infer<typeof State>

















