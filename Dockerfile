FROM node:14

WORKDIR /usr/src/app

COPY build ./build
COPY server.js .
COPY node_modules ./node_modules
COPY package.json .

EXPOSE 8080
CMD ["yarn", "start-express"]
