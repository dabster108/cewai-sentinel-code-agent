"use client";
import { motion } from "framer-motion";

const colorMap = {
  cyan: {
    text: "#22d3ee",
    glow: "rgba(34,211,238,0.15)",
    border: "rgba(34,211,238,0.2)",
    badge: { color: "#67e8f9", bg: "rgba(34,211,238,0.12)" },
  },
  pink: {
    text: "#fb7185",
    glow: "rgba(251,113,133,0.14)",
    border: "rgba(251,113,133,0.22)",
    badge: { color: "#fecdd3", bg: "rgba(251,113,133,0.12)" },
  },
  green: {
    text: "#34d399",
    glow: "rgba(16,185,129,0.14)",
    border: "rgba(16,185,129,0.24)",
    badge: { color: "#6ee7b7", bg: "rgba(16,185,129,0.14)" },
  },
  purple: {
    text: "#f59e0b",
    glow: "rgba(245,158,11,0.18)",
    border: "rgba(245,158,11,0.24)",
    badge: { color: "#fde68a", bg: "rgba(245,158,11,0.14)" },
  },
  orange: {
    text: "#f59e0b",
    glow: "rgba(245,158,11,0.18)",
    border: "rgba(245,158,11,0.24)",
    badge: { color: "#fde68a", bg: "rgba(245,158,11,0.14)" },
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
        boxShadow: `0 0 0 1px ${c.border}, 0 16px 40px ${c.glow}, 0 4px 16px rgba(0,0,0,0.3)`,
      }}
      className="relative rounded-xl p-5 cursor-pointer overflow-hidden card-glow"
      style={{
        background: "var(--bg-card)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
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
          style={{ color: "#4b5672" }}
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
          style={{ color: "#8b96b3" }}
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
