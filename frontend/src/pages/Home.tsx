// src/pages/Home.tsx
import React from "react";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import { theme } from "../theme";
import Footer from "../components/Footer";
import path from '../assets/path.jpg';
import interview from '../assets/interview.jpg';
import docs from '../assets/document.jpg';

const Home: React.FC = () => {
  return (
    <div className={`${theme.colors.background} min-h-screen`}>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16  ">
        <h2 className={`text-3xl font-bold mb-10 text-center ${theme.colors.text}`}>
          Explore Our Features
        </h2>

        <div className="grid grid-cols-1  gap-8">
          <FeatureCard
            image={path}
            title="Career Path Planner"
            description="Generate a clear and personalized career roadmap based on your current skills, target role, experience level, and available time. This AI-powered agent adapts the plan dynamically, allowing you to regenerate and refine the roadmap with human-in-the-loop control until you’re fully satisfied. Each plan is broken into practical, achievable steps with suggested skills to focus on, and you can save your finalized roadmap to access, review."
            link="/path-generate"
          />
          <FeatureCard
            image={interview}
            title="Interview Question Lab"
            description="Prepare for interviews with a curated collection of real interview questions sourced from both AI knowledge and web-based research. Generate role-specific and experience-level questions for any technical position, practice structured problem-solving, and understand expected approaches through guided explanations that improve clarity, confidence, and interview readiness."
            link="/interview-question"
          />
          <FeatureCard
            image={docs}
            title="Doc Prep"
            description="Build job-ready resumes and professional documents with AI-powered assistance tailored to your role and experience. Receive intelligent suggestions on content, structure, wording, and formatting, along with actionable improvement tips to strengthen impact, highlight your key strengths, and ensure your profile aligns with modern industry standards and recruiter expectations."
            link="/doc-prep"
          />
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Home;
