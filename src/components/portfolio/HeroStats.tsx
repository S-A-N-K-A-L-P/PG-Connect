"use client";

import React from "react";
import { StatItem } from "@/components/portfolio/StatItem";

export const HeroStats: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", 
      gap: isMobile ? "20px" : "40px", 
      paddingTop: "60px", 
      borderTop: "1px solid var(--border-light)", 
      width: "100%",
      maxWidth: "1000px"
    }}>
      <StatItem value="500+" label="PG Listings Onboarded" />
      <StatItem value="1200+" label="Monthly active users" />
      <StatItem value="Real-time" label="Availability System" />
      <StatItem value="Secure" label="Direct owner connection" />
    </div>
  );
};
