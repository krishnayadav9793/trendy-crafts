"use client"
import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";

const supportTopics = [
  "Order Issue",
  "Shipping & Delivery",
  "Return & Refund",
  "Product Inquiry",
  "Payment Problem",
  "Other",
];

export default function SupportPage() {
  const [form, setForm]           = useState({ name: "", email: "", topic: "", query: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]     = useState(null);
  const [menuOpen, setMenuOpen]   = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.query) setSubmitted(true);
  };

  const inputBase =
    "w-full bg-[#0d0f1e] border rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all duration-300 text-sm font-light tracking-wide";
  const inputFocus   = "border-purple-500 shadow-[0_0_0_3px_rgba(139,92,246,0.15)]";
  const inputDefault = "border-[#1e2240]";

  return (
    <div className="min-h-screen bg-[#05060f] text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');`}</style>

      {/* ── Navbar ── */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-[#1a1d35] sticky top-0 z-30 bg-[#05060f]/90 backdrop-blur-md">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center text-xs font-bold">
            TC
          </div>
          <span className="font-semibold text-base tracking-tight">Trendy Crafts</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="/"        className="hover:text-white transition-colors">Home</a>
          <a href="#"        className="hover:text-white transition-colors">Products</a>
          <a href="#"        className="hover:text-white transition-colors">Deals</a>
          <a href="/support" className="text-purple-400 font-medium">Support</a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a href="/dashboard" className="hidden sm:flex p-1 hover:bg-white/5 rounded-full border border-transparent hover:border-white/10 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-white/20">
              <User className="w-4 h-4 text-slate-300" />
            </div>
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0c1a] border-b border-[#1a1d35] px-6 py-5 flex flex-col gap-4 text-sm font-medium z-20">
          <a href="/"        onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors">Home</a>
          <a href="#"        onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors">Products</a>
          <a href="#"        onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors">Deals</a>
          <a href="/support" onClick={() => setMenuOpen(false)} className="text-purple-400">Support</a>
          <a href="/dashboard" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white transition-colors">Dashboard</a>
        </div>
      )}

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[600px] h-[250px] md:h-[300px] bg-purple-700 opacity-10 rounded-full blur-[100px]" />
          <div className="absolute top-10 right-10 w-48 md:w-64 h-48 md:h-64 bg-violet-600 opacity-5 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center px-4 md:px-6 pt-12 md:pt-16 pb-8 md:pb-10">
          <div className="inline-flex items-center gap-2 bg-[#13152a] border border-[#2a2d50] rounded-full px-4 py-1.5 text-xs text-purple-400 font-medium mb-5 md:mb-6">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
            We reply within 24 hours
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 md:mb-4 leading-tight">
            How can we{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
              help you?
            </span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm md:max-w-md mx-auto">
            Have a question about your order or our products? Send us a message and our team will get back to you.
          </p>
        </div>
      </div>

      {/* ── Form / Success card ── */}
      <div className="w-full max-w-lg mx-auto px-4 md:px-6 pb-16 md:pb-20">
        {!submitted ? (
          <div className="bg-[#0a0c1a] border border-[#1a1d35] rounded-2xl p-6 md:p-8 shadow-[0_8px_60px_rgba(0,0,0,0.5)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Name + Email side-by-side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-400 tracking-widest uppercase">Your Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Aisha Khan"
                    required
                    className={`${inputBase} ${focused === "name" ? inputFocus : inputDefault}`}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-400 tracking-widest uppercase">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    required
                    className={`${inputBase} ${focused === "email" ? inputFocus : inputDefault}`}
                  />
                </div>
              </div>

              {/* Topic chips */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-400 tracking-widest uppercase">Topic</label>
                <div className="flex flex-wrap gap-2">
                  {supportTopics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm({ ...form, topic: t })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                        form.topic === t
                          ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                          : "bg-[#0d0f1e] border-[#1e2240] text-gray-400 hover:border-purple-600 hover:text-purple-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-400 tracking-widest uppercase">Your Message</label>
                <textarea
                  name="query"
                  value={form.query}
                  onChange={handleChange}
                  onFocus={() => setFocused("query")}
                  onBlur={() => setFocused(null)}
                  placeholder="Describe your issue or question in detail..."
                  required
                  rows={5}
                  maxLength={500}
                  className={`${inputBase} resize-none leading-relaxed ${focused === "query" ? inputFocus : inputDefault}`}
                />
                <div className="text-right text-xs text-gray-600">{form.query.length} / 500</div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group relative w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
                style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </button>
            </form>

            {/* Footer info */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-6 pt-6 border-t border-[#1a1d35]">
              {[
                { icon: "📧", text: "support@trendycrafts.com" },
                { icon: "⏱", text: "24h response" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Success */
          <div className="bg-[#0a0c1a] border border-[#1a1d35] rounded-2xl p-10 md:p-12 text-center shadow-[0_8px_60px_rgba(0,0,0,0.5)]">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">Message Sent!</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Thanks, <span className="text-purple-400">{form.name}</span>. We'll reply to{" "}
              <span className="text-purple-400 break-all">{form.email}</span> within 24 hours.
            </p>
            <button
              onClick={() => { setForm({ name: "", email: "", topic: "", query: "" }); setSubmitted(false); }}
              className="px-6 py-2.5 rounded-xl border border-[#2a2d50] text-sm text-gray-400 hover:text-white hover:border-purple-500 transition-all duration-200"
            >
              Send Another Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}