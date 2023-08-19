FROM node:lts-slim

WORKDIR /front

ENV CI=true

# 依存関係のインストール
COPY package*.json ./
RUN npm install

# アプリケーションのビルド
COPY . .
RUN npm run build

# ビルド済みアプリケーションを実行
CMD ["npx", "serve", "-s", "build"]
