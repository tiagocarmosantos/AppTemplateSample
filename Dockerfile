FROM node:8.11.1

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

CMD npm run dev
