FROM nginx:alpine
WORKDIR /app
COPY dist /usr/share/nginx/html
RUN \
  apk update && \
  apk add bash
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
