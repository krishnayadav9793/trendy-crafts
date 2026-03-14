"use client"

import { useState, useEffect } from "react";

const sidebarLinks = [
  { icon: "🏠", label: "Home",          id: "home",      href: "/"          },
  { icon: "⊞", label: "Dashboard",     id: "dashboard", href: "/dashboard" },
  { icon: "🛍", label: "My Orders",    id: "orders",    href: "#"          },
  { icon: "♡", label: "Wishlist",      id: "wishlist",  href: "#"          },
  { icon: "📦", label: "Track Package",id: "track",     href: "#"          },
  { icon: "💬", label: "Support",      id: "support",   href: "/support"   },
  { icon: "⚙",  label: "Settings",    id: "settings",  href: "#"          },
];

const orders = [
  { id: "#TC-4821", product: "Customized Prayer Mat", date: "Mar 8, 2026",  status: "Delivered",  amount: "100", img: "🕌" },
  { id: "#TC-4820", product: "Nikkah Pen",            date: "Mar 5, 2026",  status: "Shipped",    amount: "100", img: "✒️" },
  { id: "#TC-4819", product: "Eid Hamper",            date: "Feb 28, 2026", status: "Processing", amount: "899", img: "🎁" },
  { id: "#TC-4818", product: "Customized Prayer Mat", date: "Feb 20, 2026", status: "Delivered",  amount: "100", img: "🕌" },
];

const wishlist = [
  { name: "Customized Prayer Mat", price: "100",  badge: "🕌" },
  { name: "Nikkah Pen Set",        price: "150",  badge: "✒️" },
  { name: "Eid Hamper Deluxe",     price: "1299", badge: "🎁" },
];

const statusColors = {
  Delivered:  { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  Shipped:    { bg: "bg-blue-500/10",    text: "text-blue-400",    dot: "bg-blue-400"    },
  Processing: { bg: "bg-amber-500/10",   text: "text-amber-400",   dot: "bg-amber-400"   },
};

const stats = [
  { label: "Total Orders", value: "24",     change: "+3 this month",    icon: "📦", color: "from-violet-600/20 to-purple-900/10" },
  { label: "Total Spent",  value: "₹4,820", change: "+₹899 this month", icon: "💰", color: "from-fuchsia-600/20 to-pink-900/10"  },
  { label: "Wishlist",     value: "7",      change: "2 on sale now",    icon: "♡",  color: "from-rose-600/20 to-red-900/10"      },
];

export default function Dashboard() {
  const [active,       setActive]       = useState("dashboard");
  const [sidebarOpen,  setSidebarOpen]  = useState(true);   // desktop collapsed/expanded
  const [mobileOpen,   setMobileOpen]   = useState(false);  // mobile drawer open
  const [wishing,      setWishing]      = useState("");
  const [time,         setTime]         = useState(new Date());
  const [User,         setUser]         = useState({ name: "" });

  // Greeting
  useEffect(() => {
    const h = time.getHours();
    const g = h < 12 ? "Good Morning!" : h < 17 ? "Good Afternoon!" : h < 21 ? "Good Evening!" : "Good Night!";
    if (wishing !== g) setWishing(g);
    const t = setTimeout(() => setTime(new Date()), 60000);
    return () => clearTimeout(t);
  }, [time]);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user", {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const { data } = await res.json();
        setUser(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchUser();
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const initial = User.name?.[0]?.toUpperCase() ?? "?";

  // ── Shared sidebar nav content ─────────────────────────────────────────────
  const SidebarContent = ({ collapsed }) => (
    <>
      {/* Logo */}
      <div className={`flex items-center gap-3 mb-10 ${collapsed ? "px-3 justify-center" : "px-4"}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-xs font-bold shrink-0"
          style={{ boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}>
          TC
        </div>
        {!collapsed && (
          <span className="font-semibold text-base tracking-tight truncate">Trendy Crafts</span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 px-2 flex-1">
        {sidebarLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={() => { setActive(link.id); setMobileOpen(false); }}
            className={`flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200
              ${collapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5"}
              ${active === link.id
                ? "bg-gradient-to-r from-purple-600/30 to-violet-600/10 text-purple-300 border border-purple-500/20"
                : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
              }`}
            title={collapsed ? link.label : undefined}
          >
            <span className="text-base shrink-0">{link.icon}</span>
            {!collapsed && <span className="truncate">{link.label}</span>}
          </a>
        ))}
      </nav>

      {/* User pill */}
      <div className={`mx-2 mt-4 p-3 rounded-xl bg-[#0d0f20] border border-[#1a1d35] flex items-center
        ${collapsed ? "justify-center gap-0" : "gap-3"}`}>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-xs font-bold shrink-0">
          {initial}
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-xs font-semibold truncate">{User.name || "—"}</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#04050e] text-white flex" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0c1a; }
        ::-webkit-scrollbar-thumb { background: #2d1f6e; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-100%); } to { opacity:1; transform:translateX(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .slide-in { animation: slideIn 0.25s ease forwards; }
        .stat-card:hover { transform: translateY(-2px); transition: transform 0.2s ease; }
      `}</style>

      {/* ── Mobile overlay backdrop ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ───────────────────────────────────────────────────── */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-40 flex flex-col py-6
        bg-[#070817] border-r border-[#151830]
        transition-transform duration-300 ease-in-out
        md:hidden
        ${mobileOpen ? "translate-x-0 slide-in" : "-translate-x-full"}
      `}>
        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#1a1d35] flex items-center justify-center text-gray-400 hover:text-white text-sm"
        >
          ✕
        </button>
        <SidebarContent collapsed={false} />
      </aside>

      {/* ── Desktop sidebar ─────────────────────────────────────────────────── */}
      <aside className={`
        hidden md:flex flex-col py-6 relative z-20 shrink-0
        bg-[#070817] border-r border-[#151830]
        transition-all duration-300
        ${sidebarOpen ? "w-60" : "w-16"}
      `}>
        <SidebarContent collapsed={!sidebarOpen} />

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-[#1a1d35] border border-[#2a2d50] flex items-center justify-center text-xs text-gray-400 hover:text-white transition-colors z-10"
        >
          {sidebarOpen ? "‹" : "›"}
        </button>
      </aside>

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar */}
        <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-[#151830] bg-[#04050e]/80 backdrop-blur-sm sticky top-0 z-10 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-colors shrink-0"
              onClick={() => setMobileOpen(true)}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div className="min-w-0">
              <h1 className="text-sm md:text-base font-semibold tracking-tight truncate">
                {wishing}{User.name ? `, ${User.name}` : ""} 👋
              </h1>
              <p className="text-[11px] text-gray-500 mt-0.5 hidden sm:block">
                Here's what's happening with your account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Search — hidden on small screens */}
            <div className="hidden lg:flex items-center gap-2 bg-[#0d0f1e] border border-[#1e2240] rounded-xl px-3 py-2 w-44">
              <span className="text-gray-500 text-xs">⌕</span>
              <input
                placeholder="Search orders..."
                className="bg-transparent text-xs text-gray-300 placeholder-gray-600 outline-none w-full"
              />
            </div>

            {/* Cart */}
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-[#0d0f1e] border border-[#1e2240] flex items-center justify-center cursor-pointer hover:border-purple-500/50 transition-colors">
                <span className="text-sm">🛒</span>
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full text-[9px] flex items-center justify-center font-bold">3</span>
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-xs font-bold cursor-pointer shrink-0">
              {initial}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8">

          {/* Ambient blobs */}
          <div className="fixed top-20 right-20 w-96 h-96 bg-purple-700/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="fixed bottom-20 left-40 w-64 h-64 bg-violet-600/6 rounded-full blur-[100px] pointer-events-none" />

          {/* Stats grid — 1 col mobile, 3 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`stat-card bg-gradient-to-br ${s.color} border border-[#1a1d35] rounded-2xl p-4 md:p-5 fade-up cursor-default`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <span className="text-xl md:text-2xl">{s.icon}</span>
                  <span className="text-[10px] text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full font-medium">↑</span>
                </div>
                <p className="text-xl md:text-2xl font-semibold tracking-tight mb-1">{s.value}</p>
                <p className="text-[11px] text-gray-500">{s.label}</p>
                <p className="text-[10px] text-purple-400 mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          {/* Bottom grid — stacks on mobile, 3-col on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Orders table — takes 2/3 width on desktop */}
            <div
              className="lg:col-span-2 bg-[#070817] border border-[#151830] rounded-2xl overflow-hidden fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-[#151830]">
                <h2 className="font-semibold text-sm tracking-tight">Recent Orders</h2>
                <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">View all →</button>
              </div>
              <div className="divide-y divide-[#0f1226]">
                {orders.map((order) => {
                  const sc = statusColors[order.status];
                  return (
                    <div key={order.id} className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-3.5 hover:bg-white/[0.02] transition-colors">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#0d0f1e] border border-[#1e2240] flex items-center justify-center text-base md:text-lg shrink-0">
                        {order.img}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium truncate">{order.product}</p>
                        <p className="text-[10px] md:text-[11px] text-gray-500 mt-0.5">{order.id} · {order.date}</p>
                      </div>
                      {/* Hide status badge on very small screens */}
                      <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full ${sc.bg} shrink-0`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        <span className={`text-[11px] font-medium ${sc.text}`}>{order.status}</span>
                      </div>
                      <p className="text-xs md:text-sm font-semibold text-gray-200 shrink-0">₹{order.amount}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">

              {/* PRO badge */}
              <div
                className="relative rounded-2xl p-5 md:p-6 overflow-hidden fade-up"
                style={{
                  animationDelay: "280ms",
                  background: "linear-gradient(135deg, #3b1fa3 0%, #1e0a5e 50%, #0d0521 100%)",
                  border: "1px solid rgba(124,58,237,0.3)",
                }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                <span className="inline-block text-[10px] font-bold tracking-widest text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 rounded-full mb-3 uppercase">
                  PRO Member
                </span>
                <p className="font-semibold text-sm md:text-base mb-1">Exclusive perks active</p>
                <p className="text-xs text-purple-300/70 leading-relaxed">
                  Priority shipping, early access, and member-only discounts.
                </p>
                <div className="mt-4 w-full h-1.5 bg-purple-900/50 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-purple-400">340 pts</span>
                  <span className="text-[10px] text-purple-500">500 pts for Gold</span>
                </div>
              </div>

              {/* Wishlist */}
              <div
                className="bg-[#070817] border border-[#151830] rounded-2xl overflow-hidden fade-up"
                style={{ animationDelay: "360ms" }}
              >
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

              {/* Quick support */}
              <div
                className="bg-[#070817] border border-[#151830] rounded-2xl p-5 fade-up"
                style={{ animationDelay: "440ms" }}
              >
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