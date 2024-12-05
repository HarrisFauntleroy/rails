# frozen_string_literal: true

source "https://rubygems.org"

ruby "3.3.6"

gem "rails", ">= 7.1.3.2", "< 7.3"

# Replace the asset pipeline with Propshaft
gem "sprockets-rails"

# Use pg as the database for Active Record
gem "pg", "~> 1.1"

# Use the Puma web server [https://github.com/puma/puma]
gem "puma", ">= 5.0"

# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem "importmap-rails"

# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem "jbuilder"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: %i[mswin mswin64 mingw x64_mingw jruby]

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

group :development, :test do
  gem "bullet"
  gem "byebug"
  gem "debug", platforms: %i[mri mswin mswin64 mingw x64_mingw]
  gem "factory_bot_rails"
  gem "faker"
  gem "pundit-matchers"
  gem "rails-controller-testing"
  gem "rspec"
  gem "rspec-rails"
  gem "rubocop"
  gem "rubocop-capybara"
  gem "rubocop-factory_bot"
  gem "rubocop-i18n"
  gem "rubocop-performance"
  gem "rubocop-rails"
  gem "rubocop-rake"
  gem "rubocop-rspec"
  gem "rubocop-rspec_rails"
  gem "rubocop-thread_safety"
  gem "rubocop-rails-omakase"
end

group :development do
  gem "web-console"
  gem "annotate"
  gem "brakeman"
  gem "i18n-tasks", "~> 1.0.13"
  gem "solargraph"
  gem "solargraph-rails"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "shoulda-matchers", "~> 6.0"
  gem "simplecov", require: false
  gem "webdrivers"
end

gem "devise", "~> 4.9"
gem "erb-formatter", "~> 0.7.2"
gem "pundit"
gem "simplecov-formatter-badge", require: false
gem "view_component", "~> 3.12"

gem "kaminari"
