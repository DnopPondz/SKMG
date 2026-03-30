import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ name: 1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}