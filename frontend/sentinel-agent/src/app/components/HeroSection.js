"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cinema-hero">
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="noise-overlay" />

      {/* Cinematic background glow */}
      <motion.div
        className="absolute -top-20 right-[-10%] w-[620px] h-[620px] rounded-full pointer-events-none aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
        animate={{ y: [0, 18, 0], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-12%] left-[-6%] w-[520px] h-[520px] rounded-full pointer-events-none aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(29,78,216,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ y: [0, -16, 0], opacity: [0.6, 0.85, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-28">
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
              background: "rgba(29,78,216,0.12)",
              color: "var(--primary)",
              border: "1px solid rgba(29,78,216,0.35)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: "var(--primary)" }}
            />
            Cinematic AI Security Platform
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="font-display leading-none mb-6"
          style={{
            fontSize: "clamp(3.2rem, 8vw, 6.4rem)",
            color: "var(--text)",
          }}
        >
          DETECT THE INVISIBLE
          <br />
          <span style={{ color: "var(--primary)" }}>HARDEN EVERY RELEASE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--text-muted)" }}
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
                boxShadow: "0 10px 28px rgba(29,78,216,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="font-semibold text-sm px-8 py-3.5 rounded-xl text-white transition-all duration-150"
              style={{ background: "var(--primary)" }}
            >
              Launch Dashboard →
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="font-medium text-sm px-8 py-3.5 rounded-xl transition-all duration-150"
            style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              boxShadow: "0 4px 12px rgba(15,40,80,0.12)",
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
          style={{ borderTop: "1px solid var(--border)" }}
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
              <div
                className="font-bold text-2xl sm:text-3xl"
                style={{ color: "var(--text)" }}
              >
                {stat.val}
              </div>
              <div
                className="text-sm mt-1"
                style={{ color: "var(--text-subtle)" }}
              >
                {stat.label}
              </div>
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
        <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-7"
          style={{
            background:
              "linear-gradient(to bottom, var(--primary), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
