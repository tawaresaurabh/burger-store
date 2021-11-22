# This is where you define the image for
# the server A, which implements the Swagger API.

# Start by copying the server stub to this directory.

# You should then use Noje 10 image from Docker Hub as the basis,
# and then follow the instructions linked to in assignment document.
# You should be able to produce a working installation by just
# following the instructions.

# First line is provided for your convenience.
# This line fetches the Node Docker image with tag "10"
# from Docker Hub.
FROM node:10-alpine
# FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

ENV ACCESS_TOKEN_SECRET=8658903a27c74956aaef36c8df78034c7cb6750c239e9f972a8c3ce9fdcab36db552a06b4f82bfce615818edba9c3e6602818ecfdc35a5fda122e2bc2644d8b9


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5001

# Get wait for container script
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait

RUN chmod +x /wait

