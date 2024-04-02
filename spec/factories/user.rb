# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    username { Faker::Internet.unique.username(specifier: 6..12) }
    password { 'Password!1' }
    admin { false }
  end
end
