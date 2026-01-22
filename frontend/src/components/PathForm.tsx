import { useState } from "react";
import type { PathFormData } from "../types/types";
import axios, { AxiosError } from "axios";
import config from "../config/config";
import { theme } from "../theme";

interface PathFormProps {
    onGenerate: (id: string) => Promise<void>;
}

const PathForm = ({ onGenerate }: PathFormProps) => {
    const [goal, setGoal] = useState<string>("");
    const [timePerDay, setTimePerDay] = useState<number | "">("");
    const [level, setLevel] = useState<PathFormData["level"]>("");
    const [currentSkills, setCurrentSkills] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!goal||!timePerDay||!level){
            alert("Fill details to generate");
            return;
        }
        try {
            const response = await axios.post(
                `${config.backendEndpoint}/api/v1/path/path-details`,
                { goal, level, timePerDay },
                { withCredentials: true }
            );
            const path = await response.data.path;
            if (!response.data.success) {
                alert(response.data.msg);
            }
            onGenerate(path._id);
            setGoal("");
            setTimePerDay("");
            setLevel("");
            setCurrentSkills("");
        }
        catch (e) {
            if (e instanceof AxiosError) {
                alert(e.response?.data.msg);
                return;
            }
            const err = e instanceof Error ? e.message : "Error while saving path data";
            alert(err);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 " +
        "placeholder-gray-400 shadow-sm transition " +
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none";

    return (
        <aside className="w-1/4 bg-white border-l border-gray-200 p-8 h-screen fixed right-0 top-0 z-10 py-24 space-y-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">
                Generate Learning Path
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Goal */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">
                        Goal
                    </label>
                    <input
                        type="text"
                        placeholder="Become MERN Developer"
                        className={inputClass}
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    />
                </div>

                {/* Time Per Day */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">
                        Time per day (hours)
                    </label>
                    <input
                        type="number"
                        placeholder="2"
                        className={inputClass}
                        value={timePerDay}
                        onChange={(e) =>
                            setTimePerDay(
                                e.target.value ? Number(e.target.value) : ""
                            )
                        }
                    />
                </div>

                {/* Level */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">
                        Experience Level
                    </label>
                    <select
                        className={`${inputClass} appearance-none`}
                        value={level}
                        onChange={(e) =>
                            setLevel(
                                e.target.value as PathFormData["level"]
                            )
                        }
                    >
                        <option value="">Select level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                {/* Current Skills */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">
                        Current Skills
                    </label>
                    <textarea
                        rows={4}
                        placeholder="HTML, CSS, JavaScript"
                        className={`${inputClass} resize-none`}
                        value={currentSkills}
                        onChange={(e) => setCurrentSkills(e.target.value)}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className={` cursor-pointer
w-full rounded-xl ${theme.colors.primary}
                    text-white py-3 text-sm font-semibold shadow-md 
                    hover:from-blue-700 hover:to-indigo-700 
                    active:scale-[0.98] transition`}
                >
                    Generate Path
                </button>
            </form>
        </aside>
    );
};

export default PathForm;
