FROM node:18-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json ./
RUN yarn

COPY . .

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs ./.next
RUN chown -R nextjs:nodejs ./package.json

USER nextjs

EXPOSE 8080

CMD ["yarn", "start"]
