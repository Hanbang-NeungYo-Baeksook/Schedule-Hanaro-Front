#!/bin/sh

# 0. 기존 default.conf 삭제
rm /etc/nginx/conf.d/default.conf

# 1. HTTP 설정으로 NginX 시작
cp /etc/nginx/nginx-https.conf /etc/nginx/conf.d/nginx.conf

# 2. EC2 Server의 SSL 인증서 생성 대기
TARGET_FILE1="/etc/letsencrypt/live/schedulehanaro.digital/fullchain.pem"
TARGET_FILE2="/etc/letsencrypt/live/schedulehanaro.digital/privkey.pem"

echo "Waiting for $TARGET_FILE1 and $TARGET_FILE2 to be created..."

while [ ! -f "$TARGET_FILE1" ] || [ ! -f "$TARGET_FILE2" ]; do
  if [ ! -f "$TARGET_FILE1" ]; then
    echo "$TARGET_FILE1 not found. Retrying..."
  fi
  if [ ! -f "$TARGET_FILE2" ]; then
    echo "$TARGET_FILE2 not found. Retrying..."
  fi
  sleep 5
done

echo "Both $TARGET_FILE1 and $TARGET_FILE2 have been created!"

# 3. NginX를 포어그라운드에서 실행
nginx -g "daemon off;"
