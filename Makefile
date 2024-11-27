# Setup and Installation
.PHONY: install setup-env
install:
	@echo "Installing project dependencies..."
	bundle install

setup-env:
	@echo "Creating .env from example.env..."
	cp example.env .env && echo "Environment variables configured."

# Server Management
.PHONY: dev redis-start redis-stop
dev:
	@echo "Starting development server (Procfile.dev)..."
	rails s

redis-start:
	@echo "Starting Redis service..."
	brew services start redis

redis-stop:
	@echo "Stopping Redis service..."
	brew services stop redis

# Development Console Access
.PHONY: rails-c db-console
rails-c:
	@echo "Opening Rails console..."
	bundle exec rails c

db-console:
	@echo "Opening database console..."
	bundle exec rails db

# Database Operations
.PHONY: db-recreate db-reset db-drop db-create db-schema-load db-migrate db-seed
db-recreate:
	@echo "Recreating database (drop, create, load schema, migrate, seed)..."
	bundle exec rails db:drop db:create db:schema:load db:migrate db:seed

db-reset:
	@echo "Resetting database to initial state..."
	bundle exec rails db:reset

db-drop:
	@echo "Dropping database..."
	bundle exec rails db:drop

db-create:
	@echo "Creating database..."
	bundle exec rails db:create

db-schema-load:
	@echo "Loading database schema..."
	bundle exec rails db:schema:load

db-migrate:
	@echo "Running database migrations..."
	bundle exec rails db:migrate

db-seed:
	@echo "Seeding database with initial data..."
	bundle exec rails db:seed

# Code Quality and Testing
.PHONY: rspec rubocop brakeman i18n pretty
rspec:
	@echo "Running test suite..."
	bundle exec rspec

rubocop:
	@echo "Running code linting and auto-correction..."
	bundle exec rubocop -A

brakeman:
	@echo "Running security analysis..."
	bundle exec brakeman -z -q

i18n:
	@echo "Checking i18n health and normalizing translations..."
	i18n-tasks normalize && i18n-tasks health

pretty:
	@echo "Formatting ERB templates..."
	bundle exec erb-format app/views/**/*.html.erb --write
