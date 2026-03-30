import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Transaction from "@/models/Transaction";
import { AlertTriangle, Package, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default async function DashboardPage() {
  await connectDB();

  // 1. ดึงข้อมูลสรุป
  const totalProducts = await Product.countDocuments();
  const lowStockProducts = await Product.find({
    $expr: { $lte: ["$quantity", "$minStock"] }
  });

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">📊 ภาพรวมคลังสินค้า</h1>

      {/* สรุปตัวเลขสำคัญ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div className="flex items-center gap-4">
            <Package className="text-blue-500" size={32} />
            <div>
              <p className="text-gray-500 text-sm">สินค้าทั้งหมด</p>
              <p className="text-2xl font-bold">{totalProducts} รายการ</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
          <div className="flex items-center gap-4">
            <AlertTriangle className="text-orange-500" size={32} />
            <div>
              <p className="text-gray-500 text-sm">สินค้าสต็อกต่ำ</p>
              <p className="text-2xl font-bold text-orange-600">{lowStockProducts.length} รายการ</p>
            </div>
          </div>
        </div>
      </div>

      {/* รายการสินค้าที่ต้องสั่งเพิ่ม (Low Stock Alert) */}
      {lowStockProducts.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h2 className="text-orange-800 font-bold mb-4 flex items-center gap-2">
            <AlertTriangle size={20} /> สินค้าที่ต้องสั่งเพิ่มด่วน!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.map((p: any) => (
              <div key={p._id} className="bg-white p-4 rounded-lg shadow-sm border border-orange-100">
                <p className="font-bold text-gray-800">{p.name}</p>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-gray-500">คงเหลือ: <b className="text-red-500">{p.quantity}</b></span>
                  <span className="text-gray-500">จุดแจ้งเตือน: <b>{p.minStock}</b></span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-red-500 h-1.5 rounded-full" 
                    style={{ width: `${(p.quantity / p.minStock) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}