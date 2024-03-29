FROM node:20-alpine3.18 as builder


#Build App
WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

#Serve nginx

FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/.next ./.next
EXPOSE 80
CMD [ "npm","run","start" ]
ENTRYPOINT [ "nginx","-g","daemon off;" ]
