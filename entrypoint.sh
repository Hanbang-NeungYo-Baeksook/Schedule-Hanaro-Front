#!/bin/sh

# 1. Nginx를 백그라운드로 실행
# nginx &

# # 2. Certbot으로 인증서 발급 (Webroot 사용)
# certbot certonly --webroot -w /usr/share/nginx/html \
#   -d schedulehanaro.digital -d www.schedulehanaro.digital \
#   --non-interactive --agree-tos -m likesun2000@gmail.com

# 3. 인증서가 발급되면 Nginx를 다시 로드
# nginx -s reload

# 4. 포그라운드에서 Nginx 실행
nginx -g "daemon off;"