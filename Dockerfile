FROM node:lts-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./dist/apps/api .
RUN npm install
EXPOSE 8000
CMD [ "node", "main.js" ]