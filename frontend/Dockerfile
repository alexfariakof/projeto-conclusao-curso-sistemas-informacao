FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["./frontend/package.json*", "./frontend/package-lock.json*", "./frontend/npm-shrinkwrap.json*", "./"]
RUN npm install --development --silent && mv node_modules ../
COPY ./frontend .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
