"use client"
import { useState } from "react";

const initialItems = [
  { id: 1, name: "Customized Prayer Mat", variant: "Red Embroidery", price: 100, qty: 1, badge: "🕌", tag: "PRO", stock: 5 },
  { id: 2, name: "Nikkah Pen", variant: "Gold Rose Edition", price: 100, qty: 2, badge: "✒️", tag: "PRO", stock: 8 },
  { id: 3, name: "Eid Hamper", variant: "Deluxe Bundle", price: 899, qty: 1, badge: "🎁", tag: "PRO", stock: 3 },
];

const suggested = [
  { id: 4, name: "Prayer Beads", price: 120, badge: "📿" },
  { id: 5, name: "Attar Gift Set", price: 299, badge: "🌸" },
  { id: 6, name: "Islamic Art Print", price: 199, badge: "🖼️" },
];

const SHIPPING_THRESHOLD = 1000;

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [removed, setRemoved] = useState(null);

  const updateQty = (id, delta) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, Math.min(item.stock, item.qty + delta)) } : item
    ));
  };

  const removeItem = (id) => {
    const item = items.find(i => i.id === id);
    setRemoved(item);
    setItems(prev => prev.filter(i => i.id !== id));
    setTimeout(() => setRemoved(null), 3500);
  };

  const undoRemove = () => {
    if (removed) {
      setItems(prev => [...prev, removed]);
      setRemoved(null);
    }
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "TRENDY10") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
  };

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : 60;
  const total = subtotal - discount + shipping;
  const freeShippingLeft = Math.max(0, SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="min-h-screen bg-[#04050e] text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);} }
        @keyframes fadeOut { 0%{opacity:1;transform:translateX(0);}100%{opacity:0;transform:translateX(-20px);} }
        @keyframes shimmer { 0%{background-position:-200% center;}100%{background-position:200% center;} }
        @keyframes toastIn { from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);} }
        @keyframes progressFill { from{width:0;}to{width:var(--fill);} }
        .fade-up { animation: fadeUp 0.45s ease forwards; }
        .slide-down { animation: slideDown 0.3s ease forwards; }
        .toast-in { animation: toastIn 0.35s ease forwards; }
        .shimmer-text {
          background: linear-gradient(90deg,#a78bfa,#7c3aed,#c4b5fd,#7c3aed,#a78bfa);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .item-row { transition: all 0.25s ease; }
        .item-row:hover { background: rgba(255,255,255,0.02); }
        .qty-btn:hover { background: rgba(124,58,237,0.2); border-color: #7c3aed; color: #c4b5fd; }
        .remove-btn:hover { color: #f87171; border-color: rgba(239,68,68,0.4); background: rgba(239,68,68,0.07); }
        .suggest-card:hover { border-color: rgba(124,58,237,0.45); background: rgba(124,58,237,0.05); transform: translateY(-2px); }
        .checkout-btn:hover { box-shadow: 0 0 32px rgba(124,58,237,0.45); }
        .coupon-btn:hover { border-color: rgba(124,58,237,0.5); color: #c4b5fd; }
      `}</style>

      {/* Navbar */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 border-b border-[#151830]"
        style={{ background: "rgba(4,5,14,0.85)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}>
            TC
          </div>
          <span className="font-semibold text-base tracking-tight">Trendy Crafts</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          {["Products", "Deals", "Support"].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-[#0d0f1e] border border-[#1e2240] flex items-center justify-center cursor-pointer">
              <span className="text-sm">🛒</span>
            </div>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ background: "#7c3aed" }}>{items.length}</span>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1a1d35] flex items-center justify-center text-xs font-semibold text-purple-300">
            AK
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Ambient glow */}
        <div className="fixed top-24 right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "rgba(124,58,237,0.07)", filter: "blur(120px)" }} />
        <div className="fixed bottom-20 left-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: "rgba(109,40,217,0.05)", filter: "blur(100px)" }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-8 fade-up">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-1">Your Cart</h1>
            <p className="text-sm text-gray-500">{items.length} {items.length === 1 ? "item" : "items"} in your bag</p>
          </div>
          <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
            ← Continue Shopping
          </a>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 fade-up">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl mb-6"
              style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
              🛒
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500 mb-6">Looks like you haven't added anything yet</p>
            <button className="px-6 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}>
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left — Items */}
            <div className="flex-1 flex flex-col gap-4">

              {/* Free shipping bar */}
              {freeShippingLeft > 0 && (
                <div className="rounded-2xl px-5 py-4 fade-up"
                  style={{ background: "#070817", border: "1px solid #1a1d35" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">
                      Add <span className="text-purple-300 font-medium">₹{freeShippingLeft}</span> more for free shipping
                    </span>
                    <span className="text-xs text-gray-600">₹{SHIPPING_THRESHOLD}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1a1d35" }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%`,
                        background: "linear-gradient(90deg,#7c3aed,#a78bfa)"
                      }} />
                  </div>
                </div>
              )}

              {shipping === 0 && (
                <div className="rounded-2xl px-5 py-3 flex items-center gap-2 slide-down"
                  style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <span className="text-sm">🎉</span>
                  <span className="text-xs font-medium text-emerald-400">You've unlocked free shipping!</span>
                </div>
              )}

              {/* Cart items */}
              <div className="rounded-2xl overflow-hidden fade-up"
                style={{ background: "#070817", border: "1px solid #1a1d35" }}>
                {/* Table header */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b"
                  style={{ borderColor: "#0f1226" }}>
                  <span className="col-span-5 text-[11px] text-gray-600 uppercase tracking-widest">Product</span>
                  <span className="col-span-2 text-[11px] text-gray-600 uppercase tracking-widest text-center">Price</span>
                  <span className="col-span-3 text-[11px] text-gray-600 uppercase tracking-widest text-center">Quantity</span>
                  <span className="col-span-2 text-[11px] text-gray-600 uppercase tracking-widest text-right">Total</span>
                </div>

                {items.map((item, idx) => (
                  <div key={item.id} className="item-row grid grid-cols-12 gap-4 items-center px-6 py-5"
                    style={{ borderBottom: idx < items.length - 1 ? "1px solid #0f1226" : "none",
                      animationDelay: `${idx * 60}ms` }}>

                    {/* Product */}
                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: "#0d0f1e", border: "1px solid #1e2240" }}>
                        {item.badge}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.2)" }}>
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.variant}</p>
                        {item.qty >= item.stock && (
                          <p className="text-[10px] text-amber-400 mt-1">Only {item.stock} left!</p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-4 md:col-span-2 flex md:justify-center">
                      <span className="text-sm text-gray-300">₹{item.price}</span>
                    </div>

                    {/* Qty */}
                    <div className="col-span-5 md:col-span-3 flex items-center justify-center gap-2">
                      <button className="qty-btn w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center"
                        style={{ background: "#0d0f1e", border: "1px solid #1e2240", color: "#9ca3af" }}
                        onClick={() => updateQty(item.id, -1)}>
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button className="qty-btn w-8 h-8 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center"
                        style={{ background: "#0d0f1e", border: "1px solid #1e2240", color: "#9ca3af" }}
                        onClick={() => updateQty(item.id, 1)}>
                        +
                      </button>
                    </div>

                    {/* Total + remove */}
                    <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-3">
                      <span className="text-sm font-semibold text-white">₹{item.price * item.qty}</span>
                      <button className="remove-btn w-7 h-7 rounded-lg transition-all duration-200 flex items-center justify-center text-gray-600"
                        style={{ border: "1px solid transparent" }}
                        onClick={() => removeItem(item.id)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested products */}
              <div className="fade-up" style={{ animationDelay: "200ms" }}>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">You might also like</p>
                <div className="grid grid-cols-3 gap-3">
                  {suggested.map(s => (
                    <div key={s.id} className="suggest-card rounded-xl p-4 cursor-pointer transition-all duration-200"
                      style={{ background: "#070817", border: "1px solid #1a1d35" }}>
                      <span className="text-2xl mb-3 block">{s.badge}</span>
                      <p className="text-xs font-medium text-gray-300 mb-1 leading-snug">{s.name}</p>
                      <p className="text-xs text-purple-400 font-semibold">₹{s.price}</p>
                      <button className="mt-3 w-full py-1.5 rounded-lg text-[11px] font-medium transition-all"
                        style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)", color: "#a78bfa" }}>
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Summary */}
            <div className="lg:w-80 shrink-0 flex flex-col gap-4">

              {/* Coupon */}
              <div className="rounded-2xl p-5 fade-up"
                style={{ background: "#070817", border: "1px solid #1a1d35", animationDelay: "100ms" }}>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Coupon Code</p>
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={e => { setCoupon(e.target.value); setCouponError(false); }}
                    placeholder="e.g. TRENDY10"
                    className="flex-1 bg-[#0a0c1e] rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all"
                    style={{
                      border: couponError ? "1px solid rgba(239,68,68,0.5)" : couponApplied ? "1px solid rgba(16,185,129,0.4)" : "1px solid #1e2240",
                    }}
                    onKeyDown={e => e.key === "Enter" && applyCoupon()}
                  />
                  <button onClick={applyCoupon}
                    className="coupon-btn px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
                    style={{ background: "#0a0c1e", border: "1px solid #2a2d50", color: "#9ca3af" }}>
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 slide-down">
                    <span>✓</span> 10% discount applied!
                  </p>
                )}
                {couponError && (
                  <p className="text-xs text-red-400 mt-2 slide-down">Invalid coupon code. Try TRENDY10</p>
                )}
              </div>

              {/* Order summary */}
              <div className="rounded-2xl p-5 fade-up"
                style={{ background: "#070817", border: "1px solid #1a1d35", animationDelay: "160ms" }}>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Order Summary</p>

                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
                    <span className="text-gray-300">₹{subtotal}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-sm slide-down">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="text-xs">✂</span> Coupon TRENDY10
                      </span>
                      <span className="text-emerald-400">−₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    {shipping === 0
                      ? <span className="text-emerald-400 font-medium">Free</span>
                      : <span className="text-gray-300">₹{shipping}</span>
                    }
                  </div>
                </div>

                <div className="h-px mb-4" style={{ background: "#1a1d35" }} />

                <div className="flex justify-between items-center mb-5">
                  <span className="font-semibold text-white">Total</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-white">₹{total}</span>
                    {couponApplied && (
                      <p className="text-[10px] text-emerald-400 mt-0.5">You saved ₹{discount}!</p>
                    )}
                  </div>
                </div>

                {/* Checkout btn */}
                <button className="checkout-btn w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Secure Checkout
                </button>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 mt-4">
                  {[["🔒", "SSL Secure"], ["↩", "Easy Returns"], ["🚚", "Fast Delivery"]].map(([icon, label]) => (
                    <div key={label} className="flex flex-col items-center gap-0.5">
                      <span className="text-base">{icon}</span>
                      <span className="text-[10px] text-gray-600">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment methods */}
              <div className="rounded-2xl px-5 py-4 flex items-center justify-between fade-up"
                style={{ background: "#070817", border: "1px solid #1a1d35", animationDelay: "220ms" }}>
                <span className="text-[11px] text-gray-600">We accept</span>
                <div className="flex gap-2">
                  {["Visa", "MC", "UPI", "NB"].map(p => (
                    <div key={p} className="px-2 py-1 rounded text-[10px] font-bold"
                      style={{ background: "#0d0f1e", border: "1px solid #1e2240", color: "#6b7280" }}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Undo toast */}
      {removed && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 toast-in flex items-center gap-4 px-5 py-3 rounded-2xl z-50"
          style={{ background: "#111326", border: "1px solid #2a2d50", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          <span className="text-sm text-gray-300">
            <span className="text-white font-medium">{removed.name}</span> removed
          </span>
          <button onClick={undoRemove}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)", color: "#c4b5fd" }}>
            Undo
          </button>
        </div>
      )}
    </div>
  );
}