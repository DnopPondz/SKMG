"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const [form, setForm] = useState({
    sku: "", name: "", category: "", price: 0, minStock: 5, unit: "ชิ้น"
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products/add", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      alert("เพิ่มสินค้าสำเร็จ");
      router.push("/dashboard/products");
    } else {
      alert("เกิดข้อผิดพลาด: SKU นี้อาจมีอยู่แล้ว");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🆕 เพิ่มสินค้าใหม่</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">SKU / รหัสสินค้า</label>
            <input type="text" required className="w-full p-2 border rounded" 
              onChange={e => setForm({...form, sku: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อสินค้า</label>
            <input type="text" required className="w-full p-2 border rounded" 
              onChange={e => setForm({...form, name: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">หมวดหมู่</label>
            <input type="text" required className="w-full p-2 border rounded" 
              onChange={e => setForm({...form, category: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">หน่วยนับ</label>
            <input type="text" placeholder="ชิ้น, แพ็ค, ลัง" className="w-full p-2 border rounded" 
              onChange={e => setForm({...form, unit: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">ราคาต่อหน่วย</label>
            <input type="number" required className="w-full p-2 border rounded" 
              onChange={e => setForm({...form, price: Number(e.target.value)})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">จุดแจ้งเตือนสินค้าต่ำ (Min Stock)</label>
            <input type="number" className="w-full p-2 border rounded" 
              onChange={e => setForm({...form, minStock: Number(e.target.value)})} />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">
          บันทึกข้อมูลสินค้า
        </button>
      </form>
    </div>
  );
}