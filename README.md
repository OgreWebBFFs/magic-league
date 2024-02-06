## Initial Setup
1. Download the source, and npm i 
2. Install Ruby ^2.5.3, we suggest using RVM 
3. Install Rails 5.2.1, run 'gem install rails -v 5.2.1'
4. Run 'bundle install', you will need Bundler
5. Install Postgres using Homebrew, run 'brew install postgres'
6. Start postgtress, run ' pg_ctl -D /usr/local/var/postgres start'
6. Run rake db:create && rake db:migrate

##Initial Set up for Windows
1. Download the source, and npm i 
2. From the control panel > programs(apps) and features > Turn Window Features On and Off, set Use Windows Subsystem for Linux on
3. Install the Ubuntu subsystem available
4. Install Ruby follow the instructions here ( https://www.digitalocean.com/community/tutorials/how-to-install-ruby-on-rails-with-rbenv-on-ubuntu-18-04 ) steps 1- 3 to install Nodejs, Ruby 
   -Skip the prereq step about server setup
5. Install Postgress follow the instructions here ( https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04 ) steps 1 - 5 

6. Run 'bundle install' 
   -If you have issues with the pg gem see this article ( https://www.digitalocean.com/community/questions/gem-install-pg-not-working )

7. Run 'sudo service postgresql start" 
8. Run 'rails db:create && rails db:migrate && rails db:seed'

## Using the Rails Console

1. Run `rails c`

## Start without starting the server

1. Run `rails s`

## Start Local Mac

1. `npm run start-mac`

## Start Local Ubuntu

1. `npm run start-ubuntu`

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

## CSS Style notes
### Colors and Theme

For the most part theme colors are now derived from a short list of css custom props, in the [color-library](https://github.com/OgreWebBros/magic-league/blob/main/app/javascript/stylesheets/sitewide/color-library.scss) style sheet.  Updating these colors should cascade down to the entire site.

* neutral
   * fill: the background of interaction areas where we generally expect text or icons to be overlayed, ex: buttons, tabs, etc.. 
   * text: the color of text laid on top of neutral-fill. (Currently, but not neccesarily derived from inverse-fill, see below)
* theme
   * theme-fill: brighter highlight color meant to signify higher priority user interactions, ex: primary ctas
   * theme-text: color used for editorial text or to indicate text with user interactions, ex: links
* inverse:
   * fill: The background of non-interaction areas such as the background of a table cell. This color should be very different from nuetral, eg: nuetral: black, inverse: white
   * text: the color of text laid on top of inverse-fill. (Currently, but not neccesarily derived from neutral-fill)

In addition to these we have several colors are mainly independent of theme and meant to signify more semantic use. 

* urgent:  alerts, calls to attention
* negative: errors, more critical cancel actions
* positive: success, more critical accept actions

### Spacers
[Spacers](https://github.com/OgreWebBros/magic-league/blob/main/app/javascript/stylesheets/sitewide/spacers.scss)are a set of css custom props that are used for internal paddings and margins, ie button padding, but not page layout margins.  
They are responsive, although currently only updating at our mobile-ish breakpoint. 