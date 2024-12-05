#!/bin/sh

# 1. HTTP로 NginX 설정
cp /etc/nginx/nginx-http.conf /etc/nginx/conf.d/nginx.conf

nginx -g "daemon off;"

# # 2. Certbot으로 인증서 발급 (Webroot 사용)
certbot certonly --webroot -w /usr/share/nginx/html \
  -d schedulehanaro.digital \
  --non-interactive --agree-tos -m likesun2000@gmail.com

# 5. HTTPS로 NginX 설정
cp /etc/nginx/nginx-https.conf /etc/nginx/conf.d/nginx.conf

# 4. Nginx 다시 실행
nginx -s "reload";