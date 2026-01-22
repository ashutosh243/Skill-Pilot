// src/components/Hero.tsx
import React from "react";
import { theme } from "../theme";

const Hero: React.FC = () => {
  return (
    <section className={`${theme.colors.heroBg} ${theme.spacing.heroHeight} flex items-center`}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Master Your Career with SkillPilot
        </h1>
        <p className={`${theme.colors.subText} text-lg mb-8`}>
          Plan your career path, practice interviews, and prepare resumes—all in one place.
        </p>
        <div className="flex justify-center space-x-4">
          <button className={`${theme.colors.primary} ${theme.colors.primaryText} px-6 py-3 rounded-lg font-semibold ${theme.colors.buttonHover}`}>
            Get Started
          </button>
          <button className={`${theme.colors.accent} border border-indigo-500 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition`}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
