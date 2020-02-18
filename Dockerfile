FROM node:12
WORKDIR /usr/src/app
COPY package.*json ./
RUN npm install
COPY ..
EXPOSE 4040:4040
CMD [ "node","-r","dotenv/config","-r","esm", "index.js" ]