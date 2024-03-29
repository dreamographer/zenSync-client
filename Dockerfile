# Build App
FROM node:20-alpine3.18 as builder

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm","run","start" ]
# Serve nginx
# FROM nginx:1.23-alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf *
# COPY --from=builder /app/.next .
# ENTRYPOINT [ "nginx","-g","daemon off;" ]