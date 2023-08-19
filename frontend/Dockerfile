FROM node:lts-slim

WORKDIR /app

ENV HOST=0.0.0.0

# 依存関係のインストール
COPY app/package*.json /app/
RUN npm install

# アプリケーションのビルド
COPY app/ /app/
RUN npm run build

# ビルド済みアプリケーションを実行
CMD ["npm", "start"]
