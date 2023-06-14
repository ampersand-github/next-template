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

# todo envファイルを作成したい
# ARG NEXT_PUBLIC_FIREBASE_API_KEY
# ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
# ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
# ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
# ARG NEXT_PUBLIC_FIREBASE_APP_ID
# ARG NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
# ARG NEXT_PUBLIC_FIREBASE_DATABASE_URL
# ARG NEXT_PUBLIC_BACKEND_URL

# ARG DATABASE_URL
# RUN echo $DATABASE_URL


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
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma/client /app/node_modules/@prisma/client
# npm WARN exec The following package was not found and will be installed: prisma@4.15.0対策
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma /app/node_modules/prisma
COPY --chown=nextjs:nodejs start.sh ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["sh", "./start.sh"]
