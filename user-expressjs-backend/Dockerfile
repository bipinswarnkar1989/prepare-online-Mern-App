FROM node:9.11.1

MAINTAINER BIPIN SWARNKAR

# Create app dir
RUN mkdir -p /app
WORKDIR /app

# Copy app (including package.json) into the image
COPY . /app

#RUN npm rebuild node-sass@3.13.1
RUN npm install

#ENV NODE_ENV=production


EXPOSE 3001
CMD [ "npm", "run", "start-prod" ]
