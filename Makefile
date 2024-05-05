.PHONY: install dev i18n pretty test rubocop brakeman destructive-init

install:
	bundle install

dev:
	@echo "Starting development server..."
	rails s

i18n: 
	@echo "Running i18n-tasks..."
	i18n-tasks normalize && i18n-tasks health

pretty:
	@echo "Running formatter..."
	erb-format app/views/**/*.html.erb --write

test:
	@echo "Running tests..."
	rspec

rubocop:
	@echo "Running RuboCop..."
	rubocop -a

brakeman:
	@echo "Running Brakeman..."
	brakeman -z -q

destructive-init:
	@echo "Destructive initialization..."
	rails db:drop db:create db:schema:load db:migrate db:seed
