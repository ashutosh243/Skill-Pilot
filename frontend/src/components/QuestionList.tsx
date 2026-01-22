import React, { useState } from "react";
import type { QuestionItem } from "../types/types";
import QuestionSkeleton from "./LearningPathSkeleton";

interface QuestionListProps {
    data: QuestionItem[] | null;
    isLoading: boolean;

}
const QuestionList: React.FC<QuestionListProps> = ({
    data,
    isLoading,
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (isLoading) {
        return <QuestionSkeleton />;
    }

    if (!data || data.length === 0) {
        return (
            <p className="text-gray-500 text-center">
                No questions generated yet.
            </p>
        );
    }

    const toggleAnswer = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className="space-y-6  bg-linear-to-br from-teal-100 to-teal-50 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-700 text-center">
                Top Interview Questions
            </h2>
            {data.map((item, index) => (
                <div
                    key={index}
                    className="rounded-xl border border-gray-200  bg-white p-6 shadow-sm hover:shadow-md transition"
                >

                    <div className="flex items-start justify-between gap-4 mb-4">

                        <h3 className="text-lg font-semibold text-gray-800 max-w-[85%] leading-snug">
                            {index + 1}. {item.que}
                        </h3>

                        <span
                            className={`text-xs px-2 py-1 rounded-full font-medium shrink-0
                                ${item.type === "ai"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-blue-100 text-blue-700"
                                }`}
                        >
                            {item.type.toUpperCase()}
                        </span>
                    </div>


                    <button
                        onClick={() => toggleAnswer(index)}
                        className="cursor-pointer
 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
                    >
                        {openIndex === index ? "Hide Answer" : "Show Answer"}
                    </button>


                    <div className={`mt-4 overflow-hidden transition-all duration-300
                            ${openIndex === index
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                    >
                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                            {item.ans}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QuestionList;
