import React from "react";

interface MobileFormSectionProps {
  title: string;
  children: React.ReactNode;
}

export const MobileFormSection: React.FC<MobileFormSectionProps> = ({ title, children }) => {
  return (
    <div style={{ marginBottom: "32px" }}>
      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          marginBottom: "16px",
          color: "var(--text)",
          borderLeft: "4px solid var(--primary)",
          paddingLeft: "12px",
        }}
      >
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {children}
      </div>
    </div>
  );
};
