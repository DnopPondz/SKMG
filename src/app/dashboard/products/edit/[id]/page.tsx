"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", category: "", price: 0, minStock: 5, unit: "ชิ้น" });

  useEffect(() => {
    fetch(`/api/products/${id}`).then(res => res.json()).then(data => setForm(data));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      alert("อัปเดตข้อมูลสำเร็จ");
      router.push("/dashboard/products");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">✏️ แก้ไขข้อมูลสินค้า</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow space-y-4">
        {/* สร้าง Input เหมือนหน้า Add Product แต่ใช้ค่าจาก state 'form' */}
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600">
          บันทึกการแก้ไข
        </button>
      </form>
    </div>
  );
}