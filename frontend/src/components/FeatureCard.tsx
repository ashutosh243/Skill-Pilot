// src/components/FeatureCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";

type FeatureCardProps = {
  title: string;
  description: string;
  image: string;
  link?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  return (
    <div
      className={`
        ${theme.colors.cardBg} 
        ${theme.spacing.cardPadding}
        rounded-2xl 
        border border-white/10
        bg-linear-to-br from-white/5 to-transparent
        backdrop-blur-sm
        shadow-lg shadow-black/5
        hover:shadow-xl hover:shadow-black/10
        hover:-translate-y-1
        transition-all duration-300 ease-out
        overflow-hidden
        flex flex-col md:flex-row gap-6 md:gap-8 items-center
      `}
    >
      {/* Image Section */}
      <div className="w-full md:w-5/12 lg:w-1/3 flex justify-center shrink-0">
        <div className="relative w-full aspect-4/3 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 space-y-4 md:space-y-5 text-center md:text-left">
        <h3
          className={`
            text-2xl md:text-3xl 
            font-bold tracking-tight 
            ${theme.colors.text}
          `}
        >
          {title}
        </h3>
        <p
          className={`
            text-base md:text-lg leading-relaxed 
            ${theme.colors.subText}
          `}
        >
          {description}
        </p>

        {link && (
          <Link
            to={link}
            className={`
              inline-flex items-center gap-2
              ${theme.colors.accent} 
              font-semibold text-sm md:text-base
              hover:underline underline-offset-4
              transition-all duration-200
            `}
          >
            Explore <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;