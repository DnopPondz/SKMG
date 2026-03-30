import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct {
  sku: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  unit: string;
}

const ProductSchema = new Schema<IProduct>({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  minStock: { type: Number, default: 5 },
  price: { type: Number, required: true },
  unit: { type: String, default: "ชิ้น" },
}, { timestamps: true });

export default models.Product || model<IProduct>("Product", ProductSchema);