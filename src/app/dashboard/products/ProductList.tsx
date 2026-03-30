"use client";
import { useState } from "react";

export default function ProductList({ initialProducts }: { initialProducts: any[] }) {
  const [search, setSearch] = useState("");

  const filteredProducts = initialProducts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="🔍 ค้นหาชื่อสินค้า หรือ SKU..." 
        className="w-full md:w-1/3 p-2 border rounded mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          {/* ... ส่วนของ <thead> เหมือนเดิม ... */}
          <tbody className="divide-y">
            {filteredProducts.map((item) => (
              <tr key={item._id.toString()}>
                {/* ... แสดงข้อมูลสินค้า ... */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}