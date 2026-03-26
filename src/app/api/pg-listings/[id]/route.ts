import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

// GET /api/pg-listings/[id]
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const db = await getDb();
    const col = db.collection("pg_listings");

    let doc;
    try {
        doc = await col.findOne({ _id: new ObjectId(id) });
    } catch {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({
        Id: doc._id.toString(),
        Title: doc.Title,
        Description: doc.Description,
        Address: doc.Address,
        City: doc.City,
        Area: doc.Area,
        Rent: doc.Rent,
        SecurityDeposit: doc.SecurityDeposit,
        RoomTypes: doc.RoomTypes || [],
        Amenities: doc.Amenities || [],
        Equipment: doc.Equipment || [],
        NearbyLandmarks: doc.NearbyLandmarks || [],
        Images: doc.Images || [],
        RentAgreement: doc.RentAgreement || {},
        ContactPhone: doc.ContactPhone || "",
        ContactEmail: doc.ContactEmail || "",
        IsVerified: doc.IsVerified || false,
        PostedBy: doc.PostedBy || "",
        CreatedAt: doc.CreatedAt,
    });
}

// POST /api/pg-listings/[id] — upload images to cloudinary and save URLs
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const db = await getDb();
    const col = db.collection("pg_listings");

    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
        return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Check current image count
    const doc = await col.findOne({ _id: objectId });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const currentCount = (doc.Images || []).length;
    if (currentCount + files.length > 10) {
        return NextResponse.json(
            { error: `Max 10 images. Currently ${currentCount}, trying to add ${files.length}` },
            { status: 400 }
        );
    }

    // Upload each file to Cloudinary
    const uploadedUrls: string[] = [];
    for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64, {
            folder: "pgconnect/pg-listings",
            transformation: [{ quality: "auto", fetch_format: "auto" }],
        });
        uploadedUrls.push(result.secure_url);
    }

    // Update MongoDB
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await col.updateOne(
        { _id: objectId },
        {
            $push: { Images: { $each: uploadedUrls } } as any,
            $set: { UpdatedAt: new Date() },
        }
    );

    return NextResponse.json({ UploadedUrls: uploadedUrls });
}
