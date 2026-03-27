"use client";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AnimatedCard from "../components/AnimatedCard";

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

export default function LandingPage() {
  const apiBase = useMemo(
    () => process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000",
    [],
  );
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const onFilesChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 10) {
      setErrorMessage("Max 10 files allowed.");
      setSelectedFiles(files.slice(0, 10));
      return;
    }
    setErrorMessage("");
    setSelectedFiles(files);
  };

  const onUpload = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage("Select at least one .py file.");
      return;
    }

    setIsUploading(true);
    setErrorMessage("");
    setResults([]);

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));

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

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Header />

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Features ── */}
      <section className="py-28 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--primary)" }}
          >
            Capabilities
          </div>
          <h2
            className="font-display text-3xl md:text-4xl"
            style={{ color: "var(--text)" }}
          >
            What Sentinel Delivers
          </h2>
          <div
            className="h-px w-16 mx-auto mt-5 rounded-full"
            style={{ background: "var(--border-bright)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <AnimatedCard
              key={f.title}
              title={f.title}
              icon={f.icon}
              color={f.color}
              description={f.description}
              tag={f.tag}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-28 px-4 sm:px-6 cinema-surface">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--primary)" }}
            >
              Workflow
            </div>
            <h2
              className="font-display text-3xl md:text-4xl"
              style={{ color: "var(--text)" }}
            >
              How It Works
            </h2>
            <div
              className="h-px w-16 mx-auto mt-5 rounded-full"
              style={{ background: "var(--border-bright)" }}
            />
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {howItWorks.map((s, i) => (
              <div
                key={s.step}
                className="flex-1 flex flex-col md:flex-row items-center gap-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.18, duration: 0.45 }}
                  whileHover={{ y: -3 }}
                  className="flex-1 text-center p-8 rounded-xl w-full"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 10px 30px rgba(15,40,80,0.12)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 font-bold text-xl"
                    style={{
                      background: "rgba(29,78,216,0.12)",
                      color: "var(--primary)",
                    }}
                  >
                    {s.step}
                  </div>
                  <h3
                    className="font-semibold mb-3"
                    style={{ color: "var(--text)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.desc}
                  </p>
                </motion.div>
                {i < howItWorks.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.18 + 0.3 }}
                    className="hidden md:block text-2xl flex-shrink-0"
                    style={{ color: "var(--text-subtle)" }}
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Multi-file upload ── */}
      <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--primary)" }}
          >
            Multi-File Scan
          </div>
          <h2
            className="font-display text-3xl md:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Upload multiple files in one pass
          </h2>
          <p className="text-sm mt-4" style={{ color: "var(--text-muted)" }}>
            Select up to 10 Python files. Results stream back per file.
          </p>
        </motion.div>

        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "0 16px 40px rgba(15,40,80,0.14)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                Upload Python files
              </div>
              <div
                className="text-xs mt-2"
                style={{ color: "var(--text-subtle)" }}
              >
                {selectedFiles.length} selected
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <label
                className="text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer text-white"
                style={{ background: "var(--primary)" }}
              >
                Choose files
                <input
                  type="file"
                  accept=".py"
                  multiple
                  className="hidden"
                  onChange={onFilesChange}
                />
              </label>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onUpload}
                disabled={isUploading}
                className="text-sm font-semibold px-5 py-2 rounded-lg"
                style={{
                  background: "rgba(29,78,216,0.1)",
                  border: "1px solid rgba(29,78,216,0.2)",
                  color: "var(--primary-dark)",
                  opacity: isUploading ? 0.7 : 1,
                }}
              >
                {isUploading ? "Scanning..." : "Scan now"}
              </motion.button>
            </div>
          </div>

          {errorMessage && (
            <div className="text-xs mt-4" style={{ color: "var(--red)" }}>
              {errorMessage}
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.map((result) => (
                <div
                  key={result.filename}
                  className="rounded-lg px-4 py-3"
                  style={{
                    background: "rgba(29,78,216,0.04)",
                    border: "1px solid rgba(29,78,216,0.12)",
                  }}
                >
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {result.filename}
                  </div>
                  <div
                    className="text-xs mt-2"
                    style={{
                      color:
                        result.status === "success" ? "#34d399" : "#f87171",
                    }}
                  >
                    {result.status === "success"
                      ? "Scanned successfully"
                      : result.error || "Scan failed"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Tech stack callout ── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--primary)" }}
          >
            Built With
          </div>
          <h2
            className="font-display text-2xl"
            style={{ color: "var(--text)" }}
          >
            Enterprise-Grade Technology
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "CrewAI", role: "Agent orchestration", color: "cyan" },
            { name: "Python", role: "Analysis engine", color: "green" },
            { name: "Next.js", role: "Frontend platform", color: "pink" },
            { name: "OpenAI", role: "LLM backbone", color: "purple" },
          ].map((tech, i) => (
            <AnimatedCard
              key={tech.name}
              title={tech.role}
              value={tech.name}
              color={tech.color}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-36 px-4 text-center cinema-contrast">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--primary)" }}
          >
            Get Started Today
          </div>
          <h2
            className="font-display text-4xl md:text-5xl mb-6 leading-tight"
            style={{ color: "var(--text)" }}
          >
            Ready to secure
            <br />
            your release pipeline?
          </h2>
          <p
            className="text-lg mb-12 leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Start scanning today with our AI-powered security platform. Free
            tier available. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 12px 28px rgba(29,78,216,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="font-semibold text-sm px-10 py-4 rounded-xl text-white"
                style={{ background: "var(--primary)" }}
              >
                Launch Dashboard →
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="font-medium text-sm px-10 py-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid var(--border)",
                color: "var(--text)",
                boxShadow: "0 6px 18px rgba(15,40,80,0.12)",
              }}
            >
              View GitHub
            </motion.button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
