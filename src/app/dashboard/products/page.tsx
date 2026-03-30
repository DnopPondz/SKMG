import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { auth } from "@/lib/auth";

export default async function ProductsPage() {
  const session = await auth();
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">จัดการสินค้า</h1>
        {session?.user?.role === "admin" && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded">+ เพิ่มสินค้า</button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">SKU</th>
              <th className="p-4">ชื่อสินค้า</th>
              <th className="p-4">หมวดหมู่</th>
              <th className="p-4 text-right">ราคา</th>
              <th className="p-4 text-right">คงเหลือ</th>
              <th className="p-4">หน่วย</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((item) => (
              <tr key={item._id.toString()} className="hover:bg-gray-50">
                <td className="p-4 font-mono text-sm">{item.sku}</td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4 text-right">{item.price.toLocaleString()}</td>
                <td className={`p-4 text-right font-bold ${item.quantity <= item.minStock ? 'text-red-500' : ''}`}>
                  {item.quantity}
                </td>
                <td className="p-4 text-gray-500">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}