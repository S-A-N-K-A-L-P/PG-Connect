"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
}) => {
  const styles: Record<string, { background: string; color: string; border?: string }> = {
    primary: { background: "var(--primary-light)", color: "var(--primary)" },
    secondary: { background: "var(--bg-secondary)", color: "var(--text-secondary)" },
    success: { background: "#e6f4f1", color: "var(--success)" },
    outline: { background: "transparent", border: "1px solid var(--border)", color: "var(--text-secondary)" },
  };

  const current = styles[variant] || styles.primary;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: 600,
      background: current.background,
      color: current.color,
      border: current.border || "none",
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    }}>
      {children}
    </span>
  );
};
