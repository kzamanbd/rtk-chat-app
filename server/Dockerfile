FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build
COPY ./build .
EXPOSE 8000
CMD [ "npm", "run", "start" ]
