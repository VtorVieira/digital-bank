FROM node:16.14-alpine
WORKDIR /app/backend
COPY package* ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "start"]
# FROM node:16
# WORKDIR /srv/frontend