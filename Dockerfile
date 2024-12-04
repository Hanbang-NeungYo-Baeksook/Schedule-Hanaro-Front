FROM nginx:alpine
WORKDIR /
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d

RUN apk update && apk add certbot certbot-nginx
COPY entrypoint.sh /usr/share/nginx/entrypoint.sh
RUN chmod +x /usr/share/nginx/entrypoint.sh

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
