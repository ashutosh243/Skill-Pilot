// src/pages/Home.tsx
import React from "react";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import { theme } from "../theme";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div className={`${theme.colors.background} min-h-screen`}>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className={`text-3xl font-bold mb-10 text-center ${theme.colors.text}`}>
          Explore Our Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Career Path Planner"
            description="Plan your career roadmap with expert guidance and track your progress."
            link="/path-generate"
          />
          <FeatureCard
            title="Interview Question Lab"
            description="Practice real interview questions and improve your problem-solving skills."
            link="/interview-question"
          />
          <FeatureCard
            title="Resume Prep"
            description="Get your resume ready with tips and AI assistance."
             link="/interview"
          />
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Home;
