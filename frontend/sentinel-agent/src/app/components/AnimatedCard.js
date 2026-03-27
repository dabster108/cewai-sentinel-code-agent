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
  children,
}) {
  const c = colorMap[color] || colorMap.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow: `0 0 0 1px ${c.border}, 0 16px 40px ${c.glow}, 0 4px 16px rgba(15,40,80,0.16)`,
      }}
      className="relative rounded-xl p-5 cursor-pointer overflow-hidden card-glow"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "0 4px 14px rgba(15,40,80,0.08)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      {/* Subtle top glow accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${c.text}40, transparent)`,
        }}
      />

      <div className="flex items-start justify-between mb-3">
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
        <div className="font-bold text-3xl mb-1" style={{ color: c.text }}>
          {value}
        </div>
      )}

      {description && (
        <p
          className="text-sm mt-2 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>
      )}

      {tag && (
        <div
          className="mt-3 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ color: c.badge.color, background: c.badge.bg }}
        >
          {tag}
        </div>
      )}

      {children}
    </motion.div>
  );
}
