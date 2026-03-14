// components/Alert.jsx
"use client"
import { useEffect, useRef } from "react";

const VARIANTS = {
  error: {
    bg: "bg-[#0f0408]", border: "border-[rgba(226,75,74,0.35)]",
    iconBg: "bg-[rgba(226,75,74,0.15)]", title: "text-[#f09595]",
    msg: "text-[rgba(240,149,149,0.65)]", bar: "from-[#E24B4A] to-[#a32d2d]",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  warning: {
    bg: "bg-[#0d0900]", border: "border-[rgba(239,159,39,0.35)]",
    iconBg: "bg-[rgba(239,159,39,0.15)]", title: "text-[#FAC775]",
    msg: "text-[rgba(250,199,117,0.65)]", bar: "from-[#EF9F27] to-[#854F0B]",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#EF9F27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  success: {
    bg: "bg-[#020d07]", border: "border-[rgba(29,158,117,0.35)]",
    iconBg: "bg-[rgba(29,158,117,0.15)]", title: "text-[#5DCAA5]",
    msg: "text-[rgba(93,202,165,0.65)]", bar: "from-[#1D9E75] to-[#085041]",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#1D9E75" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  info: {
    bg: "bg-[#020812]", border: "border-[rgba(55,138,221,0.35)]",
    iconBg: "bg-[rgba(55,138,221,0.15)]", title: "text-[#85B7EB]",
    msg: "text-[rgba(133,183,235,0.65)]", bar: "from-[#378ADD] to-[#185FA5]",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#378ADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
  },
};

export function Alert({ type = "info", title, message, onClose, duration = 4000 }) {
  const v = VARIANTS[type];
  const timerRef = useRef(null);

  useEffect(() => {
    if (duration && onClose) {
      timerRef.current = setTimeout(onClose, duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [duration, onClose]);

  return (
    <div
      className={`
        relative flex items-start gap-3.5 px-4 py-3.5 rounded-2xl border overflow-hidden
        ${v.bg} ${v.border}
        animate-[slideIn_0.35s_cubic-bezier(0.34,1.2,0.64,1)_forwards]
      `}
      style={{ fontFamily: "'Sora', sans-serif" }}
    >
      {/* Icon */}
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${v.iconBg}`}
        style={{ animation: "iconPop 0.4s cubic-bezier(0.34,1.4,0.64,1) 0.1s both" }}>
        {v.icon}
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0 pt-px">
        <p className={`text-[13px] font-semibold leading-snug mb-0.5 ${v.title}`}>{title}</p>
        <p className={`text-[12px] leading-relaxed ${v.msg}`}>{message}</p>
      </div>

      {/* Close */}
      {onClose && (
        <button onClick={onClose}
          className={`opacity-40 hover:opacity-100 transition-opacity p-0.5 rounded-md mt-px flex-shrink-0 ${v.title}`}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}

      {/* Auto-dismiss progress bar */}
      {duration && (
        <div className={`absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r ${v.bar} rounded-bl-2xl`}
          style={{ animation: `progressBar ${duration}ms linear forwards` }} />
      )}

      <style>{`
        @keyframes slideIn {
          from { opacity:0; transform:translateY(-10px) scale(0.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes iconPop {
          0%  { transform:scale(0.6); opacity:0; }
          70% { transform:scale(1.15); }
          100%{ transform:scale(1); opacity:1; }
        }
        @keyframes progressBar {
          from { width:100%; }
          to   { width:0%; }
        }
      `}</style>
    </div>
  );
}