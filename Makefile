.PHONY: install dev i18n pretty test rubocop brakeman destructive-init

install:
	@echo "Installing dependencies..."
	bundle install

dev:
	@echo "Starting the development server..."
	./bin/dev

i18n:
	@echo "Normalizing and checking i18n tasks..."
	i18n-tasks normalize && i18n-tasks health

pretty:
	@echo "Formatting ERB templates..."
	erb-format app/views/**/*.html.erb --write

test:
	@echo "Running tests..."
	rspec

rubocop:
	@echo "Running RuboCop for linting and auto-corrections..."
	rubocop -A

brakeman:
	@echo "Running Brakeman for security analysis..."
	brakeman -z -q

destructive-init:
	@echo "Reinitializing database (destructive)..."
	rails db:drop db:create db:schema:load db:migrate db:seed
