"use client";

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: string;
  hover?: boolean;
  shadow?: "sm" | "md" | "lg" | "xl";
}

export const Card: React.FC<CardProps> = ({ children, padding = "24px", style, hover, shadow, ...props }) => {
  const getShadow = () => {
    if (shadow) return `var(--shadow-${shadow})`;
    return hover ? "var(--shadow-lg)" : "var(--shadow-md)";
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: getShadow(),
        transition: "all 0.3s ease",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
