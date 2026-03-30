import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    // ตรวจสอบสิทธิ์ Admin ก่อนให้เพิ่มสินค้า
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "สิทธิ์ไม่เพียงพอ เฉพาะ Admin เท่านั้น" }, { status: 403 });
    }

    const data = await req.json();
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