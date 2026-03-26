"use client";

import React from "react";

interface TrustBadgeProps {
  label: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({ label }) => {
  return (
    <div style={{ 
      display: "inline-flex", 
      alignItems: "center", 
      gap: "6px", 
      padding: "6px 12px", 
      background: "rgba(0, 132, 137, 0.08)", 
      border: "1px solid rgba(0, 132, 137, 0.2)",
      borderRadius: "6px",
      color: "#008489",
      fontSize: "0.8rem",
      fontWeight: 700
    }}>
      <span style={{ fontSize: "14px" }}>🛡️</span>
      {label.toUpperCase()}
    </div>
  );
};
