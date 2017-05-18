FROM node

RUN apt-get update

RUN apt-get install -y nginx

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/nginx/sites-enabled/

COPY events /etc/nginx/sites-available/events

RUN rm /etc/nginx/sites-enabled/default

RUN ln -s /etc/nginx/sites-available/events /etc/nginx/sites-enabled/events

WORKDIR /shingo-webapp

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]