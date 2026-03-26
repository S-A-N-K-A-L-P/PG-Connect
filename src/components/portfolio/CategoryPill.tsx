"use client";

import React from "react";

interface CategoryPillProps {
  label: string;
  active?: boolean;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ label, active }) => {
  return (
    <button style={{
      padding: "10px 20px",
      borderRadius: "30px",
      background: active ? "var(--primary)" : "white",
      color: active ? "white" : "var(--text-secondary)",
      border: active ? "none" : "1px solid var(--border)",
      fontSize: "0.9rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s",
      whiteSpace: "nowrap"
    }}>
      {label}
    </button>
  );
};
