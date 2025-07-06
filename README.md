# 💸 Payzo – Full-Stack Payment Platform

**Payzo** is a complete payment platform built with a modern monorepo architecture. It features role-based applications for **Admin**, **User**, and **Merchant**, each with tailored dashboards and workflows. Built using **Next.js**, **Turborepo**, **Prisma**, and **Tailwind CSS**.

---

## 🚀 Live Apps

| App      | Link                                          |
|----------|-----------------------------------------------|
| Admin    | https://payzo-admin.vercel.app                |
| Merchant | https://payzo-marchants.vercel.app            |
| User     | https://payzo-wallet.vercel.app                 |

---

## 🧱 Tech Stack

- **Monorepo:** Turborepo
- **Frontend:** Next.js 15 (App Router), Tailwind CSS
- **Backend:** Node.js API Routes
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** OAuth (Facebook), JWT, NextAuth
- **Hosting:** Vercel

---

## 🧩 Structure

/apps
├── admin # Admin dashboard
├── merchants # Merchant dashboard
└── user-app # User interface

/packages
├── ui # Shared components
├── database # Prisma schema & client
├── tailwind-config
├── typescript-config
└── eslint-config


---

## ⚙️ Features

- 🔐 OAuth login (e.g., Facebook)
- 📄 Role-based dashboards (Admin, Merchant, User)
- 💰 Add money, withdraw, and transaction history
- 📊 Admin user control and analytics
- 🔗 Shared UI components and config via packages
- ⚡ Optimized builds using Turborepo caching

---

## 🛠️ Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/Anmolwalia07/Payzo.git && cd Payzo

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Add your DATABASE_URL, NEXTAUTH_SECRET, etc.

# 4. Push and seed database (if using Prisma)
npx prisma db push
npx prisma db seed

# 5. Run all apps
npx turbo run dev


# .env file (root or per app)

DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your_secret
FACEBOOK_CLIENT_ID=...
FACEBOOK_CLIENT_SECRET=...
NEXTAUTH_URL=http://localhost:3000



# Build everything
npm run build

# Run local dev
npm run dev

# Format code
npm run format

# Generate Prisma client
npm run db:generate
