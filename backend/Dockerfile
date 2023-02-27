FROM node:18.14.0-alpine3.16 AS development
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18.14.0-alpine3.16 AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=development /usr/app/dist ./dist
CMD ["node", "dist/main"]
