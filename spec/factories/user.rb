# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    username { Faker::Internet.unique.username(specifier: 3..25) }
    password { 'Password!1' }
    admin { false }
    moderator { false }

    trait :admin do
      admin { true }
    end

    trait :moderator do
      moderator { true }
    end
  end
end
