"use client";

import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
  title?: string;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, title }) => {
  return (
    <div style={{ padding: "0 24px", background: "var(--bg)", minHeight: "100vh" }}>
      {title && (
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            padding: "24px 0 12px",
            color: "var(--text)",
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};
