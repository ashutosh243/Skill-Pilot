import { z } from 'zod';

export interface PathFormData {
    goal: string;
    timePerDay: number;
    level: "beginner" | "intermediate" | "advanced" | "";
    currentSkills: string[];
}
export interface QuestionItem {
  que: string;
  ans: string;
  type: "web" | "ai";
}
export const learningDaySchema = z.object({
    day: z.string().min(1, "Day is required"),
    heading: z.string().min(1, "Heading is required"),
    explanation: z.string().min(1, "Explanation is required"),
    completed: z.boolean().optional().default(false),
    reminderSent: z.boolean().optional().default(false),
});
export type lerningDaySchemaT=z.infer<typeof learningDaySchema>

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
});

export type pathBodyT = z.infer<typeof pathBody>
