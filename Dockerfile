FROM nginx:1.27.2-alpine

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./ /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]