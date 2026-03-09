"use client";
import { motion } from "framer-motion";
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
  return (
    <div className="bg-white min-h-screen">
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
          <div className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
            Capabilities
          </div>
          <h2 className="font-bold text-3xl md:text-4xl text-slate-900">
            What Sentinel Does
          </h2>
          <div className="h-px w-16 mx-auto mt-5 bg-indigo-200 rounded-full" />
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
      <section
        className="py-28 px-4 sm:px-6 bg-slate-50"
        style={{
          borderTop: "1px solid #f1f5f9",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
              Workflow
            </div>
            <h2 className="font-bold text-3xl md:text-4xl text-slate-900">
              How It Works
            </h2>
            <div className="h-px w-16 mx-auto mt-5 bg-indigo-200 rounded-full" />
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
                  className="flex-1 text-center p-8 rounded-xl w-full bg-white"
                  style={{
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 font-bold text-xl"
                    style={{ background: "#eef2ff", color: "#6366f1" }}
                  >
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-3">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
                {i < howItWorks.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.18 + 0.3 }}
                    className="hidden md:block text-2xl flex-shrink-0 text-slate-300"
                  >
                    →
                  </motion.div>
                )}
              </div>
            ))}
          </div>
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
          <div className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-3">
            Built With
          </div>
          <h2 className="font-bold text-2xl text-slate-900">
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
      <section
        className="py-36 px-4 text-center bg-slate-50"
        style={{ borderTop: "1px solid #f1f5f9" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-4">
            Get Started Today
          </div>
          <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
            Ready to secure
            <br />
            your codebase?
          </h2>
          <p className="text-slate-500 text-lg mb-12 leading-relaxed">
            Start scanning today with our AI-powered security platform. Free
            tier available. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 28px rgba(99,102,241,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                className="font-semibold text-sm px-10 py-4 rounded-xl text-white"
                style={{ background: "#6366f1" }}
              >
                Launch Dashboard →
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="font-medium text-sm px-10 py-4 rounded-xl text-slate-700"
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
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
