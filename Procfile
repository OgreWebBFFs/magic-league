web: NODE_OPTIONS=--openssl-legacy-provider bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}
worker: rake jobs:work