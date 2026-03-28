"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Reports", href: "#" },
  { label: "Docs", href: "/docs" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(8, 12, 22, 0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 10px 30px rgba(2,8,23,0.35)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #7c3aed 55%, #06b6d4 100%)",
                  boxShadow: "0 0 18px rgba(168,85,247,0.42)",
                }}
              >
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span
                className="font-display font-semibold text-base tracking-wide"
                style={{ color: "var(--text)" }}
              >
                Sentinel
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.2, duration: 0.35 }}
              >
                <Link
                  href={item.href}
                  className="relative text-sm font-medium text-slate-300 transition-all duration-200 hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-cyan-300 hover:after:w-full after:transition-all after:duration-200"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA button */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard">
              <motion.button
                whileHover={{
                  y: -2,
                  scale: 1.03,
                  boxShadow: "0 12px 28px rgba(168,85,247,0.32)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all duration-150"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #7c3aed 55%, #06b6d4 100%)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.14)",
                }}
              >
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2"
                  style={{
                    background:
                      "linear-gradient(100deg, transparent 10%, rgba(255,255,255,0.42) 50%, transparent 90%)",
                    transform: "skewX(-18deg)",
                  }}
                  animate={{ x: ["-120%", "320%"] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10">Launch App</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 flex flex-col justify-center gap-1.5 rounded-lg transition-colors"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 rounded"
              style={{ background: "var(--text-subtle)" }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
              className="block h-0.5 w-4 rounded"
              style={{ background: "var(--text-subtle)" }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 rounded"
              style={{ background: "var(--text-subtle)" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(8, 12, 22, 0.94)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm px-3 py-2 rounded-lg font-medium transition-colors text-slate-300 hover:text-white hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block mt-2"
              >
                <div
                  className="text-sm font-semibold text-center py-2.5 rounded-lg text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #a855f7 0%, #7c3aed 55%, #06b6d4 100%)",
                    boxShadow: "0 0 14px rgba(168,85,247,0.35)",
                  }}
                >
                  Launch App
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
