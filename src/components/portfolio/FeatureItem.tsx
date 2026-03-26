"use client";

import React from "react";

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div style={{ padding: "32px", background: "white", borderRadius: "16px", border: "1px solid var(--border-light)", transition: "all 0.2s" }} className="feature-hover">
      <style jsx>{`
        .feature-hover:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-md);
        }
      `}</style>
      <div style={{ fontSize: "2rem", marginBottom: "16px" }}>{icon}</div>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
};
