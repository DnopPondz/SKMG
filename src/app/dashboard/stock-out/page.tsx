"use client";
import { useState, useEffect } from "react";

export default function StockOutPage() {
  const [products, setProducts] = useState([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetch("/api/products").then(res => res.json()).then(data => setProducts(data));
  }, []);

  const handleStockOut = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/stock", {
      method: "POST",
      body: JSON.stringify({ sku: selectedSku, type: "OUT", amount }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    if (res.ok) {
      alert("เบิกจ่ายสินค้าสำเร็จ");
      window.location.reload();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">📤 บันทึกเบิกสินค้าออก</h1>
      <form onSubmit={handleStockOut} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block mb-2">เลือกสินค้า</label>
          <select className="w-full p-2 border rounded" onChange={(e) => setSelectedSku(e.target.value)} required>
            <option value="">-- เลือกสินค้า --</option>
            {products.map((p: any) => (
              <option key={p.sku} value={p.sku}>{p.name} (คงเหลือ: {p.quantity})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">จำนวนที่เบิก</label>
          <input type="number" className="w-full p-2 border rounded" onChange={(e) => setAmount(Number(e.target.value))} min="1" required />
        </div>
        <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">ยืนยันการเบิกจ่าย</button>
      </form>
    </div>
  );
}