import type { pathBodyT } from "../types/types";

interface LearningPathUIProps {
  learningPathData: pathBodyT | null;
  decision?: (choice: "save" | "regenerate" | "discard") => void,
  choice?: string
}

const LearningPathUI: React.FC<LearningPathUIProps> = ({
  learningPathData,
  decision,
  choice
}) => {
  if (!learningPathData) {
    return (
      <div className=" text-center text-gray-500">
        No learning path available
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl shadow-xl p-8  mx-auto">

      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-indigo-700">
          AI Generated Learning Roadmap
        </h2>
        <p className="mt-2 text-gray-600">
          Goal:{" "}
          <span className="font-semibold capitalize text-gray-800">
            {learningPathData.goal}
          </span>
        </p>
      </div>

      {/* Roadmap */}
      <div className="relative pl-8">

        {/* Vertical Line */}
        <div className="absolute left-3 top-0 h-full w-1 bg-gradient-to-b from-indigo-400 via-blue-400 to-indigo-300 rounded-full" />

        <div className="space-y-10">
          {learningPathData.learningPath?.map((item, index) => (
            <div key={index} className="relative flex gap-6">

              {/* Milestone Dot */}
              <div className="relative z-10">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                  {index + 1}
                </div>
              </div>

              {/* Card */}
              <div className="bg-white rounded-xl border border-indigo-100 p-5 shadow-md w-full hover:shadow-lg transition">
                <p className="text-xs font-medium text-indigo-500">
                  {item.day}
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  {item.heading}
                </h3>

                <p className="text-gray-600 mt-2 leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      {choice!==undefined&&choice !== 'save' && (<div className="flex justify-center gap-4 mt-12">
        <button
          className="cursor-pointer
px-5 py-2.5 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition"
          onClick={() => decision?.('regenerate')}
        >
          Regenerate
        </button>

        <button
          className=" cursor-pointer
px-5 py-2.5 rounded-lg border border-red-500 text-red-500 font-medium hover:bg-red-50 transition"
          onClick={() => decision?.('discard')}
        >
          Discard
        </button>

        <button
          onClick={() => decision?.('save')}
          className="cursor-pointer
px-5 py-2.5 rounded-lg bg-teal-500 text-white font-medium hover:bg-indigo-700 transition shadow"
        >
          Save Roadmap
        </button>
      </div>)}
    </div>
  );
};

export default LearningPathUI;
