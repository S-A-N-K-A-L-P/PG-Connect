"use client";

import React from "react";

interface StatItemProps {
  value: string;
  label: string;
}

export const StatItem: React.FC<StatItemProps> = ({ value, label }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ 
        fontSize: "1.75rem", 
        fontWeight: 800, 
        color: "var(--text)", 
        marginBottom: "4px" 
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: "0.85rem", 
        color: "var(--text-secondary)", 
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.5px"
      }}>
        {label}
      </div>
    </div>
  );
};
