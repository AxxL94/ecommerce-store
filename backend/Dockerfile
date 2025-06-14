
FROM node:20-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build || echo "No build script defined, continuing..."

EXPOSE 3000
CMD ["node", "app.js"]
