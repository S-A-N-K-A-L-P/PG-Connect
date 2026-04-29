import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AddPgPage() {
    return (
        <div>
            <div style={{ marginBottom: "40px" }}>
                <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text)", marginBottom: "8px" }}>Add New Property</h1>
                <p style={{ color: "var(--text-secondary)" }}>Enter the details of your new PG to list it on PGXplore.</p>
            </div>

            <Card padding="32px">
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ 
                        width: "64px", 
                        height: "64px", 
                        borderRadius: "16px", 
                        background: "var(--primary-light)", 
                        color: "var(--primary)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        margin: "0 auto 24px auto",
                        fontSize: "2rem"
                    }}>
                        🏢
                    </div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "16px" }}>Add Property Form</h2>
                    <p style={{ color: "var(--text-secondary)", marginBottom: "32px", maxWidth: "400px", margin: "0 auto 32px auto" }}>
                        This is a placeholder page for the Add Property form. The full form implementation with image uploads, amenities, and pricing configurations will be built here.
                    </p>
                    <Button size="lg" disabled>Form Coming Soon</Button>
                </div>
            </Card>
        </div>
    );
}
