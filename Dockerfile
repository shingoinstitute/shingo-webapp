### STAGE 1: BUILD ###
FROM node:8.9-alpine as builder
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent
COPY . .

### STAGE 2: SETUP ###
FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
