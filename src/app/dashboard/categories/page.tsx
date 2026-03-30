"use client";
import { useState, useEffect } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" }
    });
    
    if (res.ok) {
      setName("");
      fetchCategories();
    } else {
      alert("ไม่สามารถเพิ่มหมวดหมู่ได้");
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📁 จัดการหมวดหมู่สินค้า</h1>
      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อหมวดหมู่ใหม่" 
          className="p-2 border rounded w-64" 
          required 
        />
        <button 
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "กำลังเพิ่ม..." : "เพิ่มหมวดหมู่"}
        </button>
      </form>
      <div className="bg-white shadow rounded-lg p-4 max-w-md">
        <h2 className="font-semibold mb-3 border-b pb-2">รายการหมวดหมู่ทั้งหมด</h2>
        <ul className="divide-y">
          {categories.length > 0 ? categories.map((cat: any) => (
            <li key={cat._id} className="py-2 flex justify-between items-center">
              <span>{cat.name}</span>
            </li>
          )) : <p className="text-gray-500 py-2">ยังไม่มีหมวดหมู่</p>}
        </ul>
      </div>
    </div>
  );
}