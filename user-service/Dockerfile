FROM node:18.17.0
WORKDIR /usr/app/user-service
COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
RUN yarn install
COPY . .
RUN yarn run build
CMD yarn run start:prod