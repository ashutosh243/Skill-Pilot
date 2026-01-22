// src/components/FeatureCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../theme";

type FeatureCardProps = {
  title: string;
  description: string;
  link?: string;
  comingSoon?: boolean;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  link,

}) => {
 

  return (
    <div className={`${theme.colors.cardBg} ${theme.spacing.cardPadding} rounded-lg shadow-md hover:shadow-xl transition-all`}>
      <h3 className={`text-xl font-semibold mb-3 ${theme.colors.text}`}>{title}</h3>
      <p className={`mb-4 ${theme.colors.subText}`}>{description}</p>
      {link && (
        <Link
          to={link}
          className={`${theme.colors.accent} font-medium hover:underline`}
        >
          Explore &rarr;
        </Link>
      )}
    </div>
  );
};

export default FeatureCard;
