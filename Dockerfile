FROM node:lts-alpine as build-stage


COPY package.json /tmp/package.json
RUN cd /tmp && npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install
RUN mkdir -p /opt/app  && cp -a /tmp/node_modules /opt/app/
WORKDIR /opt/app
COPY . .
RUN npm run build:prod

# production stage
FROM nginx as production-stage
COPY nginx* /etc/nginx/conf.d/nginx.conf
COPY init.sh /app/init.sh
COPY --from=build-stage /opt/app/dist /app/dist
RUN chmod 777 /app/init.sh
EXPOSE 8080
CMD /bin/bash -c "/app/init.sh&&exec nginx -g 'daemon off;'"
