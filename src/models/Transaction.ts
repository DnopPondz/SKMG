import mongoose, { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  productSku: { type: String, required: true },
  productName: { type: String, required: true },
  type: { type: String, enum: ["IN", "OUT", "ADJUST"], required: true },
  amount: { type: Number, required: true },
  userName: { type: String, required: true }, // ใครเป็นคนทำรายการ
  note: { type: String }, // หมายเหตุเพิ่มเติม
}, { timestamps: true });

export default models.Transaction || model("Transaction", TransactionSchema);