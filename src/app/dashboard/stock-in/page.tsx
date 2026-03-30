"use client";
import { useState, useEffect } from "react";

export default function StockInPage() {
  const [products, setProducts] = useState([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/products").then(res => res.json()).then(data => setProducts(data));
  }, []);

  const handleStockIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/stock", {
      method: "POST",
      body: JSON.stringify({ sku: selectedSku, type: "IN", amount }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      alert("บันทึกรับสินค้าสำเร็จ");
      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">📥 บันทึกรับสินค้าเข้า</h1>
      <form onSubmit={handleStockIn} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block mb-2">เลือกสินค้า</label>
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => setSelectedSku(e.target.value)}
            required
          >
            <option value="">-- เลือกสินค้า --</option>
            {products.map((p: any) => (
              <option key={p.sku} value={p.sku}>{p.name} (คงเหลือ: {p.quantity})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">จำนวนที่รับเข้า</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded" 
            onChange={(e) => setAmount(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <button 
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "กำลังบันทึก..." : "ยืนยันการรับเข้า"}
        </button>
      </form>
    </div>
  );
}