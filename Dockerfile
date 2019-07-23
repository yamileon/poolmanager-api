FROM ubuntu:latest
RUN apt-get update


RUN apt-get install -y  nodejs
RUN apt-get install -y mongodb curl npm 


RUN curl -sL https://deb.nodesource.com/setup_10.x | bash  
RUN apt-get install -y nodejs
COPY ./poolmanager-api ./poolmanager-api
WORKDIR ./poolmanager-api
RUN npm install -y
CMD node test.js  







