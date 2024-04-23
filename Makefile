i18n: 
	i18n-tasks normalize && i18n-tasks health

pretty:
	erb-format app/views/**/*.html.erb --write && rubocop -a

install:
	bundle install

dev:
	rails s

destructive-init:
	rails db:drop db:create db:schema:load db:migrate db:seed 