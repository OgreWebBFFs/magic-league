## Initial Setup
1. Download the source, and npm i 
2. Install Ruby ^2.5.3, we suggest using RVM 
3. Install Rails 5.2.1, run 'gem install rails -v 5.2.1'
4. Run 'bundle install', you will need Bundler
5. Install Postgres using Homebrew, run 'brew install postgres'
6. Start postgtress, run ' pg_ctl -D /usr/local/var/postgres start'
6. Run rake db:create && rake db:migrate

## Using the Rails Console

1. Run `rails c`

## Start Local

1. Run 'rails s'

## How do I make myself an Admin from the console?
1. Run `rails c`
2. `user = User.find_by_email('email_address')`
3. `user.admin = true`
4. `user.save`

## Troubleshooting

* If any of steps 4-5 fail under "How do I run it?", try: `docker exec -it magic-league_web_1 //bin/sh -c "rake db:create && rake db:migrate"`
* The name of the web container docker brings up should be called `magic-league_web_1`. If docker cannot locate this container in the above command, try `docker ps` and looking for the name of the container using port 3000.

## Adding/Modifying Omniauth Providers
* Google - https://console.cloud.google.com/apis/dashboard?project=ogre-mtg
