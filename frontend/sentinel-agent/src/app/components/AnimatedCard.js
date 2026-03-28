"use client";
import { motion } from "framer-motion";

const colorMap = {
  cyan: {
    text: "#0ea5e9",
    glow: "rgba(14,165,233,0.15)",
    border: "rgba(14,165,233,0.22)",
    badge: { color: "#38bdf8", bg: "rgba(14,165,233,0.12)" },
  },
  pink: {
    text: "#2563eb",
    glow: "rgba(37,99,235,0.14)",
    border: "rgba(37,99,235,0.22)",
    badge: { color: "#93c5fd", bg: "rgba(37,99,235,0.12)" },
  },
  green: {
    text: "#0284c7",
    glow: "rgba(2,132,199,0.14)",
    border: "rgba(2,132,199,0.24)",
    badge: { color: "#7dd3fc", bg: "rgba(2,132,199,0.14)" },
  },
  purple: {
    text: "#1d4ed8",
    glow: "rgba(29,78,216,0.18)",
    border: "rgba(29,78,216,0.24)",
    badge: { color: "#bfdbfe", bg: "rgba(29,78,216,0.14)" },
  },
  orange: {
    text: "#3b82f6",
    glow: "rgba(59,130,246,0.18)",
    border: "rgba(59,130,246,0.24)",
    badge: { color: "#93c5fd", bg: "rgba(59,130,246,0.14)" },
  },
};

export default function AnimatedCard({
  title,
  value,
  icon,
  color = "cyan",
  description,
  tag,
  index = 0,
  scrollDirection = "down",
  children,
}) {
  const c = colorMap[color] || colorMap.cyan;
  const revealX = scrollDirection === "down" ? -54 : 54;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, x: revealX, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{
        duration: 0.58,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
        scale: 1.015,
        boxShadow: `0 0 0 1px ${c.border}, 0 24px 56px ${c.glow}, 0 10px 24px rgba(2,8,23,0.4)`,
      }}
      className="group relative rounded-2xl p-5 md:p-6 cursor-pointer overflow-hidden card-glow"
      style={{
        background:
          "linear-gradient(165deg, rgba(22,22,28,0.94), rgba(12,12,16,0.9))",
        border: `1px solid ${c.border}`,
        boxShadow: "0 8px 18px rgba(2,8,23,0.28)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 14% 0%, ${c.glow}, transparent 56%)`,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-4 -bottom-4 left-[-48%] w-[42%]"
        style={{
          background:
            "linear-gradient(100deg, transparent 0%, rgba(255,255,255,0.26) 45%, transparent 100%)",
          transform: "skewX(-18deg)",
          opacity: 0.45,
        }}
        animate={{ x: ["0%", "430%"] }}
        transition={{
          duration: 5.4,
          repeat: Infinity,
          ease: "linear",
          delay: index * 0.22,
        }}
      />

      {/* Subtle top glow accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.text}40, transparent)`,
        }}
      />

      <div className="relative z-10 flex items-start justify-between mb-3">
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-subtle)" }}
        >
          {title}
        </span>
        {icon && (
          <span
            className="text-lg leading-none p-1.5 rounded-lg"
            style={{ background: c.glow }}
          >
            {icon}
          </span>
        )}
      </div>

      {value && (
        <div
          className="relative z-10 font-bold text-3xl mb-1"
          style={{ color: c.text }}
        >
          {value}
        </div>
      )}

      {description && (
        <p
          className="relative z-10 text-sm mt-2 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>
      )}

      {tag && (
        <div
          className="relative z-10 mt-3 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ color: c.badge.color, background: c.badge.bg }}
        >
          {tag}
        </div>
      )}

      {children}
    </motion.div>
  );
}
