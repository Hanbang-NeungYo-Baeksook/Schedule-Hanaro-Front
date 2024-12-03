FROM nginx:alpine
WORKDIR /app
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d

RUN apk update && apk add certbot certbot-nginx
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80 443
CMD ["/entrypoint.sh"]
