react-node-testing-boilerplate - Full Stack Setup Guide
🚀 Overview
This document outlines the setup instructions for a modern TypeScript-based full-stack project named react-node-testing-boilerplate. It includes:

- React + Vite + TypeScript (frontend)
- Node.js + Express + TypeScript (backend)
- Jest + React Testing Library, Supertest
- Playwright for E2E testing
- Proxy-based local dev setup
- Docker for production
- GitHub Actions for CI/CD
- GitHub template configuration

📁 Folder Structure
react-node-testing-boilerplate/
├── client/       # React frontend (Vite + TypeScript)
├── server/       # Node.js backend (Express + TypeScript)
└── README.md

🖼️ Frontend: React + Vite + TypeScript
1. Create the React app with Vite:

   mkdir react-node-testing-boilerplate
   cd react-node-testing-boilerplate
   mkdir client
   cd client
   npm create vite@latest . -- --template react-ts

2. Install dependencies:

   npm install

3. Run the development server:

   npm run dev

⚙️ Backend: Node.js + Express + TypeScript
1. Initialize backend:

   cd ..
   mkdir server
   cd server
   npm init -y

2. Install dependencies:

   npm install express cors
   npm install -D typescript ts-node-dev @types/node @types/express

3. Configure TypeScript:

   npx tsc --init

   Update tsconfig.json:

   {
     "compilerOptions": {
       "target": "ES2020",
       "module": "CommonJS",
       "rootDir": "./src",
       "outDir": "./dist",
       "esModuleInterop": true,
       "strict": true
     }
   }

4. Create backend source code in src/index.ts:

   import express from 'express';
   import cors from 'cors';

   const app = express();
   const PORT = 5000;

   app.use(cors());
   app.use(express.json());

   app.get('/api', (_req, res) => {
     res.json({ message: 'Hello from the backend!' });
   });

   app.listen(PORT, () => {
     console.log(`Server running at http://localhost:${PORT}`);
   });

5. Add npm scripts in server/package.json:

   "scripts": {
     "dev": "ts-node-dev --respawn src/index.ts",
     "build": "tsc",
     "start": "node dist/index.js"
   }

6. Run the backend server:

   npm run dev

🔁 Enable Proxy (Frontend to Backend)
Update client/vite.config.ts:

   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': 'http://localhost:5000'
       }
     }
   });

Now the frontend can fetch from backend using relative paths like:

   fetch('/api')

🧪 Testing Setup
Frontend (client/):
- Jest + React Testing Library

Backend (server/):
- Jest + Supertest

E2E (root/playwright-tests/):
- Playwright

Root scripts:
   "scripts": {
     "dev": "concurrently \"npm run dev --prefix client\" \"npm run dev --prefix server\"",
     "test": "concurrently \"npm test --prefix client\" \"npm test --prefix server\"",
     "test:e2e": "npx playwright test"
   }

🐳 Docker Setup
Frontend Dockerfile (client/Dockerfile):

   FROM node:18 AS builder
   WORKDIR /app
   COPY . .
   RUN npm install && npm run build

   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]

Backend Dockerfile (server/Dockerfile):

   FROM node:18
   WORKDIR /app
   COPY . .
   RUN npm install
   RUN npm run build
   EXPOSE 5000
   CMD ["node", "dist/index.js"]

docker-compose.yml:

   version: "3.9"
   services:
     frontend:
       build: ./client
       ports:
         - "3000:80"
       depends_on:
         - backend

     backend:
       build: ./server
       ports:
         - "5000:5000"

Run with:
   docker-compose up --build

🤖 GitHub Actions CI
File: .github/workflows/ci.yml

   name: CI

   on: [push, pull_request]

   jobs:
     build-and-test:
       runs-on: ubuntu-latest

       services:
         backend:
           image: node:18
           ports:
             - 5000:5000

       steps:
         - uses: actions/checkout@v3
         - name: Setup Node
           uses: actions/setup-node@v3
           with:
             node-version: 18

         - name: Install frontend
           working-directory: ./client
           run: npm install

         - name: Install backend
           working-directory: ./server
           run: npm install

         - name: Run frontend tests
           working-directory: ./client
           run: npm test -- --watchAll=false

         - name: Run backend tests
           working-directory: ./server
           run: npm test

         - name: Run E2E tests
           run: |
             npm install -D playwright
             npx playwright install
             npm run test:e2e

🌱 GitHub Template Setup
1. Push your project to a GitHub repo.

2. Go to your repo's "Settings" > scroll down to "Template repository"

3. Check "Template repository" to allow others to reuse your setup.

Now others can click "Use this template" to clone your boilerplate.

