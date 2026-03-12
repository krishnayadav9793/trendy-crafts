"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
    const router=useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
    const userLogin =async ()=>{
        try{
            const user= await fetch(`api/auth/?email=${form.email}&password=${form.password}`,{
            credentials:"include",
        })
        console.log(user)
        router.push("/")
        }catch(err){
            console.log("log in error")
        }
        
        
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setLoggedIn(true); }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#04050e] text-white flex items-center justify-center relative overflow-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0px) rotate(0deg); } 50% { transform:translateY(-12px) rotate(2deg); } }
        @keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes pulse-ring { 0% { transform:scale(1); opacity:0.6; } 100% { transform:scale(1.5); opacity:0; } }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .float { animation: float 6s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 20s linear infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #a78bfa, #7c3aed, #c4b5fd, #7c3aed, #a78bfa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(124,58,237,0.5);
          animation: pulse-ring 2s ease-out infinite;
        }
      `}</style>

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep glow orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-800/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-violet-700/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-900/10 rounded-full blur-[100px]" />

        {/* Rotating ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] spin-slow opacity-[0.04]"
          style={{ border: "1px solid rgba(168,85,247,1)", borderRadius: "50%", borderStyle: "dashed" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.06]"
          style={{ border: "1px solid rgba(139,92,246,1)", borderRadius: "50%", animation: "spin-slow 14s linear infinite reverse" }} />

        {/* Grid dots */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Floating craft emojis */}
        {[
          { emoji: "🕌", top: "12%", left: "8%", delay: "0s", size: "text-3xl" },
          { emoji: "✒️", top: "20%", right: "10%", delay: "1.5s", size: "text-2xl" },
          { emoji: "🎁", bottom: "20%", left: "6%", delay: "3s", size: "text-3xl" },
          { emoji: "📿", top: "60%", right: "7%", delay: "0.8s", size: "text-2xl" },
          { emoji: "🌙", bottom: "10%", right: "15%", delay: "2s", size: "text-xl" },
          { emoji: "⭐", top: "45%", left: "4%", delay: "4s", size: "text-xl" },
        ].map((e, i) => (
          <div key={i} className={`absolute ${e.size} float opacity-20`}
            style={{ top: e.top, left: e.left, right: e.right, bottom: e.bottom, animationDelay: e.delay }}>
            {e.emoji}
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md mx-4 fade-up">
        {/* Card glow */}
        <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-purple-500/20 via-violet-600/5 to-transparent pointer-events-none" />

        <div className="relative bg-[#070817]/90 backdrop-blur-xl border border-[#1a1d38] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]">

          {/* Top accent bar */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

          <div className="px-8 py-10">
            {!loggedIn ? (
              <>
                {/* Logo + heading */}
                <div className="flex flex-col items-center mb-10">
                  <div className="relative pulse-ring mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                      <span className="text-2xl font-bold tracking-tight">TC</span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight mb-1">
                    Welcome back
                  </h1>
                  <p className="text-sm text-gray-500">Sign in to your <span className="shimmer-text font-semibold">Trendy Crafts</span> account</p>
                </div>

                {/* Social login */}
                <div className="flex gap-3 mb-6">
                  {[
                    { label: "Google", icon: "G" },
                    { label: "Facebook", icon: "f" },
                  ].map((s) => (
                    <button key={s.label}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1e2240] bg-[#0a0c1e] hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200 text-sm text-gray-400 hover:text-white">
                      <span className="font-bold text-base">{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-[#1a1d35]" />
                  <span className="text-[11px] text-gray-600 tracking-widest uppercase">or continue with email</span>
                  <div className="flex-1 h-px bg-[#1a1d35]" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Email</label>
                    <div className={`flex items-center gap-3 bg-[#0a0c1e] border rounded-xl px-4 py-3 transition-all duration-300 ${
                      focused === "email" ? "border-purple-500 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]" : "border-[#1e2240]"
                    }`}>
                      <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <input
                        type="email" required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1 tracking-wide"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Password</label>
                      <button type="button" className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</button>
                    </div>
                    <div className={`flex items-center gap-3 bg-[#0a0c1e] border rounded-xl px-4 py-3 transition-all duration-300 ${
                      focused === "password" ? "border-purple-500 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]" : "border-[#1e2240]"
                    }`}>
                      <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      <input
                        type={showPass ? "text" : "password"} required
                        placeholder="••••••••"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused(null)}
                        className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1 tracking-widest"
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)}
                        className="text-gray-600 hover:text-gray-300 transition-colors shrink-0">
                        {showPass ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        )}
                      </button>
                    </div>
                  </div>

                 
                  

                  {/* Submit */}
                  <button type="submit"
                    onClick={userLogin}
                    disabled={loading}
                    className="relative mt-2 w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide overflow-hidden group transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,58,237,0.45)] disabled:opacity-80"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                    <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${loading ? "opacity-0" : "opacity-100"}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
                      Sign In
                    </span>
                    {loading && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                      </span>
                    )}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </button>
                </form>

                {/* Sign up */}
                <p className="text-center text-xs text-gray-600 mt-6">
                  Don't have an account?{" "}
                  <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Create one free →</button>
                </p>
              </>
            ) : (
              /* Success state */
              <div className="flex flex-col items-center py-6 text-center fade-up">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(124,58,237,0.5)]">
                  <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-2">You're in! ✨</h2>
                <p className="text-gray-500 text-sm mb-1">Welcome back to <span className="shimmer-text font-semibold">Trendy Crafts</span></p>
                <p className="text-gray-600 text-xs">Redirecting to your dashboard...</p>
                <div className="mt-6 w-48 h-1 bg-[#1a1d35] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full animate-pulse" style={{ width: "70%" }} />
                </div>
              </div>
            )}
          </div>

          {/* Bottom accent */}
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