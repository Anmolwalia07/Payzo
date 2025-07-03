# Code Issues Report

## 🚨 Critical Issues

### 1. **Critical Logic Error in Balance Validation**
**File:** `apps/server/src/controller/userController.ts:74`
```typescript
if(newBalance !<0){  // ❌ WRONG - This is always true!
    res.status(401).json({ message: "Not have balance" });
    return;
}
```
**Fix:** Should be `if(newBalance < 0)`

### 2. **Mixed Database Technologies**
**Problem:** You're using both MongoDB (Mongoose) and PostgreSQL (Prisma) in the same application:
- **MongoDB:** `apps/server/src/database/db.ts` 
- **PostgreSQL:** `packages/database/src/index.ts` (Prisma)

**Issues:**
- Controllers use Prisma but MongoDB connection is established
- Inconsistent data models between both systems
- Unnecessary complexity and potential conflicts

## 🔒 Security Issues

### 3. **Missing Input Validation**
**Files:** All controller files
```typescript
// ❌ No validation on user input
const paymentDetails = {
    userId: Number(req.body.userId),  // Could be NaN
    token: req.body.token,           // Could be undefined
    amount: Number(req.body.amount), // Could be NaN or negative
};
```

### 4. **Exposed Error Details**
**Files:** Multiple controllers
```typescript
// ❌ Exposes internal errors to client
catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
}
```

### 5. **Overly Permissive CORS**
**File:** `apps/server/src/index.ts:16`
```typescript
app.use(cors({ credentials:true}))  // ❌ Allows all origins
```

### 6. **Missing Rate Limiting**
No rate limiting on payment endpoints - vulnerable to abuse.

## 🌍 Environment & Configuration Issues

### 7. **Missing Environment Variables**
**Required but not documented:**
- `MongoDB_Url` 
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `DATABASE_URL` (for Prisma)

### 8. **Port Configuration Issues**
**File:** `apps/server/src/index.ts:33`
```typescript
app.listen(process.env.PORT, () => {  // ❌ No fallback port
```
**Fix:** Should have fallback: `process.env.PORT || 3000`

### 9. **Environment Variable Name Inconsistency**
- `MongoDB_Url` (camelCase) vs `DATABASE_URL` (UPPER_CASE)
- Some use `NEXT_PUBLIC_` prefix, others don't

## 💾 Database Issues

### 10. **Missing Database Error Handling**
**File:** `apps/server/src/database/db.ts:5-8`
```typescript
mongoose.connect(`${process.env.MongoDB_Url}wallet`|| "").then(()=>{
    console.log("Connected to Db")
}).catch((e)=>{
    console.log("error")  // ❌ Poor error handling
})
```

### 11. **Hardcoded Database Name**
```typescript
mongoose.connect(`${process.env.MongoDB_Url}wallet`|| "")
// ❌ "wallet" is hardcoded
```

### 12. **Missing Database Connection Validation**
No check if database is actually connected before processing requests.

## 🏗️ Code Quality Issues

### 13. **Inconsistent Naming Conventions**
- `bankAcount.ts` (typo - should be `bankAccount.ts`)
- `balancehistroy` (typo - should be `balanceHistory`)
- Mixed camelCase and PascalCase in models

### 14. **Duplicate Code in Controllers**
Similar transaction logic repeated across multiple functions without abstraction.

### 15. **Missing Import Organization**
**File:** `apps/server/src/index.ts`
```typescript
import express from "express";
import dot from "dotenv";
dot.config();
import razorpayRoutes from "./config/razorpay"
// ... other imports
import cors from "cors"  // ❌ cors imported after other business logic
```

### 16. **Inconsistent Response Formats**
Some endpoints return `{ message: "..." }`, others return `{ err: "..." }`

## 🚀 Deployment Issues

### 17. **Missing Production Scripts**
**File:** `apps/server/package.json`
- `start` script uses `nodemon` (development tool)
- No production-ready start command

### 18. **Missing Health Check Endpoint**
No `/health` endpoint for deployment monitoring.

### 19. **Missing Process Management**
No graceful shutdown handling for production deployment.

## 📦 Dependency Issues

### 20. **Deprecated Package**
**File:** `apps/server/package.json:22`
```json
"crypto": "^1.0.1"  // ❌ Deprecated - use built-in crypto module
```

### 21. **Development Dependencies in Production**
`nodemon` and other dev tools included in regular dependencies.

## 🔧 Immediate Fix Priorities

1. **Fix the balance validation logic** (Critical)
2. **Choose one database technology** (MongoDB OR PostgreSQL)
3. **Add input validation** to all endpoints
4. **Configure proper CORS** for production
5. **Add environment variable validation**
6. **Fix the production start script**
7. **Add proper error handling**

## 🛠️ Recommended Solutions

1. **Use a validation library** (Zod is already in dependencies)
2. **Implement middleware** for common tasks (auth, validation, error handling)
3. **Add logging** (winston, pino)
4. **Add monitoring** (health checks, metrics)
5. **Use environment validation** on startup
6. **Implement proper error boundaries**
7. **Add API documentation** (OpenAPI/Swagger)

## 📋 Environment Variables Needed

Create a `.env` file with:
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://..."
RAZORPAY_KEY_ID="your_key"
RAZORPAY_KEY_SECRET="your_secret"
RAZORPAY_WEBHOOK_SECRET="your_webhook_secret"
```