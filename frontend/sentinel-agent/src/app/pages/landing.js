"use client";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import AnimatedCard from "../components/AnimatedCard";
import { VaporTextShowcase } from "@/components/ui/vapour-text-effect";

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
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Features ── */}
      <section className="py-28 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          custom={scrollDirection}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={sectionRevealVariants}
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
              scrollDirection={scrollDirection}
            />
          ))}
        </div>
      </section>

      {/* ── Signal section (middle) ── */}
      <section className="px-4 sm:px-6 pb-8 md:pb-14">
        <div className="max-w-6xl mx-auto">
          <motion.div
            custom={scrollDirection}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            variants={sectionRevealVariants}
            className="text-center mb-10"
          >
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--accent)" }}
            >
              Live AI Flow
            </div>
            <h2
              className="font-display text-3xl md:text-4xl"
              style={{ color: "var(--text)" }}
            >
              Signal Through The Noise
            </h2>
          </motion.div>

          <div
            className="relative rounded-2xl border overflow-hidden"
            style={{
              borderColor: "var(--border)",
              background:
                "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.14) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(6,182,212,0.16) 0%, transparent 45%), var(--bg-surface)",
              boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
            }}
          >
            <div className="h-[240px] sm:h-[300px] md:h-[360px]">
              <VaporTextShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-28 px-4 sm:px-6 cinema-surface">
        <div className="max-w-5xl mx-auto">
          <motion.div
            custom={scrollDirection}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            variants={sectionRevealVariants}
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
                  custom={scrollDirection}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.35 }}
                  variants={stepRevealVariants}
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
                    custom={scrollDirection}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.35 }}
                    variants={stepRevealVariants}
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
          custom={scrollDirection}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={sectionRevealVariants}
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
              <motion.label
                whileHover={{
                  y: -2,
                  scale: 1.01,
                  boxShadow: "0 10px 24px rgba(168,85,247,0.32)",
                }}
                whileTap={{ scale: 0.98 }}
                className="text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #7c3aed 54%, #06b6d4 100%)",
                  border: "1px solid rgba(255,255,255,0.16)",
                }}
              >
                Choose files
                <input
                  type="file"
                  accept=".py"
                  multiple
                  className="hidden"
                  onChange={onFilesChange}
                />
              </motion.label>
              <motion.button
                whileHover={{
                  y: -2,
                  scale: 1.01,
                  boxShadow: "0 10px 20px rgba(6,182,212,0.18)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={onUpload}
                disabled={isUploading}
                className="text-sm font-semibold px-5 py-2.5 rounded-xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(8,18,34,0.88), rgba(7,11,18,0.92))",
                  border: "1px solid rgba(125,211,252,0.25)",
                  color: "#e0f2fe",
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
                <motion.div
                  key={result.filename}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="rounded-lg px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(165deg, rgba(10,17,28,0.86), rgba(8,11,20,0.9))",
                    border: "1px solid rgba(125,211,252,0.14)",
                    boxShadow: "0 8px 22px rgba(2,8,23,0.26)",
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
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Tech stack callout ── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          custom={scrollDirection}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={sectionRevealVariants}
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
              scrollDirection={scrollDirection}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-36 px-4 text-center cinema-contrast">
        <motion.div
          custom={scrollDirection}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={sectionRevealVariants}
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
                  y: -3,
                  scale: 1.03,
                  boxShadow: "0 16px 30px rgba(168,85,247,0.3)",
                }}
                whileTap={{ scale: 0.97 }}
                className="font-semibold text-sm px-10 py-4 rounded-xl text-white"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #7c3aed 55%, #06b6d4 100%)",
                  border: "1px solid rgba(255,255,255,0.16)",
                }}
              >
                Launch Dashboard →
              </motion.button>
            </Link>
            <motion.button
              whileHover={{
                y: -2,
                scale: 1.02,
                boxShadow: "0 12px 24px rgba(14,165,233,0.14)",
              }}
              whileTap={{ scale: 0.97 }}
              className="font-medium text-sm px-10 py-4 rounded-xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(9,16,28,0.88), rgba(7,11,18,0.92))",
                border: "1px solid rgba(125,211,252,0.28)",
                color: "#e2e8f0",
                boxShadow: "0 10px 24px rgba(2,8,23,0.32)",
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
