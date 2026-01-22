import { State } from "../types";

export function webQuestiongenerationPrompt(context: string, state: State): { SYSTEM: string, USER: string } {

    const SYSTEM = `you are smart ai agent who for summarizing the text and generate question and answer based on give schema.
                 -Take care of the following things-
                 -Do not create a extra quetion only generate question only use the given context
                 -do not add extra things and do not use creativity
                 -also you will generate proper 4 to 5 lines answer for each question after extractions`;

    const USER = ` Generate interview question and answer based on the data attached below 
                -use this context for generating the interview question and answer ${context}
                -make sure question should be for role ${state.role} technology ${state.technology} experience ${state.experience}
                -Do not add or generate any extra question from yourself 
                -generate answer of all questions also once extraction job is done`;


    return { SYSTEM, USER };

}
export function aiQuestiongenerationPrompt(state: State): { SYSTEM: string, USER: string } {

    const SYSTEM = `You are an expert AI assistant specialized in generating high-quality interview questions for technical roles. 
                        Your responsibilities:
                        - Generate clear, concise, and modern interview questions for any role, tech stack, and experience level.
                        - Questions should cover:
                        - Core technical concepts
                        - Problem-solving & scenario-based questions
                        - Role-specific tools and frameworks
                        - Avoid duplicates and irrelevant questions.
                        - Questions must be relevant to current industry standards (2025+) and best practices.
                        -provide proper answer for the question for interview`;

    const USER = `Generate interview questions based on the following details:
                    Role: ${state.role}
                    Tech Stack: ${state.technology}
                    Experience Level: ${state.experience}
                
                    Instructions:
                    -Generate fresh, unique questions covering all relevant areas
                    -generate answer of the questions also for interview.
             `;
    return { SYSTEM, USER };

}