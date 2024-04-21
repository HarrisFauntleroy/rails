#!/usr/bin/env bash
# exit on error
set -o errexit

# the current version of Nokogiri ships with incompatible libs
bundle config --local build.nokogiri --use-system-libraries

bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean

# For a fresh setup, you can run the following commands:
rails db:drop db:create db:schema:load db:migrate db:seed 

# bundle exec rake db:migrate
