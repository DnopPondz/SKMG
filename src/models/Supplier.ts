import mongoose, { Schema, model, models } from "mongoose";

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  phone: String,
  address: String,
}, { timestamps: true });

export default models.Supplier || model("Supplier", SupplierSchema);