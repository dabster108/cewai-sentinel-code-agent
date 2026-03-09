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
      color: "#16a34a",
      border: "#bbf7d0",
      bg: "#f0fdf4",
    },
    CRITICAL: {
      color: "#dc2626",
      border: "#fecaca",
      bg: "#fef2f2",
    },
    FLAGGED: {
      color: "#d97706",
      border: "#fde68a",
      bg: "#fffbeb",
    },
  };
  const s = styles[status] || styles.FLAGGED;
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
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
                className="w-full rounded-t-sm cursor-pointer relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to top, #6366f1 0%, rgba(99,102,241,0.35) 100%)",
                }}
              >
                {/* Hover tooltip */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-indigo-600 text-xs font-semibold">
                  {d.scans}
                </div>
              </motion.div>
            </div>
          </div>
          <span className="text-slate-400 text-xs">{d.day}</span>
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
          stroke="#e2e8f0"
          strokeWidth="7"
        />
        <motion.circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          stroke="#6366f1"
          strokeWidth="7"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div
          className="font-cyber text-xl font-bold"
          style={{
            color: "#00f5ff",
            textShadow: "0 0 12px rgba(0,245,255,0.8)",
          }}
        >
          {value}%
        </div>
        <div className="font-cyber text-[8px] text-gray-600 tracking-wide">
          SECURE
        </div>
      </div>
    </div>
  );
}

/* ─── Card wrapper shared style ───────────────────────────── */
const cardStyle = {
  background: "white",
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
};

/* ─── Main Dashboard Page ─────────────────────────────────── */
export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="bg-slate-50 min-h-screen">
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
                <h1 className="font-bold text-xl sm:text-2xl text-slate-900">
                  Security <span style={{ color: "#6366f1" }}>Dashboard</span>
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  Last scan: 2 minutes ago &nbsp;·&nbsp; Session active
                </p>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 6px 20px rgba(99,102,241,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="font-semibold text-sm px-6 py-2.5 rounded-lg text-white self-start sm:self-auto"
                style={{ background: "#6366f1" }}
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
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Scan Activity
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      7-day overview
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-2 rounded-sm"
                      style={{
                        background:
                          "linear-gradient(to top, #6366f1, rgba(99,102,241,0.35))",
                      }}
                    />
                    <span className="text-xs text-slate-400">Scans</span>
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
                <div className="font-semibold text-sm text-slate-700 mb-4">
                  Security Score
                </div>
                <div className="flex flex-col items-center flex-1 justify-center">
                  <DonutChart value={87} />
                  <div className="mt-5 w-full space-y-2">
                    {[
                      { label: "Critical", count: 6, color: "#ef4444" },
                      { label: "Medium", count: 18, color: "#f59e0b" },
                      { label: "Low", count: 14, color: "#3b82f6" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: s.color }}
                          />
                          <span className="text-slate-600 text-xs">
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
                <div className="font-semibold text-sm text-slate-700 mb-5">
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
                        <span className="text-slate-600 text-xs">{v.name}</span>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: v.color }}
                        >
                          {v.count}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(v.count / v.max) * 100}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.8 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full"
                          style={{ background: v.color }}
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
                  style={{ borderBottom: "1px solid #f1f5f9" }}
                >
                  <div className="font-semibold text-sm text-slate-700">
                    Recent Scans
                  </div>
                  <motion.span
                    whileHover={{ color: "#6366f1", x: 2 }}
                    className="text-xs text-slate-400 cursor-pointer transition-all"
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
                      whileHover={{ backgroundColor: "#f8fafc", x: 2 }}
                      onClick={() =>
                        setSelectedFile(
                          selectedFile === scan.file ? null : scan.file,
                        )
                      }
                      className="flex items-center gap-4 px-6 py-3 cursor-pointer transition-all duration-150"
                      style={{
                        borderBottom:
                          i < recentScans.length - 1
                            ? "1px solid #f1f5f9"
                            : "none",
                        background:
                          selectedFile === scan.file
                            ? "#eef2ff"
                            : "transparent",
                      }}
                    >
                      {/* File icon */}
                      <div
                        className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                        style={{
                          background:
                            scan.status === "CLEAN"
                              ? "#f0fdf4"
                              : scan.status === "CRITICAL"
                                ? "#fef2f2"
                                : "#fffbeb",
                          border:
                            scan.status === "CLEAN"
                              ? "1px solid #bbf7d0"
                              : scan.status === "CRITICAL"
                                ? "1px solid #fecaca"
                                : "1px solid #fde68a",
                        }}
                      >
                        <span className="text-xs">
                          {scan.status === "CLEAN"
                            ? "✓"
                            : scan.status === "CRITICAL"
                              ? "!"
                              : "⚠"}
                        </span>
                      </div>

                      {/* File name + time */}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate">
                          {scan.file}
                        </div>
                        <div className="text-slate-400 text-xs mt-0.5">
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
                            color: scan.issues === 0 ? "#16a34a" : "#94a3b8",
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
                style={{ borderBottom: "1px solid #f1f5f9" }}
              >
                <div className="font-semibold text-sm text-slate-700">
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
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
                  >
                    <span className="text-slate-300 text-xs flex-shrink-0 mt-0.5">
                      {log.time}
                    </span>
                    <span
                      className="text-xs font-semibold flex-shrink-0 mt-0.5"
                      style={{ color: log.color }}
                    >
                      [{log.agent}]
                    </span>
                    <span className="text-slate-600 text-xs">{log.msg}</span>
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
