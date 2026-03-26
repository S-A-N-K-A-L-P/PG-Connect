import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { User, UserRole } from "@/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, role, permanentAddress, phone } = body;

        if (!email || !password || !role) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const db = await getDb();
        const userCol = db.collection("users");

        // Check if user exists
        const existing = await userCol.findOne({ Email: email });
        if (existing) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser: User = {
            Id: crypto.randomUUID(),
            Name: name,
            Email: email,
            PasswordHash: passwordHash,
            Role: role as UserRole,
            PermanentAddress: permanentAddress,
            Phone: phone,
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
        };

        await userCol.insertOne(newUser);

        return NextResponse.json({ success: true, user: { name: newUser.Name, email: newUser.Email, role: newUser.Role } });
    } catch (err: any) {
        console.error("Register Error:", err);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
