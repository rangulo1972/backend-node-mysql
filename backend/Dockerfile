FROM node:16-alpine

WORKDIR /app

RUN apk add --no-cache bash curl

COPY package*.json /app/

RUN npm install

RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/local/bin/wait-for-it.sh

COPY . /app

EXPOSE 3000

CMD ["bash", "/usr/local/bin/wait-for-it.sh", "mysql:3306", "--", "npm", "start" ]