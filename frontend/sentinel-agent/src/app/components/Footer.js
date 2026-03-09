"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  Platform: ["Dashboard", "Reports", "API Docs", "Integrations"],
  Company: ["About", "Blog", "GitHub", "Contact"],
};

export default function Footer() {
  return (
    <footer className="bg-slate-50" style={{ borderTop: "1px solid #e2e8f0" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#6366f1" }}
              >
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="font-semibold text-slate-900 text-base">
                Sentinel
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              AI-powered code security analysis platform. Detect
              vulnerabilities, harden your codebase, and ship with confidence.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse-neon"
                style={{ background: "#22c55e" }}
              />
              <span className="text-xs font-medium text-emerald-700">
                Systems Operational
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                {section}
              </div>
              <div className="space-y-2.5">
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="block text-sm text-slate-500 hover:text-slate-900 transition-colors duration-150"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid #e2e8f0" }}
        >
          <span className="text-sm text-slate-400">
            © 2026 Sentinel Agent. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-sm text-slate-400 hover:text-slate-700 transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
