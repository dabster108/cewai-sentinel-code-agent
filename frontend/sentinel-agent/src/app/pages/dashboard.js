"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AnimatedCard from "../components/AnimatedCard";

/* ─── Sample data ─────────────────────────────────────────── */
const recentScans = [
  {
    file: "auth.py",
    issues: 3,
    severity: "HIGH",
    status: "FLAGGED",
    time: "2m ago",
  },
  {
    file: "database.py",
    issues: 1,
    severity: "MEDIUM",
    status: "FLAGGED",
    time: "5m ago",
  },
  {
    file: "api_handler.py",
    issues: 0,
    severity: "CLEAN",
    status: "CLEAN",
    time: "8m ago",
  },
  {
    file: "utils.py",
    issues: 2,
    severity: "LOW",
    status: "FLAGGED",
    time: "12m ago",
  },
  {
    file: "models.py",
    issues: 0,
    severity: "CLEAN",
    status: "CLEAN",
    time: "15m ago",
  },
  {
    file: "main.py",
    issues: 5,
    severity: "CRITICAL",
    status: "CRITICAL",
    time: "20m ago",
  },
];

const vulnBreakdown = [
  { name: "SQL Injection", count: 12, max: 18, color: "#ec4899" },
  { name: "XSS", count: 8, max: 18, color: "#3b82f6" },
  { name: "Auth Issues", count: 15, max: 18, color: "#f97316" },
  { name: "Path Traversal", count: 5, max: 18, color: "#10b981" },
  { name: "Cmd Injection", count: 9, max: 18, color: "#8b5cf6" },
];

const weeklyData = [
  { day: "Mon", scans: 45 },
  { day: "Tue", scans: 63 },
  { day: "Wed", scans: 38 },
  { day: "Thu", scans: 71 },
  { day: "Fri", scans: 55 },
  { day: "Sat", scans: 28 },
  { day: "Sun", scans: 82 },
];

const agentLogs = [
  {
    agent: "Scanner",
    msg: "Completed analysis of auth.py — 3 HIGH issues found",
    time: "02:14",
    color: "#ec4899",
  },
  {
    agent: "Analyzer",
    msg: "Cross-referenced database.py against OWASP Top 10",
    time: "02:10",
    color: "#3b82f6",
  },
  {
    agent: "Reporter",
    msg: "Generated summary report for last 24h session",
    time: "01:58",
    color: "#22c55e",
  },
  {
    agent: "Scanner",
    msg: "Scanning models.py — no vulnerabilities detected",
    time: "01:45",
    color: "#22c55e",
  },
];

/* ─── Sub-components ──────────────────────────────────────── */

function StatusBadge({ status }) {
  const styles = {
    CLEAN: {
      color: "#34d399",
      border: "rgba(16,185,129,0.25)",
      bg: "rgba(16,185,129,0.08)",
    },
    CRITICAL: {
      color: "#f87171",
      border: "rgba(248,113,113,0.25)",
      bg: "rgba(248,113,113,0.08)",
    },
    FLAGGED: {
      color: "#fbbf24",
      border: "rgba(251,191,36,0.25)",
      bg: "rgba(251,191,36,0.08)",
    },
  };
  const s = styles[status] || styles.FLAGGED;
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
      style={{
        color: s.color,
        border: `1px solid ${s.border}`,
        background: s.bg,
      }}
    >
      {status}
    </span>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.scans));
  return (
    <div className="flex items-end gap-2 h-28">
      {data.map((d, i) => (
        <div
          key={d.day}
          className="flex-1 flex flex-col items-center gap-1 group"
        >
          <div
            className="relative w-full flex items-end"
            style={{ height: "100px" }}
          >
            <div
              className="w-full flex flex-col justify-end"
              style={{ height: "100%" }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.scans / max) * 100}%` }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-full rounded-t-sm cursor-pointer relative overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(to top, #2563eb 0%, rgba(59,130,246,0.3) 100%)",
                  boxShadow: "0 0 12px rgba(37,99,235,0.25)",
                }}
              >
                {/* Hover tooltip */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-blue-400 text-xs font-semibold">
                  {d.scans}
                </div>
              </motion.div>
            </div>
          </div>
          <span className="text-xs" style={{ color: "#3d5278" }}>
            {d.day}
          </span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ value = 87 }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="96" height="96" className="-rotate-90">
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="7"
        />
        <motion.circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="url(#blueGrad)"
          strokeWidth="7"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div
          className="font-display text-xl font-bold"
          style={{
            color: "#fbbf24",
            textShadow: "0 0 16px rgba(245,158,11,0.6)",
          }}
        >
          {value}%
        </div>
        <div
          className="text-[8px] tracking-widest"
          style={{ color: "#3d5278" }}
        >
          SECURE
        </div>
      </div>
    </div>
  );
}

/* ─── Card wrapper shared style ───────────────────────────── */
const cardStyle = {
  background: "#0c1526",
  border: "1px solid rgba(255,255,255,0.07)",
  boxShadow: "0 2px 12px rgba(0,0,0,0.35)",
};

/* ─── Main Dashboard Page ─────────────────────────────────── */
export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div style={{ background: "#04080f", minHeight: "100vh" }}>
      <Header />

      <div className="flex">
        <Sidebar />

        {/* Main content — offset by sidebar width */}
        <motion.main
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 pt-16 min-h-screen"
          style={{ marginLeft: "256px" }}
        >
          <div className="p-5 lg:p-8 max-w-[1400px]">
            {/* ── Page header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1
                  className="font-bold text-xl sm:text-2xl"
                  style={{ color: "#dce9ff" }}
                >
                  Security{" "}
                  <span
                    style={{
                      color: "#60a5fa",
                      textShadow: "0 0 20px rgba(96,165,250,0.4)",
                    }}
                  >
                    Dashboard
                  </span>
                </h1>
                <p className="text-sm mt-1" style={{ color: "#3d5278" }}>
                  Last scan: 2 minutes ago &nbsp;·&nbsp; Session active
                </p>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 6px 24px rgba(37,99,235,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                className="font-semibold text-sm px-6 py-2.5 rounded-lg text-white self-start sm:self-auto"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  boxShadow: "0 0 0 1px rgba(59,130,246,0.3)",
                }}
              >
                + New Scan
              </motion.button>
            </div>

            {/* ── Stats row ── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              <AnimatedCard
                title="Files Scanned"
                value="247"
                icon="📁"
                color="cyan"
                tag="This Week"
                index={0}
              />
              <AnimatedCard
                title="Issues Found"
                value="38"
                icon="⚠️"
                color="pink"
                tag="Total Detected"
                index={1}
              />
              <AnimatedCard
                title="Critical"
                value="6"
                icon="🔴"
                color="purple"
                tag="High Priority"
                index={2}
              />
              <AnimatedCard
                title="Clean Files"
                value="203"
                icon="✓"
                color="green"
                tag="82.2% Clean"
                index={3}
              />
            </div>

            {/* ── Charts row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {/* Bar chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="lg:col-span-2 rounded-xl p-6"
                style={cardStyle}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#3d5278" }}
                    >
                      Scan Activity
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "#2e426a" }}
                    >
                      7-day overview
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-2 rounded-sm"
                      style={{
                        background:
                          "linear-gradient(to top, #2563eb, rgba(59,130,246,0.3))",
                      }}
                    />
                    <span className="text-xs" style={{ color: "#3d5278" }}>
                      Scans
                    </span>
                  </div>
                </div>
                <BarChart data={weeklyData} />
              </motion.div>

              {/* Donut + score breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="rounded-xl p-6 flex flex-col"
                style={cardStyle}
              >
                <div
                  className="text-sm font-semibold mb-4"
                  style={{ color: "#93c5fd" }}
                >
                  Security Score
                </div>
                <div className="flex flex-col items-center flex-1 justify-center">
                  <DonutChart value={87} />
                  <div className="mt-5 w-full space-y-2">
                    {[
                      { label: "Critical", count: 6, color: "#f87171" },
                      { label: "Medium", count: 18, color: "#fbbf24" },
                      { label: "Low", count: 14, color: "#60a5fa" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              background: s.color,
                              boxShadow: `0 0 4px ${s.color}`,
                            }}
                          />
                          <span
                            className="text-xs"
                            style={{ color: "#6882a8" }}
                          >
                            {s.label}
                          </span>
                        </div>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: s.color }}
                        >
                          {s.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Vuln breakdown + Recent scans ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {/* Vuln breakdown bars */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="rounded-xl p-6"
                style={cardStyle}
              >
                <div
                  className="font-semibold text-sm mb-5"
                  style={{ color: "#93c5fd" }}
                >
                  Vuln Breakdown
                </div>
                <div className="space-y-4">
                  {vulnBreakdown.map((v, i) => (
                    <motion.div
                      key={v.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.08 }}
                    >
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs" style={{ color: "#6882a8" }}>
                          {v.name}
                        </span>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: v.color }}
                        >
                          {v.count}
                        </span>
                      </div>
                      <div
                        className="h-1.5 rounded-full"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(v.count / v.max) * 100}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.8 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full"
                          style={{
                            background: v.color,
                            boxShadow: `0 0 8px ${v.color}66`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent scans table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="lg:col-span-2 rounded-xl overflow-hidden"
                style={cardStyle}
              >
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "#93c5fd" }}
                  >
                    Recent Scans
                  </div>
                  <motion.span
                    whileHover={{ color: "#60a5fa", x: 2 }}
                    className="text-xs cursor-pointer transition-all"
                    style={{ color: "#2e426a" }}
                  >
                    View all →
                  </motion.span>
                </div>
                <div>
                  {recentScans.map((scan, i) => (
                    <motion.div
                      key={scan.file}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.75 + i * 0.07 }}
                      whileHover={{
                        backgroundColor: "rgba(59,130,246,0.05)",
                        x: 2,
                      }}
                      onClick={() =>
                        setSelectedFile(
                          selectedFile === scan.file ? null : scan.file,
                        )
                      }
                      className="flex items-center gap-4 px-6 py-3 cursor-pointer transition-all duration-150"
                      style={{
                        borderBottom:
                          i < recentScans.length - 1
                            ? "1px solid rgba(255,255,255,0.04)"
                            : "none",
                        background:
                          selectedFile === scan.file
                            ? "rgba(59,130,246,0.08)"
                            : "transparent",
                      }}
                    >
                      {/* File icon */}
                      <div
                        className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            scan.status === "CLEAN"
                              ? "rgba(16,185,129,0.1)"
                              : scan.status === "CRITICAL"
                                ? "rgba(248,113,113,0.1)"
                                : "rgba(251,191,36,0.1)",
                          border:
                            scan.status === "CLEAN"
                              ? "1px solid rgba(16,185,129,0.25)"
                              : scan.status === "CRITICAL"
                                ? "1px solid rgba(248,113,113,0.25)"
                                : "1px solid rgba(251,191,36,0.25)",
                        }}
                      >
                        <span
                          className="text-xs font-bold"
                          style={{
                            color:
                              scan.status === "CLEAN"
                                ? "#34d399"
                                : scan.status === "CRITICAL"
                                  ? "#f87171"
                                  : "#fbbf24",
                          }}
                        >
                          {scan.status === "CLEAN"
                            ? "✓"
                            : scan.status === "CRITICAL"
                              ? "!"
                              : "⚠"}
                        </span>
                      </div>

                      {/* File name + time */}
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-sm font-medium truncate"
                          style={{ color: "#c7d8f0" }}
                        >
                          {scan.file}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "#2e426a" }}
                        >
                          {scan.time}
                        </div>
                      </div>

                      {/* Status badge */}
                      <StatusBadge status={scan.status} />

                      {/* Issue count */}
                      <div className="text-right min-w-[52px]">
                        <span
                          className="text-xs font-medium"
                          style={{
                            color: scan.issues === 0 ? "#34d399" : "#3d5278",
                          }}
                        >
                          {scan.issues} {scan.issues === 1 ? "issue" : "issues"}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Agent activity log ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="rounded-xl overflow-hidden"
              style={cardStyle}
            >
              <div
                className="px-6 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="font-semibold text-sm"
                  style={{ color: "#93c5fd" }}
                >
                  Agent Activity Log
                </div>
              </div>
              <div className="p-4 space-y-2 font-mono text-xs">
                {agentLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <span
                      className="text-xs flex-shrink-0 mt-0.5"
                      style={{ color: "#2e426a" }}
                    >
                      {log.time}
                    </span>
                    <span
                      className="text-xs font-semibold flex-shrink-0 mt-0.5"
                      style={{
                        color: log.color,
                        textShadow: `0 0 8px ${log.color}66`,
                      }}
                    >
                      [{log.agent}]
                    </span>
                    <span className="text-xs" style={{ color: "#6882a8" }}>
                      {log.msg}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
