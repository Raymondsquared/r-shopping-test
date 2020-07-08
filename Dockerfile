FROM node:10-slim

WORKDIR /r-shopping-typescript

COPY . /r-shopping-typescript
RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]
