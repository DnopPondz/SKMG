import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";
import { z } from "zod";

// 🛡️ Sentinel: Validate input to prevent NoSQL injection
const productSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  minStock: z.number().nonnegative().optional(),
  price: z.number().positive(),
  unit: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    // ตรวจสอบสิทธิ์ Admin ก่อนให้เพิ่มสินค้า
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "สิทธิ์ไม่เพียงพอ เฉพาะ Admin เท่านั้น" }, { status: 403 });
    }

    const json = await req.json();
    const result = productSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ message: "ข้อมูลไม่ถูกต้อง", errors: result.error.format() }, { status: 400 });
    }

    const data = result.data;
    await connectDB();

    // สร้างสินค้าใหม่ในฐานข้อมูล
    const newProduct = await Product.create({
      ...data,
      quantity: 0, // เริ่มต้นสต็อกที่ 0 เสมอ
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}