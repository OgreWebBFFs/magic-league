## How do I run it?

1. Download the source
2. Run `docker-compose up`
3. Wait for "PostgreSQL init process complete; ready for start up."
4. OSX & Ubuntu: Run `chmod +x ./lib/bin/setup_docker_db.sh`
5. OSX & Ubuntu: Run `sh /lib/bin/setup_docker_db.sh`
6. Windows: Run `./lib/bin/setup_docker_win.bat`
7. Visit `localhost:3000`

## Using the Rails Console

1. Run `docker exec -it magic-league_web_1 bash` to connect to the Docker container
2. Run `rails c`

## Troubleshooting

* If any of steps 4-5 fail under "How do I run it?", try: `docker exec -it magic-league_web_1 //bin/sh -c "rake db:create && rake db:migrate"`
* The name of the web container docker brings up should be called `magic-league_web_1`. If docker cannot locate this container in the above command, try `docker ps` and looking for the name of the container using port 3000.

## Adding/Modifying Omniauth Providers
* Google - https://console.cloud.google.com/apis/dashboard?project=ogre-mtg
