import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || "";
const DB_NAME = "pgconnect";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
    if (cachedDb) return cachedDb;

    if (!MONGODB_URI) {
        throw new Error(
            "MONGODB_URI is not set. Check your .env file. Available env keys: " +
            Object.keys(process.env).filter((k) => k.includes("MONGO")).join(", ")
        );
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedClient = client;
    cachedDb = client.db(DB_NAME);
    return cachedDb;
}
