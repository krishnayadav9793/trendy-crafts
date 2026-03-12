"use client"
import { useState } from "react";

const steps = ["Account", "Personal", "Verify"];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [form, setForm] = useState({
    email: "", password: "", name: "", phone: "", gender: "", dob: "",
  });

  const handleOtp = (val, i) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  const handleOtpKey = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) document.getElementById(`otp-${i - 1}`)?.focus();
  };

  const next = () => {
    if (step < 2) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => { setLoading(false); setDone(true); }, 2000);
    }
  };

  const inputCls = (name) =>
    `w-full bg-[#0a0c1e] border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-300 ${
      focused === name
        ? "border-purple-500 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]"
        : "border-[#1e2240] hover:border-[#2e3260]"
    }`;

  return (
    <div
      className="min-h-screen bg-[#04050e] text-white flex items-center justify-center relative overflow-hidden py-10"
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes float { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-14px) rotate(3deg); } }
        @keyframes spin-slow { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
        @keyframes orbit { from { transform:rotate(0deg) translateX(180px) rotate(0deg); } to { transform:rotate(360deg) translateX(180px) rotate(-360deg); } }
        @keyframes orbit2 { from { transform:rotate(180deg) translateX(130px) rotate(-180deg); } to { transform:rotate(540deg) translateX(130px) rotate(-540deg); } }
        @keyframes checkPop { 0% { transform:scale(0) rotate(-10deg); opacity:0; } 70% { transform:scale(1.15) rotate(3deg); } 100% { transform:scale(1) rotate(0deg); opacity:1; } }
        @keyframes slideIn { from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        .fade-up { animation: fadeUp 0.55s ease forwards; }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        .slide-in { animation: slideIn 0.4s ease forwards; }
        .float { animation: float 7s ease-in-out infinite; }
        .spin-slow { animation: spin-slow 22s linear infinite; }
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
        .step-done { background: linear-gradient(135deg, #7c3aed, #6d28d9); }
      `}</style>

      {/* BG effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-8%] right-[-4%] w-[480px] h-[480px] bg-purple-800/18 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-8%] left-[-4%] w-[380px] h-[380px] bg-violet-700/13 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-fuchsia-800/8 rounded-full blur-[90px]" />

        {/* Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] spin-slow opacity-[0.035]"
          style={{ border: "1px dashed rgba(168,85,247,1)", borderRadius: "50%" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.05]"
          style={{ border: "1px solid rgba(139,92,246,1)", borderRadius: "50%", animation: "spin-slow 16s linear infinite reverse" }} />

        {/* Orbiting dots */}
        <div className="absolute top-1/2 left-1/2" style={{ width: 0, height: 0 }}>
          <div className="orbit-dot w-2 h-2 rounded-full bg-purple-500/40" />
          <div className="orbit-dot2 w-1.5 h-1.5 rounded-full bg-violet-400/30" />
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)", backgroundSize: "38px 38px" }} />

        {/* Floating emojis */}
        {[
          { e: "🕌", t: "8%", l: "6%", d: "0s" },
          { e: "✒️", t: "15%", r: "8%", d: "2s" },
          { e: "🎁", b: "18%", l: "5%", d: "1s" },
          { e: "📿", t: "55%", r: "5%", d: "3.5s" },
          { e: "🌙", b: "12%", r: "12%", d: "1.8s" },
          { e: "⭐", t: "42%", l: "3%", d: "4.2s" },
          { e: "🌸", t: "30%", r: "4%", d: "0.6s" },
        ].map((x, i) => (
          <div key={i} className="absolute text-2xl float opacity-[0.18]"
            style={{ top: x.t, bottom: x.b, left: x.l, right: x.r, animationDelay: x.d }}>
            {x.e}
          </div>
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
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-700 flex items-center justify-center shadow-[0_0_28px_rgba(124,58,237,0.5)] mb-4">
                    <span className="text-xl font-bold">TC</span>
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight mb-1">Create your account</h1>
                  <p className="text-sm text-gray-500">
                    Join <span className="shimmer-text font-semibold">Trendy Crafts</span> — it's free
                  </p>
                </div>

                {/* Stepper */}
                <div className="flex items-center mb-8">
                  {steps.map((label, i) => (
                    <div key={i} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                          i < step ? "step-done shadow-[0_0_14px_rgba(124,58,237,0.5)]"
                          : i === step ? "border-2 border-purple-500 text-purple-400 bg-purple-500/10"
                          : "border border-[#2a2d50] text-gray-600 bg-[#0a0c1e]"
                        }`}>
                          {i < step ? (
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                            </svg>
                          ) : i + 1}
                        </div>
                        <span className={`text-[10px] font-medium tracking-wider uppercase transition-colors ${
                          i <= step ? "text-purple-400" : "text-gray-600"
                        }`}>{label}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="flex-1 mx-2 mb-4">
                          <div className="h-px bg-[#1e2240] relative overflow-hidden">
                            <div className={`absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-violet-500 transition-all duration-700 ${
                              i < step ? "w-full" : "w-0"
                            }`} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 0 — Account */}
                {step === 0 && (
                  <div className="slide-in flex flex-col gap-4">
                    {/* Social */}
                    <div className="flex gap-3">
                      {[{ l: "Google", i: "G" }, { l: "Facebook", i: "f" }].map(s => (
                        <button key={s.l} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1e2240] bg-[#0a0c1e] hover:border-purple-500/40 hover:bg-purple-500/5 transition-all text-sm text-gray-400 hover:text-white">
                          <span className="font-bold">{s.i}</span><span>{s.l}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-[#1a1d35]" />
                      <span className="text-[10px] text-gray-600 tracking-widest uppercase">or with email</span>
                      <div className="flex-1 h-px bg-[#1a1d35]" />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Email Address</label>
                      <div className={`flex items-center gap-3 bg-[#0a0c1e] border rounded-xl px-4 py-3 transition-all duration-300 ${focused === "email" ? "border-purple-500 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]" : "border-[#1e2240] hover:border-[#2e3260]"}`}>
                        <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <input type="email" placeholder="you@example.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                          className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Password</label>
                      <div className={`flex items-center gap-3 bg-[#0a0c1e] border rounded-xl px-4 py-3 transition-all duration-300 ${focused === "password" ? "border-purple-500 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]" : "border-[#1e2240] hover:border-[#2e3260]"}`}>
                        <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                        <input type={showPass ? "text" : "password"} placeholder="Min. 8 characters"
                          value={form.password}
                          onChange={e => setForm({ ...form, password: e.target.value })}
                          onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}
                          className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1 tracking-wider" />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-600 hover:text-gray-300 transition-colors shrink-0">
                          {showPass
                            ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                            : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                          }
                        </button>
                      </div>
                      {/* Strength bar */}
                      {form.password && (
                        <div className="flex gap-1 mt-1">
                          {[1,2,3,4].map(n => (
                            <div key={n} className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                              form.password.length >= n * 2
                                ? n <= 1 ? "bg-red-500" : n <= 2 ? "bg-amber-500" : n <= 3 ? "bg-yellow-400" : "bg-emerald-500"
                                : "bg-[#1e2240]"
                            }`} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 1 — Personal */}
                {step === 1 && (
                  <div className="slide-in flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Full Name</label>
                      <div className={`flex items-center gap-3 bg-[#0a0c1e] border rounded-xl px-4 py-3 transition-all duration-300 ${focused === "name" ? "border-purple-500 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]" : "border-[#1e2240] hover:border-[#2e3260]"}`}>
                        <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <input placeholder="Aisha Khan"
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                          className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Phone Number</label>
                      <div className={`flex items-center gap-3 bg-[#0a0c1e] border rounded-xl px-4 py-3 transition-all duration-300 ${focused === "phone" ? "border-purple-500 shadow-[0_0_0_3px_rgba(124,58,237,0.12)]" : "border-[#1e2240] hover:border-[#2e3260]"}`}>
                        <span className="text-xs text-gray-500 border-r border-[#2a2d50] pr-3 shrink-0">+91</span>
                        <input type="tel" placeholder="98765 43210"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                          className="bg-transparent text-sm text-white placeholder-gray-600 outline-none flex-1" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Date of Birth</label>
                      <input type="date"
                        value={form.dob}
                        onChange={e => setForm({ ...form, dob: e.target.value })}
                        onFocus={() => setFocused("dob")} onBlur={() => setFocused(null)}
                        className={inputCls("dob")}
                        style={{ colorScheme: "dark" }} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">Gender</label>
                      <div className="flex gap-2">
                        {["Female", "Male", "Other"].map(g => (
                          <button key={g} type="button"
                            onClick={() => setForm({ ...form, gender: g })}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all duration-200 ${
                              form.gender === g
                                ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-[0_0_12px_rgba(124,58,237,0.2)]"
                                : "bg-[#0a0c1e] border-[#1e2240] text-gray-500 hover:border-[#2e3260] hover:text-gray-300"
                            }`}>
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                   
                  </div>
                )}

                {/* Step 2 — OTP */}
                {step === 2 && (
                  <div className="slide-in flex flex-col items-center gap-6">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                      <p className="text-sm font-medium mb-1">Check your email</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        We sent a 4-digit code to<br />
                        <span className="text-purple-400 font-medium">{form.email || "your@email.com"}</span>
                      </p>
                    </div>

                    <div className="flex gap-3">
                      {otp.map((val, i) => (
                        <input
                          key={i}
                          id={`otp-${i}`}
                          maxLength={1}
                          value={val}
                          onChange={e => handleOtp(e.target.value, i)}
                          onKeyDown={e => handleOtpKey(e, i)}
                          onFocus={() => setFocused(`otp-${i}`)}
                          onBlur={() => setFocused(null)}
                          className={`w-14 h-14 text-center text-xl font-bold bg-[#0a0c1e] border rounded-xl outline-none transition-all duration-300 ${
                            val ? "border-purple-500 text-purple-300 shadow-[0_0_14px_rgba(124,58,237,0.25)]" : "border-[#1e2240] text-white"
                          } ${focused === `otp-${i}` ? "shadow-[0_0_0_3px_rgba(124,58,237,0.15)]" : ""}`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-gray-600">
                      Didn't receive it?{" "}
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">Resend code</button>
                    </p>
                  </div>
                )}

                {/* Next / Submit button */}
                <button
                  onClick={next}
                  disabled={loading}
                  className="relative mt-7 w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide overflow-hidden group transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,58,237,0.45)] disabled:opacity-70"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
                  <span className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}>
                    {step < 2 ? (
                      <>Continue <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></>
                    ) : (
                      <>Verify & Create Account ✨</>
                    )}
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

                {step === 0 && (
                  <p className="text-center text-xs text-gray-600 mt-4">
                    Already have an account?{" "}
                    <button className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Sign in →</button>
                  </p>
                )}

                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} className="w-full mt-2 text-xs text-gray-600 hover:text-gray-400 transition-colors text-center">
                    ← Back
                  </button>
                )}
              </>
            ) : (
              /* Success */
              <div className="flex flex-col items-center py-6 text-center fade-up gap-4">
                <div className="relative">
                  <div className="check-pop w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.55)]">
                    <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div className="absolute -inset-3 rounded-full border border-purple-500/20 animate-ping" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-1.5">Welcome aboard! 🎉</h2>
                  <p className="text-gray-500 text-sm mb-1">
                    Your <span className="shimmer-text font-semibold">Trendy Crafts</span> account is ready
                  </p>
                  <p className="text-gray-600 text-xs">{form.name && `Hey ${form.name}, `}let's explore something beautiful.</p>
                </div>
                <div className="flex gap-3 mt-2 w-full">
                  <button className="flex-1 py-3 rounded-xl border border-[#1e2240] bg-[#0a0c1e] hover:border-purple-500/40 text-sm text-gray-400 hover:text-white transition-all">
                    Browse Products
                  </button>
                  <button className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}>
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