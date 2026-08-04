FROM node:20-alpine

LABEL org.opencontainers.image.title="AI PM Sandbox" \
      org.opencontainers.image.description="AI 产品经理判断力训练场" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.source="https://github.com/susu/ai-pm-sandbox"

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY public/ ./public/

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4173

EXPOSE 4173

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:4173/api/health || exit 1

CMD ["node", "server.js"]
