FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci 
COPY . .

EXPOSE 3001

RUN npm run build

# Default command
CMD ["npm", "run", "start"]