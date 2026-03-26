"use client";

import React from "react";
import { Card } from "../ui/Card";
import { Avatar } from "@/components/portfolio/Avatar";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, avatar }) => {
  return (
    <Card padding="32px" style={{ background: "var(--bg-secondary)", border: "none" }}>
      <div style={{ fontSize: "2rem", color: "var(--primary)", marginBottom: "16px", opacity: 0.3 }}>
        “
      </div>
      <p style={{ fontSize: "1.125rem", color: "var(--text)", marginBottom: "24px", fontStyle: "italic", lineHeight: 1.6 }}>
        {quote}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Avatar src={avatar} alt={author} size={48} />
        <div>
          <div style={{ fontWeight: 700, color: "var(--text)" }}>{author}</div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{role}</div>
        </div>
      </div>
    </Card>
  );
};
