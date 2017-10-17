# GoldenCoal
ReactJS frontend with NodeJS backend

## Basic environment

Install docker, docker-compose

https://gist.github.com/gram7gram/7bae478fd98f06192a3f46f1ff45bf89

Install NVM

https://github.com/creationix/nvm

Install node

`$ nvm install 8`

## Running application

1. `$ cp server/config/parameters.js.dist server/config/parameters.js`

2. Fill `server/config/parameters.js` with data

3. `$ cp docker-compose.yml.dist docker-compose.yml`

4. Fill `docker-compose.yml` with data

6. In project directory run `$ npm i`

7. In project directory run `$ docker-compose up -d`

8. In project directory run `$ pm2 start server/index.js`

## Building Frontend

Development bundle: `$ NODE_ENV=development webpack`

Production bundle: `$ NODE_ENV=production webpack`
