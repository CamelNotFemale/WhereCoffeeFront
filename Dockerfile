FROM node:12.22.9-alpine As builder

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

RUN npm install -g @angular/cli@13.3.10
CMD ng serve --host 0.0.0.0