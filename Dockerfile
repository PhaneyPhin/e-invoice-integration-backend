FROM node:20.6.0 As production

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start"]