FROM node:10
LABEL Marko Krtolica <markokrtolica1989@gmail.com>

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 4000

CMD ["npm", "run", "dev"]