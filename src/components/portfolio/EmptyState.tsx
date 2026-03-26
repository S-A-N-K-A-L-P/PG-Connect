"use client";

import React from "react";
import { Button } from "../ui/Button";

export const EmptyState: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "60px 24px", background: "white", borderRadius: "20px", border: "1px dashed var(--border)" }}>
      <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🔍</div>
      <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>No PGs nearby?</h3>
      <p style={{ color: "var(--text-secondary)", marginBottom: "24px", maxWidth: "400px", margin: "0 auto 24px" }}>
        Don't worry! We are expanding fast. Explore top-rated stays across your city in the meantime.
      </p>
      <Button variant="outline">Explore Bangalore</Button>
    </div>
  );
};
