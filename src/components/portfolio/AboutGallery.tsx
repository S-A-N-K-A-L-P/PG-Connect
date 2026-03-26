"use client";

import React from "react";

export const AboutGallery: React.FC = () => {
  return (
    <div style={{ position: "relative", height: "500px", width: "100%" }}>
      <div style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "70%", 
        height: "80%", 
        borderRadius: "20px", 
        overflow: "hidden", 
        boxShadow: "var(--shadow-md)",
        zIndex: 1
      }}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Students" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ 
        position: "absolute", 
        bottom: 0, 
        right: 0, 
        width: "50%", 
        height: "60%", 
        borderRadius: "20px", 
        overflow: "hidden", 
        boxShadow: "var(--shadow-md)",
        border: "8px solid white",
        zIndex: 2
      }}>
        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800" alt="Team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
};
