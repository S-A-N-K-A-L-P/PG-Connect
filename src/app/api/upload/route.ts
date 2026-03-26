import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];

        if (!files.length) {
            return NextResponse.json({ error: "No files provided" }, { status: 400 });
        }
        if (files.length > 10) {
            return NextResponse.json({ error: "Maximum 10 images allowed" }, { status: 400 });
        }

        const db = await getDb();
        const mediaCol = db.collection("media");
        const urls: string[] = [];

        for (const file of files) {
            // Convert file to base64 for Cloudinary
            const buffer = Buffer.from(await file.arrayBuffer());
            const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(base64, {
                folder: "pgconnect/uploads",
                transformation: [{ quality: "auto", fetch_format: "auto" }],
            });

            // Store metadata in MongoDB
            await mediaCol.insertOne({
                Url: result.secure_url,
                PublicId: result.public_id,
                OriginalName: file.name,
                MimeType: file.type,
                Size: file.size,
                Source: "direct_upload",
                CreatedAt: new Date(),
            });

            urls.push(result.secure_url);
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
