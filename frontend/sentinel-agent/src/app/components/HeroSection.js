"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid bg-white">
      {/* Subtle background orbs */}
      <div
        className="absolute top-[-8%] right-[-4%] w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-[-8%] left-[-4%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
            style={{
              background: "#eef2ff",
              color: "#6366f1",
              border: "1px solid #c7d2fe",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
            AI-Powered Security Platform
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", color: "#0f172a" }}
        >
          AI Security Scanner
          <br />
          <span style={{ color: "#6366f1" }}>for Your Codebase</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Multi-agent AI system for real-time vulnerability detection. Powered
          by CrewAI — scan, analyze, and harden your code instantly.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="font-semibold text-sm px-8 py-3.5 rounded-xl text-white transition-all duration-150"
              style={{ background: "#6366f1" }}
            >
              Launch Dashboard →
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="font-medium text-sm px-8 py-3.5 rounded-xl text-slate-700 transition-all duration-150"
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            View Docs
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-12 sm:gap-20 mt-20 pt-10"
          style={{ borderTop: "1px solid #f1f5f9" }}
        >
          {[
            { val: "10K+", label: "Files Scanned" },
            { val: "99.7%", label: "Detection Rate" },
            { val: "50+", label: "Vuln Types" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.1 }}
              className="text-center"
            >
              <div className="font-bold text-2xl sm:text-3xl text-slate-900">
                {stat.val}
              </div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7"
          style={{
            background: "linear-gradient(to bottom, #94a3b8, transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
