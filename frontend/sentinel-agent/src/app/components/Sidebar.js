"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Scans", href: "#" },
  { label: "Reports", href: "#" },
  { label: "Agents", href: "#" },
  { label: "Settings", href: "#" },
];

const agents = [
  { name: "Scanner", status: "Active", dot: "#22c55e" },
  { name: "Analyzer", status: "Idle", dot: "#6366f1" },
  { name: "Reporter", status: "Active", dot: "#22c55e" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-16 bottom-0 w-64 z-40 flex flex-col bg-white"
      style={{ borderRight: "1px solid #e2e8f0" }}
    >
      {/* System status */}
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: "1px solid #f1f5f9" }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse-neon"
          style={{ background: "#22c55e" }}
        />
        <span className="text-xs text-slate-500 font-medium">
          System Online
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item, i) => {
          const isActive = active === item.label;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.07 * i + 0.25, duration: 0.35 }}
            >
              <Link href={item.href}>
                <motion.div
                  whileHover={{ x: 2 }}
                  onClick={() => setActive(item.label)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-100"
                  style={isActive ? { background: "#eef2ff" } : {}}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: isActive ? "#6366f1" : "#cbd5e1" }}
                  />
                  <span
                    className="text-sm font-medium transition-colors duration-100"
                    style={{ color: isActive ? "#6366f1" : "#64748b" }}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ background: "#6366f1" }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Agent status panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mx-3 mb-4 p-4 rounded-xl"
        style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
      >
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
          Agents
        </div>
        <div className="space-y-2">
          {agents.map((agent) => (
            <div key={agent.name} className="flex items-center justify-between">
              <span className="text-sm text-slate-600">{agent.name}</span>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse-neon"
                  style={{ background: agent.dot }}
                />
                <span
                  className="text-xs font-medium"
                  style={{
                    color: agent.status === "Active" ? "#16a34a" : "#94a3b8",
                  }}
                >
                  {agent.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.aside>
  );
}
