import { connectDB } from "@/lib/mongodb";
import Supplier from "@/models/Supplier";

export default async function SuppliersPage() {
  await connectDB();
  const suppliers = await Supplier.find().sort({ createdAt: -1 });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🏢 รายชื่อผู้จัดจำหน่าย (Suppliers)</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + เพิ่มคู่ค้าใหม่
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((s: any) => (
          <div key={s._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg text-gray-800">{s.name}</h3>
            <p className="text-sm text-gray-600 mt-1">📞 {s.contact || "ไม่ได้ระบุ"}</p>
            <p className="text-sm text-gray-500">📍 {s.address || "ไม่มีข้อมูลที่อยู่"}</p>
          </div>
        ))}
        {suppliers.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500 bg-gray-50 rounded-lg">
            ยังไม่มีข้อมูลผู้จัดจำหน่าย
          </div>
        )}
      </div>
    </div>
  );
}