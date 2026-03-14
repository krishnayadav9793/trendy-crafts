"use client"
import { useState } from "react";
import { Alert } from "@/components/alert.js";
import { useAlert } from "@/hooks/useAlert";
import { redirect, useRouter } from "next/navigation";
export default function SignupPage() {
  const route=useRouter();
  const { alerts, fire, dismiss } = useAlert();
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    email: "", password: "", name: "", phone: "", gender: "",
  });

  const handleSubmit = async () => {

    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password, name: form.name, gender: form.gender, phone: form.phone }),
      });
      const data = await res.json();
      if (data.msg == "User already exsists") {
        fire("error", data.msg, "User with this email already exsist. Check email and Try Again!!");
        setLoading(false)
      }else{
        fire("success", data.msg, "Account Created Successfully!!");
        setTimeout(() => { setLoading(false); setDone(true); }, 1800);
      }
    } catch (e) {
      fire("error", "Something went Wrong", "Check your Internet. Try Again!!");
    }
    
  };

  const wrapCls = (name) =>
    `flex items-center gap-3 bg-[#0a0c1e] border rounded-xl px-4 py-3 transition-all duration-300 ${focused === name
      ? "border-purple-500 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
      : "border-[#1e2240] hover:border-[#2e3260]"
    }`;

  return (
    <div
      className="min-h-screen bg-[#04050e] text-white flex  items-center justify-center relative overflow-hidden py-10"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
        @keyframes spinSlow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
        @keyframes orbit { from { transform:rotate(0deg) translateX(180px) rotate(0deg); } to { transform:rotate(360deg) translateX(180px) rotate(-360deg); } }
        @keyframes orbit2 { from { transform:rotate(180deg) translateX(130px) rotate(-180deg); } to { transform:rotate(540deg) translateX(130px) rotate(-540deg); } }
        @keyframes checkPop { 0% { transform:scale(0) rotate(-10deg); opacity:0; } 70% { transform:scale(1.15); } 100% { transform:scale(1); opacity:1; } }
        @keyframes pulseRing { 0% { transform:scale(1); opacity:0.6; } 100% { transform:scale(2.4); opacity:0; } }
        @keyframes pulseRing2 { 0% { transform:scale(1); opacity:0.4; } 100% { transform:scale(2.0); opacity:0; } }
        @keyframes pulseRing3 { 0% { transform:scale(1); opacity:0.25; } 100% { transform:scale(1.7); opacity:0; } }
        .fade-up { animation: fadeUp 0.55s ease forwards; }
        .float-el { animation: float 7s ease-in-out infinite; }
        .spin-slow { animation: spinSlow 22s linear infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #a78bfa, #7c3aed, #c4b5fd, #7c3aed, #a78bfa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .orbit-dot { animation: orbit 8s linear infinite; }
        .orbit-dot2 { animation: orbit2 12s linear infinite; }
        .check-pop { animation: checkPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .pulse-ring-1 { animation: pulseRing 2.4s ease-out infinite; }
        .pulse-ring-2 { animation: pulseRing2 2.4s ease-out 0.6s infinite; }
        .pulse-ring-3 { animation: pulseRing3 2.4s ease-out 1.2s infinite; }
      `}</style>
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2.5 min-w-fit  max-w-[calc(100vw-2rem)] pointer-events-none">
        {alerts.map(a => (
          <div key={a.id} className="pointer-events-auto">
            <Alert
              type={a.type}
              title={a.title}
              message={a.message}
              duration={a.duration}
              onClose={() => dismiss(a.id)}
            />
          </div>
        ))}
      </div>
      {/* BG effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-8%] right-[-4%] w-[480px] h-[480px] bg-purple-800/18 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-8%] left-[-4%] w-[380px] h-[380px] bg-violet-700/13 rounded-full blur-[110px]" />
        <div className="spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] opacity-[0.035] rounded-full"
          style={{ border: "1px dashed rgba(168,85,247,1)" }} />
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
        {[
          { e: "🕌", t: "8%", l: "6%", d: "0s" }, { e: "✒️", t: "15%", r: "8%", d: "2s" },
          { e: "🎁", b: "18%", l: "5%", d: "1s" }, { e: "📿", t: "55%", r: "5%", d: "3.5s" },
          { e: "🌙", b: "12%", r: "12%", d: "1.8s" }, { e: "⭐", t: "42%", l: "3%", d: "4.2s" },
          { e: "🌸", t: "30%", r: "4%", d: "0.6s" },
        ].map((x, i) => (
          <div key={i} className="float-el absolute text-2xl opacity-[0.18]"
            style={{ top: x.t, bottom: x.b, left: x.l, right: x.r, animationDelay: x.d }}>{x.e}</div>
        ))}
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md mx-4 fade-up">
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-purple-500/18 via-violet-600/4 to-transparent pointer-events-none" />
        <div className="relative bg-[#070817]/92 backdrop-blur-xl border border-[#1a1d38] rounded-3xl overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.65)]">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

          <div className="px-8 py-9">
            {!done ? (
              <>
                {/* ── Logo with glowing pulse rings ── */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative flex items-center justify-center w-[90px] h-[90px] mb-4">
                    {/* Three staggered expanding rings */}
                    <div className="pulse-ring-1 absolute w-[60px] h-[60px] rounded-full"
                      style={{ border: "1.5px solid rgba(139,92,246,0.7)" }} />
                    <div className="pulse-ring-2 absolute w-[60px] h-[60px] rounded-full"
                      style={{ border: "1px solid rgba(167,139,250,0.5)" }} />
                    <div className="pulse-ring-3 absolute w-[60px] h-[60px] rounded-full"
                      style={{ border: "1px solid rgba(196,181,253,0.3)" }} />
                    {/* Soft glow halo behind logo */}
                    <div className="absolute w-[70px] h-[70px] rounded-full"
                      style={{ background: "rgba(124,58,237,0.18)", filter: "blur(10px)" }} />
                    {/* Logo badge */}
                    <div className="relative z-10 w-[58px] h-[58px] rounded-2xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
                        boxShadow: "0 0 0 1px rgba(139,92,246,0.4), 0 0 24px rgba(124,58,237,0.6), 0 0 48px rgba(124,58,237,0.25)"
                      }}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M6 8 Q14 3 22 8 L22 16 Q14 24 6 20 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
                        <path d="M10 12 Q14 9 18 12 L18 16 Q14 21 10 18 Z" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.8)" strokeWidth="0.6" />
                        <circle cx="14" cy="14" r="2.2" fill="white" opacity="0.9" />
                        <path d="M14 4 L14 7 M14 21 L14 24 M4 14 L7 14 M21 14 L24 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight mb-1">Create your account</h1>
                  <p className="text-sm text-gray-500">
                    Join <span className="shimmer-text font-semibold">Trendy Crafts</span> — it's free
                  </p>
                </div>

                {/* Social buttons */}
                <div className="flex gap-3 mb-4">
                  {[{ l: "Google", i: "G" }, { l: "Facebook", i: "f" }].map(s => (
                    <button key={s.l} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1e2240] bg-[#0a0c1e] hover:border-purple-500/40 hover:bg-purple-500/5 transition-all text-sm text-gray-400 hover:text-white">
                      <span className="font-bold">{s.i}</span><span>{s.l}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-[#1a1d35]" />
                  <span className="text-[10px] text-gray-600 tracking-widest uppercase">or with email</span>
                  <div className="flex-1 h-px bg-[#1a1d35]" />
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4">
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Email Address</label>
                    <div className={wrapCls("email")}>
                      <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <input type="email" placeholder="you@example.com" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Password</label>
                    <div className={wrapCls("password")}>
                      <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <input type={showPass ? "text" : "password"} placeholder="Min. 8 characters"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                        className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1 tracking-wider" />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-600 hover:text-gray-300 transition-colors shrink-0">
                        {showPass
                          ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                          : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        }
                      </button>
                    </div>
                    {form.password && (
                      <div className="flex gap-1 mt-1">
                        {[1, 2, 3, 4].map(n => (
                          <div key={n} className={`flex-1 h-1 rounded-full transition-all duration-300 ${form.password.length >= n * 2
                              ? n <= 1 ? "bg-red-500" : n <= 2 ? "bg-amber-500" : n <= 3 ? "bg-yellow-400" : "bg-emerald-500"
                              : "bg-[#1e2240]"
                            }`} />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Full Name</label>
                    <div className={wrapCls("name")}>
                      <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <input placeholder="Aisha Khan" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Phone Number</label>
                    <div className={wrapCls("phone")}>
                      <span className="text-xs text-gray-500 border-r border-[#2a2d50] pr-3 shrink-0">+91</span>
                      <input type="tel" placeholder="98765 43210" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1" />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Gender</label>
                    <div className="flex gap-2">
                      {["Female", "Male", "Other"].map(g => (
                        <button key={g} type="button"
                          onClick={() => setForm({ ...form, gender: g })}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 ${form.gender === g
                              ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-[0_0_12px_rgba(124,58,237,0.2)]"
                              : "bg-[#0a0c1e] border-[#1e2240] text-gray-500 hover:border-[#2e3260] hover:text-gray-300"
                            }`}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button onClick={handleSubmit} disabled={loading}
                  className="relative mt-7 w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide overflow-hidden group transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,58,237,0.45)] disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  <span className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}>
                    Create Account ✨
                  </span>
                  {loading && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </span>
                  )}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </button>

                <p className="text-center text-xs text-gray-600 mt-4">
                  Already have an account?{" "}
                  <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors" onClick={()=>redirect("/login")}>Sign in →</button>
                </p>
              </>
            ) : (
              /* Success */
              <div className="flex flex-col items-center py-6 text-center fade-up gap-4">
                <div className="relative flex items-center justify-center w-[110px] h-[110px]">
                  <div className="pulse-ring-1 absolute w-[72px] h-[72px] rounded-full"
                    style={{ border: "1.5px solid rgba(139,92,246,0.7)" }} />
                  <div className="pulse-ring-2 absolute w-[72px] h-[72px] rounded-full"
                    style={{ border: "1px solid rgba(167,139,250,0.5)" }} />
                  <div className="pulse-ring-3 absolute w-[72px] h-[72px] rounded-full"
                    style={{ border: "1px solid rgba(196,181,253,0.3)" }} />
                  <div className="check-pop relative z-10 w-[72px] h-[72px] rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)", boxShadow: "0 0 40px rgba(124,58,237,0.55)" }}>
                    <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-1.5">Welcome aboard! 🎉</h2>
                  <p className="text-gray-500 text-sm mb-1">
                    Your <span className="shimmer-text font-semibold">Trendy Crafts</span> account is ready
                  </p>
                  <p className="text-gray-600 text-xs">{form.name && `Hey ${form.name}, `}let's explore something beautiful.</p>
                </div>
                <div className="flex gap-3 mt-2 w-full">
                  <button className="flex-1 py-3 rounded-xl border border-[#1e2240] bg-[#0a0c1e] hover:border-purple-500/40 text-sm text-gray-400 hover:text-white transition-all" onClick={()=>route.push("/")}>
                    Browse Products
                  </button>
                  <button className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }} onClick={()=>route.push("/dashboard")}>
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          <div className="flex items-center justify-center gap-6 py-4 bg-[#05060f]/50">
            {["Privacy", "Terms", "Help"].map(l => (
              <button key={l} className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}