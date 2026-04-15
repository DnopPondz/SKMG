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
  price: z.number().nonnegative(),
  unit: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    // ตรวจสอบสิทธิ์ Admin ก่อนให้เพิ่มสินค้า
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "สิทธิ์ไม่เพียงพอ เฉพาะ Admin เท่านั้น" }, { status: 403 });
    }

    const payload = await req.json();
    const parsed = productSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ message: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
    }

    await connectDB();

    // สร้างสินค้าใหม่ในฐานข้อมูล
    const newProduct = await Product.create({
      ...parsed.data,
      quantity: 0, // เริ่มต้นสต็อกที่ 0 เสมอ
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}