"use client";

import React from "react";
import { Card } from "../ui/Card";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

export const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <Card padding="32px" style={{ position: "relative", border: "none", boxShadow: "none", background: "white", textAlign: "center" }}>
      <div style={{ 
        width: "48px", 
        height: "48px", 
        background: "var(--primary-light)", 
        color: "var(--primary)", 
        borderRadius: "12px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        fontSize: "1.25rem", 
        fontWeight: 800,
        margin: "0 auto 24px"
      }}>
        {number}
      </div>
      <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
        {description}
      </p>
    </Card>
  );
};
