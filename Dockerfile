FROM node:18-alpine
RUN npm i -g npm

WORKDIR /app
COPY package*.json /app/
RUN npm i --production
COPY . /app
RUN npm run build

CMD ["npm", "run", "start:prod"]
