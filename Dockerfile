FROM node:alpine3.18 as build

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
ENTRYPOINT [ "nginx","-g","daemon off;" ]

CMD [ "npm" ,"run","start" ]