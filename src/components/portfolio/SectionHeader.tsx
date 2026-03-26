"use client";

import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = "center",
}) => {
  return (
    <div style={{ 
      textAlign: align, 
      marginBottom: "48px",
      maxWidth: align === "center" ? "700px" : "100%",
      margin: align === "center" ? "0 auto 48px" : "0 0 48px"
    }}>
      <h2 style={{ 
        fontSize: "2.25rem", 
        fontWeight: 800, 
        color: "var(--text)", 
        marginBottom: "16px",
        letterSpacing: "-1px"
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ 
          fontSize: "1.125rem", 
          color: "var(--text-secondary)",
          lineHeight: 1.6
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
