# Description: Makefile for Ruby on Rails project management.

# -------- Setup and Installation -------- #
.PHONY: install setup-env

# Project Installation
install:
	@echo "Installing project dependencies..."
	bundle install

# Environment Configuration
setup-env:
	@echo "Creating .env from example.env..."
	cp example.env .env && echo "Environment variables configured."

# -------- Server Management -------- #
.PHONY: dev

# Development Server
dev:
	@echo "Starting development server (Procfile.dev)..."
	bin/dev

# -------- Development Console Access -------- #
.PHONY: rails-c db-console

# Rails Console Access
rails-c:
	@echo "Opening Rails console..."
	bundle exec rails c

# Database Console Access
db-console:
	@echo "Opening database console..."
	bundle exec rails db

# -------- Database Operations -------- #
.PHONY: db-recreate db-reset db-drop db-create db-schema-load db-migrate db-seed

# Database Recreate
db-recreate:
	@echo "Recreating database (drop, create, load schema, migrate, seed)..."
	bundle exec rails db:drop db:create db:schema:load db:migrate db:seed

# Database Reset
db-reset:
	@echo "Resetting database to initial state..."
	bundle exec rails db:reset

# Database Deletion
db-drop:
	@echo "Dropping database..."
	bundle exec rails db:drop

# Database Creation
db-create:
	@echo "Creating database..."
	bundle exec rails db:create

# Database Schema
db-schema-load:
	@echo "Loading database schema..."
	bundle exec rails db:schema:load

# Database Migrations
db-migrate:
	@echo "Running database migrations..."
	bundle exec rails db:migrate

# Seed Database
db-seed:
	@echo "Seeding database with initial data..."
	bundle exec rails db:seed

# -------- Code Quality and Testing -------- #
.PHONY: rspec rubocop brakeman reek fasterer rails_best_practices pretty

# Test Suite
rspec:
	@echo "Running test suite..."
	bundle exec rspec

# Code Linting
rubocop:
	@echo "Running code linting and auto-correction..."
	bundle exec rubocop -A

# Security Analysis
brakeman:
	@echo "Running security analysis..."
	bundle exec brakeman -z -q

# Code Smell Analysis
reek:
	@echo "Running code smell analysis..."
	bundle exec reek

# Dependency Security Analysis
bundle-audit:
	@echo "Checking for dependency vulnerabilities..."
	bundle exec bundle-audit check --update

# Performance Analysis
fasterer:
	@echo "Running performance analysis..."
	bundle exec fasterer

# Best Practices Analysis
rails_best_practices:
	@echo "Running best practices analysis..."
	bundle exec rails_best_practices

# Formatting for views
pretty:
	@echo "Formatting ERB templates..."
	bundle exec erb-format app/views/**/*.html.erb --write

# -------- Internationalization and Localization -------- #
.PHONY: i18n

# i18n Health Check
i18n:
	@echo "Checking i18n health and normalizing translations..."
	i18n-tasks normalize && i18n-tasks health
