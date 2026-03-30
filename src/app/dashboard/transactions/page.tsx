import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { auth } from "@/lib/auth";

export default async function TransactionsPage() {
  await connectDB();
  // ดึงข้อมูลประวัติย้อนหลัง เรียงจากใหม่ไปเก่า
  const transactions = await Transaction.find().sort({ createdAt: -1 }).limit(50);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📜 ประวัติการทำรายการสต็อก</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-semibold">วันที่/เวลา</th>
              <th className="p-4 font-semibold">สินค้า</th>
              <th className="p-4 font-semibold">ประเภท</th>
              <th className="p-4 font-semibold">จำนวน</th>
              <th className="p-4 font-semibold">ผู้ทำรายการ</th>
              <th className="p-4 font-semibold">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t: any) => (
              <tr key={t._id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm">
                  {new Date(t.createdAt).toLocaleString("th-TH")}
                </td>
                <td className="p-4">
                  <span className="font-medium">{t.productName}</span>
                  <p className="text-xs text-gray-500">{t.productSku}</p>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    t.type === "IN" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {t.type === "IN" ? "รับเข้า" : "จ่ายออก"}
                  </span>
                </td>
                <td className="p-4 font-bold">{t.amount}</td>
                <td className="p-4 text-sm text-gray-600">{t.userName}</td>
                <td className="p-4 text-sm text-gray-500">{t.note}</td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-gray-500">ยังไม่มีประวัติรายการ</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}