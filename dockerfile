FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY /dist/rundown /usr/share/nginx/html
EXPOSE 80
