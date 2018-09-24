## How do I run it?

1. Download the source
2. Run `docker-compose up`
3. Wait for "PostgreSQL init process complete; ready for start up."
4. Run `chmod +x ./lib/bin/setup_docker_db.sh`
5. Run `sh /lib/bin/setup_docker_db.sh`
6. Visit `localhost:3000`

## Using the Rails Console

1. Run `docker exec -it mtg-league_web_1 bash` to connect to the Docker container
2. Run `rails c`

## Adding/Modifying Omniauth Providers
* Google - https://console.cloud.google.com/apis/dashboard?project=ogre-mtg
