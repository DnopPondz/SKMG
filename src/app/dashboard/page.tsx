import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function DashboardPage() {
  const session = await auth();
  await connectDB();

  // ดึงข้อมูลสรุป
  const totalProducts = await Product.countDocuments();
  const lowStockItems = await Product.find({ $expr: { $lte: ["$quantity", "$minStock"] } });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">ยินดีต้อนรับ, {session?.user?.name} ({session?.user?.role})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h2 className="text-blue-800 font-semibold">สินค้าทั้งหมด</h2>
          <p className="text-3xl font-bold">{totalProducts} รายการ</p>
        </div>
        
        <div className="bg-red-100 p-6 rounded-lg shadow">
          <h2 className="text-red-800 font-semibold">สินค้าใกล้หมด</h2>
          <p className="text-3xl font-bold">{lowStockItems.length} รายการ</p>
        </div>
        
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h2 className="text-green-800 font-semibold">สิทธิ์การใช้งาน</h2>
          <p className="text-xl">{session?.user?.role === 'admin' ? 'ผู้ดูแลระบบ' : 'พนักงาน'}</p>
        </div>
      </div>

      {/* รายการสินค้าใกล้หมด */}
      {lowStockItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-red-600">⚠️ แจ้งเตือนสินค้าใกล้หมด</h3>
          <ul className="bg-white border rounded shadow divide-y">
            {lowStockItems.map(item => (
              <li key={item.sku} className="p-4 flex justify-between">
                <span>{item.name} (SKU: {item.sku})</span>
                <span className="font-bold text-red-500">คงเหลือ: {item.quantity} {item.unit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}