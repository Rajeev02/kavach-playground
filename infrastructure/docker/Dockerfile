FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY backend/api/package*.json ./backend/api/
COPY tsconfig.base.json ./

# Install dependencies including devDependencies for build
RUN npm ci

COPY backend/api ./backend/api

# Generate Prisma Client
WORKDIR /app/backend/api
RUN npx prisma generate

# Build the TypeScript code
RUN npm run build

FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/backend/api/dist ./dist
COPY --from=builder /app/backend/api/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend/api/package*.json ./

EXPOSE 4000

# Push the schema, then start the server
CMD ["sh", "-c", "npx prisma db push && npm start"]
