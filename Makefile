

install:
	bundle install

dev:
	rails s

i18n: 
	i18n-tasks normalize && i18n-tasks health

pretty:
	erb-format app/views/**/*.html.erb --write

test:
	rspec

rubocop:
	rubocop -a

brakeman:
	brakeman -z -q

destructive-init:
	rails db:drop db:create db:schema:load db:migrate db:seed