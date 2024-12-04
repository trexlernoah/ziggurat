# Stage 1
FROM node:22-alpine AS ng-build

WORKDIR /usr/src/build

COPY client .

RUN npm install

RUN npm run build:production

# Stage 2
FROM node:22-alpine

WORKDIR /usr/src/app

COPY --from=ng-build /usr/src/build/dist/ziggurat/browser ./www
COPY server .

RUN npm install

CMD ["npm", "run", "start"]
