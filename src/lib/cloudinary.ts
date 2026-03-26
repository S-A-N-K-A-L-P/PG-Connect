import { v2 as cloudinary } from "cloudinary";

// CLOUDINARY_URL env var is auto-parsed by the SDK
cloudinary.config();

export default cloudinary;
