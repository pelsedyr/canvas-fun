FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 80
ENV PORT=80

CMD ["npm", "run", "dev", "--", "--host"]