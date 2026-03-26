"use client";

import React from "react";

interface SocialIconProps {
  platform: "linkedin" | "instagram" | "twitter" | "facebook";
}

export const SocialIcon: React.FC<SocialIconProps> = ({ platform }) => {
  const icons = {
    linkedin: "in",
    instagram: "ig",
    twitter: "tw",
    facebook: "fb"
  };

  return (
    <div style={{ 
      width: "36px", 
      height: "36px", 
      borderRadius: "50%", 
      background: "var(--bg-secondary)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      cursor: "pointer",
      color: "var(--text)",
      fontWeight: 700,
      fontSize: "0.8rem",
      transition: "all 0.2s"
    }} className="social-hover">
       <style jsx>{`
        .social-hover:hover {
          background: var(--primary) !important;
          color: white !important;
        }
      `}</style>
      {icons[platform]}
    </div>
  );
};
