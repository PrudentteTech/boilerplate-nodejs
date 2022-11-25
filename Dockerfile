FROM node:16.17 as base

WORKDIR /app

COPY package.json .

RUN npm install --only=production --silent

CMD ["npm", "start"]

EXPOSE 3333

ENV PATH /app/node_modules/.bin:$PATH



# Development
FROM base as dev

ENV NODE_ENV=development

RUN npm install --only=development --silent

COPY . .

CMD ["npm", "run", "dev:server"]



# Production build
FROM dev as build

COPY . .

RUN npm run build



# Production
FROM base as prod

ENV NODE_ENV=production

COPY --from=build /app/ .

CMD ["node", "./dist/main.js"]
