export default function getInitialState(pathData:any) {
    return {
        userId: String(pathData?.userId),
        goal: pathData.goal,
        level: pathData.level,
        timePerDay: pathData.timePerDay,
        currentSkills: pathData.currentSkills ?? [],
        targetSkills: pathData.targetSkills,
        missingSkills: pathData.missingSkills ?? [],
        learningPath: pathData.learningPath,
        status: "init",
    };
}
