"use client";

import React from "react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Section } from "@/components/portfolio/Section";
import { Container } from "@/components/portfolio/Container";
import { SectionHeader } from "@/components/portfolio/SectionHeader";
import { Grid } from "@/components/portfolio/Grid";
import { PGCard } from "@/components/portfolio/PGCard";
import { CategoryPill } from "@/components/portfolio/CategoryPill";
import { EmptyState } from "@/components/portfolio/EmptyState";
import { TestimonialCard } from "@/components/portfolio/TestimonialCard";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { Footer } from "@/components/portfolio/Footer";

// New Ecosystem Components
import { BeyondPGSection } from "@/components/portfolio/BeyondPGSection";
import { StudentAppSection } from "@/components/portfolio/StudentAppSection";
import { CreatorEconomySection } from "@/components/portfolio/CreatorEconomySection";
import { VendorOpsSection } from "@/components/portfolio/VendorOpsSection";
import { AIIntelligenceSection } from "@/components/portfolio/AIIntelligenceSection";
import { SelfHealingSection } from "@/components/portfolio/SelfHealingSection";
import { CampusExpansionSection } from "@/components/portfolio/CampusExpansionSection";
import { PlatformIntelligenceSection } from "@/components/portfolio/PlatformIntelligenceSection";

export default function LandingPage() {
  const [pgs, setPgs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/pg-listings?pageSize=6")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((item: any) => ({
            id: item.Id,
            image: item.Images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
            name: item.Title || "Standard PG",
            location: `${item.Area || ""}, ${item.City || ""}`,
            price: item.Rent || 0,
            tags: item.Amenities?.slice(0, 3) || ["WiFi", "AC"],
            rating: 4.8 
          }));
          setPgs(mapped);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching PGs:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ background: "white" }}>
      <Navbar />
      
      {/* 1. Hero Section */}
      <Hero />

      {/* Positioning Line Wrapper */}
      <div style={{ background: "var(--text)", color: "white", padding: "20px 0", textAlign: "center", borderBottom: "4px solid var(--primary)" }}>
        <Container>
          <p style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, letterSpacing: "0.5px" }}>
            PG Connect is not just a platform—it is a <span style={{ color: "var(--primary)" }}>self-evolving student economy</span> powered by AI-driven supply chains.
          </p>
        </Container>
      </div>

      {/* 2. PG Discovery (Existing Explore Section) */}
      <Section id="explore" background="white">
        <Container size="xl">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
            <SectionHeader 
              title="Discover Base Camps" 
              subtitle="Find your PG. Once you move in, the ecosystem unlocks."
              align="left"
            />
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px", width: "100%", maxWidth: "600px" }}>
              <CategoryPill label="All Stays" active />
              <CategoryPill label="Near Plaksha" />
              <CategoryPill label="Near Ashoka" />
              <CategoryPill label="Near Amity" />
              <CategoryPill label="With Food" />
            </div>
          </div>
          
          <Grid cols={3}>
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} style={{ height: "300px", background: "var(--bg-secondary)", borderRadius: "12px", animation: "pulse 1.5s infinite" }} />
              ))
            ) : (
              pgs.map((pg, i) => (
                <PGCard key={i} {...pg} />
              ))
            )}
          </Grid>
          
          {!loading && pgs.length === 0 && (
            <div style={{ marginTop: "60px" }}>
              <EmptyState />
            </div>
          )}
        </Container>
      </Section>

      {/* 3. Beyond PG (Transition) */}
      <BeyondPGSection />

      {/* 4. Student App Experience */}
      <StudentAppSection />

      {/* 5. Creator Economy */}
      <CreatorEconomySection />

      {/* 6. Vendor & Ops System */}
      <VendorOpsSection />

      {/* 7. AI Intelligence */}
      <AIIntelligenceSection />

      {/* 8. Self-Healing System */}
      <SelfHealingSection />

      {/* 9. Expansion */}
      <CampusExpansionSection />

      {/* 10. Analytics Dashboard */}
      <PlatformIntelligenceSection />

      {/* 11. Testimonials */}
      <Section background="white">
        <Container size="xl">
          <SectionHeader 
            title="Ecosystem Stories" 
            subtitle="Hear from students earning, vendors growing, and owners scaling."
          />
          <Grid cols={2} mobileCols={1}>
            <TestimonialCard 
              quote="I started delivering notes in my PG. Now I provide tutoring services to 3 nearby PGs using the Connect App."
              author="Aaryan Sharma"
              role="Student & Creator"
              avatar="https://i.pravatar.cc/150?u=aaryan"
            />
            <TestimonialCard 
              quote="The vendor dashboard is incredible. The AI rerouted my food deliveries during peak hours, saving me from delays."
              author="Mrs. Gupta"
              role="Tiffin Service Partner"
              avatar="https://i.pravatar.cc/150?u=gupta"
            />
          </Grid>
        </Container>
      </Section>

      {/* 12. Contact Us / CTA */}
      <Section id="contact" background="secondary">
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "80px", alignItems: "start" }}>
            <div>
              <SectionHeader 
                title="Join the Economy" 
                subtitle="Want to list a PG, become a creator, or join as a vendor? Get in touch."
                align="left"
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "48px", height: "48px", background: "white", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", boxShadow: "var(--shadow-sm)" }}>📧</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text)" }}>Partner Support</div>
                    <div style={{ color: "var(--text-secondary)" }}>ecosystem@pgxplore.com</div>
                  </div>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
