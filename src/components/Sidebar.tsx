import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 px-2 text-blue-400">SKMG Stock</div>
      <nav className="flex-1 space-y-1">
        <Link href="/dashboard" className="block p-3 hover:bg-gray-800 rounded transition">📊 แดชบอร์ด</Link>
        <Link href="/dashboard/products" className="block p-3 hover:bg-gray-800 rounded transition">📦 คลังสินค้า</Link>
        <Link href="/dashboard/stock-in" className="block p-3 hover:bg-gray-800 rounded transition">📥 รับสินค้าเข้า</Link>
        <Link href="/dashboard/stock-out" className="block p-3 hover:bg-gray-800 rounded transition">📤 เบิกสินค้าออก</Link>
        <Link href="/dashboard/transactions" className="block p-3 hover:bg-gray-800 rounded transition">📜 ประวัติธุรกรรม</Link>
        <Link href="/dashboard/reports" className="block p-3 hover:bg-gray-800 rounded transition">📑 รายงานสรุป</Link>
      </nav>
    </aside>
  );
}