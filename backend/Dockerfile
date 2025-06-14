
FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build || echo "Aucun script de build dans package.json — étape ignorée"

EXPOSE 3000
CMD ["node", "app.js"]
