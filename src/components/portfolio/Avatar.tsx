"use client";

import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = 40 }) => {
  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      borderRadius: "50%", 
      overflow: "hidden", 
      border: "2px solid white",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
};
