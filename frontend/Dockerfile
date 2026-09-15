FROM node:22-alpine

WORKDIR /app

# Activar pnpm
RUN corepack enable

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del proyecto
COPY . .

# Build de Next.js
RUN pnpm build

ENV NODE_ENV=production

EXPOSE 8080

CMD ["pnpm", "start"]