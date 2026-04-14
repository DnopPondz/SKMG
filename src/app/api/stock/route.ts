import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Transaction from "@/models/Transaction";
import { auth } from "@/lib/auth";

// 🛡️ Sentinel: Validate input to prevent NoSQL injection
const stockRequestSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  type: z.enum(["IN", "OUT"]),
  amount: z.union([z.string(), z.number()]).transform(val => Number(val)).refine(val => val > 0 && !isNaN(val), { message: "Amount must be a positive number" }),
  note: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
    }

    const payload = await req.json();
    const parsed = stockRequestSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid request payload", errors: parsed.error.format() }, { status: 400 });
    }

    const { sku, type, amount, note } = parsed.data;
    await connectDB();

    const product = await Product.findOne({ sku });
    if (!product) {
      return NextResponse.json({ message: "ไม่พบสินค้า" }, { status: 404 });
    }

    // คำนวณจำนวนสต็อกใหม่
    const newQuantity = type === "IN" 
      ? product.quantity + Number(amount) 
      : product.quantity - Number(amount);

    if (newQuantity < 0) {
      return NextResponse.json({ message: "สินค้าในสต๊อกไม่เพียงพอสำหรับทำรายการนี้" }, { status: 400 });
    }

    // อัปเดตจำนวนใน Product Model
    product.quantity = newQuantity;
    await product.save();

    // บันทึกประวัติ Transaction เพื่อดูย้อนหลัง
    await Transaction.create({
      productSku: product.sku,
      productName: product.name,
      type: type, 
      amount: Number(amount),
      userName: session.user?.name || "Unknown",
      note: note || (type === "IN" ? "รับเข้าสต็อก" : "เบิกจ่ายสินค้า")
    });

    return NextResponse.json({ 
      message: "บันทึกรายการสำเร็จ", 
      currentQuantity: newQuantity 
    });

  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}