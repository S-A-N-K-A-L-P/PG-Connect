"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";

interface ClientDashboardShellProps {
    children: React.ReactNode;
}

export const ClientDashboardShell: React.FC<ClientDashboardShellProps> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
            if (window.innerWidth <= 1024) {
                setIsCollapsed(true);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-secondary)" }}>
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            
            <main style={{ 
                flex: 1, 
                marginLeft: isCollapsed ? "80px" : "280px",
                transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                width: "100%",
                position: "relative"
            }}>
                {/* Dashboard Header */}
                <header style={{
                    height: "72px",
                    background: "var(--bg-surface)",
                    borderBottom: "1px solid var(--border-light)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 40px",
                    position: "sticky",
                    top: 0,
                    zIndex: 90
                }}>
                    <div style={{ flex: 1 }}>
                        {/* Search or breadcrumbs could go here */}
                    </div>
                </header>

                <div style={{ padding: "40px" }}>
                    {children}
                </div>
            </main>
        </div>
    );
};
