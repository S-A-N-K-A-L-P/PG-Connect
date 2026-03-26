"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  padding?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, padding = "24px", style, ...props }) => {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-light)",
        borderRadius: "var(--radius-lg)",
        padding,
        boxShadow: "var(--shadow-md)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
