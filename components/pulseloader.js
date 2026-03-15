// components/PulseLoader.jsx
"use client"
import Image from "next/image";
const VARIANTS = {
    purple: {
        rings: ["rgba(139,92,246,0.75)", "rgba(167,139,250,0.5)", "rgba(196,181,253,0.3)"],
        core: "linear-gradient(135deg,#7c3aed,#6d28d9)",
        glow: "0 0 24px rgba(124,58,237,0.6)",
    },
    success: {
        rings: ["rgba(29,158,117,0.75)", "rgba(29,158,117,0.45)", "rgba(29,158,117,0.25)"],
        core: "linear-gradient(135deg,#1D9E75,#085041)",
        glow: "0 0 28px rgba(29,158,117,0.55)",
    },
    error: {
        rings: ["rgba(226,75,74,0.75)", "rgba(226,75,74,0.45)", "rgba(226,75,74,0.25)"],
        core: "linear-gradient(135deg,#E24B4A,#A32D2D)",
        glow: "0 0 28px rgba(226,75,74,0.5)",
    },
};

const SIZES = {
    sm: { wrap: 80, core: 32, dot: 10, ringBorder: "1.5px" },
    md: { wrap: 120, core: 52, dot: 16, ringBorder: "1.5px" },
    lg: { wrap: 160, core: 72, dot: 22, ringBorder: "2px" },
};

// Icon shown inside the core — pass null to show default dot
const CoreIcon = ({ size, icon }) => {
    if (icon === "check")
        return (
            <svg width={size * 0.44} height={size * 0.44} fill="none" viewBox="0 0 24 24"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
            </svg>
        );
    if (icon === "x")
        return (
            <svg width={size * 0.4} height={size * 0.4} fill="none" viewBox="0 0 24 24"
                stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        );
    if (icon === "logo")
        return (
            <Image src='https://res.cloudinary.com/dz6h1ksg1/image/upload/v1772383600/555077461_17907845199244243_6534801052402177053_n_osh5we.jpg'
                width={50}
                height={50}
                alt="trendy-craft"
                className='rounded-[50%]' />
        );
    // default: white dot
    return (
        <div style={{
            width: size * 0.31,
            height: size * 0.31,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.9)",
        }} />
    );
};

/**
 * PulseLoader
 *
 * @param {string}  size      — "sm" | "md" | "lg"  (default "md")
 * @param {string}  variant   — "purple" | "success" | "error"  (default "purple")
 * @param {string}  icon      — "dot" | "logo" | "check" | "x"  (default "dot")
 * @param {boolean} square    — rounded-2xl core instead of circle (for logo badge style)
 * @param {number}  speed     — animation duration in ms  (default 2000)
 */
export default function PulseLoader({
    size = "md",
    variant = "purple",
    icon = "dot",
    square = false,
    speed = 2000,
}) {
    const s = SIZES[size];
    const v = VARIANTS[variant];
    const half = s.core / 2;
    const stagger = speed / (1000 * 3); // seconds between rings
    const isLogo = icon === "logo";

    const ringStyle = (delay) => ({
        position: "absolute",
        width: s.core,
        height: s.core,
        borderRadius: "50%",
        borderStyle: "solid",
        borderWidth: s.ringBorder,
        top: "50%",
        left: "50%",
        marginLeft: -half,
        marginTop: -half,
        transformOrigin: "center",
        animation: `tcPulseExpand ${speed}ms ease-out ${delay}s infinite`,
    });

    return (
        <>
            <style>{`
        @keyframes tcPulseExpand {
          0%   { transform: translate(0,0) scale(1); opacity: 0.75; }
          100% { transform: translate(0,0) scale(3.2); opacity: 0; }
        }
        @keyframes tcCorePulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(0.88); }
        }
      `}</style>

            <div style={{
                position: "relative",
                width: s.wrap,
                height: s.wrap,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
            }}>
                {/* Three staggered expanding rings */}
                {v.rings.map((color, i) => (
                    <div key={i} style={{
                        ...ringStyle(i * stagger),
                        borderColor: color,
                    }} />
                ))}

                {/* Core */}
                <div style={{
                    position: "relative",
                    zIndex: 2,
                    width: s.core,
                    height: s.core,
                    borderRadius: "50%",
                    // No background or glow when showing logo
                    background: isLogo ? "transparent" : v.core,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isLogo ? "none" : v.glow,
                    animation: `tcCorePulse ${speed}ms ease-in-out infinite`,
                }}>
                    <CoreIcon size={s.core} icon={icon} />
                </div>
            </div>
        </>
    );
}