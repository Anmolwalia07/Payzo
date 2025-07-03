# Use Node.js LTS Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./

# Copy workspace configuration
COPY packages/database/package.json ./packages/database/
COPY apps/server/package.json ./apps/server/

# Install dependencies
RUN npm ci

# Copy source code
COPY packages/database ./packages/database
COPY apps/server ./apps/server

# Generate Prisma client and build packages
RUN npm run db:generate --workspace=packages/database
RUN npm run build --workspace=packages/database  
RUN npm run build --workspace=apps/server

# Expose the port
EXPOSE 3000

# Set working directory to server app
WORKDIR /app/apps/server

# Start the application
CMD ["node", "dist/index.js"]