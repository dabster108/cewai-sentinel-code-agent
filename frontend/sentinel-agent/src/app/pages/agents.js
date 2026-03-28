"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const agentRoles = [
  {
    name: "Scanner Agent",
    role: "Detection Layer",
    status: "Running",
    color: "#38bdf8",
    detail:
      "Executes deep static scans and pattern detection on incoming code streams.",
  },
  {
    name: "Analyzer Agent",
    role: "Correlation Layer",
    status: "Running",
    color: "#60a5fa",
    detail:
      "Links findings with exploitability context, severity models, and policy rules.",
  },
  {
    name: "Reporter Agent",
    role: "Delivery Layer",
    status: "Ready",
    color: "#22d3ee",
    detail:
      "Generates clean remediation output for engineering teams and compliance review.",
  },
];

const executionStages = [
  {
    title: "Ingest",
    detail: "Source files and metadata are normalized with guardrails.",
    color: "#38bdf8",
  },
  {
    title: "Detect",
    detail: "Scanner identifies risky patterns and vulnerability signatures.",
    color: "#0ea5e9",
  },
  {
    title: "Correlate",
    detail: "Analyzer validates confidence and maps practical impact.",
    color: "#60a5fa",
  },
  {
    title: "Synthesize",
    detail: "Reporter composes action-first summaries and fix guidance.",
    color: "#22d3ee",
  },
];

const securityControls = [
  "Input schema validation before orchestration starts",
  "Cross-agent scope isolation to avoid noisy drift",
  "Severity integrity preserved across every stage",
  "Execution telemetry for audit and incident replay",
];

const reportOutputs = [
  "Risk snapshot with severity distribution",
  "File-level hotspots with reasoning",
  "Patch-ready remediation notes for developers",
  "Executive summary for release gates",
];

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AgentsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarContentOffset = isSidebarOpen ? "260px" : "92px";

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 16% 8%, rgba(56,189,248,0.14), transparent 34%), radial-gradient(circle at 82% 14%, rgba(96,165,250,0.16), transparent 38%), #070b14",
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-28 -right-16 w-[26rem] h-[26rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.28) 0%, transparent 68%)",
          filter: "blur(42px)",
        }}
        animate={{ y: [0, 20, 0], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 w-[28rem] h-[28rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(147,197,253,0.22) 0%, transparent 68%)",
          filter: "blur(46px)",
        }}
        animate={{ y: [0, -18, 0], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <Header />

      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        <motion.main
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex-1 pt-20 min-h-screen"
          style={{
            marginLeft: sidebarContentOffset,
            transition: "margin-left 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl" id="agents-workflow">
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 rounded-3xl p-6 sm:p-8"
              style={{
                border: "1px solid rgba(125,211,252,0.26)",
                background:
                  "linear-gradient(145deg, rgba(8,18,34,0.9), rgba(7,12,24,0.92))",
                boxShadow: "0 22px 48px rgba(2,8,23,0.45)",
              }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                  style={{
                    color: "#e0f2fe",
                    border: "1px solid rgba(56,189,248,0.35)",
                    background: "rgba(14,116,144,0.22)",
                  }}
                >
                  Agents Control Plane
                </span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                  style={{
                    color: "#dbeafe",
                    border: "1px solid rgba(96,165,250,0.34)",
                    background: "rgba(30,64,175,0.2)",
                  }}
                >
                  Modern Runtime View
                </span>
              </div>

              <h1
                className="font-display text-3xl sm:text-4xl"
                style={{ color: "#f8fbff" }}
              >
                Sentinel Agents
                <span
                  style={{
                    background: "linear-gradient(135deg, #7dd3fc, #bfdbfe)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginLeft: "10px",
                  }}
                >
                  Orchestration
                </span>
              </h1>
              <p
                className="text-sm sm:text-base mt-3 max-w-3xl"
                style={{ color: "#cbd5e1" }}
              >
                A dedicated command page for role-level visibility, execution
                mechanics, and reporting quality with white-blue visual language
                aligned to the landing experience.
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                {[
                  { label: "Active Agents", value: "03" },
                  { label: "Live Queue", value: "19 Jobs" },
                  { label: "Avg Cycle", value: "2.8s" },
                  { label: "Report Accuracy", value: "98.6%" },
                ].map((metric) => (
                  <motion.div
                    key={metric.label}
                    whileHover={{ y: -2 }}
                    className="rounded-xl p-3"
                    style={{
                      border: "1px solid rgba(125,211,252,0.24)",
                      background: "rgba(15,23,42,0.68)",
                    }}
                  >
                    <div
                      className="text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: "#94a3b8" }}
                    >
                      {metric.label}
                    </div>
                    <div
                      className="text-lg font-semibold mt-1"
                      style={{ color: "#f8fafc" }}
                    >
                      {metric.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="xl:col-span-5 rounded-2xl p-6"
                style={{
                  border: "1px solid rgba(96,165,250,0.24)",
                  background:
                    "linear-gradient(160deg, rgba(8,18,34,0.9), rgba(7,12,24,0.92))",
                }}
              >
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#f8fbff" }}
                >
                  Agent Role Matrix
                </h2>
                <div className="space-y-3">
                  {agentRoles.map((agent, index) => (
                    <motion.div
                      key={agent.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl p-3"
                      style={{
                        border: "1px solid rgba(148,163,184,0.2)",
                        background: "rgba(15,23,42,0.62)",
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "#f8fafc" }}
                        >
                          {agent.name}
                        </div>
                        <span
                          className="text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded"
                          style={{
                            color: "#dbeafe",
                            border: "1px solid rgba(125,211,252,0.3)",
                            background: "rgba(2,132,199,0.2)",
                          }}
                        >
                          {agent.status}
                        </span>
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{ color: agent.color }}
                      >
                        {agent.role}
                      </div>
                      <p
                        className="text-xs mt-1.5"
                        style={{ color: "#cbd5e1" }}
                      >
                        {agent.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="xl:col-span-7 rounded-2xl p-6"
                style={{
                  border: "1px solid rgba(56,189,248,0.24)",
                  background:
                    "linear-gradient(160deg, rgba(8,17,31,0.92), rgba(7,12,23,0.95))",
                }}
              >
                <h2
                  className="text-xl font-semibold mb-5"
                  style={{ color: "#f8fbff" }}
                >
                  Execution Mechanism
                </h2>

                <div
                  className="relative rounded-xl p-4 sm:p-5"
                  style={{
                    border: "1px solid rgba(148,163,184,0.2)",
                    background: "rgba(15,23,42,0.56)",
                  }}
                >
                  <div className="absolute left-8 right-8 top-10 h-[2px] hidden md:block bg-slate-700/70 rounded-full" />
                  <motion.div
                    aria-hidden
                    className="absolute top-[35px] hidden md:block w-4 h-4 rounded-full"
                    style={{
                      background: "#7dd3fc",
                      boxShadow: "0 0 18px rgba(125,211,252,0.95)",
                    }}
                    animate={{
                      x: ["2rem", "36rem", "2rem"],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 4.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3">
                    {executionStages.map((stage, index) => (
                      <motion.div
                        key={stage.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ y: -3 }}
                        className="rounded-xl p-3"
                        style={{
                          border: `1px solid ${stage.color}50`,
                          background: "rgba(15,23,42,0.78)",
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              background: stage.color,
                              boxShadow: `0 0 10px ${stage.color}`,
                            }}
                          />
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "#f8fafc" }}
                          >
                            {stage.title}
                          </span>
                        </div>
                        <p
                          className="text-xs leading-relaxed"
                          style={{ color: "#cbd5e1" }}
                        >
                          {stage.detail}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl p-6"
                style={{
                  border: "1px solid rgba(34,197,94,0.24)",
                  background:
                    "linear-gradient(160deg, rgba(9,24,22,0.92), rgba(8,18,20,0.94))",
                }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#ecfeff" }}
                >
                  Security Controls
                </h3>
                <div className="space-y-2.5">
                  {securityControls.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-lg px-3 py-2"
                      style={{
                        border: "1px solid rgba(74,222,128,0.24)",
                        background: "rgba(20,83,45,0.3)",
                        color: "#dcfce7",
                        fontSize: "13px",
                      }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl p-6"
                style={{
                  border: "1px solid rgba(59,130,246,0.24)",
                  background:
                    "linear-gradient(160deg, rgba(9,18,38,0.92), rgba(8,14,28,0.95))",
                }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "#eff6ff" }}
                >
                  Reporting Output
                </h3>
                <div className="space-y-2.5">
                  {reportOutputs.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="rounded-lg px-3 py-2"
                      style={{
                        border: "1px solid rgba(96,165,250,0.28)",
                        background: "rgba(30,64,175,0.24)",
                        color: "#dbeafe",
                        fontSize: "13px",
                      }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/dashboard"
                className="text-sm font-semibold px-4 py-2.5 rounded-lg"
                style={{
                  color: "#e0f2fe",
                  border: "1px solid rgba(56,189,248,0.32)",
                  background: "rgba(8,145,178,0.2)",
                }}
              >
                Back to Dashboard
              </Link>
              <a
                href="/docs"
                className="text-sm font-semibold px-4 py-2.5 rounded-lg"
                style={{
                  color: "#dbeafe",
                  border: "1px solid rgba(96,165,250,0.32)",
                  background: "rgba(30,64,175,0.2)",
                }}
              >
                Open Docs
              </a>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
