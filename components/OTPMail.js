



export default function OtpEmail({OTP}) {
  const otp=OTP
  const year = new Date().getFullYear();

  return (
    <div style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
      className="min-h-screen bg-[#04050e] flex items-center justify-center py-10 px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px rgba(124,58,237,0.35);} 50%{box-shadow:0 0 40px rgba(124,58,237,0.65);} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        @keyframes digitPop { 0%{transform:scale(0.8);opacity:0;} 70%{transform:scale(1.08);} 100%{transform:scale(1);opacity:1;} }
        @keyframes shimmer { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
        @keyframes timerBlink { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
        .glow-logo { animation: glowPulse 3s ease-in-out infinite; }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
        .digit-pop { animation: digitPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .shimmer-brand {
          background: linear-gradient(90deg,#a78bfa,#7c3aed,#c4b5fd,#7c3aed,#a78bfa);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .timer-badge { animation: timerBlink 2s ease-in-out infinite; }
      `}</style>

      {/* Email card — fixed 520px like a real inbox */}
      <div className="w-full fade-up" style={{ maxWidth: 520 }}>

        {/* ── Brand header ── */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="glow-logo w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white"
            style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}>
            TC
          </div>
          <span className="text-xl font-semibold text-white tracking-tight"
            style={{ fontFamily: "'Sora',sans-serif" }}>
            Trendy Crafts
          </span>
        </div>

        {/* ── Main card ── */}
        <div className="relative rounded-3xl overflow-hidden"
          style={{
            background: "#070817",
            border: "1px solid #1a1d38",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          }}>

          {/* Top shimmer line */}
          <div className="h-0.5 w-full"
            style={{ background: "linear-gradient(90deg,transparent,#7c3aed,transparent)" }} />

          {/* Body */}
          <div className="px-10 pt-10 pb-8">

            {/* Lock icon */}
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.22)",
              }}>
              🔐
            </div>

            {/* Heading */}
            <h1 className="text-[22px] font-semibold text-white mb-2"
              style={{ fontFamily: "'Sora',sans-serif", letterSpacing: "-0.3px" }}>
              Your Login OTP
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Use the code below to sign in to your{" "}
              <span className="shimmer-brand font-semibold">Trendy Crafts</span>{" "}
              account. This code is for you only.
            </p>

            {/* ── OTP box ── */}
            <div className="rounded-2xl p-7 mb-7 text-center"
              style={{
                background: "linear-gradient(135deg,rgba(124,58,237,0.13),rgba(109,40,217,0.06))",
                border: "1px solid rgba(124,58,237,0.28)",
              }}>
              {/* Digit boxes */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {otp.split("").map((digit, i) => (
                  <div key={i} className="digit-pop flex items-center justify-center rounded-xl text-3xl font-bold"
                    style={{
                      width: 58, height: 68,
                      background: "#0a0c1e",
                      border: "2px solid #7c3aed",
                      color: "#c4b5fd",
                      boxShadow: "0 0 18px rgba(124,58,237,0.28)",
                      animationDelay: `${i * 80}ms`,
                      fontFamily: "'Sora',sans-serif",
                    }}>
                    {digit}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-600 tracking-[2px] uppercase">One-Time Password</p>
            </div>

            {/* ── Timer badge ── */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7 timer-badge"
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.22)",
              }}>
              <span className="text-sm">⏱</span>
              <span className="text-xs font-medium" style={{ color: "#fbbf24" }}>
                Valid for <strong>15 minutes only</strong> — expires soon
              </span>
            </div>

            {/* Divider */}
            <div className="h-px w-full mb-6" style={{ background: "#1a1d35" }} />

            {/* ── Warning box ── */}
            <div className="rounded-xl p-4 mb-6 flex gap-3"
              style={{
                background: "rgba(239,68,68,0.07)",
                border: "1px solid rgba(239,68,68,0.2)",
                borderLeft: "3px solid #ef4444",
              }}>
              <span className="text-base mt-0.5 shrink-0">🚨</span>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: "#fca5a5" }}>
                  Never share this code with anyone
                </p>
                <p className="text-xs leading-relaxed text-gray-500">
                  Trendy Crafts will{" "}
                  <strong style={{ color: "#f87171" }}>never</strong>{" "}
                  ask for your OTP via call, chat, or email. If someone is
                  asking — it is a scam. Please ignore and report immediately.
                </p>
              </div>
            </div>

            {/* Fine print */}
            <p className="text-xs text-gray-600 leading-relaxed">
              If you didn't request this OTP, you can safely ignore this email.
              Your account remains secure and no changes have been made.
            </p>
          </div>

          {/* Bottom shimmer line */}
          <div className="h-px w-full"
            style={{ background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.22),transparent)" }} />

          {/* ── Footer ── */}
          <div className="px-10 py-4 flex items-center justify-between"
            style={{ background: "#05060f" }}>
            <p className="text-[11px] text-gray-700">
              © {year} Trendy Crafts · All rights reserved
            </p>
            <div className="flex gap-4">
              {["Privacy", "Terms", "Support"].map(l => (
                <a key={l} href="#"
                  className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors no-underline">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Below card note */}
        <p className="text-center text-[11px] text-gray-700 mt-5 leading-relaxed">
          This is an automated message from Trendy Crafts.<br />
          Please do not reply to this email.
        </p>
      </div>
    </div>
  );
}