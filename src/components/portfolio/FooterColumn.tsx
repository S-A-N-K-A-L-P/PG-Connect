"use client";

import React from "react";
import Link from "next/link";

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

export const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text)", textTransform: "uppercase", letterSpacing: "1px" }}>
        {title}
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {links.map((link, i) => (
          <Link key={i} href={link.href} style={{ textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.95rem", transition: "color 0.2s" }} className="footer-link-hover">
             <style jsx>{`
              .footer-link-hover:hover {
                color: var(--primary) !important;
              }
            `}</style>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
