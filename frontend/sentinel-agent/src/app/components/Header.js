"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Reports", href: "#" },
  { label: "Docs", href: "#" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
      style={{ borderBottom: "1px solid #e2e8f0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#6366f1" }}
              >
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="font-semibold text-base text-slate-900">
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
                  className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-150 font-medium"
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
                  scale: 1.02,
                  boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="text-sm font-semibold px-4 py-2 rounded-lg text-white transition-all duration-150"
                style={{ background: "#6366f1" }}
              >
                Launch App
              </motion.button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 flex flex-col justify-center gap-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 rounded bg-slate-600"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
              className="block h-0.5 w-4 rounded bg-slate-600"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-5 rounded bg-slate-600"
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
            className="md:hidden overflow-hidden bg-white"
            style={{ borderTop: "1px solid #e2e8f0" }}
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 px-3 py-2 rounded-lg font-medium transition-colors"
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
                  style={{ background: "#6366f1" }}
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
