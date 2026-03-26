import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const db = await getDb();
        const pgCol = db.collection("pg-listings");

        const pg = await pgCol.findOne({ Id: id });
        if (!pg) {
            return NextResponse.json({ error: "PG not found" }, { status: 404 });
        }

        return NextResponse.json(pg);
    } catch (err: any) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
