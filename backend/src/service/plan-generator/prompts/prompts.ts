


export function skillGenerationprompts(currentSkills: string[], goal: string, level: string): { SYSTEM: string, USER: string } {

    const SYSTEM = `you are a smart agent for generating skill for a particular role 
                 -you have a access to current skills and goals and level.
                 -current skill is array<string>
                 -goal is the user goal to become 
                 -generate target skills as per the defined schema array<string>`

    const USER = `Generate a required skills to become ${goal} at ${level}
                - my current skills are ${currentSkills}
                -generate as per the required schema do not provide unnecessary things only provide skill with required schema`

    return { SYSTEM, USER };

}
export function planGenerationPrompts(targetSkills: string[], currentSkills: string[], goal: string, level: string, timeperDay: number): { SYSTEM: string, USER: string } {

    const SYSTEM = `
          you are smart plan generator assistant
          
          you have a access to following things-
          currentSkills[]- skills that user already know
          goal- user goal to become
          targetSkills[]-target skill required to achieve goals
          timeperDay-time user have per day
          level-level that user wants to achieve 
           
          -generate a daywise plan as per the timeperday ${timeperDay}.
          -first day of plam should be the revision of already know skills ${currentSkills}
          - make sure plan should match the schema 
          -make sure plan should be according to the mention level and time per days ${timeperDay} ${level}. 
          -make sure to give plan according to the level and numbers of days give for particular topic to learn should be valid according to normmal student learning patterns.
          -make sure each day should be independent day and do not give interva.
          -In the explanation metion topics that learner needs to learn.
    
    `
    const USER = `
     generate a daywise plan. you have a acess to the following things -
     goal- user wants to achieve
     targetskills-target that user wants to achieve
     level-level that user wants to achieve
     currentSkills-skills that user already knows 
     timeperDay-time in hour user have per day
     
     -generate a proper plan with mentioned details 
     ${targetSkills} ${currentSkills} ${timeperDay} ${goal} ${level}`

    return { SYSTEM, USER };
}