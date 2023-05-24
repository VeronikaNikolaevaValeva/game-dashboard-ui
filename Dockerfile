# Declare the base image
FROM node:16-alpine AS build
# 1. copy package.json and package-lock.json to /app dir
RUN mkdir /app
COPY package*.json ./app/
# 2. Change working directory to newly created app dir
WORKDIR /app
# 3 . Install dependencies
RUN npm install
# 4. Copy the source code to /app dir
COPY . .
# 5. Build the app
RUN npm run build

# Declare the base image for the final image
FROM nginx:alpine
# 1. Copy the build output from the previous image to the nginx html dir
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .