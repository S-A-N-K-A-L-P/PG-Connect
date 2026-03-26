"use client";

import React from "react";

interface RatingProps {
  value: number;
}

export const Rating: React.FC<RatingProps> = ({ value }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span style={{ color: "#FFB000", fontSize: "0.9rem" }}>★</span>
      <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text)" }}>{value}</span>
    </div>
  );
};
