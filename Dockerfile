FROM ruby:2.5.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
        && apt-get install -y nodejs
RUN mkdir /mtg-league
WORKDIR /mtg-league
COPY Gemfile /mtg-league/Gemfile
COPY Gemfile.lock /mtg-league/Gemfile.lock
RUN bundle install
COPY . /mtg-league
