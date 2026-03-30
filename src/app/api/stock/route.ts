import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { sku, type, amount } = await req.json(); // type: 'IN' หรือ 'OUT'
    await connectDB();

    const product = await Product.findOne({ sku });
    if (!product) return NextResponse.json({ message: "ไม่พบสินค้า" }, { status: 404 });

    const newQuantity = type === "IN" 
      ? product.quantity + Number(amount) 
      : product.quantity - Number(amount);

    if (newQuantity < 0) {
      return NextResponse.json({ message: "สินค้าในสต๊อกไม่พอ" }, { status: 400 });
    }

    product.quantity = newQuantity;
    await product.save();

    return NextResponse.json({ message: "บันทึกรายการสำเร็จ", current: newQuantity });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}