import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function ReportsPage() {
  await connectDB();
  const products = await Product.find({});
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const outOfStock = products.filter(p => p.quantity === 0).length;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📑 รายงานสรุปคลังสินค้า</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <p className="text-gray-500">มูลค่ารวมสินค้าคงคลัง</p>
          <h2 className="text-3xl font-bold">฿{totalValue.toLocaleString()}</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
          <p className="text-gray-500">สินค้าที่หมดสต๊อก</p>
          <h2 className="text-3xl font-bold text-red-600">{outOfStock} รายการ</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">สถานะสินค้าปัจจุบัน</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">ชื่อสินค้า</th>
              <th className="py-2 text-right">จำนวน</th>
              <th className="py-2 text-right">ราคาต่อหน่วย</th>
              <th className="py-2 text-right">มูลค่ารวม</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.sku} className="border-b text-sm">
                <td className="py-2">{p.name}</td>
                <td className="py-2 text-right">{p.quantity}</td>
                <td className="py-2 text-right">{p.price.toLocaleString()}</td>
                <td className="py-2 text-right">{(p.price * p.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}