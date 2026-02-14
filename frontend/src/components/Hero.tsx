// src/components/Hero.tsx
import React from "react";
import { theme } from "../theme";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  const scrollToLearn = () => {
    console.log("clicked");
    document.getElementById('features')?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <section className={`${theme.colors.heroBg} ${theme.spacing.heroHeight} flex items-center`}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Master Your Career with SkillPilot
        </h1>
        <p className={`${theme.colors.subText} text-xl mb-8`}>
          Plan your career path, practice interviews questions, and prepare pdf notes in one place.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to='/path-generate'> <button className={` px-6 prounded-lg f rounded-lg bg-linear-to-r from-teal-700 to-teal-500 text-white py-3 text-sm font-semibold shadow-md hover:from-teal-900 hover:to-teal-900 cursor-pointer`}>
            Get Started
          </button>
          </Link>
          <button onClick={scrollToLearn} className={`${theme.colors.accent} border border-indigo-500 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition cursor-pointer`}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
