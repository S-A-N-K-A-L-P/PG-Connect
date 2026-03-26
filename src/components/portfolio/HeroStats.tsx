"use client";

import React from "react";
import { StatItem } from "@/components/portfolio/StatItem";

export const HeroStats: React.FC = () => {
  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(4, 1fr)", 
      gap: "40px", 
      paddingTop: "60px", 
      borderTop: "1px solid var(--border-light)", 
      width: "100%",
      maxWidth: "1000px"
    }}>
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-stats-wrapper {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
      `}</style>
      <div className="hero-stats-wrapper" style={{ display: "contents" }}>
        <StatItem value="500+" label="PG Listings Onboarded" />
        <StatItem value="1200+" label="Monthly active users" />
        <StatItem value="Real-time" label="Availability System" />
        <StatItem value="Secure" label="Direct owner connection" />
      </div>
    </div>
  );
};
