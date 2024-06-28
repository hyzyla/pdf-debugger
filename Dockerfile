FROM node:lts-slim
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm install
CMD ["npm", "run", "dev"]