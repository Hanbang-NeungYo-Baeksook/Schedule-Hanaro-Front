#!/bin/sh

# 0. 기존 default.conf 삭제
rm /etc/nginx/conf.d/default.conf

# 1. HTTP 설정으로 NginX 시작
cp /etc/nginx/nginx-http.conf /etc/nginx/conf.d/nginx.conf
nginx &  # 임시로 백그라운드 실행

# 2. NginX가 실행될 때까지 대기
while ! curl -s http://localhost > /dev/null; do
  echo "Waiting for NginX to be ready..."
  sleep 2
done

echo "NginX is ready. Proceeding with Certbot..."

# 3. Certbot으로 인증서 발급
certbot certonly --webroot -w /usr/share/nginx/html \
  -d schedulehanaro.digital \
  --non-interactive --agree-tos -m likesun2000@gmail.com