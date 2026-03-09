"use client";
import { motion } from "framer-motion";

const colorMap = {
  cyan: {
    text: "#3b82f6",
    border: "#dbeafe",
    bg: "#eff6ff",
    badge: { color: "#1d4ed8", bg: "#dbeafe" },
  },
  pink: {
    text: "#ec4899",
    border: "#fce7f3",
    bg: "#fdf2f8",
    badge: { color: "#be185d", bg: "#fce7f3" },
  },
  green: {
    text: "#10b981",
    border: "#d1fae5",
    bg: "#f0fdf4",
    badge: { color: "#065f46", bg: "#d1fae5" },
  },
  purple: {
    text: "#8b5cf6",
    border: "#ede9fe",
    bg: "#f5f3ff",
    badge: { color: "#5b21b6", bg: "#ede9fe" },
  },
  orange: {
    text: "#f97316",
    border: "#fed7aa",
    bg: "#fff7ed",
    badge: { color: "#c2410c", bg: "#fed7aa" },
  },
};

/**
 * AnimatedCard — reusable animated stat/feature card
 *
 * Props:
 *   title       - Card label (string)
 *   value       - Big number/text to display (string)
 *   icon        - Emoji or icon character (string)
 *   color       - "cyan" | "pink" | "green" | "purple" | "orange"
 *   description - Body text (string)
 *   tag         - Small badge text (string)
 *   index       - Stagger delay multiplier (number, default 0)
 *   children    - Optional extra content
 */
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -3,
        boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
      }}
      className="relative rounded-xl p-6 bg-white cursor-pointer"
      style={{
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {icon && <span className="text-xl leading-none">{icon}</span>}
      </div>

      {value && (
        <div className="font-bold text-3xl text-slate-900 mb-1">{value}</div>
      )}

      {description && (
        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
          {description}
        </p>
      )}

      {tag && (
        <div
          className="mt-3 inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ color: c.badge.color, background: c.badge.bg }}
        >
          {tag}
        </div>
      )}

      {children}
    </motion.div>
  );
}
