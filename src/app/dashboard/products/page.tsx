import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function DashboardPage() {
  const session = await auth();
  await connectDB();

  // ดึงข้อมูลวิเคราะห์สต็อก
  const products = await Product.find({});
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const lowStockItems = products.filter(p => p.quantity <= p.minStock);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        แผงควบคุม (Dashboard) - สวัสดี {session?.user?.name}
      </h1>
      
      {/* ส่วนสรุปตัวเลข (Statistics) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm font-medium">สินค้าทั้งหมด</h2>
          <p className="text-3xl font-bold text-gray-800">{totalProducts} รายการ</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h2 className="text-gray-500 text-sm font-medium">มูลค่าคลังสินค้า</h2>
          <p className="text-3xl font-bold text-gray-800">฿{totalValue.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <h2 className="text-gray-500 text-sm font-medium">สินค้าใกล้หมด</h2>
          <p className="text-3xl font-bold text-red-600">{lowStockItems.length} รายการ</p>
        </div>
      </div>

      {/* รายการแจ้งเตือนสินค้าสต็อกต่ำ (Notifications) */}
      {lowStockItems.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-red-50 px-6 py-4 border-b border-red-100">
            <h3 className="text-red-700 font-bold flex items-center">
              ⚠️ รายการสินค้าที่ต้องสั่งซื้อเพิ่ม
            </h3>
          </div>
          <ul className="divide-y divide-gray-100">
            {lowStockItems.map(item => (
              <li key={item.sku} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-bold">{item.quantity} {item.unit}</p>
                  <p className="text-xs text-gray-400">จุดสั่งเพิ่ม: {item.minStock}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}