"use client";

import React from "react";
import { Card } from "../Card";

interface DesktopFormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const DesktopFormLayout: React.FC<DesktopFormLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div style={{ background: "var(--bg-secondary)", minHeight: "100vh", padding: "80px 20px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "8px", color: "var(--text)", letterSpacing: "-1px" }}>
          {title}
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem", marginBottom: "48px" }}>
          {subtitle}
        </p>
        <Card padding="48px" style={{ border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}>
          {children}
        </Card>
      </div>
    </div>
  );
};
