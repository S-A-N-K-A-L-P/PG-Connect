import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];

        if (!files.length) {
            return NextResponse.json({ error: "No files" }, { status: 400 });
        }
        if (files.length > 10) {
            return NextResponse.json({ error: "Max 10 images" }, { status: 400 });
        }

        // Ensure upload directory exists
        await mkdir(UPLOAD_DIR, { recursive: true });

        const origin = new URL(req.url).origin;
        const urls: string[] = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const ext = file.name.split(".").pop() || "jpg";
            const fileName = `${randomUUID()}.${ext}`;
            const filePath = path.join(UPLOAD_DIR, fileName);

            await writeFile(filePath, buffer);
            urls.push(`${origin}/uploads/${fileName}`);
        }

        return NextResponse.json({ urls });
    } catch (err: unknown) {
        console.error("Upload error:", err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Upload failed" },
            { status: 500 }
        );
    }
}
