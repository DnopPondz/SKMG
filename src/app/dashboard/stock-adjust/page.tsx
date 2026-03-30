"use client";
import { useState, useEffect } from "react";

export default function StockAdjustPage() {
  const [products, setProducts] = useState([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetch("/api/products").then(res => res.json()).then(data => setProducts(data));
  }, []);

  const handleAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/stock/adjust", {
      method: "POST",
      body: JSON.stringify({ sku: selectedSku, quantity: newQuantity, reason }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      alert("ปรับยอดสต็อกสำเร็จ");
      window.location.reload();
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">🔧 ปรับยอดสต็อก (Adjustment)</h1>
      <form onSubmit={handleAdjust} className="bg-white p-6 rounded-lg shadow space-y-4">
        <select className="w-full p-2 border rounded" onChange={(e) => setSelectedSku(e.target.value)} required>
          <option value="">-- เลือกสินค้าที่ต้องการปรับยอด --</option>
          {products.map((p: any) => (
            <option key={p.sku} value={p.sku}>{p.name} (ปัจจุบัน: {p.quantity})</option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="จำนวนที่ถูกต้อง" 
          className="w-full p-2 border rounded" 
          onChange={(e) => setNewQuantity(Number(e.target.value))}
          required 
        />
        <textarea 
          placeholder="เหตุผลการปรับยอด (เช่น สินค้าชำรุด, ของหาย)" 
          className="w-full p-2 border rounded"
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>
        <button className="w-full bg-orange-600 text-white py-2 rounded">ยืนยันการปรับยอด</button>
      </form>
    </div>
  );
}