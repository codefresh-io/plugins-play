FROM node:alpine
EXPOSE 8080

WORKDIR /app

COPY package*.json /app/

RUN npm i webpack karma typescript -g
RUN npm install

COPY . /app/

ENV NODE_ENV=production
RUN npm run compile

CMD [ "npm", "run", "serve" ]
