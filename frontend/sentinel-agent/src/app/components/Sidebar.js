"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Icons = {
  overview: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  scans: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  reports: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  agents: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
    </svg>
  ),
  settings: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "overview" },
  { label: "Scans", href: "#", icon: "scans" },
  { label: "Reports", href: "#", icon: "reports" },
  { label: "Agents", href: "/agents", icon: "agents" },
  { label: "Settings", href: "#", icon: "settings" },
];

const agents = [
  { name: "Scanner", status: "Active", color: "#10b981" },
  { name: "Analyzer", status: "Idle", color: "#6366f1" },
  { name: "Reporter", status: "Active", color: "#10b981" },
];

export default function Sidebar({ isOpen = true, onToggle = () => {} }) {
  const pathname = usePathname();
  const getActiveItem = (path) => {
    if (path === "/agents") {
      return "Agents";
    }
    return "Overview";
  };
  const [active, setActive] = useState(getActiveItem(pathname));
  useEffect(() => {
    setActive(getActiveItem(pathname));
  }, [pathname]);
  const sidebarWidth = isOpen ? 256 : 84;

  return (
    <motion.aside
      initial={{ x: -288, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-16 bottom-0 z-40 flex flex-col overflow-hidden"
      style={{
        width: `${sidebarWidth}px`,
        transition: "width 220ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "width",
        background:
          "linear-gradient(180deg, rgba(10,12,20,0.96) 0%, rgba(8,10,17,0.98) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="px-3 pt-3 pb-2">
        <div
          className={`flex items-center ${isOpen ? "gap-2" : "justify-center"}`}
        >
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Navigation
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={onToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${isOpen ? "ml-auto w-8 h-8" : "w-9 h-9"} rounded-lg flex items-center justify-center`}
            style={{
              background: "rgba(12,18,32,0.9)",
              border: "1px solid rgba(125,211,252,0.3)",
              color: "#f8fafc",
            }}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* System status pill */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.35 }}
        className="mx-3 mb-2 rounded-lg"
        style={{
          background: "rgba(16,185,129,0.07)",
          border: "1px solid rgba(16,185,129,0.18)",
        }}
      >
        {isOpen ? (
          <div className="flex items-center gap-2.5 px-3.5 py-2.5">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse-neon"
              style={{ background: "#10b981", color: "#10b981" }}
            />
            <span className="text-xs font-medium" style={{ color: "#bbf7d0" }}>
              System Online
            </span>
            <span
              className="ml-auto text-[9px] tracking-widest"
              style={{ color: "#86efac" }}
            >
              ● ● ●
            </span>
          </div>
        ) : (
          <div className="flex justify-center py-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse-neon"
              style={{ background: "#10b981", color: "#10b981" }}
              title="System online"
            />
          </div>
        )}
      </motion.div>

      {/* Nav items */}
      <nav
        className={`flex-1 py-2 overflow-y-auto ${isOpen ? "px-3 space-y-0.5" : "px-2 space-y-2"}`}
      >
        {navItems.map((item, i) => {
          const isActive = active === item.label;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.06 * i + 0.3,
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={item.href}
                className="block"
                onClick={(e) => {
                  setActive(item.label);
                  if (item.href.includes("#")) {
                    const [hashPath, id] = item.href.split("#");
                    const isSamePageHash = !hashPath || hashPath === pathname;
                    if (isSamePageHash && id) {
                      const element = document.getElementById(id);
                      if (element) {
                        e.preventDefault();
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        window.history.pushState({}, "", item.href);
                      }
                    }
                  }
                }}
                style={{ textDecoration: "none" }}
              >
                <motion.div
                  title={!isOpen ? item.label : undefined}
                  whileHover={
                    isOpen
                      ? {
                          x: 1,
                          backgroundColor: isActive
                            ? "rgba(168,85,247,0.2)"
                            : "rgba(255,255,255,0.08)",
                          transition: { duration: 0.15 },
                        }
                      : {
                          scale: 1.02,
                          backgroundColor: isActive
                            ? "rgba(168,85,247,0.2)"
                            : "rgba(255,255,255,0.08)",
                          transition: { duration: 0.15 },
                        }
                  }
                  className={`relative flex items-center rounded-lg cursor-pointer ${isOpen ? "gap-3 px-3 py-2.5" : "mx-auto w-11 h-11 justify-center px-0"}`}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(90deg, rgba(168,85,247,0.18), rgba(6,182,212,0.08))",
                          boxShadow:
                            "inset 0 0 0 1px rgba(168,85,247,0.24), 0 0 18px rgba(168,85,247,0.12)",
                        }
                      : {}
                  }
                >
                  {/* Active left bar */}
                  <AnimatePresence>
                    {isActive && isOpen && (
                      <motion.div
                        layoutId="activeBar"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[22px] rounded-r-full"
                        style={{
                          background:
                            "linear-gradient(180deg, #a855f7, #06b6d4)",
                          boxShadow: "2px 0 12px rgba(168,85,247,0.5)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <span
                    className="w-5 h-5 flex items-center justify-center"
                    style={{
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.86)",
                      transition: "color 0.15s",
                    }}
                  >
                    {Icons[item.icon]}
                  </span>

                  {/* Label */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="text-sm font-medium flex-1"
                        style={{
                          color: isActive
                            ? "#ffffff"
                            : "rgba(255,255,255,0.92)",
                          transition: "color 0.15s",
                        }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Active glow badge */}
                  <AnimatePresence>
                    {isActive && isOpen && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 600,
                          damping: 30,
                        }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "#a855f7",
                          boxShadow: "0 0 10px #a855f7",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-4 my-1"
              style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
            />

            {/* Agents panel */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.05, duration: 0.25 }}
              className="mx-3 mb-3 p-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                Active Agents
              </div>
              <div className="space-y-2.5">
                {agents.map((agent, idx) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.06 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: agent.color,
                          boxShadow: `0 0 6px ${agent.color}99`,
                        }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: "rgba(255,255,255,0.9)" }}
                      >
                        {agent.name}
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                      style={{
                        color: agent.color,
                        background: `${agent.color}18`,
                      }}
                    >
                      {agent.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* User profile strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              className="mx-3 mb-3 p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors duration-150"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #7c3aed 55%, #06b6d4 100%)",
                  boxShadow: "0 0 14px rgba(168,85,247,0.45)",
                }}
              >
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-semibold truncate"
                  style={{ color: "#f8fafc" }}
                >
                  Admin
                </div>
                <div
                  className="text-[10px] truncate"
                  style={{ color: "rgba(255,255,255,0.72)" }}
                >
                  sentinel@system
                </div>
              </div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.72)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
