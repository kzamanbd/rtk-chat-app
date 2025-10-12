FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["node", "build/server.js"]
