# Stage 1
FROM node:22-alpine as ng-build

WORKDIR /usr/src/build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install
RUN ng build --configuration production

# Stage 2
FROM caddy:latest

WORKDIR /usr/src/app

COPY --from=ng-build /usr/src/build/dist/ziggurat/browser ./www

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
