"use client";

import React from "react";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { Button } from "../ui/Button";

export const ContactForm: React.FC = () => {
  return (
    <div style={{ background: "white", padding: "40px", borderRadius: "20px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}>
      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Input label="Name" placeholder="Your full name" />
        <Input label="Email" type="email" placeholder="hello@company.com" />
        <TextArea label="Message" placeholder="How can we help you?" />
        <Button size="lg" fullWidth style={{ marginTop: "10px" }}>Send Message</Button>
      </form>
    </div>
  );
};
