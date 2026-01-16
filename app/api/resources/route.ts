import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // ✅ UPDATE: Gw naikin max_results jadi 500 (Maksimal Cloudinary)
    const results = await cloudinary.api.resources({
      type: "upload",
      prefix: "arbskin_uploads", 
      max_results: 500, 
      direction: "desc",
    });

    return NextResponse.json(results.resources);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Gagal ambil gambar" }, { status: 500 });
  }
}
