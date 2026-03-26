"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      width: "100%",
      background: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-light)" : "1px solid transparent",
      padding: scrolled ? "12px 0" : "20px 0",
      transition: "all 0.3s ease"
    }}>
      <Container size="xl">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo />
          
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="nav-links">
            <style jsx>{`
              @media (max-width: 768px) {
                .nav-links {
                  display: none !important;
                }
              }
              .nav-link {
                text-decoration: none;
                color: var(--text);
                font-weight: 600;
                font-size: 0.95rem;
                transition: color 0.2s;
              }
              .nav-link:hover {
                color: var(--primary);
              }
            `}</style>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="#explore" className="nav-link">Browse PGs</Link>
            <Link href="#how-it-works" className="nav-link">How it Works</Link>
            <Link href="#about" className="nav-link">About</Link>
            <Link href="/add-pg">
              <Button variant="primary" size="sm">List Property</Button>
            </Link>
          </div>

          <Button variant="ghost" className="mobile-menu" style={{ display: "none" }}>
             <style jsx>{`
              @media (max-width: 768px) {
                .mobile-menu {
                  display: block !important;
                }
              }
            `}</style>
            ☰
          </Button>
        </div>
      </Container>
    </nav>
  );
};
