// src/theme.ts
export const theme = {
  colors: {
    // Page & Cards
    background: "bg-[#F8FAFC]",      // light neutral background
    cardBg: "bg-white",              // cards and navbar background
    text: "text-gray-900",           // primary text
    subText: "text-gray-700",        // secondary text
    disabledText: "text-gray-400",   // disabled nav item text
    disabledBg: "bg-green-50",       // disabled card background

    // Hero
    heroBg: "bg-gradient-to-r from-green-100 via-teal-100 to-cyan-50", // Minty Fresh gradient

    // Buttons
    primary: "bg-teal-500",          // Sign Up button
    primaryText: "text-white",       // Sign Up text
    buttonHover: "hover:bg-teal-600",// Button hover darker shade
    accent: "text-teal-600",         // Login button text
    accentBg: "bg-teal-50",          // Login button background
    accentHover: "hover:bg-teal-100",// Login hover background

    // Links
    linkHover: "hover:text-teal-500", // Nav link hover color
  },
  spacing: {
    navHeight: "h-16",
    heroHeight: "h-[80vh]",
    cardPadding: "p-6",
  },
};
