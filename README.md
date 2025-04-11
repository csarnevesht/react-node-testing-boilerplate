# react-node-testing-boilerplate

A modern full-stack boilerplate with:

- ⚛️ React + Vite + TypeScript
- 🚀 Node.js + Express + TypeScript
- 🧪 Jest, React Testing Library, Supertest, Playwright
- 🔁 Proxy-based local dev
- 🐳 Docker + Docker Compose
- 🤖 GitHub Actions for CI

## 🛠 Quick Start (Dev)

```bash
npm run dev         # Runs frontend and backend
npm run test        # Runs unit tests
npm run test:e2e    # Runs Playwright E2E tests

🐳 Docker (Production)
docker-compose up --build

Testing
client/ uses Jest + RTL

server/ uses Jest + Supertest

playwright-tests/ for E2E tests

