# ─────────────────────────────────────────────────────────────
#  صورة بديلة (اختياري) — استخدمها فقط إذا فشل البناء التلقائي
#  على CranL. الأمر:
#     docker build -f deploy/Dockerfile -t tahaqqaqna .
#     docker run -p 8080:80 tahaqqaqna
#  على CranL: أنشئ تطبيقًا واختر  build: "dockerfile"
#  واضبط المنفذ (Port) على 80.
# ─────────────────────────────────────────────────────────────

# ---------- 1) build ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---------- 2) serve ----------
FROM nginx:1.27-alpine

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
