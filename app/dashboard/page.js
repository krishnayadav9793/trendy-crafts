"use client"

import { icons } from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  {icon:"🏠",label:"Home",id:"home",ref:"/"},
  { icon: "⊞", label: "Dashboard", id: "dashboard" },
  { icon: "🛍", label: "My Orders", id: "orders" },
  { icon: "♡", label: "Wishlist", id: "wishlist" },
  { icon: "📦", label: "Track Package", id: "track" },
  { icon: "💬", label: "Support", id: "support" },
  { icon: "⚙", label: "Settings", id: "settings" },
];

const orders = [
  { id: "#TC-4821", product: "Customized Prayer Mat", date: "Mar 8, 2026", status: "Delivered", amount: "100", img: "🕌" },
  { id: "#TC-4820", product: "Nikkah Pen", date: "Mar 5, 2026", status: "Shipped", amount: "100", img: "✒️" },
  { id: "#TC-4819", product: "Eid Hamper", date: "Feb 28, 2026", status: "Processing", amount: "899", img: "🎁" },
  { id: "#TC-4818", product: "Customized Prayer Mat", date: "Feb 20, 2026", status: "Delivered", amount: "100", img: "🕌" },
];

const wishlist = [
  { name: "Customized Prayer Mat", price: "100", tag: "PRO", badge: "🕌" },
  { name: "Nikkah Pen Set", price: "150", tag: "PRO", badge: "✒️" },
  { name: "Eid Hamper Deluxe", price: "1299", tag: "PRO", badge: "🎁" },
];

const statusColors = {
  Delivered: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  Shipped: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
  Processing: { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400" },
};

const stats = [
  { label: "Total Orders", value: "24", change: "+3 this month", icon: "📦", color: "from-violet-600/20 to-purple-900/10" },
  { label: "Total Spent", value: "₹4,820", change: "+₹899 this month", icon: "💰", color: "from-fuchsia-600/20 to-pink-900/10" },
  { label: "Wishlist Items", value: "7", change: "2 on sale now", icon: "♡", color: "from-rose-600/20 to-red-900/10" },
  { label: "Reward Points", value: "340", change: "+60 this week", icon: "⭐", color: "from-amber-600/20 to-orange-900/10" },
];

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className="min-h-screen bg-[#04050e] text-white flex"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0c1a; }
        ::-webkit-scrollbar-thumb { background: #2d1f6e; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 20px rgba(124,58,237,0.3); } 50% { box-shadow: 0 0 40px rgba(124,58,237,0.6); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .glow-card { animation: glowPulse 3s ease-in-out infinite; }
        .stat-card:hover { transform: translateY(-2px); transition: transform 0.2s ease; }
      `}</style>

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-60" : "w-16"} transition-all duration-300 bg-[#070817] border-r border-[#151830] flex flex-col py-6 relative z-20 shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-xs font-bold shrink-0 glow-card">
            TC
          </div>
          {sidebarOpen && (
            <span className="font-semibold text-base tracking-tight truncate">Trendy Crafts</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-2 flex-1">
          {sidebarLinks.map((link) => (
            <a
              key={link.id}
              href={link.ref}
              onClick={() => setActive(link.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                active === link.id
                  ? "bg-gradient-to-r from-purple-600/30 to-violet-600/10 text-purple-300 border border-purple-500/20"
                  : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              <span className="text-base shrink-0">{link.icon}</span>
              {sidebarOpen && <span className="truncate">{link.label}</span>}
            </a>
          ))}
        </nav>

        {/* User */}
        <div className={`mx-2 mt-4 p-3 rounded-xl bg-[#0d0f20] border border-[#1a1d35] flex items-center gap-3`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-xs font-bold shrink-0">
            AK
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-xs font-semibold truncate">Aisha Khan</p>
              <p className="text-[10px] text-gray-500 truncate">PRO Member</p>
            </div>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#1a1d35] border border-[#2a2d50] flex items-center justify-center text-xs text-gray-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? "‹" : "›"}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-[#151830] bg-[#04050e]/80 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Good afternoon, Aisha 👋</h1>
            <p className="text-xs text-gray-500 mt-0.5">Here's what's happening with your account</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-[#0d0f1e] border border-[#1e2240] rounded-xl px-3 py-2 w-48">
              <span className="text-gray-500 text-xs">⌕</span>
              <input placeholder="Search orders..." className="bg-transparent text-xs text-gray-300 placeholder-gray-600 outline-none w-full" />
            </div>
            {/* Bell */}
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-[#0d0f1e] border border-[#1e2240] flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors">
                <span className="text-sm">🔔</span>
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full text-[9px] flex items-center justify-center font-bold">2</span>
            </div>
            {/* Cart */}
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-[#0d0f1e] border border-[#1e2240] flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors">
                <span className="text-sm">🛒</span>
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full text-[9px] flex items-center justify-center font-bold">3</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8">
          {/* Ambient blobs */}
          <div className="fixed top-20 right-20 w-96 h-96 bg-purple-700/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="fixed bottom-20 left-40 w-64 h-64 bg-violet-600/6 rounded-full blur-[100px] pointer-events-none" />

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`stat-card bg-gradient-to-br ${s.color} border border-[#1a1d35] rounded-2xl p-5 fade-up cursor-default`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-[10px] text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full font-medium">↑</span>
                </div>
                <p className="text-2xl font-semibold tracking-tight mb-1">{s.value}</p>
                <p className="text-[11px] text-gray-500">{s.label}</p>
                <p className="text-[10px] text-purple-400 mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders Table */}
            <div className="lg:col-span-2 bg-[#070817] border border-[#151830] rounded-2xl overflow-hidden fade-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#151830]">
                <h2 className="font-semibold text-sm tracking-tight">Recent Orders</h2>
                <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">View all →</button>
              </div>
              <div className="divide-y divide-[#0f1226]">
                {orders.map((order, i) => {
                  const sc = statusColors[order.status];
                  return (
                    <div key={order.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-[#0d0f1e] border border-[#1e2240] flex items-center justify-center text-lg shrink-0">
                        {order.img}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{order.product}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{order.id} · {order.date}</p>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${sc.bg} shrink-0`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                        <span className={`text-[11px] font-medium ${sc.text}`}>{order.status}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-200 shrink-0 ml-2">₹{order.amount}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {/* PRO Badge */}
              <div
                className="relative rounded-2xl p-6 overflow-hidden fade-up"
                style={{
                  animationDelay: "280ms",
                  background: "linear-gradient(135deg, #3b1fa3 0%, #1e0a5e 50%, #0d0521 100%)",
                  border: "1px solid rgba(124,58,237,0.3)",
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                <span className="inline-block text-[10px] font-bold tracking-widest text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 rounded-full mb-3 uppercase">PRO Member</span>
                <p className="font-semibold text-base mb-1">You're getting exclusive perks</p>
                <p className="text-xs text-purple-300/70 leading-relaxed">Priority shipping, early access to new crafts, and member-only discounts.</p>
                <div className="mt-4 w-full h-1.5 bg-purple-900/50 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-purple-400">340 pts</span>
                  <span className="text-[10px] text-purple-500">500 pts for Gold</span>
                </div>
              </div>

              {/* Wishlist */}
              <div className="bg-[#070817] border border-[#151830] rounded-2xl overflow-hidden fade-up" style={{ animationDelay: "360ms" }}>
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#151830]">
                  <h2 className="font-semibold text-sm">Wishlist</h2>
                  <span className="text-[10px] text-gray-500">{wishlist.length} items</span>
                </div>
                <div className="divide-y divide-[#0f1226]">
                  {wishlist.map((item) => (
                    <div key={item.name} className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors group">
                      <div className="w-9 h-9 rounded-lg bg-[#0d0f1e] border border-[#1e2240] flex items-center justify-center text-base shrink-0">
                        {item.badge}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{item.name}</p>
                        <p className="text-[11px] text-purple-400 mt-0.5">₹{item.price}</p>
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-purple-600 hover:bg-purple-500 px-2.5 py-1 rounded-lg font-medium">
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Support */}
              <div className="bg-[#070817] border border-[#151830] rounded-2xl p-5 fade-up" style={{ animationDelay: "440ms" }}>
                <h2 className="font-semibold text-sm mb-3">Need Help?</h2>
                <div className="flex flex-col gap-2">
                  {["Track my order", "Request a return", "Contact support"].map((action) => (
                    <button
                      key={action}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-[#1e2240] hover:border-purple-500/40 hover:bg-purple-500/5 transition-all text-xs text-gray-400 hover:text-gray-200 group"
                    >
                      <span>{action}</span>
                      <span className="text-gray-600 group-hover:text-purple-400 transition-colors">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}