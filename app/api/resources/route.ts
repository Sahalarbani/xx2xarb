import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Ambil 50 gambar terbaru dari folder arbskin_uploads
    const results = await cloudinary.api.resources({
      type: "upload",
      prefix: "arbskin_uploads", // Sesuaikan nama folder lu
      max_results: 50,
      direction: "desc",
    });

    return NextResponse.json(results.resources);
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Gagal ambil gambar" }, { status: 500 });
  }
}
