"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { 
  LayoutDashboard, 
  Package, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Settings, 
  History, 
  BarChart3,
  Tags
} from "lucide-react";

export default function Sidebar() {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  // เมนูสำหรับทุกคนที่ Login แล้ว
  const commonMenus = [
    { name: "แดชบอร์ด", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "รายการสินค้า", href: "/dashboard/products", icon: <Package size={20} /> },
  ];

  // เมนูเฉพาะ Admin (การจัดการสต็อกและตั้งค่า)
  const adminMenus = [
    { name: "รับสินค้าเข้า", href: "/dashboard/stock-in", icon: <ArrowDownCircle size={20} /> },
    { name: "จ่ายสินค้าออก", href: "/dashboard/stock-out", icon: <ArrowUpCircle size={20} /> },
    { name: "ปรับสต็อก", href: "/dashboard/stock-adjust", icon: <Settings size={20} /> },
    { name: "จัดการหมวดหมู่", href: "/dashboard/categories", icon: <Tags size={20} /> },
    { name: "ประวัติรายการ", href: "/dashboard/transactions", icon: <History size={20} /> },
    { name: "รายงาน", href: "/dashboard/reports", icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen p-4">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-blue-400">Inventory System</h1>
        <p className="text-xs text-slate-400 mt-1">Status: {userRole?.toUpperCase()}</p>
      </div>

      <nav className="space-y-1">
        {commonMenus.map((menu) => (
          <Link key={menu.href} href={menu.href} className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg transition">
            {menu.icon} <span>{menu.name}</span>
          </Link>
        ))}

        {/* แสดงเมนู Admin เฉพาะเมื่อ User มี Role เป็น admin เท่านั้น */}
        {userRole === "admin" && (
          <div className="pt-4 mt-4 border-t border-slate-700">
            <p className="text-xs font-semibold text-slate-500 mb-2 px-2 uppercase">Admin Tools</p>
            {adminMenus.map((menu) => (
              <Link key={menu.href} href={menu.href} className="flex items-center gap-3 p-3 hover:bg-slate-700 rounded-lg transition">
                {menu.icon} <span>{menu.name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
}