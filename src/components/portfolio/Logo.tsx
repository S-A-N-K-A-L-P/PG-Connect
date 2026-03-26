"use client";

import React from "react";
import Link from "next/link";

export const Logo: React.FC = () => {
  return (
    <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        width: "32px",
        height: "32px",
        background: "var(--primary)",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "18px",
        fontWeight: "bold"
      }}>
        P
      </div>
      <span style={{
        fontSize: "1.25rem",
        fontWeight: 800,
        color: "var(--text)",
        letterSpacing: "-0.5px"
      }}>
        PGXplore
      </span>
    </Link>
  );
};
