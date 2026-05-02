import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";
import { z } from "zod";

const productSchema = z.object({
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  minStock: z.number().optional().default(5),
  price: z.number(),
  unit: z.string().optional().default("ชิ้น"),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    // ตรวจสอบสิทธิ์ Admin ก่อนให้เพิ่มสินค้า
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "สิทธิ์ไม่เพียงพอ เฉพาะ Admin เท่านั้น" }, { status: 403 });
    }

    const data = await req.json();
    const result = productSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
    }

    await connectDB();

    // สร้างสินค้าใหม่ในฐานข้อมูล
    const newProduct = await Product.create({
      ...result.data,
      quantity: 0, // เริ่มต้นสต็อกที่ 0 เสมอ
    });
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
