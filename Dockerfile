FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV PORT=1337

EXPOSE 1337

CMD ["yarn", "dev"]