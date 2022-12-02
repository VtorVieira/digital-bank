FROM node:16.14-alpine
WORKDIR /app/frontend
COPY package* ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]
# FROM node:16
# WORKDIR /srv/frontend