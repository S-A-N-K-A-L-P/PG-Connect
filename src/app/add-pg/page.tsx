"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAddPgForm } from "@/hooks/useAddPgForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { MobileContainer } from "@/components/ui/mobile/MobileContainer";
import { MobileImageUpload } from "@/components/ui/mobile/MobileImageUpload";
import { MobileFormSection } from "@/components/ui/mobile/MobileFormSection";
import { DesktopFormLayout } from "@/components/ui/desktop/DesktopFormLayout";

export default function AddPgPage() {
    const { formState, handlers, refs } = useAddPgForm();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const SuccessOverlay = () => (
        <div style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            background: "rgba(255, 255, 255, 0.7)", 
            backdropFilter: "blur(12px)", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            zIndex: 2000,
            textAlign: "center",
            padding: "24px",
            animation: "fadeIn 0.3s ease-out"
        }}>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
            <div style={{ 
                background: "white", 
                padding: "48px", 
                borderRadius: "32px", 
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "500px",
                width: "90%"
            }}>
                <div style={{ fontSize: "5rem", marginBottom: "24px" }}>🎉</div>
                <h3 style={{ fontSize: "2.25rem", fontWeight: 800, color: "var(--text)", marginBottom: "12px", letterSpacing: "-1px" }}>
                    PG Listed!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem", marginBottom: "40px", lineHeight: 1.6 }}>
                    Your property is now live and waiting for thousands of students to discover it.
                </p>
                <Link href="/">
                    <Button size="lg" shadow="lg" fullWidth>Go to Homepage</Button>
                </Link>
            </div>
        </div>
    );

    const FormContent = () => (
        <form onSubmit={handlers.handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "0" : "40px" }}>
                
                {isMobile ? (
                    <>
                        <MobileImageUpload 
                            images={formState.images} 
                            previews={formState.previews} 
                            onUpload={handlers.handleFiles} 
                            onRemove={handlers.removeImage} 
                            fileRef={refs.fileRef} 
                        />
                        <MobileFormSection title="Basics">
                            <Input label="PG Name" placeholder="e.g. Green Valley PG" value={formState.title} onChange={(e) => formState.setTitle(e.target.value)} required />
                            <TextArea label="Description" placeholder="Rules, facilities..." value={formState.description} onChange={(e) => formState.setDescription(e.target.value)} required />
                        </MobileFormSection>
                        
                        <MobileFormSection title="Location">
                            <Input label="City" placeholder="e.g. Mohali" value={formState.city} onChange={(e) => formState.setCity(e.target.value)} required />
                            <Input label="Area" placeholder="e.g. Sector 81" value={formState.area} onChange={(e) => formState.setArea(e.target.value)} required />
                            <Input label="Full Address" placeholder="Address..." value={formState.address} onChange={(e) => formState.setAddress(e.target.value)} required />
                        </MobileFormSection>

                        <MobileFormSection title="Pricing">
                            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                <Input label="Rent (₹)" type="number" value={formState.rent} onChange={(e) => formState.setRent(e.target.value)} required />
                                <Input label="Deposit (₹)" type="number" value={formState.deposit} onChange={(e) => formState.setDeposit(e.target.value)} required />
                            </div>
                        </MobileFormSection>
                    </>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                            <MobileImageUpload 
                                images={formState.images} 
                                previews={formState.previews} 
                                onUpload={handlers.handleFiles} 
                                onRemove={handlers.removeImage} 
                                fileRef={refs.fileRef} 
                            />
                            <TextArea label="Description" value={formState.description} onChange={(e) => formState.setDescription(e.target.value)} required />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                            <Input label="PG Name" value={formState.title} onChange={(e) => formState.setTitle(e.target.value)} required />
                            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <Input label="City" value={formState.city} onChange={(e) => formState.setCity(e.target.value)} required />
                                <Input label="Area" value={formState.area} onChange={(e) => formState.setArea(e.target.value)} required />
                            </div>
                            <Input label="Full Address" value={formState.address} onChange={(e) => formState.setAddress(e.target.value)} required />
                            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <Input label="Monthly Rent (₹)" type="number" value={formState.rent} onChange={(e) => formState.setRent(e.target.value)} required />
                                <Input label="Deposit (₹)" type="number" value={formState.deposit} onChange={(e) => formState.setDeposit(e.target.value)} required />
                            </div>
                            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                <Input label="Phone" value={formState.contactPhone} onChange={(e) => formState.setContactPhone(e.target.value)} required />
                                <Input label="Email" type="email" value={formState.contactEmail} onChange={(e) => formState.setContactEmail(e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Additional Details Section */}
                <div style={{ marginTop: isMobile ? "0" : "32px", borderTop: isMobile ? "none" : "1px solid var(--border-light)", paddingTop: isMobile ? "0" : "32px" }}>
                    <h3 style={{ marginBottom: "24px", fontSize: "1.25rem", fontWeight: 700 }}>Additional Details</h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                        {/* Room Types */}
                        <div>
                            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", display: "block", marginBottom: "12px" }}>Room Types</label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                                {formState.roomTypes.map((r, i) => (
                                    <div key={i} style={{ padding: "8px 16px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "20px", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 }}>
                                        {r.type} ({r.available}) — ₹{r.price}
                                        <button type="button" onClick={() => formState.setRoomTypes(formState.roomTypes.filter((_, idx) => idx !== i))} style={{ border: "none", background: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center" }}>✕</button>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", maxWidth: "600px" }}>
                                <div style={{ flex: 1 }}>
                                    <select 
                                        value={formState.newRoom.type} 
                                        onChange={(e) => formState.setNewRoom({...formState.newRoom, type: e.target.value})}
                                        style={{ width: "100%", padding: "12px", background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius)", color: "var(--text)", fontSize: "1rem" }}
                                    >
                                        <option>Single</option>
                                        <option>Double</option>
                                        <option>Triple</option>
                                    </select>
                                </div>
                                <div style={{ width: "120px" }}>
                                    <Input placeholder="Price" type="number" value={formState.newRoom.price || ""} onChange={(e) => formState.setNewRoom({...formState.newRoom, price: +e.target.value})} style={{ marginBottom: 0 }} />
                                </div>
                                <Button type="button" variant="outline" onClick={() => { if (formState.newRoom.price > 0) { formState.setRoomTypes([...formState.roomTypes, formState.newRoom]); formState.setNewRoom({type: "Single", available: 1, price: 0}); } }}>Add</Button>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", display: "block", marginBottom: "12px" }}>Amenities</label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                                {formState.amenities.map((a, i) => (
                                    <div key={i} style={{ padding: "8px 16px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "20px", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 }}>
                                        {a}
                                        <button type="button" onClick={() => formState.setAmenities(formState.amenities.filter((_, idx) => idx !== i))} style={{ border: "none", background: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center" }}>✕</button>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", gap: "12px", maxWidth: "500px" }}>
                                <Input placeholder="e.g. WiFi, AC" value={formState.newAmenity} onChange={(e) => formState.setNewAmenity(e.target.value)} style={{ marginBottom: 0 }} />
                                <Button type="button" variant="outline" onClick={() => { if (formState.newAmenity.trim()) { formState.setAmenities([...formState.amenities, formState.newAmenity.trim()]); formState.setNewAmenity(""); } }}>Add</Button>
                            </div>
                        </div>

                        {/* Landmarks */}
                        <div>
                            <label style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text)", display: "block", marginBottom: "12px" }}>Nearby Landmarks</label>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                                {formState.landmarks.map((l, i) => (
                                    <div key={i} style={{ padding: "8px 16px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "20px", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "8px", fontWeight: 500 }}>
                                        🚶 {l.distance} from {l.name}
                                        <button type="button" onClick={() => formState.setLandmarks(formState.landmarks.filter((_, idx) => idx !== i))} style={{ border: "none", background: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center" }}>✕</button>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", gap: "12px", maxWidth: "600px" }}>
                                <Input placeholder="Name (e.g. Plaksha)" value={formState.newLandmark.name} onChange={(e) => formState.setNewLandmark({...formState.newLandmark, name: e.target.value})} style={{ marginBottom: 0 }} />
                                <Input placeholder="Distance" value={formState.newLandmark.distance} onChange={(e) => formState.setNewLandmark({...formState.newLandmark, distance: e.target.value})} style={{ marginBottom: 0 }} />
                                <Button type="button" variant="outline" onClick={() => { if (formState.newLandmark.name && formState.newLandmark.distance) { formState.setLandmarks([...formState.landmarks, formState.newLandmark]); formState.setNewLandmark({name: "", distance: ""}); } }}>Add</Button>
                            </div>
                        </div>

                        {/* Rent Agreement */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "600px" }}>
                             <Input label="Min duration (months)" type="number" value={formState.minMonths} onChange={(e) => formState.setMinMonths(e.target.value)} />
                             <Input label="Max duration (months)" type="number" value={formState.maxMonths} onChange={(e) => formState.setMaxMonths(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "32px", marginTop: "16px" }}>
                    <Button 
                        type="submit" 
                        fullWidth 
                        size="lg" 
                        disabled={formState.submitting}
                    >
                        {formState.submitting ? "Publishing..." : "🚀 Publish Listing"}
                    </Button>
                    
                    {formState.error && (
                        <p style={{ color: "var(--error)", fontSize: "0.95rem", textAlign: "center", marginTop: "16px", fontWeight: 500 }}>
                            {formState.error}
                        </p>
                    )}
                </div>
            </div>
        </form>
    );

    if (isMobile) {
        return (
            <>
                <nav className="navbar" style={{ padding: "12px 24px" }}>
                    <Link href="/" className="logo" style={{ fontSize: "1.25rem" }}>PGXplore</Link>
                </nav>
                <MobileContainer title="List your PG">
                    <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", marginBottom: "32px" }}>
                        It's easy to get started. Just fill out the details.
                    </p>
                    <FormContent />
                    <div style={{ height: "60px" }} />
                </MobileContainer>
                {formState.success && <SuccessOverlay />}
            </>
        );
    }

    return (
        <>
            <nav className="navbar">
                <Link href="/" className="logo">PGXplore</Link>
                <Link href="/add-pg">
                    <Button size="sm">List your PG</Button>
                </Link>
            </nav>
            <DesktopFormLayout 
                title="List your PG" 
                subtitle="Reach thousands of students searching for verified homes near campus."
            >
                <FormContent />
            </DesktopFormLayout>
            {formState.success && <SuccessOverlay />}
        </>
    );
}


