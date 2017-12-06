# GoldenCoal

ReactJS frontend with Symfony3 backend

## Basic environment

Install [docker, docker-compose](https://gist.github.com/gram7gram/7bae478fd98f06192a3f46f1ff45bf89)

Install [NVM](https://github.com/creationix/nvm)

Install node

`$ nvm install 8`

## Running application

1. `$ cp app/config/parameters.yml.dist app/config/parameters.yml`

2. Fill `app/config/parameters.yml` with data

3. `$ cp docker-compose.yml.dist docker-compose.yml`

4. Fill `docker-compose.yml` with data

5. In project directory run `$ docker-compose up -d`

6. In project directory run `$ docker-compose exec gc-01 php bin/console --env=prod cache:warmup`

7. In project directory run `$ docker-compose exec gc-01 php bin/console --env=prod cache:clear --no-warmup`

8. In project directory run `$ docker-compose exec gc-01 php bin/console --env=prod doctrine:migrations:migrate -n`

9. Open http://localhost:15200/app_dev.php in browser

## Building Frontend

Development bundle: `$ npm run dev-pack`

Production bundle: `$ npm run prod-pack`
