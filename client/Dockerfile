FROM node:10
LABEL Marko Krtolica <markokrtolica1989@gmail.com>

WORKDIR /user/src/app

COPY package*.json ./
RUN npm install
RUN npm rebuild node-sass

COPY . .
EXPOSE 3000

CMD ["npm", "start"]