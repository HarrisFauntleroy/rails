# Forum

<p align="center">
    <a href="https://github.com/rubocop/rubocop">
        <img alt="Code style" src="https://img.shields.io/badge/code_style-rubocop-brightgreen.svg">
    </a>
    <a href="/coverage">
        <img alt="Coverage" src="/coverage/coverage.svg">
    </a>
    <a href="https://github.com/HarrisFauntleroy/forum/graphs/contributors">
        <img alt="GitHub contributors" src="https://img.shields.io/github/contributors-anon/HarrisFauntleroy/forum?&style=flat">
    </a>
    <a href="https://github.com/HarrisFauntleroy/forum/actions">
        <img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/HarrisFauntleroy/forum/main?&style=flat">
    </a>
    <a href="https://github.com/HarrisFauntleroy/forum/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/HarrisFauntleroy/forum?&style=flat">
    </a>
    <a href="https://github.com/HarrisFauntleroy/forum/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/last-commit/HarrisFauntleroy/forum?&style=flat">
    </a>
    </a>
    <a href="https://github.com/HarrisFauntleroy/forum/issues?q=is%3Aopen+is%3Aissue">
        <img alt="GitHub issues" src="https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/forum?&style=flat">
    </a>
</p>

<!-- PROJECT_DESCRIPTION -->

A full-featured forum application built with Ruby on Rails.

<!-- PROJECT_SCREENSHOT -->

<!-- 🚧 -->

## Table of Contents ⚙️

1. [Features](#features-💫)
2. [Local Development](#local-development-💻)
3. [Contributing](#contributing-🤝)
4. [License](#license-⚖️)
5. [Disclaimer](#disclaimer-🚨)

## Features 💫

- 🚧

## Local Development 💻

Here's how you can set up forum in your local dev environment:

**Requirements**

<!-- LIST OF REQUIREMENTS -->

- Ruby >= 3.3.1
<!-- - Docker (for running Postgres, Redis, etc.) 🐳 -->

Ruby is managed using Ruby Version Manager

<!-- <a href="https://github.com/nvm-sh/logos"><img alt="nvm project logo" src="https://raw.githubusercontent.com/nvm-sh/logos/HEAD/nvm-logo-color.svg" height="50" /></a> -->

```bash
# Update ruby version
rvm use <version>
```

**Installation**

<!-- INSTALLATION INSTRUCTIONS -->

Install the required gems by running the following command:

```bash
bundle install
```

To migrate the database, run the following command:

```bash
rails db:migrate
```

```bash
rails db:create db:migrate db:seed
```

**Development**

```bash
rails db:drop db:create db:schema:load db:migrate db:seed
```

To run the specs, a single spec, or a single test:

```bash
rails rspec
rspec spec/controllers/user_controller_spec.rb
rspec spec/controllers/user_controller_spec.rb:32 
```

To start the server, run the following command:

```bash
rails server
rails s
```

To run the rails console, run the following command:

```bash
rails console
rails c
```

**Rake Commands**

Find missing specs:

```bash
rake spec_check:<views | models | controllers | all>    
```

**Makefile Commands**

To make life easier, there is a Makefile with some common commands:

To run [i18n-tasks](https://github.com/glebm/i18n-tasks) normalize and health
```bash
make i18n
```

To format and lint the code

```bash
make pretty
```

<!-- _Please refer to the package.json for additional details and scripts._ -->

## Contributing 🤝

<!-- GUIDELINES FOR CONTRIBUTION -->

## License ⚖️

<!-- Distributed under the MIT License. See `LICENSE` for more information. -->

## Disclaimer 🚨

This software is currently a work in progress and is considered in ALPHA state.
Features will appear and disappear, APIs will be changed, bugs will be
introduced, your feedback is always welcome! 🚧🔧
