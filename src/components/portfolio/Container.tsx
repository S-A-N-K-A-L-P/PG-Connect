"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  size = "lg",
  className = "",
  style,
}) => {
  const maxWeights = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    full: "100%",
  };

  return (
    <div
      className={className}
      style={{
        maxWidth: maxWeights[size],
        margin: "0 auto",
        padding: "0 24px",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
