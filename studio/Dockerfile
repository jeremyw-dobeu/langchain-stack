# Stage 1: Build the React app with TypeScript support
FROM node:18-alpine AS builder

WORKDIR /app

# 1) Copy manifests & TS config
COPY package.json package-lock.json tsconfig.json ./

# 2) Install exact versions
RUN npm ci

# 3) Copy static assets & source
COPY public/ public/
COPY src/ src/

# 4) Build for production
RUN npm run build


# Stage 2: Serve the build with Nginx
FROM nginx:alpine

# 5) Your custom proxy rules
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 6) Copy in the built static files
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
