FROM node:alpine as build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

CMD ["ng", "serve", "--host", "0.0.0.0"]
