"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ChevronDown,
  CircleGauge,
  CheckCircle2,
  Copy,
  Download,
  FileText,
  FileCode2,
  Layers3,
  LineChart,
  Loader2,
  RefreshCcw,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Workflow,
  BellRing,
} from "lucide-react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const reportsData = [
  { day: "Mon", scans: 44, issues: 9 },
  { day: "Tue", scans: 59, issues: 7 },
  { day: "Wed", scans: 53, issues: 8 },
  { day: "Thu", scans: 67, issues: 6 },
  { day: "Fri", scans: 72, issues: 5 },
  { day: "Sat", scans: 49, issues: 4 },
  { day: "Sun", scans: 88, issues: 3 },
];

const reportStats = [
  {
    label: "Total Scans",
    value: "382",
    trend: "+12%",
    tone: "#38bdf8",
  },
  {
    label: "Issues Over Time",
    value: "47",
    trend: "-8%",
    tone: "#a78bfa",
  },
  {
    label: "Critical Trend",
    value: "8",
    trend: "-3%",
    tone: "#22d3ee",
  },
  {
    label: "Clean Files",
    value: "1,192",
    trend: "+15%",
    tone: "#34d399",
  },
];

const agentList = [
  {
    name: "Scanner Agent",
    role: "Scanner",
    status: "Active",
    lastActivity: "2m ago",
    detail:
      "Streams repository payloads through static analysis and flagging rules.",
    tone: "#38bdf8",
  },
  {
    name: "Analyzer Agent",
    role: "Analyzer",
    status: "Active",
    lastActivity: "6m ago",
    detail:
      "Correlates findings, resolves severity, and groups related hotspots.",
    tone: "#a78bfa",
  },
  {
    name: "Reporter Agent",
    role: "Reporter",
    status: "Inactive",
    lastActivity: "18m ago",
    detail: "Composes clean remediation summaries and release-ready reports.",
    tone: "#22d3ee",
  },
  {
    name: "Policy Agent",
    role: "Policy",
    status: "Active",
    lastActivity: "1m ago",
    detail:
      "Applies security standards and route-specific policy checks to scans.",
    tone: "#34d399",
  },
];

const workflowNodes = [
  {
    label: "Input",
    title: "Source Intake",
    detail: "Code, manifests, and metadata enter the pipeline.",
    tone: "#38bdf8",
  },
  {
    label: "Processing",
    title: "Agent Routing",
    detail: "Scanner and policy agents normalize the payloads.",
    tone: "#a78bfa",
  },
  {
    label: "Output",
    title: "Security Result",
    detail: "Reports are emitted with severity and remediation context.",
    tone: "#34d399",
  },
];

const settingsGroups = [
  {
    title: "General",
    description: "Core dashboard behavior and workspace defaults.",
    icon: Layers3,
  },
  {
    title: "Security",
    description: "Policy enforcement and alert thresholds.",
    icon: Shield,
  },
  {
    title: "Notifications",
    description: "Delivery channels and alert digest timing.",
    icon: BellRing,
  },
];

const panelStyle = {
  background:
    "linear-gradient(165deg, rgba(12,15,23,0.94), rgba(8,10,16,0.84))",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 30px 80px rgba(0,0,0,0.42)",
  backdropFilter: "blur(20px)",
};

function formatAnalysisSummary(analysis) {
  if (!analysis) {
    return "No analysis was returned for this file.";
  }

  if (typeof analysis === "string") {
    return analysis;
  }

  if (analysis.text) {
    return analysis.text;
  }

  return JSON.stringify(analysis, null, 2);
}

function getDownloadName(result) {
  if (result?.fixed_filename) {
    return result.fixed_filename;
  }

  if (result?.filename?.endsWith(".py")) {
    return result.filename.replace(/\.py$/i, ".fixed.py");
  }

  return `${result?.filename || "fixed-file"}.py`;
}

function SectionShell({
  eyebrow,
  title,
  description,
  children,
  id,
  className = "",
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`scroll-mt-24 rounded-[32px] p-5 sm:p-6 lg:p-7 ${className}`}
      style={panelStyle}
    >
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">
            {eyebrow}
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 sm:text-[2rem]">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function StatCard({ label, value, trend, tone, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="group relative overflow-hidden rounded-[24px] p-5"
      style={panelStyle}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(56,189,248,0.16), transparent 45%), radial-gradient(circle at bottom left, rgba(167,139,250,0.12), transparent 38%)",
        }}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
            {label}
          </div>
          <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-50">
            {value}
          </div>
        </div>
        <div className="relative h-8 w-20 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <svg viewBox="0 0 64 24" className="absolute inset-0 h-full w-full">
            <motion.path
              d="M4 18 C 14 18, 16 12, 24 12 S 38 16, 46 8 S 56 5, 60 6"
              fill="none"
              stroke={tone}
              strokeWidth="1.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.4 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </div>
      </div>
      <div className="relative mt-5 flex items-center justify-between gap-3">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
          style={{
            color: trend.startsWith("+") ? "#a7f3d0" : "#bfdbfe",
            borderColor: trend.startsWith("+")
              ? "rgba(52,211,153,0.24)"
              : "rgba(56,189,248,0.24)",
            background: trend.startsWith("+")
              ? "rgba(16,185,129,0.08)"
              : "rgba(59,130,246,0.08)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: tone, boxShadow: `0 0 12px ${tone}` }}
          />
          <span>{trend}</span>
        </div>
        <div className="text-xs leading-5 text-slate-400">
          Compact analytics with live trend feedback.
        </div>
      </div>
    </motion.div>
  );
}

function TrendChart() {
  const [hoveredIndex, setHoveredIndex] = useState(6);

  const chart = useMemo(() => {
    const width = 700;
    const height = 260;
    const paddingX = 18;
    const paddingY = 24;
    const max = Math.max(...reportsData.map((item) => item.scans));
    const min = Math.min(...reportsData.map((item) => item.scans));
    const range = max - min || 1;
    const step = (width - paddingX * 2) / (reportsData.length - 1);

    const points = reportsData.map((item, index) => {
      const x = paddingX + index * step;
      const y =
        paddingY +
        (max - item.scans) * ((height - paddingY * 2) / range) * 0.82;
      return { ...item, x, y };
    });

    const line = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");
    const area = `${line} L ${points.at(-1).x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

    return { width, height, points, line, area };
  }, []);

  const activePoint = chart.points[hoveredIndex];

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-4 py-5 sm:px-5 sm:py-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.10),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(167,139,250,0.12),transparent_30%)]" />
      <svg
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        className="relative h-[260px] w-full overflow-visible"
      >
        <defs>
          <linearGradient id="reportArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.34" />
            <stop offset="55%" stopColor="#a78bfa" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="reportLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="reportSweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1="16"
            x2={chart.width - 16}
            y1={chart.height * ratio}
            y2={chart.height * ratio}
            stroke="rgba(148,163,184,0.12)"
            strokeDasharray="4 7"
          />
        ))}

        <motion.path
          d={chart.area}
          fill="url(#reportArea)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d={chart.line}
          fill="none"
          stroke="url(#reportLine)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.rect
          x="-50"
          y="0"
          width="90"
          height={chart.height}
          fill="url(#reportSweep)"
          opacity="0.4"
          initial={{ x: -120 }}
          animate={{ x: chart.width + 50 }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "linear" }}
        />

        {chart.points.map((point, index) => (
          <g key={point.day} onMouseEnter={() => setHoveredIndex(index)}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === index ? 6 : 4}
              fill={hoveredIndex === index ? "#e0f2fe" : "#7dd3fc"}
              stroke={
                hoveredIndex === index ? "#38bdf8" : "rgba(255,255,255,0.2)"
              }
              strokeWidth="2"
              animate={{
                scale: hoveredIndex === index ? [1, 1.08, 1] : 1,
                opacity: hoveredIndex === index ? 1 : 0.82,
              }}
              transition={{
                duration: 2.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}
      </svg>

      <motion.div
        key={activePoint.day}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute -top-1 rounded-2xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-md"
        style={{ left: `calc(${(activePoint.x / chart.width) * 100}% - 42px)` }}
      >
        <div className="font-semibold text-slate-50">{activePoint.day}</div>
        <div className="mt-0.5 text-slate-300 tabular-nums">
          {activePoint.scans} scans
        </div>
      </motion.div>

      <div className="relative mt-5 grid grid-cols-7 gap-2 px-1 sm:px-2">
        {reportsData.map((day, index) => {
          const active = index === hoveredIndex;
          const height = 54 + day.scans;
          return (
            <button
              key={day.day}
              type="button"
              onMouseEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              className="group flex flex-col items-center gap-2 text-left"
            >
              <div className="relative flex h-[148px] w-full items-end justify-center rounded-[20px] px-1">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className="relative w-full origin-bottom overflow-hidden rounded-[18px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(56,189,248,0.95), rgba(167,139,250,0.78) 58%, rgba(52,211,153,0.44))",
                    boxShadow: active
                      ? "0 18px 28px rgba(56,189,248,0.16)"
                      : "0 8px 16px rgba(0,0,0,0.18)",
                    transform: active ? "translateY(-2px)" : "translateY(0)",
                    minHeight: 16,
                  }}
                >
                  <motion.div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.16) 48%, transparent 76%)",
                    }}
                    animate={{ x: ["-120%", "160%"] }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>
              <div className="text-xs font-medium text-slate-400">
                {day.day}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReportsFilters() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {[
        { label: "Date Range", value: "Last 7 days" },
        { label: "Severity", value: "All levels" },
        { label: "View", value: "Trend summary" },
      ].map((item) => (
        <label key={item.label} className="space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
            {item.label}
          </span>
          <div className="relative">
            <select
              defaultValue={item.value}
              className="w-full appearance-none rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 pr-10 text-sm text-slate-100 outline-none transition focus:border-cyan-300/30 focus:bg-white/[0.05]"
            >
              <option>{item.value}</option>
              <option>Last 24 hours</option>
              <option>Last 30 days</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </label>
      ))}
    </div>
  );
}

function UploadPanel({ files, onFilesChange, uploadState, onClear, results }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (incomingFiles) => {
    const nextFiles = Array.from(incomingFiles || [])
      .filter((file) => file.name.endsWith(".py"))
      .slice(0, 10);
    if (nextFiles.length > 0) {
      onFilesChange(nextFiles);
    }
  };

  return (
    <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
            File upload
          </div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            Upload Python files for scanning
          </div>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Drop files here or choose them manually. The dashboard will use them
            as the next scan input and auto-run analysis.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300">
          <Upload size={14} className="text-cyan-200" />
          Supports .py only
        </div>
      </div>

      <label
        className={`mt-4 flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed px-5 py-6 text-center transition-all duration-200 ${isDragging ? "border-cyan-300/40 bg-cyan-300/10" : "border-white/10 bg-white/[0.02] hover:border-cyan-300/25 hover:bg-white/[0.04]"}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04] text-cyan-200">
          <Upload size={18} strokeWidth={1.9} />
        </div>
        <div className="mt-4 text-sm font-medium text-slate-100">
          Drag and drop files here
        </div>
        <div className="mt-1 text-xs leading-5 text-slate-500">
          Or click to select files from your device.
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".py"
          multiple
          className="sr-only"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/15"
          onClick={() => fileInputRef.current?.click()}
        >
          Select files
        </button>
        <div className="text-xs text-slate-500">
          {uploadState === "uploading"
            ? "Scanning files..."
            : uploadState === "done"
              ? "Scan complete"
              : uploadState === "error"
                ? "Scan failed"
                : "Waiting for files"}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-slate-200">
                  <FileText size={15} strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium text-slate-100">
                    {file.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {Math.max(1, Math.round(file.size / 1024))} KB
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/8 px-3 py-1 text-xs text-slate-400 transition hover:bg-white/[0.05] hover:text-slate-200"
                onClick={() => onClear(file.name)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-5 rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Scan results
              </div>
              <div className="mt-1 text-sm text-slate-300">
                Auto-run analysis output with fixed code when available.
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {results.map((result) => (
              <div
                key={result.filename}
                className="rounded-2xl border border-white/8 bg-slate-950/70 p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-semibold text-slate-100">
                    {result.filename}
                  </div>
                  <span
                    className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium"
                    style={{
                      color:
                        result.status === "success" ? "#a7f3d0" : "#fecaca",
                      borderColor:
                        result.status === "success"
                          ? "rgba(52,211,153,0.24)"
                          : "rgba(248,113,113,0.24)",
                      background:
                        result.status === "success"
                          ? "rgba(16,185,129,0.08)"
                          : "rgba(239,68,68,0.08)",
                    }}
                  >
                    {result.status === "success" ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <AlertTriangle size={12} />
                    )}
                    {result.status === "success"
                      ? result.fixed_code_available
                        ? "Fixed"
                        : "Scanned"
                      : result.error || "Scan failed"}
                  </span>
                </div>

                <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Analysis
                  </div>
                  <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">
                    {formatAnalysisSummary(result.analysis)}
                  </pre>
                </div>

                {result.fixed_code ? (
                  <div className="mt-3 rounded-2xl border border-cyan-300/15 bg-cyan-300/6 p-3">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
                      <FileCode2 size={14} />
                      Fixed code
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(result.fixed_code)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-white/[0.08]"
                      >
                        <Copy size={14} />
                        Copy code
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const blob = new Blob([result.fixed_code], {
                            type: "text/x-python",
                          });
                          const url = window.URL.createObjectURL(blob);
                          const anchor = document.createElement("a");
                          anchor.href = url;
                          anchor.download = getDownloadName(result);
                          document.body.appendChild(anchor);
                          anchor.click();
                          document.body.removeChild(anchor);
                          window.URL.revokeObjectURL(url);
                        }}
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/15"
                      >
                        <Download size={14} />
                        Download file
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AgentCard({ agent, isSelected, onSelect, index }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => onSelect(agent.name)}
      className="group relative overflow-hidden rounded-[24px] border text-left"
      style={{
        borderColor: isSelected
          ? "rgba(56,189,248,0.24)"
          : "rgba(255,255,255,0.08)",
        background: isSelected
          ? "linear-gradient(165deg, rgba(56,189,248,0.10), rgba(167,139,250,0.06))"
          : "linear-gradient(165deg, rgba(12,15,23,0.92), rgba(8,10,16,0.84))",
        boxShadow: isSelected
          ? "0 18px 36px rgba(2,8,23,0.28), inset 0 0 0 1px rgba(56,189,248,0.08)"
          : "0 22px 60px rgba(0,0,0,0.28)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at top right, ${agent.tone}1f, transparent 42%)`,
        }}
      />

      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-50">
              {agent.name}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">
              {agent.role}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1">
            <span
              className={`h-2.5 w-2.5 rounded-full ${agent.status === "Active" ? "animate-pulse" : ""}`}
              style={{
                background:
                  agent.status === "Active"
                    ? agent.tone
                    : "rgba(148,163,184,0.7)",
                boxShadow: `0 0 14px ${agent.tone}`,
              }}
            />
            <span className="text-[11px] font-medium text-slate-200">
              {agent.status}
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-2 text-sm text-slate-300">
          <div className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-3 py-2">
            <span className="text-slate-500">Last activity</span>
            <span>{agent.lastActivity}</span>
          </div>
          <div className="rounded-2xl bg-white/[0.03] px-3 py-2 leading-6 text-slate-400">
            {agent.detail}
          </div>
        </div>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 6 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 6 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-sm text-slate-300"
            >
              Detailed view expands smoothly here with task history, recent
              signals, and agent telemetry.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

function WorkflowDiagram() {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-4 py-5 sm:px-5 sm:py-6">
      <svg
        className="absolute inset-0 hidden h-full w-full lg:block"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="agentFlowLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        <path
          d="M120 110 H1080"
          fill="none"
          stroke="url(#agentFlowLine)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="11 12"
        />
        <motion.path
          d="M120 110 H1080"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 16"
          animate={{ strokeDashoffset: [0, -60] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.rect
          x="0"
          y="98"
          width="120"
          height="24"
          rx="12"
          fill="url(#agentFlowLine)"
          opacity="0.36"
          animate={{ x: [0, 1080] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      <div className="relative grid grid-cols-1 gap-4 lg:grid-cols-3">
        {workflowNodes.map((node, index) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.42, delay: index * 0.08 }}
            className="rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(10,14,24,0.88))] p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                {node.label}
              </div>
              <span
                className="inline-flex h-3 w-3 rounded-full"
                style={{
                  background: node.tone,
                  boxShadow: `0 0 14px ${node.tone}`,
                }}
              />
            </div>
            <div className="mt-4 text-lg font-semibold tracking-tight text-slate-50">
              {node.title}
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-400">
              {node.detail}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-left transition hover:bg-white/[0.05]"
    >
      <div>
        <div className="text-sm font-medium text-slate-100">{label}</div>
        <div className="text-xs text-slate-500">
          Smooth, stable preference control
        </div>
      </div>
      <div
        className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-cyan-400/25" : "bg-white/10"}`}
      >
        <motion.span
          animate={{ x: checked ? 18 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 34 }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-slate-50 shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
        />
      </div>
    </button>
  );
}

function SettingsPanel({ group, children }) {
  const Icon = group.icon;
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-cyan-200">
          <Icon size={16} strokeWidth={1.9} />
        </div>
        <div>
          <div className="text-base font-semibold text-slate-50">
            {group.title}
          </div>
          <div className="text-sm text-slate-400">{group.description}</div>
        </div>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(agentList[0].name);
  const [autoScan, setAutoScan] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [saving, setSaving] = useState(false);
  const [riskLevel, setRiskLevel] = useState("Balanced");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadState, setUploadState] = useState("idle");
  const [scanResults, setScanResults] = useState([]);
  const [scanError, setScanError] = useState("");
  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000",
    [],
  );

  useEffect(() => {
    if (!saving) return undefined;
    const timer = window.setTimeout(() => setSaving(false), 900);
    return () => window.clearTimeout(timer);
  }, [saving]);

  const scanFiles = async (filesToScan) => {
    if (filesToScan.length === 0) {
      setUploadState("idle");
      setScanResults([]);
      setScanError("");
      return;
    }

    setUploadState("uploading");
    setScanError("");

    try {
      const formData = new FormData();
      filesToScan.forEach((file) => formData.append("files", file));

      const response = await fetch(`${apiBase}/scan-files`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setUploadState("error");
        setScanError(data?.message || "Upload failed.");
        setScanResults([]);
        return;
      }

      setScanResults(data?.results || []);
      setUploadState("done");
    } catch (error) {
      setUploadState("error");
      setScanError("Upload failed. Check your API server.");
      setScanResults([]);
    }
  };

  const handleUploadFiles = (nextFiles) => {
    setUploadedFiles(nextFiles);
    scanFiles(nextFiles);
  };

  const clearUploadedFile = (fileName) => {
    setUploadedFiles((current) => {
      const nextFiles = current.filter((file) => file.name !== fileName);
      if (nextFiles.length === 0) {
        setUploadState("idle");
        setScanResults([]);
        setScanError("");
      } else {
        scanFiles(nextFiles);
      }
      return nextFiles;
    });
  };

  const sidebarContentOffset = isSidebarOpen ? "260px" : "92px";

  const activeAgent =
    agentList.find((agent) => agent.name === selectedAgent) || agentList[0];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 14% 10%, rgba(56,189,248,0.12), transparent 26%), radial-gradient(circle at 82% 8%, rgba(167,139,250,0.14), transparent 24%), radial-gradient(circle at 60% 82%, rgba(52,211,153,0.08), transparent 24%), #06070b",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_52%)] opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />

      <Header />

      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((previous) => !previous)}
        />

        <motion.main
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex-1 pt-20 min-h-screen"
          style={{
            marginLeft: sidebarContentOffset,
            transition: "margin-left 220ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8 lg:pb-16 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]"
            >
              <div
                className="rounded-[32px] p-6 sm:p-8 lg:p-10 flex flex-col min-h-[640px]"
                style={panelStyle}
              >
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-100">
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.7)]" />
                    Real-time security workspace
                  </div>
                  <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-[3.45rem]">
                    Reports, agents, and settings in one calm, premium
                    interface.
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                    Structured content sections keep the dashboard focused:
                    analytics first, agent orchestration second, and
                    configuration last. Motion stays subtle and purposeful.
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    {[
                      ["Last scan", "2m ago"],
                      ["Coverage", "98.4%"],
                      ["Status", "Stable"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2"
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                          {label}
                        </div>
                        <div className="mt-0.5 text-sm font-medium text-slate-100">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                          Scan pulse
                        </div>
                        <div className="mt-1 text-lg font-semibold text-slate-50">
                          Continuous intake is active
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                        <CircleGauge size={17} strokeWidth={1.9} />
                      </div>
                    </div>

                    <div className="mt-4 rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <LineChart size={14} className="text-cyan-200" />
                        Live intake chart
                      </div>
                      <div className="mt-4 grid grid-cols-4 gap-2">
                        {[
                          { label: "Queued", value: "08" },
                          { label: "Scanning", value: "03" },
                          { label: "Ready", value: "12" },
                          { label: "Retry", value: "01" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-center"
                          >
                            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                              {item.label}
                            </div>
                            <div className="mt-1 text-lg font-semibold text-slate-50">
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            width: "68%",
                            background:
                              "linear-gradient(90deg, #38bdf8, #a78bfa 55%, #34d399)",
                            boxShadow: "0 0 16px rgba(56,189,248,0.24)",
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: "68%" }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Quick intake
                    </div>
                    <div className="mt-3 space-y-2">
                      {[
                        ["Last upload", "2 files"],
                        ["Next scan", "Auto-trigger"],
                        ["Signal", "Live"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm"
                        >
                          <span className="text-slate-500">{label}</span>
                          <span className="text-slate-100">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-[22px] border border-cyan-300/15 bg-cyan-300/8 px-4 py-4">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-100">
                        Ready for scan
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Upload files, then trigger the next analysis cycle
                        without leaving the dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] p-6 sm:p-7" style={panelStyle}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      Scan upload
                    </div>
                    <div className="mt-2 text-xl font-semibold tracking-tight text-slate-50">
                      Upload files for immediate analysis
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <Upload size={18} strokeWidth={1.9} />
                  </div>
                </div>

                <div className="mt-5">
                  <UploadPanel
                    files={uploadedFiles}
                    onFilesChange={handleUploadFiles}
                    uploadState={uploadState}
                    onClear={clearUploadedFile}
                  />
                </div>

                <div className="mt-5 rounded-[22px] border border-white/8 bg-white/[0.03] p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Live feed
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-slate-300">
                    <div className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
                      <span>auth.py triaged</span>
                      <span className="tabular-nums text-slate-200">
                        3 findings
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/[0.03] px-4 py-3">
                      <span>database.py analyzed</span>
                      <span className="tabular-nums text-slate-200">
                        correlated
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionShell
              id="reports"
              eyebrow="Reports"
              title="Structured analytics and scan history"
              description="Scan history, compact trend cards, and filter controls are organized into a single premium reporting surface."
            >
              <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
                <TrendChart />
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                    {reportStats.map((stat, index) => (
                      <StatCard key={stat.label} {...stat} index={index} />
                    ))}
                  </div>

                  <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                          Filters
                        </div>
                        <div className="mt-1 text-sm text-slate-300">
                          Date range and severity controls
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-cyan-200">
                        <SlidersHorizontal size={16} strokeWidth={1.9} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <ReportsFilters />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Trend", value: "Improving", tone: "#34d399" },
                  { label: "Issue decay", value: "-8.4%", tone: "#a78bfa" },
                  { label: "Critical ratio", value: "Stable", tone: "#38bdf8" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                      {item.label}
                    </div>
                    <div className="mt-2 text-xl font-semibold text-slate-50">
                      {item.value}
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-white/6">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "62%",
                          background: `linear-gradient(90deg, ${item.tone}, rgba(255,255,255,0.16))`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell
              id="agents"
              eyebrow="Agents"
              title="Responsive cards with live state and smooth expansion"
              description="Agent cards surface status, role, and recent activity. Clicking a card expands it smoothly while the workflow map keeps the pipeline readable."
            >
              <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {agentList.map((agent, index) => (
                      <AgentCard
                        key={agent.name}
                        agent={agent}
                        index={index}
                        isSelected={selectedAgent === agent.name}
                        onSelect={setSelectedAgent}
                      />
                    ))}
                  </div>
                  <div className="mt-4 rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                          Selected agent
                        </div>
                        <div className="mt-1 text-lg font-semibold text-slate-50">
                          {activeAgent.name}
                        </div>
                      </div>
                      <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300">
                        {activeAgent.role}
                      </span>
                    </div>
                    <div className="mt-3 text-sm leading-6 text-slate-400">
                      {activeAgent.detail}
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-[26px] p-5" style={panelStyle}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-cyan-200">
                        <Workflow size={16} strokeWidth={1.9} />
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                          Workflow
                        </div>
                        <div className="mt-1 text-lg font-semibold text-slate-50">
                          Input → processing → output
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <WorkflowDiagram />
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-500">
                          Execution state
                        </div>
                        <div className="mt-1 text-lg font-semibold text-slate-50">
                          Live system summary
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-100">
                        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.7)]" />
                        Healthy
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        ["Queue", "03"],
                        ["Latency", "0.8s"],
                        ["Active", "3/4"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                        >
                          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            {label}
                          </div>
                          <div className="mt-1 text-lg font-semibold text-slate-50">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SectionShell>

            <SectionShell
              id="settings"
              eyebrow="Settings"
              title="Grouped configuration with calm, stable interactions"
              description="General, security, and notification settings are organized for readability. Changes show soft feedback and stay visually restrained."
            >
              <div className="grid gap-5 xl:grid-cols-3">
                <SettingsPanel group={settingsGroups[0]}>
                  <label className="space-y-2">
                    <div className="text-sm font-medium text-slate-100">
                      Theme accent
                    </div>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 pr-10 text-sm text-slate-100 outline-none transition focus:border-cyan-300/30 focus:bg-white/[0.05]">
                        <option>Teal</option>
                        <option>Blue</option>
                        <option>Purple</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </label>
                  <Toggle
                    checked={autoScan}
                    onChange={(value) => {
                      setAutoScan(value);
                      setSaving(true);
                    }}
                    label="Auto scan on startup"
                  />
                </SettingsPanel>

                <SettingsPanel group={settingsGroups[1]}>
                  <label className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium text-slate-100">
                      <span>Risk threshold</span>
                      <span className="text-slate-400">{riskLevel}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      defaultValue="72"
                      onChange={(event) => {
                        const value = Number(event.target.value);
                        setRiskLevel(
                          value > 80
                            ? "Strict"
                            : value > 55
                              ? "Balanced"
                              : "Relaxed",
                        );
                        setSaving(true);
                      }}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-300"
                    />
                  </label>
                  <label className="space-y-2">
                    <div className="text-sm font-medium text-slate-100">
                      Policy mode
                    </div>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 pr-10 text-sm text-slate-100 outline-none transition focus:border-cyan-300/30 focus:bg-white/[0.05]">
                        <option>Balanced</option>
                        <option>Strict</option>
                        <option>Permissive</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </label>
                </SettingsPanel>

                <SettingsPanel group={settingsGroups[2]}>
                  <Toggle
                    checked={weeklyDigest}
                    onChange={(value) => {
                      setWeeklyDigest(value);
                      setSaving(true);
                    }}
                    label="Weekly digest"
                  />
                  <label className="space-y-2">
                    <div className="text-sm font-medium text-slate-100">
                      Delivery window
                    </div>
                    <div className="relative">
                      <select className="w-full appearance-none rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 pr-10 text-sm text-slate-100 outline-none transition focus:border-cyan-300/30 focus:bg-white/[0.05]">
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    </div>
                  </label>
                </SettingsPanel>
              </div>

              <div className="mt-5 flex flex-col gap-3 rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Sparkles size={16} className="text-cyan-200" />
                  <span>
                    {saving ? "Saving changes" : "Settings are synced"}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-500">
                  {saving
                    ? "Updating preferences..."
                    : "Last saved a few seconds ago"}
                </div>
              </div>
            </SectionShell>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
