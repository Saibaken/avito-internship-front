# Based on https://andrekoenig.de/articles/using-bun-as-the-package-manager-in-production-ready-docker-images
ARG NODE_VERSION=23.11
FROM node:${NODE_VERSION}-slim AS build

ARG BUN_VERSION=1.2.6

ARG BACKEND_URL="localhost:8080"
ENV VITE_BACKEND_URL=${BACKEND_URL}

WORKDIR /build

RUN apt update && apt install -y bash curl unzip
RUN curl https://bun.sh/install | bash -s -- bun-v${BUN_VERSION}

ENV PATH="${PATH}:/root/.bun/bin"

COPY bun.lock package.json ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

RUN rm -rf node_modules && \
    rm -rf /root/.bun/install/cache/ && \
    bun install --frozen-lockfile --production

RUN curl -sf https://gobinaries.com/tj/node-prune | sh && \
    node-prune /build/node_modules

FROM node:${NODE_VERSION}-slim AS distribution

ENV NODE_ENV="production"
WORKDIR /app

COPY --from=build --chown=node:node /root/.bun/bin/bun /usr/local/bin/

COPY --from=build --chown=node:node /build/dist ./dist
COPY --from=build --chown=node:node /build/node_modules ./node_modules
COPY --from=build --chown=node:node /build/package.json ./

COPY --from=build --chown=node:node /build/public/ ./public/

RUN chown -R node:node /app
USER node

EXPOSE 3000

CMD ["bun", "run", "preview", "--", "--port", "3000", "--host", "0.0.0.0"]
