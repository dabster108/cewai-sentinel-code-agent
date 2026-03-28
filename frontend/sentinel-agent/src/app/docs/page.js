"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const setupSteps = [
  "Create and activate your Python virtual environment.",
  "Install backend dependencies and run python3 api.py from the repository root.",
  "Start the frontend with npm run dev inside frontend/sentinel-agent.",
  "Open the landing page, upload Python files, and run a scan.",
  "Review findings and jump to Dashboard for monitoring and reports.",
];

const techStack = [
  { name: "Next.js 16", role: "Frontend app router and UI runtime" },
  { name: "React 19", role: "Component architecture" },
  { name: "Framer Motion", role: "UI animations and transitions" },
  { name: "Tailwind CSS", role: "Design utilities and layout" },
  { name: "FastAPI", role: "Backend API for scan orchestration" },
  { name: "CrewAI", role: "Multi-agent analysis workflow" },
  { name: "OpenAI / LiteLLM", role: "LLM inference layer" },
  { name: "Python", role: "Security analysis runtime" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function DocsPage() {
  return (
    <main
      className="relative overflow-hidden min-h-screen px-4 sm:px-6 py-24"
      style={{ background: "var(--bg)" }}
    >
      <motion.div
        aria-hidden
        className="absolute -top-20 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 68%)",
          filter: "blur(28px)",
        }}
        animate={{ y: [0, 18, 0], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 68%)",
          filter: "blur(30px)",
        }}
        animate={{ y: [0, -16, 0], opacity: [0.6, 0.88, 0.6] }}
        transition={{ duration: 10.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div className="mb-10" variants={fadeSlideUp}>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--accent)" }}
          >
            Sentinel Documentation
          </p>
          <h1
            className="font-display text-4xl sm:text-5xl leading-tight"
            style={{ color: "var(--text)" }}
          >
            Understand, Run, and Scale Sentinel
          </h1>
          <p
            className="text-base mt-4 max-w-3xl"
            style={{ color: "var(--text-muted)" }}
          >
            Sentinel is an AI-powered code security platform that uses CrewAI
            agents to detect vulnerabilities, summarize risk, and help teams
            harden releases faster.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          variants={staggerContainer}
        >
          <motion.section
            variants={fadeSlideUp}
            whileHover={{ y: -4, scale: 1.005 }}
            transition={{ duration: 0.22 }}
            className="lg:col-span-2 rounded-2xl p-6"
            style={{
              background:
                "linear-gradient(165deg, rgba(10,17,28,0.86), rgba(8,11,20,0.9))",
              border: "1px solid rgba(125,211,252,0.14)",
              boxShadow: "0 14px 36px rgba(2,8,23,0.28)",
            }}
          >
            <h2
              className="font-semibold text-xl mb-3"
              style={{ color: "var(--text)" }}
            >
              What This Project Does
            </h2>
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Sentinel runs specialized agents for security analysis, quality
              review, and reporting. The system can produce issue summaries and
              remediation guidance for Python codebases.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              It is designed for developers who want a practical security
              workflow from scan to actionable output, with a frontend for quick
              upload and dashboard visibility.
            </p>
          </motion.section>

          <motion.section
            variants={fadeSlideUp}
            whileHover={{ y: -4, scale: 1.005 }}
            transition={{ duration: 0.22 }}
            className="rounded-2xl p-6"
            style={{
              background:
                "linear-gradient(165deg, rgba(10,17,28,0.86), rgba(8,11,20,0.9))",
              border: "1px solid rgba(125,211,252,0.14)",
              boxShadow: "0 14px 36px rgba(2,8,23,0.28)",
            }}
          >
            <h2
              className="font-semibold text-xl mb-3"
              style={{ color: "var(--text)" }}
            >
              Quick Navigation
            </h2>
            <div className="flex flex-col gap-3">
              <motion.div
                whileHover={{ x: 4, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/"
                  className="block text-sm font-medium px-3 py-2 rounded-lg"
                  style={{
                    color: "#e2e8f0",
                    background: "rgba(168,85,247,0.14)",
                    border: "1px solid rgba(168,85,247,0.24)",
                  }}
                >
                  Back to Landing
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ x: 4, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/dashboard"
                  className="block text-sm font-medium px-3 py-2 rounded-lg"
                  style={{
                    color: "#e2e8f0",
                    background: "rgba(6,182,212,0.12)",
                    border: "1px solid rgba(6,182,212,0.22)",
                  }}
                >
                  Open Dashboard
                </Link>
              </motion.div>
            </div>
          </motion.section>
        </motion.div>

        <motion.section
          variants={fadeSlideUp}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22 }}
          className="rounded-2xl p-6 mb-8"
          style={{
            background:
              "linear-gradient(165deg, rgba(10,17,28,0.86), rgba(8,11,20,0.9))",
            border: "1px solid rgba(125,211,252,0.14)",
            boxShadow: "0 14px 36px rgba(2,8,23,0.28)",
          }}
        >
          <h2
            className="font-semibold text-xl mb-4"
            style={{ color: "var(--text)" }}
          >
            How To Use Sentinel
          </h2>
          <ol className="space-y-3">
            {setupSteps.map((step, index) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: index * 0.08, duration: 0.42 }}
                className="flex gap-3 items-start"
              >
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    color: "#e9d5ff",
                    background: "rgba(168,85,247,0.18)",
                    border: "1px solid rgba(168,85,247,0.28)",
                  }}
                >
                  {index + 1}
                </span>
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step}
                </span>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        <motion.section
          variants={fadeSlideUp}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.22 }}
          className="rounded-2xl p-6"
          style={{
            background:
              "linear-gradient(165deg, rgba(10,17,28,0.86), rgba(8,11,20,0.9))",
            border: "1px solid rgba(125,211,252,0.14)",
            boxShadow: "0 14px 36px rgba(2,8,23,0.28)",
          }}
        >
          <h2
            className="font-semibold text-xl mb-4"
            style={{ color: "var(--text)" }}
          >
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {techStack.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-xl p-3"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {item.name}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--text-subtle)" }}
                >
                  {item.role}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </main>
  );
}
