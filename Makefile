.PHONY: install
install:
	@echo "Installing dependencies..."
	bundle install

.PHONY: rails-c
rails-c:
	@echo "Opening the Rails console..."
	bundle exec rails c

.PHONY: dev
dev:
	@echo "Starting the development server..."
	rails s

# .PHONY: sidekiq
# sidekiq:
# 	@echo "Starting the Sidekiq server..."
# 	bundle exec sidekiq

.PHONY: db-console
db-console:
	@echo "Opening the database console..."
	bundle exec rails db

.PHONY: db-reset
db-reset:
	@echo "Resetting the database..."
	bundle exec rails db:reset

.PHONY: db-migrate
db-migrate:
	@echo "Migrating the database..."
	bundle exec rails db:migrate

.PHONY: db-seed
db-seed:
	@echo "Seeding database..."
	bundle exec rails db:seed

# .PHONY: redis-start
# redis-start:
# 	@echo "Starting Redis server..."
# 	brew services start redis

# .PHONY: redis-stop
# redis-stop:
# 	@echo "Stopping Redis server..."
# 	brew services stop redis

.PHONY: i18n
i18n:
	@echo "Normalizing and checking i18n tasks..."
	i18n-tasks normalize && i18n-tasks health

.PHONY: pretty
pretty:
	@echo "Formatting ERB templates..."
	bundle exec erb-format app/views/**/*.html.erb --write

.PHONY: rspec
rspec:
	@echo "Running specs..."
	bundle exec rspec

.PHONY: rubocop
rubocop:
	@echo "Running RuboCop for linting and auto-corrections..."
	bundle exec rubocop -A

.PHONY: brakeman
brakeman:
	@echo "Running Brakeman for security analysis..."
	bundle exec brakeman -z -q
