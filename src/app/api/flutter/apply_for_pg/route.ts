import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { PgApplication } from "@/models/PgApplication";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { GuestId, PgId, FloorNumber, RoomId, Conditions } = body;

        if (!GuestId || !PgId) {
            return NextResponse.json({ error: "Missing required fields (GuestId, PgId)" }, { status: 400 });
        }

        const db = await getDb();
        const appCol = db.collection("applications");

        const newApp: PgApplication = {
            Id: crypto.randomUUID(),
            GuestId,
            PgId,
            FloorNumber: FloorNumber ? parseInt(FloorNumber) : undefined,
            RoomId,
            Conditions: Conditions || "Applied via Mobile",
            Status: "PENDING",
            CreatedAt: new Date()
        };

        await appCol.insertOne(newApp);

        return NextResponse.json({ 
            success: true, 
            message: "Application submitted successfully", 
            id: newApp.Id 
        });
    } catch (err: any) {
        console.error("Flutter Apply Error:", err);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
