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
  const [layout, setLayout] = React.useState({ columns: cols, currentGap: gap });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setLayout({ columns: mobileCols, currentGap: 20 });
      } else if (width <= 1024) {
        setLayout({ columns: tabletCols, currentGap: gap });
      } else {
        setLayout({ columns: cols, currentGap: gap });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cols, gap, mobileCols, tabletCols]);

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gap: `${layout.currentGap}px`,
        gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
