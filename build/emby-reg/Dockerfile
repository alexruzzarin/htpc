FROM node:carbon

WORKDIR /home/node/app

COPY . /home/node/app
RUN npm install --quiet --production

EXPOSE 80 443
USER node

CMD ["npm", "start", "-s"]
