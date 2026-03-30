import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Transaction from "@/models/Transaction"; //
import { auth } from "@/lib/auth"; //

export async function POST(req: Request) {
  try {
    // 1. ย้ายมาไว้ข้างในนี้ เพื่อให้เรียกใช้งานได้ใน Request Scope
    const session = await auth(); //
    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { sku, type, amount } = await req.json(); 
    await connectDB(); //

    const product = await Product.findOne({ sku }); //
    if (!product) {
      return NextResponse.json({ message: "ไม่พบสินค้า" }, { status: 404 });
    }

    // 2. คำนวณจำนวนสินค้าใหม่
    const newQuantity = type === "IN" 
      ? product.quantity + Number(amount) 
      : product.quantity - Number(amount);

    if (newQuantity < 0) {
      return NextResponse.json({ message: "สินค้าในสต๊อกไม่พอ" }, { status: 400 });
    }

    // 3. บันทึกจำนวนสินค้าลงใน Product
    product.quantity = newQuantity;
    await product.save(); //

    // 4. บันทึกประวัติลงใน Transaction
    await Transaction.create({ //
      productSku: product.sku,
      productName: product.name,
      type: type, 
      amount: Number(amount),
      userName: session.user?.name || "Unknown",
      note: type === "IN" ? "รับเข้าสต็อก" : "เบิกจ่ายสินค้า"
    });

    return NextResponse.json({ 
      message: "บันทึกรายการสำเร็จ", 
      current: newQuantity 
    });

  } catch (error: any) {
    console.error("Stock API Error:", error);
    return NextResponse.json(
      { message: error.message }, 
      { status: 500 }
    );
  }
}