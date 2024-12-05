FROM nginx:alpine
WORKDIR /
COPY dist /usr/share/nginx/html
COPY nginx-http.conf /etc/nginx/nginx-http.conf
COPY nginx-https.conf /etc/nginx/nginx-https.conf

RUN apk update && apk add certbot certbot-nginx
COPY entrypoint.sh /usr/share/nginx/entrypoint.sh
RUN chmod +x /usr/share/nginx/entrypoint.sh

EXPOSE 80 443
CMD ["/usr/share/nginx/entrypoint.sh"]
