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
import { StepCard } from "@/components/portfolio/StepCard";
import { FeatureItem } from "@/components/portfolio/FeatureItem";
import { AboutGallery } from "@/components/portfolio/AboutGallery";
import { TestimonialCard } from "@/components/portfolio/TestimonialCard";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { Footer } from "@/components/portfolio/Footer";
import { Divider } from "@/components/portfolio/Divider";
import { EmptyState } from "@/components/portfolio/EmptyState";
import { TrustBadge } from "@/components/portfolio/TrustBadge";
import { Button } from "@/components/ui/Button";

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
        // API returns a direct array, not { Items: [] }
        if (Array.isArray(data)) {
          const mapped = data.map((item: any) => ({
            id: item.Id,
            image: item.Images?.[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
            name: item.Title || "Standard PG",
            location: `${item.Area || ""}, ${item.City || ""}`,
            price: item.Rent || 0,
            tags: item.Amenities?.slice(0, 3) || ["WiFi", "AC"],
            rating: 4.8 // Fixed value for stability during hydration
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

      {/* 2. PG Near You Section */}
      <Section id="explore" background="secondary">
        <Container size="xl">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
            <SectionHeader 
              title="PGs Near You" 
              subtitle="Handpicked stays in your area with verified details and transparent pricing."
              align="left"
            />
            <div style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "8px", width: "100%", maxWidth: "600px" }}>
              <CategoryPill label="All Stays" active />
              <CategoryPill label="Near Plaksha" />
              <CategoryPill label="Near Ashoka" />
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

      {/* 3. How It Works Section */}
      <Section id="how-it-works">
        <Container>
          <SectionHeader 
            title="How It Works" 
            subtitle="Simplifying your search process in three easy steps."
          />
          <Grid cols={3} gap={40}>
            <StepCard 
              number={1} 
              title="Search & Discover" 
              description="Browse PGs based on your location, budget, and preferences."
            />
            <StepCard 
              number={2} 
              title="Compare & Choose" 
              description="Check amenities, pricing, and reviews before deciding."
            />
            <StepCard 
              number={3} 
              title="Connect Instantly" 
              description="Contact owners directly and finalize your stay."
            />
          </Grid>
        </Container>
      </Section>

      {/* 4. Why Choose Us Section */}
      <Section background="secondary">
        <Container size="xl">
          <SectionHeader 
            title="Why Choose Us" 
            subtitle="Built by students, for students. We prioritize your comfort and safety."
          />
          <Grid cols={4} tabletCols={2}>
            <FeatureItem 
              icon="🛡️" 
              title="Verified Listings" 
              description="Every PG is reviewed for authenticity and accuracy by our team."
            />
            <FeatureItem 
              icon="💎" 
              title="Transparent Pricing" 
              description="No hidden charges or brokerage. What you see is what you pay."
            />
            <FeatureItem 
              icon="⚡" 
              title="Direct Connections" 
              description="Talk directly to owners — no middlemen or unnecessary delays."
            />
            <FeatureItem 
              icon="📍" 
              title="Smart Discovery" 
              description="Personalized recommendations based on walking distance to campus."
            />
          </Grid>
        </Container>
      </Section>

      {/* 5. About Us Section */}
      <Section id="about">
        <Container size="xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
             <div style={{ 
               display: "grid", 
               gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
               gap: "80px", 
               alignItems: "center",
               width: "100%"
             }}>
                <AboutGallery />
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <TrustBadge label="Built for Students" />
                <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text)", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
                  Simplifying PG search <br /> one city at a time.
                </h2>
                <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  We built this platform to solve a problem we personally faced — finding a reliable PG in a new city. Traditional methods are fragmented, unverified, and time-consuming.
                </p>
                <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  Our goal is to simplify this process through technology, transparency, and trust. Today, we are building a connected ecosystem where tenants and property owners interact seamlessly.
                </p>
                <div style={{ marginTop: "12px" }}>
                  <Button variant="outline">Learn More About Our Journey</Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Testimonials Section */}
      <Section background="secondary">
        <Container size="xl">
          <SectionHeader 
            title="What Our Users Say" 
            subtitle="Join thousands of satisfied students and owners already using PGXplore."
          />
          <Grid cols={2} mobileCols={1}>
            <TestimonialCard 
              quote="Found my PG in less than a day. Super easy and reliable. The direct connection to owner saved me a lot of brokerage."
              author="Aaryan Sharma"
              role="Student, Mohali"
              avatar="https://i.pravatar.cc/150?u=aaryan"
            />
            <TestimonialCard 
              quote="Listing my property here brought genuine tenants quickly. The verification process gives me peace of mind as an owner."
              author="Mrs. Gupta"
              role="Property Owner"
              avatar="https://i.pravatar.cc/150?u=gupta"
            />
          </Grid>
        </Container>
      </Section>

      {/* 7. Contact Us Section */}
      <Section id="contact">
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "80px", alignItems: "start" }}>
             <style jsx>{`
              @media (max-width: 1024px) {
                .contact-grid {
                  grid-template-columns: 1fr !important;
                  gap: 48px !important;
                }
              }
            `}</style>
            <div className="contact-grid" style={{ display: "contents" }}>
              <div>
                <SectionHeader 
                  title="Get in Touch" 
                  subtitle="Have questions or want to list your PG? We're here to help."
                  align="left"
                />
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "48px", height: "48px", background: "var(--bg-secondary)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>📧</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--text)" }}>Email Support</div>
                      <div style={{ color: "var(--text-secondary)" }}>support@pgxplore.com</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "48px", height: "48px", background: "var(--bg-secondary)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem" }}>📞</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--text)" }}>Phone</div>
                      <div style={{ color: "var(--text-secondary)" }}>+91 98765 43210</div>
                    </div>
                  </div>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Footer Section */}
      <Footer />
    </main>
  );
}
