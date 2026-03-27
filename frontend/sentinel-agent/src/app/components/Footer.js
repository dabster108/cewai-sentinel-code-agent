"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  Platform: ["Dashboard", "Reports", "API Docs", "Integrations"],
  Company: ["About", "Blog", "GitHub", "Contact"],
};

export default function Footer() {
  return (
    <footer
      className="cinema-contrast"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--primary), #38bdf8)",
                  boxShadow: "0 0 14px rgba(29,78,216,0.3)",
                }}
              >
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span
                className="font-semibold text-base"
                style={{ color: "var(--text)" }}
              >
                Sentinel
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              AI-powered code security analysis platform. Detect
              vulnerabilities, harden your codebase, and ship with confidence.
            </p>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(16,185,129,0.3)",
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse-neon"
                style={{ background: "#22c55e" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "#86efac" }}
              >
                Systems Operational
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-4"
                style={{ color: "var(--text-subtle)" }}
              >
                {section}
              </div>
              <div className="space-y-2.5">
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="block text-sm transition-colors duration-150"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-muted)")
                    }
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
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span className="text-sm" style={{ color: "var(--text-subtle)" }}>
            © 2026 Sentinel Agent. All rights reserved.
          </span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-sm transition-colors"
                style={{ color: "var(--text-subtle)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-subtle)")
                }
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
