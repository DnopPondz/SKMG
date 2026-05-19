import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";
import { z } from "zod";

const productSchema = z.object({
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  minStock: z.number().optional(),
  price: z.number(),
  unit: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    // ตรวจสอบสิทธิ์ Admin ก่อนให้เพิ่มสินค้า
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "สิทธิ์ไม่เพียงพอ เฉพาะ Admin เท่านั้น" }, { status: 403 });
    }

    const rawData = await req.json();
    const result = productSchema.safeParse(rawData);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    const data = result.data;
    await connectDB();

    // สร้างสินค้าใหม่ในฐานข้อมูล
    const newProduct = await Product.create({
      ...data,
      quantity: 0, // เริ่มต้นสต็อกที่ 0 เสมอ
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}