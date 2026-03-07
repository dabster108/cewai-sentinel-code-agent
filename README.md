# CrewAI Sentinel Code Agent

AI-powered code security and quality analysis system built with CrewAI.

---

## Agents

**Security Agent**
Analyzes source code for OWASP Top 10 vulnerabilities including SQL injection, command injection, hardcoded secrets, unsafe deserialization, and dangerous API usage.

**Quality Agent**
Reviews code for anti-patterns, missing type hints, poor structure, unused imports, and performance issues.

**Report Agent**
Combines findings from the security and quality agents into a structured markdown report saved to the issues/ folder.

**Code Fixer**
Reads the generated report and rewrites every vulnerable file with secure, production-ready code, then pushes the fixes to GitHub.

---

## Workflow

Source code files are loaded → Security Agent analyzes for vulnerabilities → Quality Agent reviews for code quality → Report Agent generates a consolidated markdown report → Code Fixer applies patches to the source files → Fixed code is committed and pushed to GitHub

---

## Real-World Value

Automatically audits and patches insecure Python code on every run, so vulnerabilities are caught and fixed before they reach production.
