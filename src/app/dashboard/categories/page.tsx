"use client";
import { useState, useEffect } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const fetchCategories = () => {
    fetch("/api/categories").then(res => res.json()).then(data => setCategories(data));
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" }
    });
    setName("");
    fetchCategories();
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded">เพิ่ม</button>
      </form>
      <div className="bg-white shadow rounded-lg p-4">
        <ul className="divide-y">
          {categories.map((cat: any) => (
            <li key={cat._id} className="py-2">{cat.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}