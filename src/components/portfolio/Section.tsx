"use client";

import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  background?: "default" | "secondary" | "white";
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  style,
  id,
  background = "default",
}) => {
  const bgStyles = {
    default: "var(--bg)",
    secondary: "var(--bg-secondary)",
    white: "#ffffff",
  };

  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: "80px",
        paddingBottom: "80px",
        background: bgStyles[background],
        width: "100%",
        ...style,
      }}
    >
      {children}
    </section>
  );
};
