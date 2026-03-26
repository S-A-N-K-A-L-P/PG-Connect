"use client";

import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, style, ...props }) => {
  return (
    <div style={{ marginBottom: "20px", width: "100%" }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#222",
            marginBottom: "8px",
          }}
        >
          {label}
        </label>
      )}
      <textarea
        style={{
          width: "100%",
          padding: "12px 16px",
          background: "var(--bg)",
          border: `1px solid ${error ? "var(--error)" : "var(--border)"}`,
          borderRadius: "var(--radius)",
          color: "var(--text)",
          fontSize: "1rem",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          minHeight: "120px",
          resize: "vertical",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
          ...style,
        }}
        {...props}
      />
      {error && (
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--error)",
            marginTop: "6px",
            display: "block",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};
