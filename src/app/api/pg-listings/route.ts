import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

// GET /api/pg-listings — list with filters
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const area = searchParams.get("area");
    const minRent = searchParams.get("minRent");
    const maxRent = searchParams.get("maxRent");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");

    const db = await getDb();
    const col = db.collection("pg_listings");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {};
    if (city) filter.City = city;
    if (area) filter.Area = area;
    if (minRent) filter.Rent = { ...filter.Rent, $gte: parseFloat(minRent) };
    if (maxRent) filter.Rent = { ...filter.Rent, $lte: parseFloat(maxRent) };
    if (search) {
        filter.$or = [
            { Title: { $regex: search, $options: "i" } },
            { Description: { $regex: search, $options: "i" } },
            { Address: { $regex: search, $options: "i" } },
        ];
    }

    const totalCount = await col.countDocuments(filter);
    const items = await col
        .find(filter)
        .sort({ CreatedAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .toArray();

    // Map _id to Id for frontend compatibility
    const mapped = items.map((doc) => ({
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
    }));

    return NextResponse.json({ Items: mapped, TotalCount: totalCount, Page: page, PageSize: pageSize });
}

// POST /api/pg-listings — create a new listing
export async function POST(req: NextRequest) {
    const body = await req.json();
    const db = await getDb();
    const col = db.collection("pg_listings");

    const doc = {
        Title: body.Title || "",
        Description: body.Description || "",
        Address: body.Address || "",
        City: body.City || "",
        Area: body.Area || "",
        Rent: body.Rent || 0,
        SecurityDeposit: body.SecurityDeposit || 0,
        RoomTypes: body.RoomTypes || [],
        Amenities: body.Amenities || [],
        Equipment: body.Equipment || [],
        NearbyLandmarks: body.NearbyLandmarks || [],
        Images: body.Images || [], // Cloudinary URLs passed from frontend
        RentAgreement: body.RentAgreement || { MinMonths: 1, MaxMonths: 12, Conditions: "" },
        ContactPhone: body.ContactPhone || "",
        ContactEmail: body.ContactEmail || "",
        IsVerified: false,
        PostedBy: body.PostedBy || "anonymous",
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
    };

    const result = await col.insertOne(doc);

    return NextResponse.json({ Id: result.insertedId.toString(), ...doc }, { status: 201 });
}
