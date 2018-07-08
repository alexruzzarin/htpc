FROM node:carbon

WORKDIR /home/node/app

COPY . /home/node/app
RUN npm install --quiet --production

EXPOSE 8080 8443
USER node

CMD ["npm", "start", "-s"]
