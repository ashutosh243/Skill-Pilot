import React, { useState } from "react";
import { theme } from "../theme";

interface InterviewData {
  technology: string[];
  role: string;
  experience: number;
  message?: string;
}

interface InterviewSidebarProps {
  onGenerate: (data: InterviewData) => void;
}

const InterviewSidebar: React.FC<InterviewSidebarProps> = ({ onGenerate }) => {
  const [formData, setFormData] = useState<InterviewData>({
    technology: [],
    role: "",
    experience: 0,
    message: "",
  });

  const handleChange = (
    field: keyof InterviewData,
    value: string | number | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerate = () => {
     if(formData.technology.length==0||!formData.role||!formData.experience){
      alert("Fill details to generate questions ");
      return;
     }
    onGenerate({
      ...formData,
      message: formData.message?.trim() || "",
    });
    setFormData({
      technology: [],
      role: "",
      experience: 0,
      message: "",
    });
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 " +
    "placeholder-gray-400 shadow-sm transition " +
    "focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none";

  return (
    <aside className="w-1/4 bg-white border-l border-gray-200 p-8 h-screen fixed right-0 top-0 z-10 py-24 space-y-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800">
        Generate Interview Questions
      </h2>

    
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">
          Technologies
        </label>
        <textarea
          rows={3}
          placeholder="React, Node.js, MongoDB"
          value={formData.technology.join(", ")}
          onChange={(e) =>
            handleChange(
              "technology",
              e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            )
          }
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">
          Role
        </label>
        <textarea
          rows={2}
          placeholder="Frontend Developer"
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

    
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">
          Experience (Years)
        </label>
        <input
          type="number"
          min={0}
          value={formData.experience}
          onChange={(e) =>
            handleChange("experience", Number(e.target.value))
          }
          className={inputClass}
        />
      </div>

      {/* Optional Message */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">
          Additional Instructions (Optional)
        </label>
        <textarea
          rows={3}
          placeholder="Focus more on system design, advanced React, etc."
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className={` cursor-pointer
 w-full rounded-xl ${theme.colors.primary}
        text-white py-3 text-sm font-semibold shadow-md 
        hover:from-blue-700 hover:to-indigo-700 
        active:scale-[0.98] transition`}
      >
        Generate Questions
      </button>
    </aside>
  );
};

export default InterviewSidebar;
