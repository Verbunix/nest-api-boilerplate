FROM node:14-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine as runner
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
COPY --from=build /usr/src/app/dist ./dist
CMD ["npm", "run start:prod"]