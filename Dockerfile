# https://github.com/vercel/next.js/tree/canary/examples/with-docker

FROM node:18-alpine AS base

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# deps
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./
RUN npm ci


# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# builder
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Arguments that can be passed at build time
ARG NEXT_PUBLIC_ORIGIN
ARG DATABASE_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG GITHUB_ACCESS_TOKEN
ARG GCP_PROJECT_ID
ARG GCP_PRIVATE_KEY
ARG GCP_CLIENT_EMAIL

# t3-envの関係でこっちで.envを作成する
RUN echo "NEXT_PUBLIC_ORIGIN=${NEXT_PUBLIC_ORIGIN}" >> .env \
    && echo "DATABASE_URL=${DATABASE_URL}" >> .env \
    && echo "NEXTAUTH_URL=${NEXTAUTH_URL}" >> .env \
    && echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" >> .env \
    && echo "GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}" >> .env \
    && echo "GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}" >> .env \
    && echo "GITHUB_ACCESS_TOKEN=${GITHUB_ACCESS_TOKEN}" >> .env \
    && echo "GCP_PROJECT_ID=${GCP_PROJECT_ID}" >> .env \
    && echo "GCP_PRIVATE_KEY=${GCP_PRIVATE_KEY}" >> .env \
    && echo "GCP_CLIENT_EMAIL=${GCP_CLIENT_EMAIL}" >> .env

# Generate prisma client
RUN npx prisma generate

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# runner
# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/.env ./app/.env
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma /app/node_modules/@prisma
# npm WARN exec The following package was not found and will be installed: prisma@4.15.0対策
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma /app/node_modules/prisma
# sh: prisma: command not found対策 おそらく、prismaの実行ファイルが必要なため
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.bin /app/node_modules/.bin

COPY --chown=nextjs:nodejs start.sh ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["sh", "./start.sh"]
