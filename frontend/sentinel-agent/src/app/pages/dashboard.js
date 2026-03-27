"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

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
    color: "#a855f7",
  },
  {
    agent: "Analyzer",
    msg: "Cross-referenced database.py against OWASP Top 10",
    time: "02:10",
    color: "#06b6d4",
  },
  {
    agent: "Reporter",
    msg: "Generated summary report for last 24h session",
    time: "01:58",
    color: "#10b981",
  },
  {
    agent: "Scanner",
    msg: "Scanning models.py — no vulnerabilities detected",
    time: "01:45",
    color: "#10b981",
  },
];

/* ─── Sub-components ──────────────────────────────────────── */

function StatusBadge({ status }) {
  const styles = {
    CLEAN: {
      color: "#10b981",
      border: "rgba(16, 185, 129, 0.25)",
      bg: "rgba(16, 185, 129, 0.08)",
    },
    CRITICAL: {
      color: "#f43f5e",
      border: "rgba(244, 63, 94, 0.25)",
      bg: "rgba(244, 63, 94, 0.08)",
    },
    FLAGGED: {
      color: "#f59e0b",
      border: "rgba(245, 158, 11, 0.25)",
      bg: "rgba(245, 158, 11, 0.08)",
    },
  };
  const s = styles[status] || styles.FLAGGED;
  return (
    <span
      className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
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
    <div className="flex items-end justify-between gap-1.5 h-32 px-2">
      {data.map((d, i) => (
        <div
          key={d.day}
          className="flex-1 flex flex-col items-center gap-1.5 group"
        >
          <div className="relative w-full flex items-end h-24">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.scans / max) * 100}%` }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full rounded-t cursor-pointer relative overflow-hidden group/bar hover:opacity-80 transition-opacity"
              style={{
                background:
                  "linear-gradient(180deg, #a855f7 0%, rgba(168, 85, 247, 0.4) 100%)",
                boxShadow: "0 0 16px rgba(168, 85, 247, 0.3)",
                minHeight: "4px",
              }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all duration-200 whitespace-nowrap text-purple-400 text-xs font-semibold pointer-events-none">
                {d.scans}
              </div>
            </motion.div>
          </div>
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-muted)" }}
          >
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
      <svg width="100" height="100" className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="6"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#purpleGrad)"
          strokeWidth="6"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div
          className="font-bold text-2xl tabular-nums"
          style={{
            color: "#a855f7",
            textShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
          }}
        >
          {value}%
        </div>
        <div
          className="text-[9px] font-semibold tracking-wider mt-0.5"
          style={{ color: "var(--text-subtle)" }}
        >
          SECURE
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative rounded-2xl p-6 overflow-hidden group"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Glow accent */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(168, 85, 247, 0.15), transparent 60%)",
        }}
      />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)",
        }}
      />

      <div className="relative z-10 flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
          style={{
            background: "rgba(168, 85, 247, 0.12)",
            color: "#a855f7",
          }}
        >
          {icon}
        </div>
        {trend && (
          <div
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{
              color: "#10b981",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            {trend}
          </div>
        )}
      </div>
      <div
        className="text-sm font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
      <div className="text-3xl font-bold mt-2" style={{ color: "var(--text)" }}>
        {value}
      </div>
    </motion.div>
  );
}

function VulnBar({ name, count, max, color }) {
  const percentage = (count / max) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          {name}
        </span>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>
          {count}/{max}
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "rgba(255, 255, 255, 0.05)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            boxShadow: `0 0 12px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

function AgentLog({ agent, msg, time, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-3 p-3 rounded-lg hover:bg-opacity-50 transition-colors"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
      }}
    >
      <div className="flex-shrink-0">
        <div
          className="w-2 h-2 rounded-full mt-1.5"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-semibold" style={{ color }}>
            {agent}
          </span>
          <span className="text-xs" style={{ color: "var(--text-subtle)" }}>
            {time}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {msg}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Card wrapper shared style ───────────────────────────── */
const cardStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border)",
};

/* ─── Main Dashboard Page ─────────────────────────────────── */
export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
      }}
    >
      <Header />

      <div className="flex">
        <Sidebar />

        {/* Main content */}
        <motion.main
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 pt-20 min-h-screen"
          style={{ marginLeft: "260px" }}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl">
            {/* ── Page header ── */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
            >
              <div>
                <h1
                  className="text-3xl sm:text-4xl font-bold tracking-tight"
                  style={{ color: "var(--text)" }}
                >
                  Security{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Dashboard
                  </span>
                </h1>
                <p
                  className="text-sm mt-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  Last scan: 2 minutes ago &nbsp;·&nbsp; All systems optimal
                </p>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 12px 32px rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="font-semibold text-sm px-6 py-3 rounded-xl text-white inline-flex items-center gap-2"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), #7e22ce)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  boxShadow: "0 4px 16px rgba(168, 85, 247, 0.25)",
                }}
              >
                <span>+</span> New Scan
              </motion.button>
            </motion.div>

            {/* ── Stats Grid ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <motion.div variants={itemVariants}>
                <StatCard
                  icon="📁"
                  label="Files Scanned"
                  value="1,247"
                  trend="↑ 12%"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard
                  icon="⚠️"
                  label="Issues Found"
                  value="47"
                  trend="↓ 8%"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard icon="🔴" label="Critical" value="8" trend="↓ 3%" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard
                  icon="✓"
                  label="Clean Files"
                  value="1,192"
                  trend="↑ 15%"
                />
              </motion.div>
            </motion.div>

            {/* ── Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Bar chart */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-2 rounded-2xl p-6"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--text)" }}
                    >
                      Weekly Activity
                    </h3>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Total scans: 382
                    </p>
                  </div>
                  <div
                    className="text-sm font-medium px-3 py-1.5 rounded-lg"
                    style={{
                      background: "rgba(168, 85, 247, 0.1)",
                      color: "#a855f7",
                      border: "1px solid rgba(168, 85, 247, 0.2)",
                    }}
                  >
                    7D
                  </div>
                </div>
                <BarChart data={weeklyData} />
              </motion.div>

              {/* Donut chart */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl p-6 flex flex-col items-center justify-center"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <h3
                  className="text-lg font-semibold mb-6"
                  style={{ color: "var(--text)" }}
                >
                  Security Score
                </h3>
                <DonutChart value={87} />
              </motion.div>
            </div>

            {/* ── Vulnerability & Logs Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Vulnerability breakdown */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="lg:col-span-2 rounded-2xl p-6"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <h3
                  className="text-lg font-semibold mb-5"
                  style={{ color: "var(--text)" }}
                >
                  Vulnerability Breakdown
                </h3>
                <div className="space-y-4">
                  {vulnBreakdown.map((vuln, i) => (
                    <motion.div
                      key={vuln.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <VulnBar {...vuln} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Agent logs */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl p-6"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "var(--text)" }}
                >
                  Agent Logs
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                  {agentLogs.map((log, i) => (
                    <AgentLog key={i} {...log} />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Recent Scans Table ── */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl p-6 overflow-hidden"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Recent Scans
                </h3>
                <a
                  href="#"
                  className="text-sm font-medium hover:opacity-80 transition-opacity"
                  style={{ color: "#a855f7" }}
                >
                  View all →
                </a>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <th
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        File
                      </th>
                      <th
                        className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        Issues
                      </th>
                      <th
                        className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        Severity
                      </th>
                      <th
                        className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        Status
                      </th>
                      <th
                        className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentScans.map((scan, i) => (
                      <motion.tr
                        key={scan.file}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onHoverStart={() => setSelectedFile(scan.file)}
                        onHoverEnd={() => setSelectedFile(null)}
                        className="group hover:bg-opacity-50 transition-all duration-200 cursor-pointer"
                        style={{
                          background:
                            selectedFile === scan.file
                              ? "rgba(168, 85, 247, 0.06)"
                              : "transparent",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                        }}
                      >
                        <td
                          className="px-4 py-4 text-sm font-medium"
                          style={{ color: "var(--text)" }}
                        >
                          {scan.file}
                        </td>
                        <td
                          className="px-4 py-4 text-sm text-center"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {scan.issues}
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-semibold"
                            style={{
                              color:
                                scan.severity === "CRITICAL"
                                  ? "#f43f5e"
                                  : scan.severity === "HIGH"
                                    ? "#f97316"
                                    : scan.severity === "MEDIUM"
                                      ? "#f59e0b"
                                      : "#10b981",
                              background:
                                scan.severity === "CRITICAL"
                                  ? "rgba(244, 63, 94, 0.1)"
                                  : scan.severity === "HIGH"
                                    ? "rgba(249, 115, 22, 0.1)"
                                    : scan.severity === "MEDIUM"
                                      ? "rgba(245, 158, 11, 0.1)"
                                      : "rgba(16, 185, 129, 0.1)",
                            }}
                          >
                            {scan.severity}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-center">
                          <StatusBadge status={scan.status} />
                        </td>
                        <td
                          className="px-4 py-4 text-sm text-right"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {scan.time}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </motion.main>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.5);
        }
      `}</style>
    </div>
  );
}
