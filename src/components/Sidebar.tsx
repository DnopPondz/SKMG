import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-8 border-b border-gray-700 pb-4">SKMG Stock</div>
      <nav className="space-y-2">
        <Link href="/dashboard" className="block p-3 hover:bg-gray-800 rounded">📊 Dashboard</Link>
        <Link href="/dashboard/products" className="block p-3 hover:bg-gray-800 rounded">📦 สินค้าคงคลัง</Link>
        <Link href="/dashboard/stock-in" className="block p-3 hover:bg-gray-800 rounded">📥 รับสินค้าเข้า</Link>
        <Link href="/dashboard/stock-out" className="block p-3 hover:bg-gray-800 rounded">📤 เบิกสินค้าออก</Link>
        <Link href="/dashboard/reports" className="block p-3 hover:bg-gray-800 rounded">📑 รายงาน</Link>
      </nav>
    </div>
  );
}