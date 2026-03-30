import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export default async function TransactionsPage() {
  await connectDB();
  // ดึงข้อมูลประวัติจากล่าสุดไปเก่าสุด
  const logs = await Transaction.find({}).sort({ createdAt: -1 });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📜 ประวัติการทำรายการทั้งหมด</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b text-gray-600 text-sm">
            <tr>
              <th className="p-4">วันที่ / เวลา</th>
              <th className="p-4">ประเภท</th>
              <th className="p-4">สินค้า</th>
              <th className="p-4 text-right">จำนวน</th>
              <th className="p-4">ผู้ทำรายการ</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {logs.map((log) => (
              <tr key={log._id.toString()} className="hover:bg-gray-50">
                <td className="p-4 text-gray-500">
                  {new Date(log.createdAt).toLocaleString("th-TH")}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    log.type === "IN" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {log.type === "IN" ? "รับเข้า" : "เบิกจ่าย"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-medium text-gray-800">{log.productName}</div>
                  <div className="text-xs text-gray-400">SKU: {log.sku}</div>
                </td>
                <td className={`p-4 text-right font-bold ${log.type === "IN" ? "text-green-600" : "text-red-600"}`}>
                  {log.type === "IN" ? "+" : "-"}{log.amount}
                </td>
                <td className="p-4 text-gray-600">{log.userName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <div className="p-8 text-center text-gray-400">ยังไม่มีประวัติการทำรายการ</div>
        )}
      </div>
    </div>
  );
}