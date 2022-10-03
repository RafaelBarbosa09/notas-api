FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "run-container"]