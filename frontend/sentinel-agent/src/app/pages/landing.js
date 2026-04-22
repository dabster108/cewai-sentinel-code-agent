"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AnimatedCard from "../components/AnimatedCard";
import { VaporTextShowcase } from "@/components/ui/vapour-text-effect";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  FileCode2,
  Loader2,
  RefreshCcw,
  Upload,
} from "lucide-react";

const sectionRevealVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "down" ? -56 : 56,
    y: 18,
    filter: "blur(3px)",
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stepRevealVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "down" ? -44 : 44,
    scale: 0.96,
  }),
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const features = [
  {
    icon: "🔍",
    title: "Vulnerability Scan",
    description:
      "Deep static analysis using AI agents to detect OWASP Top 10 vulnerabilities, SQL injection, XSS, command injection, and security misconfigurations in your codebase.",
    color: "cyan",
    tag: "Detection Engine",
  },
  {
    icon: "🤖",
    title: "CrewAI Agents",
    description:
      "Multi-agent orchestration with specialized Scanner, Analyzer, and Reporter agents working in parallel for comprehensive, contextual security coverage.",
    color: "pink",
    tag: "AI Powered",
  },
  {
    icon: "📊",
    title: "Detailed Reports",
    description:
      "Generate professional security reports with severity ratings, exact code locations, and actionable remediation recommendations ready to share with your team.",
    color: "green",
    tag: "Reporting",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Submit Code",
    desc: "Upload Python files or connect your GitHub repository. Supports single files or entire codebases.",
  },
  {
    step: "02",
    title: "AI Analysis",
    desc: "CrewAI agents scan, analyze, and cross-reference against known vulnerability patterns and CVE databases.",
  },
  {
    step: "03",
    title: "Get Report",
    desc: "Receive a detailed security report with fixes, severity scores, and line-by-line recommendations.",
  },
];

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

export default function LandingPage() {
  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000",
    [],
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [scrollDirection, setScrollDirection] = useState("down");
  const [copiedFilename, setCopiedFilename] = useState("");

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) > 3) {
        setScrollDirection(delta > 0 ? "down" : "up");
        lastY = currentY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyFixedCode = async (result) => {
    if (!result?.fixed_code) {
      return;
    }

    await navigator.clipboard.writeText(result.fixed_code);
    setCopiedFilename(result.filename);
    window.setTimeout(() => setCopiedFilename(""), 1500);
  };

  const downloadFixedCode = (result) => {
    if (!result?.fixed_code) {
      return;
    }

    const blob = new Blob([result.fixed_code], { type: "text/x-python" });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = getDownloadName(result);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
  };

  const scanFiles = async (filesToScan) => {
    if (!filesToScan || filesToScan.length === 0) {
      setErrorMessage("Select at least one .py file.");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setResults([]);
    setCopiedFilename("");

    try {
      const formData = new FormData();
      filesToScan.forEach((file) => formData.append("files", file));

      const response = await fetch(`${apiBase}/scan-files`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data?.message || "Upload failed.");
        return;
      }

      setResults(data?.results || []);
    } catch (error) {
      setErrorMessage("Upload failed. Check your API server.");
    } finally {
      setIsUploading(false);
    }
  };

  const onFilesChange = (event) => {
    const files = Array.from(event.target.files || []);
    const pythonFiles = files.filter((file) => file.name.endsWith(".py"));

    if (pythonFiles.length === 0) {
      setErrorMessage("Select at least one .py file.");
      setSelectedFiles([]);
      setResults([]);
      return;
    }

    if (pythonFiles.length > 10) {
      setErrorMessage("Max 10 files allowed.");
      const limitedFiles = pythonFiles.slice(0, 10);
      setSelectedFiles(limitedFiles);
      scanFiles(limitedFiles);
      return;
    }

    setErrorMessage("");
    setSelectedFiles(pythonFiles);
    scanFiles(pythonFiles);
  };

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 12% 12%, rgba(56,189,248,0.14), transparent 24%), radial-gradient(circle at 88% 8%, rgba(167,139,250,0.16), transparent 24%), radial-gradient(circle at 60% 82%, rgba(52,211,153,0.08), transparent 24%), #06070b",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_52%)] opacity-80" />

      <HeroSection />

      <section className="px-4 sm:px-6 pt-8 pb-4">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,15,23,0.94),rgba(8,10,16,0.84))] p-6 sm:p-8 lg:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-100">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.7)]" />
                Auto scan workflow
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-[3.45rem]">
                Upload a Python file and get vulnerabilities, fixes, and
                ready-to-copy code.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Picking a file starts the scan immediately. When the fixer
                returns patched code, you can copy it or download it directly
                from the results card.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                {[
                  ["Auto scan", "On file select"],
                  ["Fix output", "Copy + download"],
                  ["Coverage", "Python files"],
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

            <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Live intake
                  </div>
                  <div className="mt-1 text-lg font-semibold text-slate-50">
                    Files move straight into analysis
                  </div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Upload size={17} strokeWidth={1.9} />
                </div>
              </div>

              <div className="mt-4 rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FileCode2 size={14} className="text-cyan-200" />
                  Immediate file scan and fixer response
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {[
                    ["Queued", String(selectedFiles.length).padStart(2, "0")],
                    ["Scanning", isUploading ? "01" : "00"],
                    [
                      "Fixed",
                      results
                        .filter((result) => result.fixed_code)
                        .length.toString()
                        .padStart(2, "0"),
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3"
                    >
                      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
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
        </div>
      </section>

      <section className="px-4 sm:px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            custom={scrollDirection}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            variants={sectionRevealVariants}
            className="text-center mb-12"
          >
            <div className="text-xs font-semibold uppercase tracking-widest mb-3 text-cyan-200">
              Capabilities
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-slate-50">
              What Sentinel Delivers
            </h2>
            <div className="h-px w-16 mx-auto mt-5 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <AnimatedCard
                key={feature.title}
                title={feature.title}
                icon={feature.icon}
                color={feature.color}
                description={feature.description}
                tag={feature.tag}
                index={index}
                scrollDirection={scrollDirection}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            custom={scrollDirection}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            variants={sectionRevealVariants}
            className="text-center mb-10"
          >
            <div className="text-xs font-semibold uppercase tracking-widest mb-3 text-amber-200">
              Live AI Flow
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-slate-50">
              Signal Through The Noise
            </h2>
          </motion.div>

          <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.14)_0%,transparent_45%),radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.16)_0%,transparent_45%),rgba(255,255,255,0.02)] shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
            <div className="h-[240px] sm:h-[300px] md:h-[360px]">
              <VaporTextShowcase />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            custom={scrollDirection}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            variants={sectionRevealVariants}
            className="text-center mb-12"
          >
            <div className="text-xs font-semibold uppercase tracking-widest mb-3 text-fuchsia-200">
              Workflow
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-slate-50">
              How It Works
            </h2>
            <div className="h-px w-16 mx-auto mt-5 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                custom={scrollDirection}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.35 }}
                variants={stepRevealVariants}
                transition={{ delay: index * 0.14, duration: 0.45 }}
                className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(10,14,24,0.88))] p-6 shadow-[0_10px_30px_rgba(15,40,80,0.12)]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400/12 text-xl font-bold text-cyan-200">
                  {step.step}
                </div>
                <h3 className="mt-5 text-center font-semibold text-slate-50">
                  {step.title}
                </h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-slate-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(12,15,23,0.94),rgba(8,10,16,0.84))] p-6 sm:p-8 lg:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <motion.div
            custom={scrollDirection}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            variants={sectionRevealVariants}
            className="text-center mb-10"
          >
            <div className="text-xs font-semibold uppercase tracking-widest mb-3 text-emerald-200">
              Multi-File Scan
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-slate-50">
              Upload Python files in one pass
            </h2>
            <p className="mt-4 text-sm text-slate-400">
              Pick up to 10 files. Scanning starts immediately, and fixed code
              appears as soon as the crew returns it.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-white/[0.03] p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-100">
                Upload Python files
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {selectedFiles.length} selected
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="cursor-pointer rounded-xl border border-white/16 bg-[linear-gradient(135deg,#a855f7_0%,#7c3aed_54%,#06b6d4_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(168,85,247,0.32)] transition hover:-translate-y-0.5">
                Choose files
                <input
                  type="file"
                  accept=".py"
                  multiple
                  className="hidden"
                  onChange={onFilesChange}
                />
              </label>

              <button
                type="button"
                onClick={() => scanFiles(selectedFiles)}
                disabled={isUploading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/25 bg-[linear-gradient(180deg,rgba(8,18,34,0.88),rgba(7,11,18,0.92))] px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isUploading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <RefreshCcw size={14} />
                )}
                {isUploading ? "Scanning..." : "Rescan"}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/8 px-3 py-2 text-xs text-red-200">
              <AlertTriangle size={14} />
              {errorMessage}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6 grid gap-4">
              {results.map((result) => (
                <motion.div
                  key={result.filename}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3 }}
                  className="overflow-hidden rounded-2xl border border-white/8 bg-[linear-gradient(165deg,rgba(10,17,28,0.86),rgba(8,11,20,0.9))] p-4 md:p-5 shadow-[0_8px_22px_rgba(2,8,23,0.26)]"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-sm font-semibold text-slate-100">
                          {result.filename}
                        </div>
                        <span
                          className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium"
                          style={{
                            color:
                              result.status === "success"
                                ? "#a7f3d0"
                                : "#fecaca",
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
                              ? "Scanned and fixed"
                              : "Scanned"
                            : result.error || "Scan failed"}
                        </span>
                      </div>

                      <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                          Analysis
                        </div>
                        <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">
                          {formatAnalysisSummary(result.analysis)}
                        </pre>
                      </div>
                    </div>

                    <div className="w-full max-w-xl rounded-2xl border border-cyan-300/15 bg-cyan-300/6 p-4">
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
                        <FileCode2 size={14} />
                        Fixed code
                      </div>

                      {result.fixed_code ? (
                        <>
                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => copyFixedCode(result)}
                              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-slate-100 transition hover:bg-white/[0.08]"
                            >
                              <Copy size={14} />
                              {copiedFilename === result.filename
                                ? "Copied"
                                : "Copy code"}
                            </button>
                            <button
                              type="button"
                              onClick={() => downloadFixedCode(result)}
                              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300/15"
                            >
                              <Download size={14} />
                              Download file
                            </button>
                          </div>

                          <div className="mt-3 rounded-2xl border border-white/8 bg-slate-950/80 p-3">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                              Preview
                            </div>
                            <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">
                              {result.fixed_code}
                            </pre>
                          </div>
                        </>
                      ) : (
                        <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
                          No fixed code was returned for this file. If the scan
                          produced a patch, it will appear here automatically.
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            custom={scrollDirection}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            variants={sectionRevealVariants}
          >
            <div className="text-xs font-semibold uppercase tracking-widest mb-4 text-slate-300">
              Get Started Today
            </div>
            <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight text-slate-50">
              Ready to secure your release pipeline?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400">
              Start scanning today with AI-powered security analysis and
              auto-generated remediation you can use immediately.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/dashboard">
                <span className="inline-flex rounded-xl border border-white/16 bg-[linear-gradient(135deg,#a855f7_0%,#7c3aed_55%,#06b6d4_100%)] px-10 py-4 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(168,85,247,0.3)] transition hover:-translate-y-0.5">
                  Launch Dashboard →
                </span>
              </Link>
              <a
                href="#"
                className="inline-flex rounded-xl border border-cyan-300/28 bg-[linear-gradient(180deg,rgba(9,16,28,0.88),rgba(7,11,18,0.92))] px-10 py-4 text-sm font-medium text-slate-200 shadow-[0_10px_24px_rgba(2,8,23,0.32)] transition hover:-translate-y-0.5"
              >
                View GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
