import { z } from 'zod';

export const registerBody = z.object({
    name: z.string().trim().min(2, "name is too small"),
    email: z.string().email().trim(),
    password: z.string().trim().min(5)
});
export const loginBody = z.object({
    email: z.string(),
    password: z.string().min(5)
})

export const learningDaySchema = z.object({
    day: z.string().min(1, "Day is required"),
    heading: z.string().min(1, "Heading is required"),
    explanation: z.string().min(1, "Explanation is required"),
    completed: z.boolean().optional().default(false),
    reminderSent: z.boolean().optional().default(false),
});

export const pathBody = z.object({
    goal: z.string().trim(),
    level: z.enum(["beginner", "intermediate", "advanced"]),
    timePerDay: z.number(),
    currentSkills: z.array(z.string()).optional().default([]),
    targetSkills: z.array(z.string()).optional().default([]),
    missingSkills: z.array(z.string()).optional().default([]),
    completedDays: z.array(z.string()).optional().default([]),
    learningPath: z.array(learningDaySchema).optional().default([]),
    startDate: z.coerce.date().optional(),
})


