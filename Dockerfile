ARG NODE_IMAGE=node:24.22.3-alpine3.24@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5
ARG NGINX_IMAGE=nginx:1.30.6-alpine3.24@sha256:901e593c95dc85f5a729f5765516321366ef4ac401821431d408897e95287d0a
FROM ${NODE_IMAGE} AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js ./
COPY src/ ./src/
COPY public/ ./public/

ARG APP_VERSION=1.0.0
ARG GIT_SHA=local
ARG GITHUB_REPOSITORY_URL=https://github.com/
ENV VITE_APP_VERSION=${APP_VERSION}
ENV VITE_GIT_SHA=${GIT_SHA}
ENV VITE_GITHUB_REPOSITORY_URL=${GITHUB_REPOSITORY_URL}

RUN npm run build

FROM ${NGINX_IMAGE} AS production

ENV PORT=10000 \
    NGINX_ENVSUBST_FILTER=^PORT$ \
    NGINX_ENVSUBST_OUTPUT_DIR=/tmp

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build --chown=nginx:nginx /app/dist/ /usr/share/nginx/html/

RUN rm -f /etc/nginx/conf.d/default.conf

USER nginx

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/healthz" || exit 1

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
