FROM node:alpine

WORKDIR ./

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile

EXPOSE 8080
CMD [ "npm", "run", "serve" ]
