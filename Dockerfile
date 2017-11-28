FROM node:carbon

WORKDIR ./

COPY package*.json ./

RUN npm install
RUN npm i -g karma karma-cli webpack typescript
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "build" ]
CMD [ "npm", "run", "serve" ]
