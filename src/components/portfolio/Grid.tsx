"use client";

import React from "react";

interface GridProps {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
  mobileCols?: number;
  tabletCols?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 3,
  gap = 32,
  mobileCols = 1,
  tabletCols = 2,
  className = "",
  style,
}) => {
  return (
    <div
      className={`${className} responsive-grid`}
      style={{
        display: "grid",
        gap: `${gap}px`,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        ...style,
      }}
    >
      <style jsx>{`
        @media (max-width: 1024px) {
          .responsive-grid {
            grid-template-columns: repeat(${tabletCols}, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .responsive-grid {
            grid-template-columns: repeat(${mobileCols}, 1fr) !important;
            gap: 20px !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
};
