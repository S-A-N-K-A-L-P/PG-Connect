"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export const SearchBar: React.FC = () => {
  return (
    <div style={{ 
      width: "100%", 
      maxWidth: "800px", 
      margin: "0 auto",
      padding: "8px",
      background: "white",
      borderRadius: "40px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: "1px solid var(--border-light)"
    }}>
      <div style={{ flex: 1, paddingLeft: "24px", display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text)" }}>LOCATION</span>
        <input 
          placeholder="Where are you going?" 
          style={{ border: "none", outline: "none", fontSize: "0.95rem", color: "var(--text)", width: "100%", padding: "4px 0" }}
        />
      </div>
      <div style={{ width: "1px", height: "40px", background: "var(--border-light)" }} />
      <div style={{ flex: 1, paddingLeft: "16px", display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text)" }}>BUDGET</span>
        <input 
          placeholder="Set your range" 
          style={{ border: "none", outline: "none", fontSize: "0.95rem", color: "var(--text)", width: "100%", padding: "4px 0" }}
        />
      </div>
      <Button style={{ borderRadius: "30px", width: "48px", height: "48px", padding: 0 }}>
        🔍
      </Button>
    </div>
  );
};
