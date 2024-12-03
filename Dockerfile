FROM nginx:alpine
WORKDIR /app
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

# RUN \
#   apk update && \
#   apk add bash
# EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]