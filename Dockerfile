FROM node:14
WORKDIR /usr/src/api-solid-clean_architecture-tdd-ddd
COPY ./package.json .
RUN npm install --only=prod