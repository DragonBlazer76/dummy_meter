FROM node:lts-alpine
WORKDIR /app
COPY package* .
RUN npm install
COPY . /app
CMD [ "node", "integrated.js" ]
