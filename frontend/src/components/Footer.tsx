import React from "react";
import { theme } from "../theme";

const Footer: React.FC = () => {
  return (
    <footer className={`${theme.colors.cardBg} border-t`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm">
        
        <span className={theme.colors.subText}>
          © {new Date().getFullYear()} SkillPilot
        </span>

        <span className={theme.colors.subText}>
          Built for focused career growth
        </span>

      </div>
    </footer>
  );
};

export default Footer;
