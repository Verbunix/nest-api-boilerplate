FROM node:14-alpine

WORKDIR /var/www/html
COPY package*.json /var/www/html/
RUN npm install
COPY . /var/www/html
RUN npm run build

CMD ["npm", "run", "start:prod"]
